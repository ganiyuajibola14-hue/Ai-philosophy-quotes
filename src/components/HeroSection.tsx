import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Compass, Shield, Flame, Wand2 } from 'lucide-react';
import { PHILOSOPHERS } from '../data/philosophers';
import { Philosopher } from '../types/quote';

interface HeroSectionProps {
  onStartGenerating: () => void;
  onSelectPhilosopher: (p: Philosopher) => void;
  onExploreTheme: (category: string) => void;
  onOpenDailyQuote: () => void;
}

const POPULAR_THINKERS_PREVIEW = [
  'marcus-aurelius',
  'nietzsche',
  'socrates',
  'lao-tzu',
  'camus',
  'schopenhauer',
];

const POPULAR_CATEGORIES = [
  'Wisdom',
  'Power',
  'Human Nature',
  'Existence',
  'Truth',
  'Freedom',
  'Discipline',
  'Time',
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartGenerating,
  onSelectPhilosopher,
  onExploreTheme,
  onOpenDailyQuote,
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Marquee Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Headline Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Intelligent Philosophical Generator</span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span className="text-stone-400">Powered by Google Gemma 4</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-100 tracking-tight leading-[1.08] text-balance">
            Words that challenge the mind. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              Ideas that reshape reality.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 font-serif leading-relaxed max-w-xl">
            Synthesize original philosophical observations inspired by the intellectual approach, worldviews, and profound rhetorical styles of 31 iconic thinkers across three millennia.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartGenerating}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/10 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-stone-950" />
              <span>Generate Quote Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenDailyQuote}
              className="px-5 py-3.5 rounded-xl text-sm font-medium text-stone-200 hover:text-white bg-stone-900/90 hover:bg-stone-800 border border-stone-800 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Read Daily Reflection</span>
            </button>
          </div>

          {/* Quiet Trust / Architectural Note */}
          <div className="pt-3 flex items-center gap-4 text-xs text-stone-500">
            <span>31 Global Philosophers</span>
            <span aria-hidden="true">·</span>
            <span>32 Categorical Themes</span>
            <span aria-hidden="true">·</span>
            <span>Built-in Image Studio</span>
          </div>
        </div>

        {/* Right Hero Visual Banner */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-900 group">
            <img
              src="/src/assets/images/hero_philosophical_bust_1793455282427.jpg"
              alt="Antique classical philosopher bust in dramatic lighting"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 lg:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-black/30 to-transparent" />

            {/* Overlaid Philosophical Maxim Teaser */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                Philosophical Axiom
              </span>
              <p className="font-serif italic text-sm text-stone-200 leading-snug">
                “You have power over your mind, not outside events. Realize this, and you will find fortitude.”
              </p>
              <p className="text-[11px] text-stone-400 mt-2 font-medium">
                Inspired by Marcus Aurelius · Roman Stoicism
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Thinkers Quick Selector Strip */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Featured Intellects
          </span>
          <button
            onClick={onStartGenerating}
            className="text-xs text-stone-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>View All 31 Thinkers</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_THINKERS_PREVIEW.map((id) => {
            const p = PHILOSOPHERS.find((phil) => phil.id === id);
            if (!p) return null;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPhilosopher(p)}
                className="p-3.5 rounded-xl bg-stone-900/60 hover:bg-stone-900 border border-stone-800 hover:border-amber-400 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-stone-800 group-hover:bg-amber-400 group-hover:text-stone-950 text-amber-300 font-serif font-bold text-xs flex items-center justify-center mb-2 transition-colors">
                    {p.initials}
                  </div>
                  <h4 className="text-xs font-semibold text-stone-200 group-hover:text-amber-200 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 truncate mt-0.5">{p.school}</p>
                </div>
                <div className="mt-2 text-[10px] text-amber-400/80 font-medium flex items-center gap-1">
                  <span>Synthesize</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Themes Selector Strip */}
      <div className="space-y-3 pt-2">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono block">
          Frequent Philosophical Themes
        </span>

        <div className="flex flex-wrap gap-2">
          {POPULAR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onExploreTheme(cat)}
              className="px-3.5 py-1.5 text-xs rounded-lg bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* What is QUOTEVERSE Explanation Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121419] to-[#0c0d10] border border-stone-800/90 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-stone-200">Authentic Philosophical Depth</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Unlike surface-level quote generators, QUOTEVERSE grounds every generation in authentic historical schools: Stoicism, Existentialism, Rationalism, and Eastern thought.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-stone-200">Google Gemma 4 AI Architecture</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Harnesses advanced language reasoning to craft completely original maxims that avoid repetitive cliches while mirroring dialectic nuances.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-semibold text-stone-200">Quote Studio & Visual Creator</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Export generated quotes directly into high-resolution visual cards formatted for Instagram, WhatsApp, or personal archival collections.
          </p>
        </div>
      </div>
    </div>
  );
};
