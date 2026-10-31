import React, { useState } from 'react';
import { Search, Compass, Sparkles, ArrowRight, BookOpen, Flame, Moon, Shield, Sun } from 'lucide-react';
import { PHILOSOPHERS } from '../data/philosophers';
import { QUOTE_CATEGORIES } from '../data/categories';
import { Philosopher } from '../types/quote';

interface ExploreSectionProps {
  onSelectThemeForGeneration: (params: { philosopherName: string; category: string; mode?: string }) => void;
  onSelectPhilosopher: (p: Philosopher) => void;
}

const CURATED_THEMES = [
  {
    title: 'Amor Fati: Embracing Necessity',
    subtitle: 'Stoic Fortress & Roman Resignation',
    description: 'Transforming adversity into fuel. A meditation on fate, cosmic duty, and unshakeable composure in the whirlwind.',
    philosopher: 'Marcus Aurelius',
    category: 'Discipline',
    mode: 'stoic',
    image: '/src/assets/images/ancient_stoic_temple_1793455283076.jpg',
    tag: 'Stoicism',
  },
  {
    title: 'The Will to Overcome',
    subtitle: 'Beyond Conformity & Herd Morality',
    description: 'Piercing the veil of comfortable mediocrity. How suffering can forge the noble spirit through supreme creative tension.',
    philosopher: 'Friedrich Nietzsche',
    category: 'Strength',
    mode: 'nietzsche',
    image: '/src/assets/images/quote_dark_academia_1793455282750.jpg',
    tag: 'Self-Transcendence',
  },
  {
    title: 'The Dao of Flow & Stillness',
    subtitle: 'Effortless Action in an Anxious Age',
    description: 'Yielding without breaking. Water cuts through stone not by violent force, but by persistent, patient softness.',
    philosopher: 'Lao Tzu',
    category: 'Spirituality',
    mode: 'ancient',
    image: '/src/assets/images/eastern_zen_mountain_1793455283050.jpg',
    tag: 'Eastern Wisdom',
  },
  {
    title: 'The Anatomy of Power & Illusion',
    subtitle: 'Discipline, Surveillance & Society',
    description: 'Unmasking the invisible architectures that govern modern minds, obedience, and collective illusions.',
    philosopher: 'Michel Foucault',
    category: 'Power',
    mode: 'dark',
    image: '/src/assets/images/quote_dark_academia_1793455282750.jpg',
    tag: 'Genealogy of Power',
  },
  {
    title: 'The Absurd Revolt',
    subtitle: 'Defiance in a Silent Universe',
    description: 'Finding invincible summer within the coldest winter. Creating lucid meaning without requiring metaphysical promises.',
    philosopher: 'Albert Camus',
    category: 'Existence',
    mode: 'existential',
    image: '/src/assets/images/ancient_stoic_temple_1793455283076.jpg',
    tag: 'Existentialism',
  },
  {
    title: 'The Altar of Unspoken Truth',
    subtitle: 'Psychological Vanity & Ego Deception',
    description: 'Why human beings deceive themselves before anyone else, and the tragic brilliance of human yearning.',
    philosopher: 'Arthur Schopenhauer',
    category: 'Human Psychology',
    mode: 'psychological',
    image: '/src/assets/images/eastern_zen_mountain_1793455283050.jpg',
    tag: 'Pessimism & Psychology',
  },
];

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  onSelectThemeForGeneration,
  onSelectPhilosopher,
}) => {
  const [globalSearch, setGlobalSearch] = useState('');

  const searchResults = globalSearch.trim()
    ? {
        philosophers: PHILOSOPHERS.filter(
          (p) =>
            p.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
            p.school.toLowerCase().includes(globalSearch.toLowerCase()) ||
            p.keyThemes.some((t) => t.toLowerCase().includes(globalSearch.toLowerCase()))
        ),
        categories: QUOTE_CATEGORIES.filter((c) =>
          c.toLowerCase().includes(globalSearch.toLowerCase())
        ),
      }
    : null;

  return (
    <div className="space-y-12">
      {/* Header & Global Search Bar */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          Intellectual Exploration
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-100 tracking-tight">
          Discovery & Philosophical Currents
        </h2>
        <p className="text-sm text-stone-400">
          Traverse curated intellectual territories or query philosophers, traditions, and existential themes.
        </p>

        {/* Search Bar */}
        <div className="relative mt-6 max-w-lg mx-auto">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search any philosopher, concept (e.g. Stoicism, Love, Power)..."
            className="w-full pl-10 pr-4 py-3 bg-stone-900 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors shadow-lg"
          />
        </div>
      </div>

      {/* Live Search Results if searching */}
      {searchResults && (
        <div className="p-6 rounded-2xl bg-[#111318] border border-amber-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <h3 className="text-sm font-semibold text-stone-200">
              Search Results for "{globalSearch}"
            </h3>
            <button
              onClick={() => setGlobalSearch('')}
              className="text-xs text-stone-400 hover:text-white"
            >
              Clear Search
            </button>
          </div>

          {/* Philosophers matched */}
          {searchResults.philosophers.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Philosophers ({searchResults.philosophers.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.philosophers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => onSelectPhilosopher(p)}
                    className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-amber-400 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-stone-200">{p.name}</p>
                      <p className="text-[11px] text-stone-400">{p.school}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories matched */}
          {searchResults.categories.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                Categories ({searchResults.categories.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {searchResults.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      onSelectThemeForGeneration({
                        philosopherName: 'Marcus Aurelius',
                        category: c,
                      })
                    }
                    className="px-3 py-1.5 bg-stone-900 hover:bg-amber-400 hover:text-stone-950 text-stone-300 text-xs rounded-lg border border-stone-800 transition-colors"
                  >
                    Generate for "{c}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchResults.philosophers.length === 0 && searchResults.categories.length === 0 && (
            <p className="text-xs text-stone-500 text-center py-4">
              No direct matches found. Try searching for "Nietzsche", "Stoic", "Wisdom", or "Death".
            </p>
          )}
        </div>
      )}

      {/* Curated Theme Showcase Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold text-stone-200">
          Featured Philosophical Territory
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURATED_THEMES.map((theme, idx) => (
            <div
              key={idx}
              className="group bg-[#111318] border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              {/* Card visual banner */}
              <div className="relative h-44 overflow-hidden bg-stone-900">
                <img
                  src={theme.image}
                  alt={theme.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-[#111318]/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-300 text-[11px] tracking-wider uppercase">
                    {theme.tag}
                  </span>
                  <span className="text-stone-300 text-[11px]">
                    Inspired by {theme.philosopher}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-semibold text-stone-100 group-hover:text-amber-200 transition-colors">
                    {theme.title}
                  </h4>
                  <p className="text-xs text-amber-400/80 font-medium mt-0.5">
                    {theme.subtitle}
                  </p>
                  <p className="text-xs text-stone-400 mt-2.5 leading-relaxed line-clamp-3">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Theme: <span className="text-stone-300">{theme.category}</span>
                  </span>
                  <button
                    onClick={() =>
                      onSelectThemeForGeneration({
                        philosopherName: theme.philosopher,
                        category: theme.category,
                        mode: theme.mode,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>Synthesize Quotes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
