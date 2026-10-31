import React, { useState, useEffect } from 'react';
import { Quote, Philosopher } from './types/quote';
import {
  getSavedFavorites,
  saveFavorite,
  removeFavorite,
  clearAllFavorites,
  getUserSettings,
  saveUserSettings,
} from './services/quoteService';
import { Navigation, TabId } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { GeneratorSection } from './components/GeneratorSection';
import { PhilosophersGallerySection } from './components/PhilosophersGallerySection';
import { DailyQuoteSection } from './components/DailyQuoteSection';
import { FavoritesSection } from './components/FavoritesSection';
import { ExploreSection } from './components/ExploreSection';
import { SettingsSection } from './components/SettingsSection';
import { QuoteImageModal } from './components/QuoteImageModal';
import { QuoteExplanationModal } from './components/QuoteExplanationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Generator pre-seeding states
  const [generatorPhilosopherId, setGeneratorPhilosopherId] = useState<string>('marcus-aurelius');
  const [generatorCategory, setGeneratorCategory] = useState<string>('Wisdom');

  // Modals
  const [imageModalQuote, setImageModalQuote] = useState<Quote | null>(null);
  const [explainModalQuote, setExplainModalQuote] = useState<Quote | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Initialize favorites and theme on mount
  useEffect(() => {
    const savedFavs = getSavedFavorites();
    setFavorites(savedFavs);

    const settings = getUserSettings();
    setTheme(settings.theme || 'dark');
    if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }

    if (settings.defaultPhilosopherId) {
      setGeneratorPhilosopherId(settings.defaultPhilosopherId);
    }
    if (settings.defaultCategory) {
      setGeneratorCategory(settings.defaultCategory);
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveUserSettings({ theme: nextTheme });
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const handleSetTheme = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    saveUserSettings({ theme: newTheme });
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const handleFavoriteToggle = (quote: Quote) => {
    const isAlready = favorites.some((f) => f.text === quote.text && f.philosopherName === quote.philosopherName);
    if (isAlready) {
      const match = favorites.find((f) => f.text === quote.text && f.philosopherName === quote.philosopherName);
      if (match) {
        const updated = removeFavorite(match.id);
        setFavorites(updated);
        showToast('Removed quote from favorites');
      }
    } else {
      const updated = saveFavorite(quote);
      setFavorites(updated);
      showToast('Saved quote to favorites');
    }
  };

  const handleRemoveFavorite = (quoteId: string) => {
    const updated = removeFavorite(quoteId);
    setFavorites(updated);
    showToast('Removed quote from favorites');
  };

  const handleClearAllFavorites = () => {
    clearAllFavorites();
    setFavorites([]);
    showToast('All saved favorites erased');
  };

  const handleSelectPhilosopherForQuotes = (philosopher: Philosopher) => {
    setGeneratorPhilosopherId(philosopher.id);
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Configured studio for ${philosopher.name}`);
  };

  const handleSelectThemeForGeneration = (params: { philosopherName: string; category: string; mode?: string }) => {
    setGeneratorCategory(params.category);
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Configured studio for theme: ${params.category}`);
  };

  const handleNavigateToGeneratorWithQuote = (quote: Quote) => {
    setGeneratorCategory(quote.category);
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 ${
      theme === 'dark' ? 'bg-[#090a0d] text-stone-100' : 'bg-[#faf7f2] text-stone-900'
    }`}>
      {/* Navigation Top Bar & Mobile Rails */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        favoritesCount={favorites.length}
        currentTheme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <HeroSection
              onStartGenerating={() => {
                setActiveTab('generate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectPhilosopher={handleSelectPhilosopherForQuotes}
              onExploreTheme={(cat) => {
                setGeneratorCategory(cat);
                setActiveTab('generate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenDailyQuote={() => {
                setActiveTab('daily');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Daily Quote Feature Highlight */}
            <DailyQuoteSection
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
              onOpenImageStudio={(q) => setImageModalQuote(q)}
              onExplainQuote={(q) => setExplainModalQuote(q)}
              onNavigateToGeneratorWithQuote={handleNavigateToGeneratorWithQuote}
            />

            {/* Quick Generator Jump */}
            <GeneratorSection
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
              onOpenImageStudio={(q) => setImageModalQuote(q)}
              onExplainQuote={(q) => setExplainModalQuote(q)}
              initialPhilosopherId={generatorPhilosopherId}
              initialCategory={generatorCategory}
            />
          </div>
        )}

        {activeTab === 'generate' && (
          <GeneratorSection
            key={`${generatorPhilosopherId}-${generatorCategory}`}
            onFavoriteToggle={handleFavoriteToggle}
            favorites={favorites}
            onOpenImageStudio={(q) => setImageModalQuote(q)}
            onExplainQuote={(q) => setExplainModalQuote(q)}
            initialPhilosopherId={generatorPhilosopherId}
            initialCategory={generatorCategory}
          />
        )}

        {activeTab === 'philosophers' && (
          <PhilosophersGallerySection
            onSelectPhilosopherForQuotes={handleSelectPhilosopherForQuotes}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreSection
            onSelectThemeForGeneration={handleSelectThemeForGeneration}
            onSelectPhilosopher={handleSelectPhilosopherForQuotes}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesSection
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onClearAll={handleClearAllFavorites}
            onOpenImageStudio={(q) => setImageModalQuote(q)}
            onExplainQuote={(q) => setExplainModalQuote(q)}
            onNavigateToGenerator={() => setActiveTab('generate')}
          />
        )}

        {activeTab === 'daily' && (
          <div className="space-y-8">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                Morning & Evening Ritual
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 mt-1">
                Daily Philosophical Reflection
              </h2>
            </div>
            <DailyQuoteSection
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
              onOpenImageStudio={(q) => setImageModalQuote(q)}
              onExplainQuote={(q) => setExplainModalQuote(q)}
              onNavigateToGeneratorWithQuote={handleNavigateToGeneratorWithQuote}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <SettingsSection
            onClearFavorites={handleClearAllFavorites}
            favoritesCount={favorites.length}
            onThemeToggle={handleSetTheme}
            currentTheme={theme}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Quote Image Studio Modal */}
      <QuoteImageModal
        isOpen={!!imageModalQuote}
        quote={imageModalQuote}
        onClose={() => setImageModalQuote(null)}
      />

      {/* Quote Explanation Modal */}
      <QuoteExplanationModal
        isOpen={!!explainModalQuote}
        quote={explainModalQuote}
        onClose={() => setExplainModalQuote(null)}
      />

      {/* Toast Notification Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 lg:bottom-8 right-6 z-50 bg-stone-900 border border-amber-400/60 text-amber-200 px-4 py-2.5 rounded-xl text-xs font-medium shadow-2xl animate-fade-in flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
