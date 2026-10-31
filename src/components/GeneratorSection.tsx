import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Layers,
  Wand2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
  Check,
  Flame,
  Scale,
  Brain,
  Shield,
  Moon,
  Compass,
  PenTool,
} from 'lucide-react';
import {
  Philosopher,
  Quote,
  QuoteLength,
  QuoteComplexity,
  SpecialMode,
  Tone,
} from '../types/quote';
import { PHILOSOPHERS } from '../data/philosophers';
import {
  QUOTE_CATEGORIES,
  TONES,
  LENGTH_TIERS,
  COMPLEXITIES,
  SPECIAL_MODES,
} from '../data/categories';
import { generateQuotes } from '../services/quoteService';
import { QuoteCard } from './QuoteCard';
import { PhilosopherSelector } from './PhilosopherSelector';

interface GeneratorSectionProps {
  onFavoriteToggle: (quote: Quote) => void;
  favorites: Quote[];
  onOpenImageStudio: (quote: Quote) => void;
  onExplainQuote: (quote: Quote) => void;
  initialPhilosopherId?: string;
  initialCategory?: string;
}

export const GeneratorSection: React.FC<GeneratorSectionProps> = ({
  onFavoriteToggle,
  favorites,
  onOpenImageStudio,
  onExplainQuote,
  initialPhilosopherId = 'marcus-aurelius',
  initialCategory = 'Wisdom',
}) => {
  // Selected configuration states
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<Philosopher>(
    PHILOSOPHERS.find((p) => p.id === initialPhilosopherId) || PHILOSOPHERS[0]
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([initialCategory]);
  const [tone, setTone] = useState<Tone>('Deep');
  const [lengthTier, setLengthTier] = useState<QuoteLength>('Medium');
  const [complexity, setComplexity] = useState<QuoteComplexity>('Thought-provoking');
  const [quantity, setQuantity] = useState<number>(3);
  const [mode, setMode] = useState<SpecialMode>('standard');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  // UI view states
  const [showPhilosopherPicker, setShowPhilosopherPicker] = useState<boolean>(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);

  // Generation execution states
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedQuotes, setGeneratedQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.8-flash');

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(cat)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((c) => c !== cat);
      } else {
        if (prev.length >= 4) {
          // Allow max 4 categories at once
          return [...prev.slice(1), cat];
        }
        return [...prev, cat];
      }
    });
  };

  const handleSelectSpecialMode = (selectedMode: SpecialMode) => {
    setMode(selectedMode);
    if (selectedMode !== 'standard' && selectedMode !== 'custom') {
      const modeDef = SPECIAL_MODES.find((m) => m.id === selectedMode);
      if (modeDef && modeDef.defaultPhilosophers.length > 0) {
        const found = PHILOSOPHERS.find((p) => p.name === modeDef.defaultPhilosophers[0]);
        if (found) {
          setSelectedPhilosopher(found);
        }
      }
      if (modeDef && modeDef.suggestedTones.length > 0) {
        setTone(modeDef.suggestedTones[0]);
      }
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateQuotes({
        philosopherId: selectedPhilosopher.id,
        philosopherName: selectedPhilosopher.name,
        categories: selectedCategories,
        tone: tone,
        length: lengthTier,
        complexity: complexity,
        quantity: quantity,
        mode: mode,
        customPrompt: mode === 'custom' ? customPrompt : undefined,
      });

      setGeneratedQuotes(result.quotes);
      setModelUsed(result.modelUsed);
    } catch (err: any) {
      setError(err.message || 'Failed to generate quotes. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLikeThis = (quote: Quote) => {
    const phil = PHILOSOPHERS.find((p) => p.name === quote.philosopherName);
    if (phil) {
      setSelectedPhilosopher(phil);
    }
    if (quote.category) {
      setSelectedCategories([quote.category]);
    }
    handleGenerate();
  };

  const handleRegenerateSingle = async (quote: Quote) => {
    try {
      const res = await generateQuotes({
        philosopherId: selectedPhilosopher.id,
        philosopherName: quote.philosopherName,
        categories: [quote.category],
        tone: quote.tone as Tone,
        length: quote.lengthTier,
        complexity: quote.complexity,
        quantity: 1,
        mode: mode,
      });
      if (res.quotes.length > 0) {
        setGeneratedQuotes((prev) =>
          prev.map((q) => (q.id === quote.id ? res.quotes[0] : q))
        );
      }
    } catch (err: any) {
      console.error('Failed to regenerate single quote:', err);
    }
  };

  return (
    <section id="generator-section" className="space-y-10">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Philosophical Synthesis
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 tracking-tight mt-1">
            Quote Studio & Generator
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
            Synthesize unique philosophical maxims inspired by great thinkers, calibrated by theme, tone, and cognitive depth.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400 self-start sm:self-auto bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Active Engine:</span>
          <span className="font-mono text-amber-300 font-medium">{modelUsed}</span>
        </div>
      </div>

      {/* Special Generation Modes Strip */}
      <div>
        <label className="text-xs font-semibold tracking-wider uppercase text-stone-300 block mb-2.5">
          Special Generation Modes
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {/* Standard Mode */}
          <button
            onClick={() => handleSelectSpecialMode('standard')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              mode === 'standard'
                ? 'bg-amber-500/15 border-amber-400 text-stone-100 shadow-sm'
                : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Compass className="w-4 h-4 mb-1.5 text-amber-400" />
            <div className="text-xs font-semibold">Standard</div>
            <div className="text-[10px] text-stone-500 truncate">Classic thinker</div>
          </button>

          {SPECIAL_MODES.map((m) => {
            const isSelected = mode === m.id;
            let ModeIcon = Sparkles;
            if (m.id === 'stoic') ModeIcon = Shield;
            if (m.id === 'nietzsche') ModeIcon = Flame;
            if (m.id === 'existential') ModeIcon = Compass;
            if (m.id === 'dark') ModeIcon = Moon;
            if (m.id === 'ancient') ModeIcon = Scale;
            if (m.id === 'psychological') ModeIcon = Brain;
            if (m.id === 'custom') ModeIcon = PenTool;

            return (
              <button
                key={m.id}
                onClick={() => handleSelectSpecialMode(m.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-stone-100 shadow-sm'
                    : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                <ModeIcon className="w-4 h-4 mb-1.5 text-amber-400" />
                <div className="text-xs font-semibold truncate">{m.name.replace(' Mode', '')}</div>
                <div className="text-[10px] text-stone-500 truncate">{m.tagline.split('&')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Mode Directive Input if Custom selected */}
      {mode === 'custom' && (
        <div className="p-4 rounded-xl bg-stone-900/70 border border-amber-500/30 space-y-2">
          <label className="text-xs font-semibold text-amber-300 block">
            Custom Prompt Directive:
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Describe what kind of quote you want... e.g., 'A paradoxical quote about how ambition creates its own prison, but with a quiet acceptance of mortality.'"
            rows={2}
            className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      )}

      {/* Main Configuration Card */}
      <div className="bg-[#101216] border border-stone-800/90 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
        {/* Step 1: Active Philosopher Display & Trigger */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold tracking-wider uppercase text-amber-400">
              1. Inspiring Philosopher
            </label>
            <button
              onClick={() => setShowPhilosopherPicker(!showPhilosopherPicker)}
              className="text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>{showPhilosopherPicker ? 'Hide Philosopher Grid' : 'Browse All 31 Philosophers'}</span>
              {showPhilosopherPicker ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Active Philosopher Card */}
          <div className="p-4 rounded-xl bg-stone-900/80 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 font-serif font-bold text-base flex items-center justify-center shrink-0 border border-amber-300 shadow-sm">
                {selectedPhilosopher.initials}
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-100 flex items-center gap-2">
                  <span>{selectedPhilosopher.name}</span>
                  <span className="text-xs font-normal text-stone-400">({selectedPhilosopher.dates})</span>
                </h3>
                <p className="text-xs text-amber-300/80 font-medium">
                  {selectedPhilosopher.school} · <span className="text-stone-400">{selectedPhilosopher.era}</span>
                </p>
                <p className="text-xs text-stone-400 mt-1 max-w-xl line-clamp-1">
                  {selectedPhilosopher.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPhilosopherPicker(!showPhilosopherPicker)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors whitespace-nowrap self-end sm:self-center"
            >
              Change Thinker
            </button>
          </div>

          {/* Expandable Philosopher Picker */}
          {showPhilosopherPicker && (
            <div className="mt-4 p-4 rounded-xl bg-stone-950/70 border border-stone-800">
              <PhilosopherSelector
                compact
                selectedPhilosopherId={selectedPhilosopher.id}
                onSelectPhilosopher={(p) => {
                  setSelectedPhilosopher(p);
                  setShowPhilosopherPicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Step 2: Categories Multi-Select */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold tracking-wider uppercase text-amber-400">
              2. Philosophical Themes & Categories ({selectedCategories.length} selected)
            </label>
            <span className="text-[11px] text-stone-400">Pick 1 to 4 topics</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto p-1">
            {QUOTE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all border ${
                    isSelected
                      ? 'bg-amber-400 text-stone-950 font-semibold border-amber-300 shadow-sm'
                      : 'bg-stone-900/60 hover:bg-stone-900 text-stone-400 hover:text-stone-200 border-stone-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Tone, Length, Complexity & Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tone Selector */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Intellectual Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400 transition-colors"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Length Selector */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Target Length
            </label>
            <div className="grid grid-cols-3 gap-1">
              {LENGTH_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setLengthTier(tier.id)}
                  className={`py-2 text-xs rounded-lg border transition-colors ${
                    lengthTier === tier.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Complexity Selector */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Cognitive Complexity
            </label>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value as QuoteComplexity)}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400 transition-colors"
            >
              {COMPLEXITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Number of Quotes
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[1, 3, 5, 10].map((qty) => (
                <button
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  className={`py-2 text-xs rounded-lg border font-mono transition-colors ${
                    quantity === qty
                      ? 'bg-amber-400 text-stone-950 font-bold border-amber-300'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Primary Button */}
        <div className="pt-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                <span>Consulting {selectedPhilosopher.name} via Gemma 4...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-stone-950" />
                <span>
                  Generate {quantity} Philosophical Quote{quantity > 1 ? 's' : ''} (Gemma 4)
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-900 text-red-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-red-100">Generation Error</h4>
            <p className="mt-0.5">{error}</p>
            <button
              onClick={handleGenerate}
              className="mt-2 px-3 py-1 bg-red-900/60 hover:bg-red-900 rounded text-xs text-white font-medium"
            >
              Retry Request
            </button>
          </div>
        </div>
      )}

      {/* Generated Quotes Grid */}
      {generatedQuotes.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-lg font-display font-semibold text-stone-100">
                Generated Philosophical Thoughts ({generatedQuotes.length})
              </h3>
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Regenerate All</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {generatedQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onFavoriteToggle={onFavoriteToggle}
                isFavorite={favorites.some((f) => f.text === quote.text && f.philosopherName === quote.philosopherName)}
                onOpenImageStudio={onOpenImageStudio}
                onExplainQuote={onExplainQuote}
                onGenerateLikeThis={handleGenerateLikeThis}
                onRegenerateThis={handleRegenerateSingle}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
