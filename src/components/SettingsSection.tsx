import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  ShieldCheck,
  Trash2,
  Cpu,
  Check,
  Info,
  Sparkles,
} from 'lucide-react';
import { PHILOSOPHERS } from '../data/philosophers';
import { QUOTE_CATEGORIES, TONES, LENGTH_TIERS } from '../data/categories';
import { UserSettings, getUserSettings, saveUserSettings } from '../services/quoteService';

interface SettingsSectionProps {
  onClearFavorites: () => void;
  favoritesCount: number;
  onThemeToggle: (theme: 'dark' | 'light') => void;
  currentTheme: 'dark' | 'light';
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  onClearFavorites,
  favoritesCount,
  onThemeToggle,
  currentTheme,
}) => {
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(getUserSettings());
  }, []);

  const handleUpdate = (patch: Partial<UserSettings>) => {
    const updated = saveUserSettings(patch);
    setSettings(updated);
    if (patch.theme) {
      onThemeToggle(patch.theme);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-5">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
          Preferences & Configuration
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-100 tracking-tight mt-1">
          Application Settings
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Customize your default philosophical perspective, theme, and AI engine parameters.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Preferences updated and saved locally.</span>
        </div>
      )}

      {/* Theme Settings */}
      <div className="bg-[#111318] border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-stone-200 flex items-center gap-2">
          <span>Appearance & Palette</span>
        </h3>
        <p className="text-xs text-stone-400">
          Switch between dark obsidian mode and warm archival parchment mode.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => handleUpdate({ theme: 'dark' })}
            className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
              currentTheme === 'dark'
                ? 'bg-amber-400/10 border-amber-400 text-stone-100'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Moon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium">Dark Obsidian (Default)</span>
            </div>
            {currentTheme === 'dark' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          <button
            onClick={() => handleUpdate({ theme: 'light' })}
            className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
              currentTheme === 'light'
                ? 'bg-amber-400/10 border-amber-400 text-stone-100'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-medium">Warm Parchment</span>
            </div>
            {currentTheme === 'light' && <Check className="w-3.5 h-3.5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Default Generation Presets */}
      <div className="bg-[#111318] border border-stone-800 rounded-2xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-stone-200">
          Default Generation Defaults
        </h3>
        <p className="text-xs text-stone-400">
          These presets will pre-populate the Generator whenever you launch the app.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Default Philosopher */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Default Philosopher
            </label>
            <select
              value={settings.defaultPhilosopherId}
              onChange={(e) => handleUpdate({ defaultPhilosopherId: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
            >
              {PHILOSOPHERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.school})
                </option>
              ))}
            </select>
          </div>

          {/* Default Category */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Default Category
            </label>
            <select
              value={settings.defaultCategory}
              onChange={(e) => handleUpdate({ defaultCategory: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
            >
              {QUOTE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Default Tone */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Default Tone
            </label>
            <select
              value={settings.defaultTone}
              onChange={(e) => handleUpdate({ defaultTone: e.target.value })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Default Length */}
          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1.5">
              Default Quote Length
            </label>
            <select
              value={settings.defaultLength}
              onChange={(e) => handleUpdate({ defaultLength: e.target.value as any })}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
            >
              {LENGTH_TIERS.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.label} ({tier.desc})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* AI Architecture & Engine Info */}
      <div className="bg-[#111318] border border-stone-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-200">
          <Cpu className="w-4 h-4 text-amber-400" />
          <span>AI Architecture & Engine</span>
        </div>
        <p className="text-xs text-stone-400 leading-relaxed">
          QUOTEVERSE operates via Google's official Gen AI SDK on the server proxy. The primary intelligence is powered by Google's Gemma 4 architecture with automatic fallback resilience.
        </p>

        <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-stone-800">
            <span className="text-stone-400">Primary Model Identifier</span>
            <span className="font-mono text-amber-300">gemini-3.8-flash (Gemma 4 Architecture)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-stone-800">
            <span className="text-stone-400">SDK Version</span>
            <span className="font-mono text-stone-300">@google/genai &gt;= 2.25.0</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-400">API Key Security</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Server-Side Isolated (Never in Browser)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Data Management & Favorites */}
      <div className="bg-[#111318] border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-stone-200">
          Storage & Personal Data
        </h3>
        <p className="text-xs text-stone-400">
          You currently have <strong className="text-stone-200">{favoritesCount} quote{favoritesCount !== 1 ? 's' : ''}</strong> saved in your device's local storage.
        </p>

        {favoritesCount > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Erase all saved quotes from your local collection? This cannot be undone.')) {
                onClearFavorites();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Purge All Saved Favorites</span>
          </button>
        )}
      </div>

      {/* About Application */}
      <div className="p-6 bg-stone-900/40 border border-stone-800/60 rounded-2xl text-xs text-stone-400 space-y-2">
        <div className="flex items-center gap-2 text-stone-200 font-semibold text-sm">
          <Info className="w-4 h-4 text-amber-400" />
          <span>About QUOTEVERSE</span>
        </div>
        <p className="leading-relaxed">
          QUOTEVERSE generates original, thought-provoking philosophical quotes inspired by the world's most enduring thinkers. All outputs are generated in the philosophical spirit of their respective authors without falsifying historical authorship.
        </p>
        <p className="text-stone-500 text-[11px] pt-2">
          QUOTEVERSE v2.0 · Designed for thinkers, creators, and modern seekers.
        </p>
      </div>
    </div>
  );
};
