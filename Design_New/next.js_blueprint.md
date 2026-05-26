# في ظلال القرآن - Next.js Component Blueprint

This document contains the structural React/Tailwind code for the core screens of the "Gilded Library" design. Use these as the foundation for your `/app` or `/components` directory.

---

## 1. Global Layout Context
Ensure your `app/layout.tsx` imports the fonts and `theme.css`.

```tsx
import { Tajawal, Amiri_Quran } from 'next/font/google';
import './theme.css';

const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['400', '700'],
  variable: '--font-tajawal' 
});

const amiri = Amiri_Quran({ 
  subsets: ['arabic'], 
  weight: ['400'],
  variable: '--font-amiri' 
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${amiri.variable}`}>
      <body className="bg-bg text-text-ink font-tajawal antialiased">
        {children}
      </body>
    </html>
  );
}
```

---

## 2. Shared Components

### TopAppBar.tsx (Header)
```tsx
import { Search, Moon, Menu } from 'lucide-react';

export const TopAppBar = () => (
  <header className="glass-header fixed top-0 left-0 w-full h-14 z-50 flex items-center justify-between px-6">
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-surface-hover rounded-md transition-colors">
        <Menu size={20} />
      </button>
      <h1 className="text-xl font-bold text-primary">في ظلال القرآن</h1>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="relative hidden md:block">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
        <input 
          type="text" 
          placeholder="بحث في السور والآيات..." 
          className="bg-surface border border-warm-border rounded-xl py-1.5 pr-10 pl-4 text-sm focus:border-accent outline-none w-64"
        />
      </div>
      <button className="p-2 hover:bg-surface-hover rounded-md">
        <Search className="md:hidden" size={20} />
      </button>
      <button className="p-2 hover:bg-surface-hover rounded-md">
        <Moon size={20} />
      </button>
    </div>
  </header>
);
```

### SideNavBar.tsx
```tsx
import { Book, Layers, Bookmark, Search as SearchIcon } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
    active ? 'bg-surface-hover text-primary border-r-2 border-accent' : 'text-text-secondary hover:bg-surface-hover'
  }`}>
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

export const SideNavBar = () => (
  <aside className="fixed right-0 top-14 h-[calc(100vh-56px)] w-72 bg-bg-secondary border-l border-warm-border p-4 flex flex-col gap-2">
    <div className="mb-6 px-2">
      <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-xl mb-2">ق</div>
      <h2 className="font-bold text-lg">المكتبة القرآنية</h2>
      <p className="text-xs text-text-muted">تصفح في ظلال القرآن</p>
    </div>
    
    <nav className="flex flex-col gap-1">
      <NavItem icon={Book} label="السور" active />
      <NavItem icon={Layers} label="الأجزاء" />
      <NavItem icon={Bookmark} label="العلامات" />
      <NavItem icon={SearchIcon} label="البحث" />
    </nav>

    <div className="mt-auto p-4 bg-surface rounded-xl border border-warm-border flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-accent-light" />
      <div>
        <p className="text-sm font-bold">أحمد القارئ</p>
        <p className="text-xs text-text-muted">قارئ نشط</p>
      </div>
    </div>
  </aside>
);
```

---

## 3. Screen: Library (المكتبة)
*Refer to {{DATA:SCREEN:SCREEN_10}}*

```tsx
export const LibraryPage = () => (
  <main className="pr-72 pt-14 min-h-screen">
    {/* Hero: Continue Reading */}
    <section className="p-8">
      <div className="bg-[#8b7333] rounded-2xl p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs opacity-80 uppercase tracking-widest">استمر في القراءة</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">سورة الكهف</h2>
          <p className="font-verse text-2xl mb-8 leading-loose">﴿ وَقُلِ الْحَقُّ مِن رَّبِّكُمْ فَمَن شَاء فَلْيُؤْمِن وَمَن شَاء فَلْيَكْفُرْ ﴾</p>
          <div className="flex gap-4">
            <button className="bg-white text-[#8b7333] px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90">
              <span>متابعة القراءة</span>
              <span className="text-xl">←</span>
            </button>
            <div className="flex gap-2">
              <span className="bg-black/20 px-3 py-1 rounded text-xs">الجزء ١٥</span>
              <span className="bg-black/20 px-3 py-1 rounded text-xs">الآية ٢٩</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Surah Grid */}
    <section className="px-8 pb-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">فهرس السور</h3>
        <div className="flex gap-2">
          <button className="p-2 border border-warm-border rounded-lg"><Layers size={18} /></button>
          <button className="p-2 border border-warm-border rounded-lg"><Menu size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { id: 1, name: "الفاتحة", type: "مكية", ayahs: 7, start: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم" },
          { id: 2, name: "البقرة", type: "مدنية", ayahs: 286, start: "الم" },
          // ... more surahs
        ].map(surah => (
          <div key={surah.id} className="bg-surface border border-warm-border p-6 rounded-2xl hover:bg-surface-hover transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-text-muted">{surah.type} | {surah.ayahs} آيات</span>
              <span className="w-8 h-8 flex items-center justify-center bg-bg-secondary rounded-full text-xs font-bold group-hover:bg-accent group-hover:text-white transition-colors">
                {surah.id}
              </span>
            </div>
            <h4 className="text-xl font-bold mb-1">{surah.name}</h4>
            <p className="text-text-muted text-sm">{surah.start}</p>
          </div>
        ))}
      </div>
    </section>
  </main>
);
```

---

## 4. Screen: Reading Room (غرفة القراءة)
*Refer to {{DATA:SCREEN:SCREEN_5}}*

```tsx
export const ReadingRoom = () => (
  <main className="pr-72 pt-14 max-w-5xl mx-auto px-8 pb-20">
    <div className="py-12 text-center border-b border-warm-border mb-12">
      <div className="w-48 h-48 mx-auto mb-6 bg-surface shadow-sm rounded-xl overflow-hidden border border-warm-border flex items-center justify-center p-4">
        {/* Placeholder for Surah Calligraphy Image */}
        <div className="text-4xl text-primary font-bold">سورة الكهف</div>
      </div>
      <h2 className="text-4xl font-bold text-primary mb-2">سورة الكهف</h2>
      <p className="text-text-muted">مكية | ١١٠ آيات</p>
    </div>

    {/* Verse + Tafsir Block */}
    <article className="space-y-16">
      <section className="relative">
        <div className="bg-accent-light/30 border-r-4 border-accent p-8 rounded-xl mb-6">
          <p className="font-verse text-3xl text-right leading-[2.5] text-text-ink">
            ﴿ الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَى عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا ﴾
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-accent text-accent text-sm mr-4">١</span>
          </p>
        </div>
        <div className="max-w-3xl mr-auto">
          <span className="text-xs font-bold text-accent mb-2 block">في ظلال الآية</span>
          <p className="text-lg leading-relaxed text-text-secondary">
            تبدأ السورة بالحمد. وهو المطلع الذي يتناسب مع جو السورة التي تعرض نماذج من التوحيد والاستقامة. الكتاب هنا هو القرآن الكريم...
          </p>
        </div>
      </section>
      
      {/* ... subsequent verses ... */}
    </article>
    
    {/* Navigation Footer */}
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-primary text-white p-2 rounded-full shadow-xl">
      <button className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
        <span>السورة السابقة</span>
      </button>
      <button className="p-2 bg-accent rounded-full"><Bookmark size={20}/></button>
      <button className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors flex items-center gap-2">
        <span>السورة التالية</span>
      </button>
    </div>
  </main>
);
```