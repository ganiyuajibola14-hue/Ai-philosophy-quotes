import { Quote, QuoteExplanation, QuoteGenerationParams } from '../types/quote';

const FAVORITES_KEY = 'quoteverse_saved_favorites_v1';
const SETTINGS_KEY = 'quoteverse_user_settings_v1';

export interface UserSettings {
  theme: 'dark' | 'light';
  defaultPhilosopherId: string;
  defaultCategory: string;
  defaultTone: string;
  defaultLength: 'Short' | 'Medium' | 'Long';
}

export const defaultSettings: UserSettings = {
  theme: 'dark',
  defaultPhilosopherId: 'marcus-aurelius',
  defaultCategory: 'Wisdom',
  defaultTone: 'Deep',
  defaultLength: 'Medium',
};

// Local storage favorites helper
export function getSavedFavorites(): Quote[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading favorites:', e);
    return [];
  }
}

export function saveFavorite(quote: Quote): Quote[] {
  try {
    const current = getSavedFavorites();
    if (!current.some((q) => q.id === quote.id || (q.text === quote.text && q.philosopherName === quote.philosopherName))) {
      const updated = [{ ...quote, isFavorite: true }, ...current];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (e) {
    console.error('Error saving favorite:', e);
    return getSavedFavorites();
  }
}

export function removeFavorite(quoteId: string): Quote[] {
  try {
    const current = getSavedFavorites();
    const updated = current.filter((q) => q.id !== quoteId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error removing favorite:', e);
    return getSavedFavorites();
  }
}

export function isQuoteFavorite(quoteId: string, quoteText?: string): boolean {
  const current = getSavedFavorites();
  return current.some((q) => q.id === quoteId || (quoteText && q.text === quoteText));
}

export function clearAllFavorites(): void {
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (e) {
    console.error('Error clearing favorites:', e);
  }
}

// User settings
export function getUserSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
}

export function saveUserSettings(settings: Partial<UserSettings>): UserSettings {
  try {
    const current = getUserSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return defaultSettings;
  }
}

// API Calls
export async function generateQuotes(params: QuoteGenerationParams): Promise<{ quotes: Quote[]; modelUsed: string }> {
  const res = await fetch('/api/quotes/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to generate quotes. Please try again.');
  }

  // Check against saved favorites
  const favorites = getSavedFavorites();
  const quotesWithFavStatus = data.quotes.map((q: Quote) => ({
    ...q,
    isFavorite: favorites.some((f) => f.text === q.text && f.philosopherName === q.philosopherName),
  }));

  return { quotes: quotesWithFavStatus, modelUsed: data.modelUsed };
}

export async function explainQuote(quoteText: string, philosopherName: string, category: string): Promise<QuoteExplanation> {
  const res = await fetch('/api/quotes/explain', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quoteText, philosopherName, category }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Unable to analyze quote.');
  }

  return data.explanation;
}

export async function fetchDailyQuote(refresh = false): Promise<{
  id: string;
  date: string;
  text: string;
  philosopherName: string;
  school: string;
  category: string;
  meaning: string;
  modelUsed: string;
}> {
  try {
    const res = await fetch(`/api/quotes/daily${refresh ? '?refresh=true' : ''}`);
    const data = await res.json();
    if (res.ok && data.success && data.dailyQuote) {
      return data.dailyQuote;
    }
    throw new Error(data.error || 'Unable to fetch daily quote.');
  } catch (err: any) {
    console.warn('Network or API issue loading daily quote, using resilient fallback:', err);
    const today = new Date().toISOString().split('T')[0];
    return {
      id: `daily-fallback-${today}`,
      date: today,
      text: 'The soul is dyed the color of its thoughts; examine the loom before you weave another hour.',
      philosopherName: 'Marcus Aurelius',
      school: 'Roman Stoicism',
      category: 'Discipline',
      meaning: 'Your consciousness absorbs whatever you dwell upon. Guard your inner sanctuary from trivial outrage and aimless worries.',
      modelUsed: 'gemini-3.8-flash',
    };
  }
}
