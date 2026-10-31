import { SpecialMode, Tone, QuoteLength, QuoteComplexity } from '../types/quote';

export const QUOTE_CATEGORIES: string[] = [
  'Life',
  'Death',
  'Love',
  'Relationships',
  'Betrayal',
  'Loneliness',
  'Happiness',
  'Sadness',
  'Discipline',
  'Success',
  'Failure',
  'Wisdom',
  'Knowledge',
  'Intelligence',
  'Human Nature',
  'Reality',
  'Truth',
  'Power',
  'Wealth',
  'Time',
  'Existence',
  'Purpose',
  'Suffering',
  'Strength',
  'Fear',
  'Courage',
  'Ambition',
  'Self-Respect',
  'Society',
  'Freedom',
  'Spirituality',
  'Human Psychology',
];

export const TONES: Tone[] = [
  'Deep',
  'Dark',
  'Mysterious',
  'Intellectual',
  'Emotional',
  'Brutally Honest',
  'Motivational',
  'Realistic',
  'Poetic',
  'Existential',
  'Sarcastic',
  'Minimalist',
];

export const LENGTH_TIERS: { id: QuoteLength; label: string; desc: string }[] = [
  { id: 'Short', label: 'Short', desc: '5 – 15 words' },
  { id: 'Medium', label: 'Medium', desc: '15 – 30 words' },
  { id: 'Long', label: 'Long', desc: '30 – 60 words' },
];

export const COMPLEXITIES: { id: QuoteComplexity; label: string }[] = [
  { id: 'Simple and understandable', label: 'Simple & Understandable' },
  { id: 'Thought-provoking', label: 'Thought-Provoking' },
  { id: 'Deep philosophical', label: 'Deep Philosophical' },
  { id: 'Extremely intellectual', label: 'Extremely Intellectual' },
];

export interface SpecialModeDefinition {
  id: SpecialMode;
  name: string;
  tagline: string;
  description: string;
  defaultPhilosophers: string[];
  suggestedTones: Tone[];
  accentColor: string;
  promptGuidance: string;
}

export const SPECIAL_MODES: SpecialModeDefinition[] = [
  {
    id: 'stoic',
    name: 'Stoic Mode',
    tagline: 'Fortitude, Inner Citadel & Amor Fati',
    description: 'Quotes inspired by Marcus Aurelius, Seneca, and Epictetus on mental sovereignty, virtue under adversity, and mastering the dichotomy of control.',
    defaultPhilosophers: ['Marcus Aurelius', 'Seneca', 'Epictetus'],
    suggestedTones: ['Brutally Honest', 'Realistic', 'Deep', 'Motivational'],
    accentColor: '#d4af37',
    promptGuidance: 'Channel Roman and Greek Stoicism. Focus on duty, emotional invulnerability through reason, memento mori, and tranquil resilience in the storm.',
  },
  {
    id: 'nietzsche',
    name: 'Nietzsche Mode',
    tagline: 'Will to Power & Radical Revaluation',
    description: 'Bold, provocative, psychologically intense quotes inspired by Friedrich Nietzsche that dismantle herd conformity and ignite self-transcendence.',
    defaultPhilosophers: ['Friedrich Nietzsche'],
    suggestedTones: ['Dark', 'Brutally Honest', 'Poetic', 'Intellectual'],
    accentColor: '#e11d48',
    promptGuidance: 'Channel Friedrich Nietzsche: aphoristic, electrifying, poetic fury, overcoming comfort, demanding that the abyss be stared down.',
  },
  {
    id: 'existential',
    name: 'Existential Mode',
    tagline: 'The Absurd, Freedom & Radical Autonomy',
    description: 'Explore the dizzying burden of freedom, the silent cosmos, the confrontation with mortality, and creating authentic purpose without divine blueprints.',
    defaultPhilosophers: ['Albert Camus', 'Jean-Paul Sartre', 'Simone de Beauvoir'],
    suggestedTones: ['Existential', 'Deep', 'Poetic', 'Brutally Honest'],
    accentColor: '#0ea5e9',
    promptGuidance: 'Channel French and Scandinavian existentialism (Camus, Sartre, Beauvoir, Kierkegaard). Focus on anguish, choice, rebellion against absurdity, and authenticity.',
  },
  {
    id: 'dark',
    name: 'Dark Philosophy',
    tagline: 'Dissecting Shadows, Vanity & Suffering',
    description: 'Intellectually uncompromising reflections on human deception, the cruelty of nature, the insatiable will, and the fragile illusions of civilization.',
    defaultPhilosophers: ['Arthur Schopenhauer', 'Michel Foucault', 'Diogenes'],
    suggestedTones: ['Dark', 'Mysterious', 'Sarcastic', 'Brutally Honest'],
    accentColor: '#a855f7',
    promptGuidance: 'Expose the unvarnished mechanics of ego, delusion, power dynamics, mortality, and the raw truth of existence without sugarcoating.',
  },
  {
    id: 'ancient',
    name: 'Ancient Wisdom',
    tagline: 'Timeless Currents of East & West',
    description: 'Profound maxims drawing upon the primordial wellsprings of Athens, Chang’an, Alexandria, and Baghdad—synthesizing classical inquiry with spiritual stillness.',
    defaultPhilosophers: ['Lao Tzu', 'Socrates', 'Confucius', 'Ibn Sina', 'Heraclitus'],
    suggestedTones: ['Deep', 'Poetic', 'Minimalist', 'Intellectual'],
    accentColor: '#10b981',
    promptGuidance: 'Weave classical Socratic dialogue, Taoist wu wei, Confucian ethics, and golden age Islamic scholarship into luminous, enduring wisdom.',
  },
  {
    id: 'psychological',
    name: 'Psychological Mode',
    tagline: 'The Unconscious, Mask & Shadow',
    description: 'Quotes probing the hidden motives behind human affection, envy, the architecture of habit, projection, and the friction between self and persona.',
    defaultPhilosophers: ['David Hume', 'Michel Foucault', 'Friedrich Nietzsche'],
    suggestedTones: ['Intellectual', 'Mysterious', 'Realistic', 'Deep'],
    accentColor: '#f59e0b',
    promptGuidance: 'Analyze the subterranean mechanisms of the human mind, social mimicry, unconscious bias, and why humans lie to themselves above all else.',
  },
  {
    id: 'custom',
    name: 'Custom Mode',
    tagline: 'Your Intellectual Vision',
    description: 'Guide the AI with your own specific prompt, concept, paradox, or aesthetic requirements to forge entirely tailored philosophical quotes.',
    defaultPhilosophers: [],
    suggestedTones: ['Deep', 'Intellectual'],
    accentColor: '#ec4899',
    promptGuidance: 'Fulfill the user custom instructions with uncompromising philosophical rigor and poetic brilliance.',
  },
];
