"use client";

import Link from "next/link";

export default function Home() {
return ( <main className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-x-hidden">

```
  {/* NAVBAR */}
  <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

      <div className="flex items-center gap-2">
        <div className="size-8 bg-primary rounded flex items-center justify-center text-background-dark">
          <span className="material-symbols-outlined font-bold">query_stats</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Nutrio AI</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#how-it-works" className="hover:text-primary">How It Works</a>
        <a href="#features" className="hover:text-primary">Platform</a>
        <a href="#about" className="hover:text-primary">Company</a>
      </div>

      <div className="flex items-center gap-4">

        {/* EMAIL */}
        <a href="mailto:nitishkumar83411@gmail.com" className="text-sm font-semibold px-4 py-2 hover:text-primary">
          Email
        </a>

        {/* LINKEDIN */}
        <a href="https://www.linkedin.com/in/pnithishkumar2005/" target="_blank" className="text-sm font-semibold px-4 py-2 hover:text-primary">
          LinkedIn
        </a>

        {/* CTA */}
        <Link href="/analyze" className="bg-primary text-background-dark px-5 py-2 rounded-lg font-bold text-sm glow-primary">
          Get Started
        </Link>

      </div>
    </div>
  </nav>

  {/* HERO */}
  <section className="relative pt-32 pb-20 px-6 gradient-bg overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

      <div className="flex flex-col gap-8 z-10">
        <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight">
          Know Your <br />
          <span className="text-primary">Nutrients</span> Instantly
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-xl">
          Snap a photo of your meal and get instant macronutrient breakdown powered by AI.
        </p>

        <Link href="/analyze" className="bg-primary text-background-dark h-14 px-8 rounded-xl font-bold text-lg glow-primary flex items-center justify-center">
          Start Analyzing Your Meal
        </Link>
      </div>

      <div className="glass rounded-2xl p-4 border border-white/10">
        <img src="/healthy-meal-plate.png" className="rounded-xl" alt="Meal Preview"/>
      </div>

    </div>
  </section>

</main>
```

);
}
