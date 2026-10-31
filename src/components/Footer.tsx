import React from 'react';
import { TabId } from './Navigation';

interface FooterProps {
  onSelectTab: (tab: TabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-stone-800/80 bg-[#07080a] text-stone-400 text-xs py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-800/60 pb-8">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-amber-400 text-stone-950 font-serif font-black text-xs flex items-center justify-center">
                Ω
              </span>
              <span className="font-display font-bold text-sm tracking-wider text-stone-200">
                QUOTEVERSE
              </span>
            </div>
            <p className="font-serif italic text-stone-300 text-xs">
              “Words that challenge the mind. Ideas that reshape reality.”
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap text-stone-400">
            <button
              onClick={() => onSelectTab('home')}
              className="hover:text-amber-300 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('generate')}
              className="hover:text-amber-300 transition-colors"
            >
              Generate Quotes
            </button>
            <button
              onClick={() => onSelectTab('philosophers')}
              className="hover:text-amber-300 transition-colors"
            >
              31 Philosophers
            </button>
            <button
              onClick={() => onSelectTab('daily')}
              className="hover:text-amber-300 transition-colors"
            >
              Daily Maxim
            </button>
            <button
              onClick={() => onSelectTab('favorites')}
              className="hover:text-amber-300 transition-colors"
            >
              Saved Collection
            </button>
            <button
              onClick={() => onSelectTab('settings')}
              className="hover:text-amber-300 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        {/* Legal & Intellectual Attribution Statement */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-500 text-[11px] leading-relaxed">
          <p>
            Philosophical quotes generated on QUOTEVERSE are original creations synthesized in the intellectual spirit and worldview of historical thinkers via Google Gemma 4. They are not direct verbatim historical quotes.
          </p>
          <p className="whitespace-nowrap shrink-0">
            © {new Date().getFullYear()} QUOTEVERSE · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
