#!/usr/bin/env node

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import blessed from "blessed";
import chokidar from "chokidar";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────────────
function findTrackerPath() {
  if (process.env.PROJECT_ROOT && existsSync(resolve(process.env.PROJECT_ROOT, "project-tracker.json"))) {
    return resolve(process.env.PROJECT_ROOT, "project-tracker.json");
  }
  let dir = process.cwd();
  while (dir !== "/") {
    if (existsSync(resolve(dir, "project-tracker.json"))) return resolve(dir, "project-tracker.json");
    dir = resolve(dir, "..");
  }
  return resolve(__dirname, "project-tracker.json");
}

const TRACKER_PATH = findTrackerPath();

function load() {
  return JSON.parse(readFileSync(TRACKER_PATH, "utf-8"));
}

// ── Theme ────────────────────────────────────────────────────────────
const themes = {
  dark: {
    bg: "#1a1a2e", fg: "#e0e0e0", accent: "#e2b714", success: "#4ec9b0",
    warning: "#ce9178", error: "#f44747", review: "#dcdcaa", muted: "#6a6a6a",
    border: "#333355", barBg: "#16213e", selectedBg: "#0f3460", selectedFg: "#ffffff",
    headerBg: "#0f3460", headerFg: "#e2b714",
  },
  light: {
    bg: "#fafafa", fg: "#1a1a2e", accent: "#b8860b", success: "#2e7d32",
    warning: "#e65100", error: "#c62828", review: "#f9a825", muted: "#9e9e9e",
    border: "#cccccc", barBg: "#e8e8e8", selectedBg: "#bbdefb", selectedFg: "#1a1a2e",
    headerBg: "#e2b714", headerFg: "#1a1a2e",
  },
};

function t(name) {
  return themes[isDark ? "dark" : "light"][name] || themes.dark[name];
}

function sc(status) {
  const map = { done: "success", in_progress: "accent", review: "review", blocked: "error" };
  return t(map[status] || "muted");
}

function si(status) {
  const map = { done: "✓", in_progress: "◐", review: "◇", blocked: "✗" };
  return map[status] || "○";
}

function progBar(pct, width) {
  const filled = Math.round((pct / 100) * width);
  const empty = width - filled;
  return `{${t("success")}-fg}${"█".repeat(filled)}{/}{${t("border")}-fg}${"░".repeat(empty)}{/}`;
}

function wrap(text) {
  if (!text) return "-";
  return String(text);
}

// ── State ────────────────────────────────────────────────────────────
let data = load();
let activeTab = 0;
let isDark = true;
let milestoneIdx = 0;
let currentView = null;
let tabBar = null;
let statusBar = null;
let lastTab = -1;
let lastMilestoneIdx = -1;

// ── Screen ───────────────────────────────────────────────────────────
const screen = blessed.screen({
  smartCSR: true,
  title: "في ظلال القرآن — Command Center",
  fullUnicode: true,
});

// ── View factories ───────────────────────────────────────────────────

function createSwimLane() {
  const box = blessed.box({
    parent: screen, top: 1, left: 0, right: 0, bottom: 1,
    keys: true, vi: true, scrollable: true, alwaysScroll: true, tags: true,
    style: { bg: t("bg"), fg: t("fg") },
  });
  box._render = function () {
    const s = data;
    if (!s) { box.setContent("{center}{red-fg}No data{/}{/}"); return; }
    const lines = [];
    lines.push(`{center}{bold}{${t("accent")}-fg}═══ SWIM LANE ═══{/}{/}{/}`);
    lines.push("");
    lines.push(`{bold} ACTIVE MILESTONES{/}`);
    lines.push("─".repeat(70));
    for (const m of (s.milestones.active || [])) {
      const subtasks = m.subtasks || [];
      const done = subtasks.filter(t => t.status === "done").length;
      const total = subtasks.length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;
      const bar = progBar(pct, 20);
      const key = m.is_key_milestone ? " ★" : "";
      lines.push(`  {bold}${wrap(m.title)}{/}${key} {${t("muted")}-fg}(${m.id}){/}`);
      lines.push(`  ${bar} ${pct}%  ${done}/${total} tasks  Phase: ${wrap(m.phase)}  Domain: ${wrap(m.domain)}`);
      if (m.planned_start) {
        lines.push(`  {${t("muted")}-fg}Planned: ${m.planned_start} → ${m.planned_end || "?"}{/}${m.actual_start ? `  Actual: ${m.actual_start} → ${m.actual_end || "?"}` : ""}`);
      }
      lines.push("");
    }
    if (!(s.milestones.active || []).length) {
      lines.push(`  {${t("muted")}-fg}(no active milestones){/}`); lines.push("");
    }
    lines.push(`{bold} BACKLOG{/}`);
    lines.push("─".repeat(70));
    for (const m of (s.milestones.backlog || [])) {
      const subtasks = m.subtasks || [];
      const done = subtasks.filter(t => t.status === "done").length;
      const total = subtasks.length;
      const key = m.is_key_milestone ? " ★" : "";
      lines.push(`  {${t("muted")}-fg}${wrap(m.title)}${key} (${m.id}) — ${done}/${total} tasks — ${wrap(m.phase)}{/}`);
    }
    if (!(s.milestones.backlog || []).length) lines.push(`  {${t("muted")}-fg}(backlog empty){/}`);
    lines.push("");
    lines.push(`{bold} COMPLETED{/}`);
    lines.push("─".repeat(70));
    for (const c of (s.milestones.completed || []).slice(-5)) {
      lines.push(`  {${t("success")}-fg}✓ ${wrap(c.title)}{/} {${t("muted")}-fg}(${c.completed_at || ""}){/}`);
    }
    const cc = (s.milestones.completed || []).length;
    if (cc > 5) lines.push(`  {${t("muted")}-fg}... and ${cc - 5} more{/}`);
    box.setContent(lines.join("\n"));
  };
  box._render();
  return box;
}

function createTaskBoard() {
  const box = blessed.box({
    parent: screen, top: 1, left: 0, right: 0, bottom: 1,
    keys: true, vi: true, scrollable: true, alwaysScroll: true, tags: true,
    style: { bg: t("bg"), fg: t("fg") },
  });
  box._render = function () {
    const s = data;
    if (!s) { box.setContent("{center}{red-fg}No data{/}{/}"); return; }
    const allM = [...(s.milestones.active || []), ...(s.milestones.backlog || [])];
    if (!allM.length) { box.setContent("{center}No milestones{/}"); return; }
    const idx = Math.min(milestoneIdx, allM.length - 1);
    const current = allM[idx];
    const subtasks = current.subtasks || [];
    const lines = [];
    lines.push(`{center}{bold}{${t("accent")}-fg}═══ TASK BOARD ═══{/}{/}{/}`);
    lines.push("");
    const indicator = allM.length > 1 ? ` [${idx + 1}/${allM.length}] ` : " ";
    const key = current.is_key_milestone ? " ★" : "";
    lines.push(`{bold}${wrap(current.title)}${key}{/}${indicator}{${t("muted")}-fg}(${current.id}) — ${wrap(current.domain)} — ${wrap(current.phase)}{/}`);
    lines.push("");
    const done = subtasks.filter(t => t.status === "done").length;
    const total = subtasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    lines.push(`Progress: ${done}/${total} (${pct}%)  {${t("muted")}-fg}│ [/] navigate milestone  [Enter] details{/}`);
    lines.push("─".repeat(80));
    if (!subtasks.length) { lines.push(`  {${t("muted")}-fg}No tasks in this milestone{/}`); box.setContent(lines.join("\n")); return; }
    const columns = [
      { id: "todo", label: "TODO" }, { id: "in_progress", label: "IN PROGRESS" },
      { id: "review", label: "REVIEW" }, { id: "done", label: "DONE" }, { id: "blocked", label: "BLOCKED" },
    ];
    for (const col of columns) {
      const tasks = subtasks.filter(t => t.status === col.id);
      if (!tasks.length) continue;
      lines.push(`{bold}{${sc(col.id)}-fg}${col.label} (${tasks.length}){/}{/}`);
      for (const t of tasks) {
        const icon = si(t.status);
        const pri = t.priority && t.priority.startsWith("P") ? ` {bold}{${sc(t.status)}-fg}[${t.priority}]{/}{/}` : "";
        const assignee = t.assignee ? ` {${t("muted")}-fg}→ ${t.assignee}{/}` : "";
        lines.push(`  {${sc(t.status)}-fg}${icon}{/} {bold}${t.id}{/}${pri} ${wrap(t.label)}${assignee}`);
      }
      lines.push("");
    }
    box.setContent(lines.join("\n"));
  };
  box._render();
  return box;
}

function createAgentHub() {
  const box = blessed.box({
    parent: screen, top: 1, left: 0, right: 0, bottom: 1,
    keys: true, vi: true, scrollable: true, alwaysScroll: true, tags: true,
    style: { bg: t("bg"), fg: t("fg") },
  });
  box._render = function () {
    const s = data;
    if (!s) { box.setContent("{center}{red-fg}No data{/}{/}"); return; }
    const lines = [];
    lines.push(`{center}{bold}{${t("accent")}-fg}═══ AGENT HUB ═══{/}{/}{/}`);
    lines.push("");
    const agents = s.agents || [];
    if (agents.length) {
      lines.push("{bold} REGISTERED AGENTS{/}");
      lines.push("─".repeat(60));
      for (const a of agents) {
        const status = a.status === "active" ? `{${t("success")}-fg}●{/}` : `{${t("muted")}-fg}○{/}`;
        lines.push(`  ${status} {bold}${wrap(a.name)}{/} {${t("muted")}-fg}(${a.id}){/}`);
        lines.push(`    Type: ${wrap(a.type)}  Permissions: ${(a.permissions || []).join(", ")}  Actions: ${a.session_action_count || 0}`);
        lines.push("");
      }
    } else {
      lines.push(`  {${t("muted")}-fg}No agents registered{/}`); lines.push("");
    }
    const log = s.history_log || [];
    lines.push("{bold} RECENT ACTIVITY{/}");
    lines.push("─".repeat(60));
    const recent = log.slice(-25).reverse();
    let lastDate = "";
    for (const entry of recent) {
      const date = entry.date || (entry.timestamp ? entry.timestamp.slice(0, 10) : "");
      const text = entry.event || entry.action || entry.description || "";
      const agent = entry.agent || entry.agent_id || "";
      if (date !== lastDate) { lastDate = date; lines.push(`{bold}  ${date}{/}`); }
      const agentStr = agent ? ` {${t("muted")}-fg}[${agent}]{/}` : "";
      lines.push(`    ${text}${agentStr}`);
    }
    if (!log.length) lines.push(`  {${t("muted")}-fg}No activity logged{/}`);
    box.setContent(lines.join("\n"));
  };
  box._render();
  return box;
}

function createCalendar() {
  const box = blessed.box({
    parent: screen, top: 1, left: 0, right: 0, bottom: 1,
    keys: true, vi: true, scrollable: true, alwaysScroll: true, tags: true,
    style: { bg: t("bg"), fg: t("fg") },
  });
  box._render = function () {
    const s = data;
    if (!s) { box.setContent("{center}{red-fg}No data{/}{/}"); return; }
    const lines = [];
    lines.push(`{center}{bold}{${t("accent")}-fg}═══ CALENDAR ═══{/}{/}{/}`);
    lines.push("");
    const startDate = new Date(s.project.start_date);
    const now = new Date();
    const currentWeek = Math.max(1, Math.floor((now - startDate) / (7 * 86400000)) + 1);
    const totalWeeks = Math.max(currentWeek, Math.ceil((new Date(s.project.target_date) - startDate) / (7 * 86400000)));
    lines.push(`{bold} Project Timeline{/}  Start: ${s.project.start_date}  Target: ${s.project.target_date}  Current Week: ${currentWeek}/${totalWeeks}`);
    lines.push("");
    const timeline = "─".repeat(60);
    lines.push(`  ${timeline}`);
    const weekLine = [];
    const weekMarkers = [];
    for (let w = 1; w <= Math.min(Math.max(totalWeeks, currentWeek), 20); w++) {
      if (w === currentWeek) weekLine.push(`{bold}{${t("accent")}-fg}▼{/}{/}`);
      else if (w < currentWeek) weekLine.push(`{${t("success")}-fg}─{/}`);
      else weekLine.push(`{${t("muted")}-fg}─{/}`);
      weekMarkers.push(`W${w}`.padEnd(3).slice(0, 3));
    }
    lines.push(`  ${weekLine.join("")}`);
    lines.push(`  {${t("muted")}-fg}${weekMarkers.join("")}{/}`);
    lines.push("");
    const completedByDate = {};
    for (const cm of (s.milestones.completed || [])) {
      const date = cm.completed_at || "";
      if (date) { if (!completedByDate[date]) completedByDate[date] = []; completedByDate[date].push(cm.title); }
    }
    lines.push("{bold} Completed Milestones by Date{/}");
    lines.push("─".repeat(60));
    const dates = Object.keys(completedByDate).sort().reverse();
    for (const d of dates) { lines.push(`  {${t("success")}-fg}${d}{/}`); for (const title of completedByDate[d]) lines.push(`    ✓ ${title}`); }
    if (!dates.length) lines.push(`  {${t("muted")}-fg}No completed milestones yet{/}`);
    lines.push(""); lines.push("{bold} Activity by Date{/}"); lines.push("─".repeat(60));
    const log = s.history_log || [];
    const byDate = {};
    for (const entry of log) {
      const date = entry.date || (entry.timestamp ? entry.timestamp.slice(0, 10) : "");
      if (date) { if (!byDate[date]) byDate[date] = []; byDate[date].push(entry.event || entry.action || entry.description || ""); }
    }
    const logDates = Object.keys(byDate).sort().reverse();
    for (const d of logDates.slice(0, 10)) lines.push(`  {bold}${d}{/} (${byDate[d].length} events)`);
    if (!logDates.length) lines.push(`  {${t("muted")}-fg}No history entries{/}`);
    box.setContent(lines.join("\n"));
  };
  box._render();
  return box;
}

// ── Views ────────────────────────────────────────────────────────────
const VIEWS = [createSwimLane, createTaskBoard, createAgentHub, createCalendar];
const TAB_NAMES = ["Swim Lane", "Task Board", "Agent Hub", "Calendar"];

function createTabBar() {
  const bar = blessed.box({
    parent: screen, top: 0, left: 0, right: 0, height: 1, tags: true,
    style: { bg: t("headerBg"), fg: t("headerFg") },
  });
  bar._render = function () {
    const parts = TAB_NAMES.map((name, i) => {
      const num = `{bold}{${t("headerFg")}-fg}${i + 1}{/}{/}`;
      return i === activeTab
        ? ` {bold}{white-fg}${num}:${name}{/}{/} `
        : ` ${num}:${name} `;
    });
    bar.setContent(parts.join("│"));
    screen.render();
  };
  bar._render();
  return bar;
}

function createStatusBar() {
  const bar = blessed.box({
    parent: screen, bottom: 0, left: 0, right: 0, height: 1, tags: true,
    style: { bg: t("barBg"), fg: t("fg") },
  });
  bar._render = function () {
    const s = data;
    if (!s) { bar.setContent(` {red-fg}No tracker data{/}`); return; }
    const p = s.project;
    const week = p.current_week;
    const status = p.schedule_status === "on_track" ? `{${t("success")}-fg}ON TRACK{/}` : p.schedule_status === "behind" ? `{${t("error")}-fg}BEHIND{/}` : `{${t("accent")}-fg}AHEAD{/}`;
    const progress = `${p.overall_progress || 0}%`;
    const active = (s.milestones.active || []).length;
    const backlog = (s.milestones.backlog || []).length;
    const completed = (s.milestones.completed || []).length;
    const focus = (s.dashboard && s.dashboard.current_focus) || "";
    bar.setContent(` Week ${week} │ ${status} │ ${progress} │ Active:${active} Backlog:${backlog} Done:${completed} │ ${focus} │ {${t("muted")}-fg}r:refresh t:theme q:quit{/}`);
    screen.render();
  };
  bar._render();
  return bar;
}

function renderAll(fullRebuild) {
  const milestoneChanged = milestoneIdx !== lastMilestoneIdx;
  const needsRebuild = fullRebuild || activeTab !== lastTab || milestoneChanged;
  if (needsRebuild) {
    lastTab = activeTab;
    lastMilestoneIdx = milestoneIdx;
    if (currentView) { screen.remove(currentView); currentView.destroy(); currentView = null; }
    currentView = VIEWS[activeTab]();
    if (tabBar) { screen.remove(tabBar); tabBar.destroy(); }
    if (statusBar) { screen.remove(statusBar); statusBar.destroy(); }
    tabBar = createTabBar();
    statusBar = createStatusBar();
  } else {
    if (currentView && currentView._render) currentView._render();
    if (statusBar && statusBar._render) statusBar._render();
  }
  currentView && currentView.focus();
  screen.render();
}

// ── Keyboard ─────────────────────────────────────────────────────────
screen.key(["q", "C-c"], () => process.exit(0));
screen.key(["1", "2", "3", "4"], (_ch, key) => {
  const tab = parseInt(key.ch, 10) - 1;
  if (tab !== activeTab && tab >= 0 && tab < VIEWS.length) { activeTab = tab; renderAll(true); }
});
screen.key(["[", "]"], () => {
  const all = [...(data.milestones.active || []), ...(data.milestones.backlog || [])];
  if (!all.length) return;
  milestoneIdx = (milestoneIdx + 1) % all.length;
  renderAll(true);
});
screen.key(["r"], () => { data = load(); renderAll(true); });
screen.key(["t"], () => {
  isDark = !isDark;
  const theme = themes[isDark ? "dark" : "light"];
  screen.style = { bg: theme.bg, fg: theme.fg };
  renderAll(true);
});

// ── File watcher ─────────────────────────────────────────────────────
try { chokidar.watch(TRACKER_PATH, { ignoreInitial: true }).on("change", () => { data = load(); renderAll(true); }); } catch (e) {}

// ── Init ─────────────────────────────────────────────────────────────
renderAll(true);
screen.render();
