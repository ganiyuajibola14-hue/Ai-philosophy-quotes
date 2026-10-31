import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Users,
  Compass,
  Heart,
  Calendar,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';

export type TabId = 'home' | 'generate' | 'philosophers' | 'explore' | 'favorites' | 'daily' | 'settings';

interface NavigationProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  favoritesCount: number;
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  currentTheme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'generate', label: 'Generate', icon: Wand2 },
    { id: 'philosophers', label: 'Philosophers', icon: Users },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'daily', label: 'Daily Quote', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: TabId) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Bar following Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Action) */}
      <header className="sticky top-0 z-40 bg-[#090a0d]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark in display face */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-stone-100 whitespace-nowrap shrink-0 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-stone-950 font-serif font-black text-sm flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              Ω
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-stone-100 group-hover:text-amber-300 transition-colors">
                QUOTEVERSE
              </span>
              <span className="text-[9px] font-mono tracking-widest text-stone-500 uppercase -mt-1">
                AI Philosophy
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-stone-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-stone-800 text-amber-300">
                      {favoritesCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-2 text-stone-400 hover:text-amber-300 hover:bg-stone-800/80 rounded-lg transition-colors hidden sm:flex"
              title={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {currentTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleNavClick('generate')}
              className="px-4 py-2 text-xs font-semibold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md transition-all active:scale-95 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 text-stone-950" />
              <span>Generate Quote</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-4 bg-[#0d0e12] border-b border-stone-800 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-800 text-amber-300">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between px-3 py-1 text-xs text-stone-400">
              <span>Theme: {currentTheme === 'dark' ? 'Obsidian' : 'Parchment'}</span>
              <button
                onClick={onToggleTheme}
                className="p-1.5 bg-stone-800 rounded text-amber-300"
              >
                {currentTheme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Clean Bottom Navigation Bar for Mobile Viewports */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#090a0d]/95 backdrop-blur-md border-t border-stone-800 py-1.5 px-3 flex items-center justify-around shadow-2xl">
        {[
          { id: 'home' as TabId, label: 'Home', icon: Compass },
          { id: 'generate' as TabId, label: 'Generate', icon: Wand2 },
          { id: 'philosophers' as TabId, label: 'Thinkers', icon: Users },
          { id: 'daily' as TabId, label: 'Daily', icon: Calendar },
          { id: 'favorites' as TabId, label: 'Saved', icon: Heart },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-lg transition-colors ${
                isActive ? 'text-amber-400 font-semibold' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
