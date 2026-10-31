import React, { useState, useMemo } from 'react';
import {
  Heart,
  Search,
  Download,
  Trash2,
  Share2,
  Copy,
  Check,
  ImageIcon,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Quote } from '../types/quote';
import { clearAllFavorites } from '../services/quoteService';

interface FavoritesSectionProps {
  favorites: Quote[];
  onRemoveFavorite: (quoteId: string) => void;
  onClearAll: () => void;
  onOpenImageStudio: (quote: Quote) => void;
  onExplainQuote: (quote: Quote) => void;
  onNavigateToGenerator: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onOpenImageStudio,
  onExplainQuote,
  onNavigateToGenerator,
}) => {
  const [search, setSearch] = useState('');
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique philosophers and categories from saved favorites
  const uniquePhilosophers = useMemo(() => {
    const set = new Set(favorites.map((f) => f.philosopherName));
    return ['All', ...Array.from(set)];
  }, [favorites]);

  const uniqueCategories = useMemo(() => {
    const set = new Set(favorites.map((f) => f.category));
    return ['All', ...Array.from(set)];
  }, [favorites]);

  const filteredFavorites = useMemo(() => {
    return favorites.filter((quote) => {
      const matchesSearch =
        !search ||
        quote.text.toLowerCase().includes(search.toLowerCase()) ||
        quote.philosopherName.toLowerCase().includes(search.toLowerCase()) ||
        quote.category.toLowerCase().includes(search.toLowerCase());
      const matchesPhil = selectedPhilosopher === 'All' || quote.philosopherName === selectedPhilosopher;
      const matchesCat = selectedCategory === 'All' || quote.category === selectedCategory;
      return matchesSearch && matchesPhil && matchesCat;
    });
  }, [favorites, search, selectedPhilosopher, selectedCategory]);

  const handleCopy = async (quote: Quote) => {
    try {
      await navigator.clipboard.writeText(`“${quote.text}” — Inspired by ${quote.philosopherName}`);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(favorites, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `quoteverse-favorites-${new Date().toISOString().split('T')[0]}.json`);
    dlAnchorElem.click();
  };

  const handleExportTxt = () => {
    const textContent = favorites
      .map(
        (q, idx) =>
          `${idx + 1}. “${q.text}”\n   — Inspired by ${q.philosopherName} (${q.category})\n   Note: ${q.inspirationNote}\n`
      )
      .join('\n');
    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `quoteverse-favorites-${new Date().toISOString().split('T')[0]}.txt`);
    dlAnchorElem.click();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-800 pb-5">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
            Personal Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 tracking-tight mt-1">
            Saved Philosophical Maxims ({favorites.length})
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Your private repository of contemplation, preserved locally on this device.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export TXT</span>
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all saved quotes from your collection?')) {
                  onClearAll();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/80 text-rose-300 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="py-20 text-center bg-[#101216] border border-dashed border-stone-800 rounded-2xl p-8 space-y-4">
          <Heart className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="text-base font-semibold text-stone-300">Your collection is empty</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Whenever an AI-generated quote resonates with you, click the heart icon to save it here for future contemplation.
          </p>
          <button
            onClick={onNavigateToGenerator}
            className="px-4 py-2 text-xs font-semibold bg-amber-400 text-stone-950 rounded-lg hover:bg-amber-300 transition-colors"
          >
            Generate Quotes Now
          </button>
        </div>
      ) : (
        <>
          {/* Search and Filters Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search within saved quotes..."
                className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <select
                value={selectedPhilosopher}
                onChange={(e) => setSelectedPhilosopher(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                {uniquePhilosophers.map((phil) => (
                  <option key={phil} value={phil}>
                    Philosopher: {phil}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
              >
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    Theme: {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFavorites.map((quote) => (
              <div
                key={quote.id}
                className="bg-[#111318] border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-700 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-4">
                    <span className="font-medium text-amber-300">{quote.category}</span>
                    <span>Inspired by {quote.philosopherName}</span>
                  </div>

                  <blockquote className="font-serif italic text-lg sm:text-xl text-stone-100 leading-relaxed">
                    “{quote.text}”
                  </blockquote>

                  {quote.inspirationNote && (
                    <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-800/80">
                      {quote.inspirationNote}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onExplainQuote(quote)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-300 hover:text-amber-300 bg-stone-800/60 rounded-md"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Explain</span>
                    </button>
                    <button
                      onClick={() => onOpenImageStudio(quote)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-300 hover:text-amber-300 bg-stone-800/60 rounded-md"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Image</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(quote)}
                      className="p-1.5 text-stone-400 hover:text-stone-200 rounded hover:bg-stone-800"
                      title="Copy quote"
                    >
                      {copiedId === quote.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(quote.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-400 rounded hover:bg-stone-800"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFavorites.length === 0 && (
            <div className="py-12 text-center text-xs text-stone-500">
              No quotes match the current filters.
            </div>
          )}
        </>
      )}
    </div>
  );
};
