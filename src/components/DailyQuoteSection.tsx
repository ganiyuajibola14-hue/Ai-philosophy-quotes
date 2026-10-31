import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Share2,
  Heart,
  ImageIcon,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { Quote } from '../types/quote';
import { fetchDailyQuote } from '../services/quoteService';

interface DailyQuoteSectionProps {
  onFavoriteToggle: (quote: Quote) => void;
  favorites: Quote[];
  onOpenImageStudio: (quote: Quote) => void;
  onExplainQuote: (quote: Quote) => void;
  onNavigateToGeneratorWithQuote: (quote: Quote) => void;
}

export const DailyQuoteSection: React.FC<DailyQuoteSectionProps> = ({
  onFavoriteToggle,
  favorites,
  onOpenImageStudio,
  onExplainQuote,
  onNavigateToGeneratorWithQuote,
}) => {
  const [dailyData, setDailyData] = useState<{
    id: string;
    date: string;
    text: string;
    philosopherName: string;
    school: string;
    category: string;
    meaning: string;
    modelUsed: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const loadDailyQuote = async (refresh = false) => {
    setLoading(true);
    try {
      const data = await fetchDailyQuote(refresh);
      setDailyData(data);
    } catch (err) {
      console.error('Failed to load daily quote:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDailyQuote(false);
  }, []);

  const currentQuoteObj: Quote | null = dailyData
    ? {
        id: dailyData.id,
        text: dailyData.text,
        philosopherName: dailyData.philosopherName,
        philosopherSchool: dailyData.school,
        category: dailyData.category,
        tone: 'Deep',
        lengthTier: 'Medium',
        complexity: 'Thought-provoking',
        inspirationNote: dailyData.meaning,
        modelUsed: dailyData.modelUsed,
        createdAt: dailyData.date,
      }
    : null;

  const isFavorite = currentQuoteObj
    ? favorites.some((f) => f.text === currentQuoteObj.text && f.philosopherName === currentQuoteObj.philosopherName)
    : false;

  const handleCopy = async () => {
    if (!currentQuoteObj) return;
    try {
      await navigator.clipboard.writeText(
        `“${currentQuoteObj.text}” — Inspired by ${currentQuoteObj.philosopherName} | QUOTEVERSE Daily`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleShare = async () => {
    if (!currentQuoteObj) return;
    const text = `“${currentQuoteObj.text}”\n— Inspired by ${currentQuoteObj.philosopherName} (${currentQuoteObj.category})\nQUOTEVERSE Daily Philosophical Maxim`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Quote: Inspired by ${currentQuoteObj.philosopherName}`,
          text,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (e) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="bg-[#121419] border border-amber-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              Daily Contemplation
            </div>
            <h3 className="text-lg font-display font-bold text-stone-100">
              Today's Philosophical Maxim
            </h3>
          </div>
        </div>

        <button
          onClick={() => loadDailyQuote(true)}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-300 hover:text-amber-300 bg-stone-900 border border-stone-800 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          <span>Generate Another Daily Quote</span>
        </button>
      </div>

      {/* Quote Display Area */}
      <div className="py-8">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <p className="text-xs font-mono tracking-widest uppercase">Consulting Gemma 4 Engine...</p>
          </div>
        ) : dailyData ? (
          <div className="space-y-6">
            {/* Meta tags */}
            <div className="flex items-center gap-2 text-xs text-stone-400 flex-wrap">
              <span className="font-semibold text-amber-400">{dailyData.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">Inspired by {dailyData.philosopherName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-500">{dailyData.school}</span>
            </div>

            {/* Quote Body */}
            <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-stone-100 leading-snug tracking-normal max-w-4xl">
              “{dailyData.text}”
            </blockquote>

            {/* Meaning Reflection */}
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 max-w-3xl">
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                <span className="font-semibold text-amber-300 mr-2">Contemplative Reflection:</span>
                {dailyData.meaning}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-stone-500">
            Click above to generate today's philosophical reflection.
          </div>
        )}
      </div>

      {/* Actions */}
      {currentQuoteObj && !loading && (
        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onExplainQuote(currentQuoteObj)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 hover:text-amber-300 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Explain Meaning</span>
            </button>

            <button
              onClick={() => onOpenImageStudio(currentQuoteObj)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 hover:text-amber-300 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Create Quote Image</span>
            </button>

            <button
              onClick={() => onNavigateToGeneratorWithQuote(currentQuoteObj)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-800/40 hover:bg-stone-800 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Synthesize Similar</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
              title="Copy quote"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
              title="Share quote"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onFavoriteToggle(currentQuoteObj)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
                  : 'text-stone-400 hover:text-rose-400 hover:bg-stone-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
