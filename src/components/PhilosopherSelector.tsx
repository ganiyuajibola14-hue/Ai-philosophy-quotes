import React, { useState, useMemo } from 'react';
import { Search, UserCheck, Sparkles, Compass } from 'lucide-react';
import { PHILOSOPHERS } from '../data/philosophers';
import { Era, Philosopher } from '../types/quote';

interface PhilosopherSelectorProps {
  selectedPhilosopherId: string;
  onSelectPhilosopher: (philosopher: Philosopher) => void;
  compact?: boolean;
}

const ERAS: (Era | 'All')[] = [
  'All',
  'Ancient Philosophers',
  'Modern Philosophers',
  'Existentialist and Contemporary Thinkers',
  'Other Great Thinkers',
];

export const PhilosopherSelector: React.FC<PhilosopherSelectorProps> = ({
  selectedPhilosopherId,
  onSelectPhilosopher,
  compact = false,
}) => {
  const [activeEra, setActiveEra] = useState<Era | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhilosophers = useMemo(() => {
    return PHILOSOPHERS.filter((p) => {
      const matchesEra = activeEra === 'All' || p.era === activeEra;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keyThemes.some((t) => t.toLowerCase().includes(q));
      return matchesEra && matchesSearch;
    });
  }, [activeEra, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Search and Era Tabs */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 31 philosophers, schools, or themes..."
            className="w-full pl-9 pr-4 py-2 bg-stone-900/80 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300"
            >
              Clear
            </button>
          )}
        </div>

        {/* Era Tabs (Functional interactive tabs per design constitution) */}
        <div className="flex items-center gap-1 p-1 bg-stone-900/80 border border-stone-800 rounded-lg overflow-x-auto">
          {ERAS.map((era) => (
            <button
              key={era}
              onClick={() => setActiveEra(era)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                activeEra === era
                  ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {era === 'All'
                ? 'All (31)'
                : era === 'Ancient Philosophers'
                ? 'Ancient'
                : era === 'Modern Philosophers'
                ? 'Modern'
                : era === 'Existentialist and Contemporary Thinkers'
                ? 'Existentialist'
                : 'Eastern & Islamic'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Philosophers */}
      <div
        className={`grid gap-3 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-h-[380px] overflow-y-auto pr-1'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredPhilosophers.map((philosopher) => {
          const isSelected = selectedPhilosopherId === philosopher.id;
          return (
            <div
              key={philosopher.id}
              onClick={() => onSelectPhilosopher(philosopher)}
              className={`cursor-pointer rounded-xl p-4 border transition-all text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                  : 'bg-stone-900/50 hover:bg-stone-900/80 border-stone-800/90 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    {/* Elegant Avatar with Initials */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-sm font-bold tracking-wider shrink-0 border ${
                        isSelected
                          ? 'bg-amber-400 text-stone-950 border-amber-300'
                          : 'bg-stone-800 text-amber-300/90 border-stone-700'
                      }`}
                    >
                      {philosopher.initials}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-stone-100 tracking-tight flex items-center gap-1.5">
                        {philosopher.name}
                        {isSelected && <UserCheck className="w-3.5 h-3.5 text-amber-400" />}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <span>{philosopher.dates}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-400/80 truncate max-w-[140px]">{philosopher.school}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mt-1">
                  {philosopher.description}
                </p>
              </div>

              {/* Bottom Key Themes & Select Button */}
              <div className="mt-3 pt-2.5 border-t border-stone-800/70 flex items-center justify-between gap-2">
                <div className="text-[11px] text-stone-500 truncate">
                  <span>Themes: </span>
                  <span className="text-stone-400">{philosopher.keyThemes.slice(0, 3).join(', ')}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPhilosopher(philosopher);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPhilosophers.length === 0 && (
        <div className="py-8 text-center text-xs text-stone-500">
          No philosophers matching "{searchQuery}" in {activeEra}.
        </div>
      )}
    </div>
  );
};
