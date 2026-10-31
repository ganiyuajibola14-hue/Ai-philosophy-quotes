import React, { useState } from 'react';
import {
  Copy,
  Check,
  Share2,
  Heart,
  ImageIcon,
  RefreshCw,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { Quote } from '../types/quote';

interface QuoteCardProps {
  quote: Quote;
  onFavoriteToggle: (quote: Quote) => void;
  isFavorite: boolean;
  onOpenImageStudio: (quote: Quote) => void;
  onExplainQuote: (quote: Quote) => void;
  onGenerateLikeThis: (quote: Quote) => void;
  onRegenerateThis?: (quote: Quote) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onFavoriteToggle,
  isFavorite,
  onOpenImageStudio,
  onExplainQuote,
  onGenerateLikeThis,
  onRegenerateThis,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`“${quote.text}” — Inspired by ${quote.philosopherName} | QUOTEVERSE`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy quote:', e);
    }
  };

  const handleShare = async () => {
    const shareText = `“${quote.text}”\n— Inspired by ${quote.philosopherName} (${quote.category})\nGenerated on QUOTEVERSE`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quote inspired by ${quote.philosopherName}`,
          text: shareText,
          url: window.location.href,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative group bg-stone-900/60 dark:bg-[#111318] border border-stone-800 hover:border-amber-500/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-amber-500/5">
      {/* Top Metadata Line (Unboxed, clean typographic separators per zero-pill constitution) */}
      <div className="flex items-center justify-between text-xs text-stone-400 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-amber-300/90 tracking-wide">{quote.category}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>{quote.tone}</span>
          {quote.philosopherSchool && (
            <>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-stone-500">{quote.philosopherSchool}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400/80" />
          <span>Gemma AI</span>
        </div>
      </div>

      {/* Main Quote Text */}
      <div className="my-2">
        <blockquote className="font-serif italic text-xl sm:text-2xl text-stone-100 leading-relaxed tracking-normal">
          “{quote.text}”
        </blockquote>

        {/* Clear Inspiration Attribution */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-amber-200">
              Inspired by {quote.philosopherName}
            </p>
            <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
              {quote.inspirationNote}
            </p>
          </div>
        </div>
      </div>

      {/* Functional Action Buttons */}
      <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-2 flex-wrap">
        {/* Left: Deep Insight & Image Studio */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onExplainQuote(quote)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800/60 hover:bg-stone-800 hover:text-amber-300 transition-colors"
            title="Explain the philosophical meaning of this quote"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Explain</span>
          </button>

          <button
            onClick={() => onOpenImageStudio(quote)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-300 bg-stone-800/60 hover:bg-stone-800 hover:text-amber-300 transition-colors"
            title="Create shareable high-res quote image"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Create Image</span>
          </button>

          <button
            onClick={() => onGenerateLikeThis(quote)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-800/40 hover:bg-stone-800 transition-colors"
            title="Generate more quotes like this"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">More Like This</span>
          </button>
        </div>

        {/* Right: Quick Utility Icons */}
        <div className="flex items-center gap-1">
          {onRegenerateThis && (
            <button
              onClick={() => onRegenerateThis(quote)}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
              title="Regenerate this quote"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleCopy}
            className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800 rounded-lg transition-colors"
            title="Copy quote to clipboard"
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
            onClick={() => onFavoriteToggle(quote)}
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
    </div>
  );
};
