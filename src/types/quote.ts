export type Era = 
  | 'Ancient Philosophers' 
  | 'Modern Philosophers' 
  | 'Existentialist and Contemporary Thinkers' 
  | 'Other Great Thinkers';

export interface Philosopher {
  id: string;
  name: string;
  era: Era;
  school: string;
  dates: string;
  description: string;
  keyThemes: string[];
  characteristicStyle: string;
  initials: string;
}

export type Tone =
  | 'Deep'
  | 'Dark'
  | 'Mysterious'
  | 'Intellectual'
  | 'Emotional'
  | 'Brutally Honest'
  | 'Motivational'
  | 'Realistic'
  | 'Poetic'
  | 'Existential'
  | 'Sarcastic'
  | 'Minimalist';

export type QuoteLength = 'Short' | 'Medium' | 'Long';

export type QuoteComplexity =
  | 'Simple and understandable'
  | 'Thought-provoking'
  | 'Deep philosophical'
  | 'Extremely intellectual';

export type SpecialMode =
  | 'standard'
  | 'stoic'
  | 'nietzsche'
  | 'existential'
  | 'dark'
  | 'ancient'
  | 'psychological'
  | 'custom';

export interface Quote {
  id: string;
  text: string;
  philosopherName: string;
  philosopherSchool?: string;
  category: string;
  tone: string;
  lengthTier: QuoteLength;
  complexity: QuoteComplexity;
  inspirationNote: string;
  modelUsed: string;
  createdAt: string;
  isFavorite?: boolean;
}

export interface QuoteExplanation {
  deeperMeaning: string;
  philosophicalIdea: string;
  humanExperience: string;
  practicalInterpretation: string;
}

export interface QuoteGenerationParams {
  philosopherId?: string;
  philosopherName?: string;
  categories: string[];
  tone: Tone;
  length: QuoteLength;
  complexity: QuoteComplexity;
  quantity: number;
  mode?: SpecialMode;
  customPrompt?: string;
}

export type ImageTemplateId =
  | 'dark_minimalist'
  | 'luxury_gold'
  | 'greek_marble'
  | 'modern_typography'
  | 'dark_academia'
  | 'philosophical_paper'
  | 'midnight_blue'
  | 'black_and_white'
  | 'vintage_manuscript';

export type ExportFormat = 'square' | 'story' | 'whatsapp' | 'landscape';

export interface QuoteImageConfig {
  template: ImageTemplateId;
  format: ExportFormat;
  fontFamily: 'Cinzel' | 'Playfair Display' | 'Cormorant Garamond' | 'Plus Jakarta Sans' | 'JetBrains Mono';
  fontSize: number;
  textColor: string;
  alignment: 'left' | 'center' | 'right';
  showAuthor: boolean;
  showWatermark: boolean;
}
