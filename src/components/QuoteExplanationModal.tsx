import React, { useEffect, useState } from 'react';
import { X, BookOpen, Compass, Heart, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { Quote, QuoteExplanation } from '../types/quote';
import { explainQuote } from '../services/quoteService';

interface QuoteExplanationModalProps {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteExplanationModal: React.FC<QuoteExplanationModalProps> = ({ quote, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<QuoteExplanation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && quote) {
      let isMounted = true;
      setLoading(true);
      setError(null);
      setExplanation(null);

      explainQuote(quote.text, quote.philosopherName, quote.category)
        .then((data) => {
          if (isMounted) {
            setExplanation(data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(err.message || 'Unable to load philosophical explanation.');
            setLoading(false);
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [isOpen, quote]);

  if (!isOpen || !quote) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0f1115] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#14171d]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-semibold text-stone-100 uppercase tracking-wider">Philosophical Exegesis</h3>
              <p className="text-xs text-stone-400">Insight inspired by {quote.philosopherName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quote Block */}
          <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <p className="font-serif italic text-lg sm:text-xl text-stone-100 leading-relaxed">
              “{quote.text}”
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-400">
              <span className="font-medium text-amber-300">Inspired by {quote.philosopherName}</span>
              <span aria-hidden="true">·</span>
              <span>{quote.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[11px] font-mono text-stone-500">Google Gemma</span>
            </div>
          </div>

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-stone-400">
              <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              <p className="text-xs tracking-wider uppercase">Unpacking philosophical depths...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-950/40 border border-red-900 text-red-200 text-xs">
              <p className="font-semibold mb-1">Failed to load explanation</p>
              <p>{error}</p>
            </div>
          )}

          {explanation && (
            <div className="space-y-5">
              {/* Deeper Meaning */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>1. The Deeper Meaning</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed pl-6">
                  {explanation.deeperMeaning}
                </p>
              </div>

              {/* Philosophical Idea */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>2. Philosophical Foundation</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed pl-6">
                  {explanation.philosophicalIdea}
                </p>
              </div>

              {/* Human Experience */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span>3. The Human Experience</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed pl-6">
                  {explanation.humanExperience}
                </p>
              </div>

              {/* Practical Real-Life Interpretation */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>4. Practical Modern Application</span>
                </div>
                <p className="text-sm text-stone-300 leading-relaxed pl-6">
                  {explanation.practicalInterpretation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#14171d] border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors"
          >
            Close Insight
          </button>
        </div>
      </div>
    </div>
  );
};
