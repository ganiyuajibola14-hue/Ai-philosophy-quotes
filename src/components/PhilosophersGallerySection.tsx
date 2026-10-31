import React, { useState, useMemo } from 'react';
import { Search, UserCheck, ArrowRight, Sparkles, BookOpen, Compass } from 'lucide-react';
import { PHILOSOPHERS } from '../data/philosophers';
import { Era, Philosopher } from '../types/quote';

interface PhilosophersGallerySectionProps {
  onSelectPhilosopherForQuotes: (philosopher: Philosopher) => void;
}

const ERAS: (Era | 'All')[] = [
  'All',
  'Ancient Philosophers',
  'Modern Philosophers',
  'Existentialist and Contemporary Thinkers',
  'Other Great Thinkers',
];

export const PhilosophersGallerySection: React.FC<PhilosophersGallerySectionProps> = ({
  onSelectPhilosopherForQuotes,
}) => {
  const [activeEra, setActiveEra] = useState<Era | 'All'>('All');
  const [search, setSearch] = useState('');
  const [selectedDetail, setSelectedDetail] = useState<Philosopher | null>(null);

  const filtered = useMemo(() => {
    return PHILOSOPHERS.filter((p) => {
      const matchEra = activeEra === 'All' || p.era === activeEra;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.school.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.keyThemes.some((t) => t.toLowerCase().includes(q));
      return matchEra && matchSearch;
    });
  }, [activeEra, search]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Pantheon of Thinkers
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 tracking-tight mt-1">
            Choose Your Philosopher (31 Thinkers)
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Explore 31 intellectual titans spanning three millennia. Select any thinker to generate original philosophical maxims inspired by their worldview.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search philosophers or schools..."
            className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Era Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-stone-900/80 border border-stone-800 rounded-xl overflow-x-auto">
        {ERAS.map((era) => (
          <button
            key={era}
            onClick={() => setActiveEra(era)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
              activeEra === era
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {era === 'All'
              ? 'All 31 Thinkers'
              : era === 'Ancient Philosophers'
              ? 'Ancient (9)'
              : era === 'Modern Philosophers'
              ? 'Modern (10)'
              : era === 'Existentialist and Contemporary Thinkers'
              ? 'Existentialist (5)'
              : 'Eastern & Islamic (7)'}
          </button>
        ))}
      </div>

      {/* Philosophers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((philosopher) => (
          <div
            key={philosopher.id}
            className="bg-[#111318] border border-stone-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg group"
          >
            <div>
              {/* Header with Avatar and dates */}
              <div className="flex items-start gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-full bg-stone-800 border border-stone-700 text-amber-300 font-serif font-bold text-base flex items-center justify-center shrink-0 group-hover:bg-amber-400 group-hover:text-stone-950 group-hover:border-amber-300 transition-colors">
                  {philosopher.initials}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-stone-100 group-hover:text-amber-200 transition-colors truncate">
                    {philosopher.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-400">
                    <span>{philosopher.dates}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400/90 font-medium truncate">{philosopher.school}</span>
                  </div>
                </div>
              </div>

              {/* Era Tag (clean unboxed text per zero-pill) */}
              <div className="text-[11px] text-stone-500 mb-2 font-mono uppercase tracking-wider">
                {philosopher.era}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                {philosopher.description}
              </p>

              {/* Key Themes */}
              <div className="mt-3 pt-2.5 border-t border-stone-800/80 text-[11px] text-stone-400 flex items-center gap-1.5 flex-wrap">
                <span className="text-stone-500 font-medium">Themes:</span>
                {philosopher.keyThemes.slice(0, 4).map((theme, i) => (
                  <span key={theme} className="text-stone-300">
                    {theme}
                    {i < Math.min(3, philosopher.keyThemes.length - 1) ? ' ·' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Select & Generate Button */}
            <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between">
              <button
                onClick={() => setSelectedDetail(philosopher)}
                className="text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                View Philosophy Details
              </button>

              <button
                onClick={() => onSelectPhilosopherForQuotes(philosopher)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 transition-colors active:scale-95 cursor-pointer"
              >
                <span>Synthesize Quotes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-xs text-stone-500">
          No philosophers found matching "{search}".
        </div>
      )}

      {/* Details Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111318] border border-stone-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 font-serif font-bold text-lg flex items-center justify-center">
                  {selectedDetail.initials}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-100">{selectedDetail.name}</h3>
                  <p className="text-xs text-amber-300">{selectedDetail.school} · {selectedDetail.dates}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded bg-stone-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs text-stone-300">
              <div>
                <h4 className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] mb-1">
                  Core Worldview & Philosophical Stance
                </h4>
                <p className="leading-relaxed">{selectedDetail.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] mb-1">
                  Aesthetic & Dialectic Style
                </h4>
                <p className="leading-relaxed text-stone-400">{selectedDetail.characteristicStyle}</p>
              </div>

              <div>
                <h4 className="font-semibold text-amber-400 uppercase tracking-wider text-[11px] mb-1">
                  Primary Themes
                </h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDetail.keyThemes.map((theme) => (
                    <span key={theme} className="px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-300">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-3 py-1.5 text-xs text-stone-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const p = selectedDetail;
                  setSelectedDetail(null);
                  onSelectPhilosopherForQuotes(p);
                }}
                className="px-4 py-1.5 text-xs font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300"
              >
                Select & Generate Quotes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
