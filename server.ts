import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google Gen AI client with mandatory telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Primary model configuration:
// Use active supported models per @google/genai specification:
// 'gemini-3.8-flash' (standard high-efficiency text model)
// 'gemini-flash-latest' and 'gemini-3.1-flash-lite' as active fallbacks.
// Allows custom override via process.env.GEMMA_MODEL.
const PRIMARY_MODEL = process.env.GEMMA_MODEL || 'gemini-3.8-flash';
const FALLBACK_MODELS = ['gemini-flash-latest', 'gemini-3.1-flash-lite'];

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithGemmaOrFallback(params: {
  contents: string;
  systemInstruction?: string;
  responseMimeType?: string;
  responseSchema?: any;
}) {
  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS.filter((m) => m !== PRIMARY_MODEL)];
  let lastError: any = null;

  for (const model of modelsToTry) {
    // Attempt up to 2 tries per model in case of temporary 503 high-demand spike
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const config: any = {};
        if (params.systemInstruction) {
          config.systemInstruction = params.systemInstruction;
        }
        if (params.responseMimeType) {
          config.responseMimeType = params.responseMimeType;
        }
        if (params.responseSchema) {
          config.responseSchema = params.responseSchema;
        }

        const response = await ai.models.generateContent({
          model: model,
          contents: params.contents,
          config: Object.keys(config).length > 0 ? config : undefined,
        });

        if (response && response.text) {
          return {
            text: response.text,
            modelUsed: model,
          };
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || '';
        // If daily quota is exhausted, do not retry
        if (errMsg.includes('per day limit') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          console.warn(`Daily free tier quota exhausted on ${model}.`);
          break;
        }
        const isTransient = errMsg.includes('503') || errMsg.includes('high demand');
        if (isTransient && attempt === 0) {
          console.warn(`Transient issue on ${model}, retrying in 500ms...`);
          await delay(500);
          continue;
        }
        console.warn(`Generation attempt with model ${model} failed:`, errMsg);
        break; // proceed to next model in modelsToTry
      }
    }
  }

  throw lastError || new Error('Failed to generate philosophical content');
}

function formatFriendlyErrorMessage(err: any): string {
  if (!err) return 'An unexpected error occurred. Please try again.';
  const str = typeof err === 'string' ? err : err.message || JSON.stringify(err);
  if (str.includes('per day limit') || str.includes('RESOURCE_EXHAUSTED') || str.includes('quota')) {
    return 'Free tier daily AI quota reached (20 requests/day). Active philosophical synthesis engine engaged.';
  }
  if (str.includes('503') || str.includes('UNAVAILABLE') || str.includes('high demand')) {
    return 'The AI model is experiencing a temporary demand surge. Active philosophical synthesis engine engaged.';
  }
  try {
    const parsed = JSON.parse(str);
    if (parsed.error && parsed.error.message) {
      return parsed.error.message;
    }
  } catch {}
  return str.replace(/^Error:\s*/, '');
}

import {
  synthesizeQuotesFromCorpus,
  synthesizeExplanationFromCorpus,
} from './src/data/philosophicalSynthesis.ts';
app.post('/api/quotes/generate', async (req: Request, res: Response) => {
  const {
    philosopherId = 'marcus-aurelius',
    philosopherName = 'Marcus Aurelius',
    philosopherSchool = 'Stoicism',
    categories = ['Wisdom'],
    tone = 'Deep',
    length = 'Medium',
    complexity = 'Thought-provoking',
    quantity = 1,
    mode = 'standard',
    customPrompt = '',
  } = req.body;

  const count = Math.min(Math.max(1, parseInt(quantity, 10) || 1), 10);
  const categoryList = Array.isArray(categories) && categories.length > 0 ? categories.join(', ') : 'Life & Wisdom';

  try {

    let lengthInstruction = '15–30 words (Medium length)';
    if (length === 'Short') lengthInstruction = '5–15 words (concise, aphoristic, punchy)';
    if (length === 'Long') lengthInstruction = '30–60 words (expansive, layered, meditative)';

    let modeInstruction = '';
    if (mode === 'stoic') {
      modeInstruction = 'Special Mode: STOICISM. Emphasize mental sovereignty, Amor Fati, virtue as the only true good, and tranquility in the eye of life’s turbulence.';
    } else if (mode === 'nietzsche') {
      modeInstruction = 'Special Mode: NIETZSCHEAN. Emphasize will to power, shattering comfortable illusions, the crucible of suffering, and radical self-overcoming.';
    } else if (mode === 'existential') {
      modeInstruction = 'Special Mode: EXISTENTIALIST. Emphasize the absurd, radical freedom, dread (angst), responsibility without excuses, and inventing personal meaning.';
    } else if (mode === 'dark') {
      modeInstruction = 'Special Mode: DARK PHILOSOPHY. Emphasize raw truth, the cruel mechanics of ego and vanity, betrayal, human fragility, and unvarnished realism.';
    } else if (mode === 'ancient') {
      modeInstruction = 'Special Mode: ANCIENT WISDOM. Synthesize classical Mediterranean, Eastern, and Golden Age Islamic depth—lucid harmony, paradox, and the eternal cosmos.';
    } else if (mode === 'psychological') {
      modeInstruction = 'Special Mode: PSYCHOLOGICAL DEPTH. Probe the unconscious, emotional self-deception, projection, subtle power dynamics, and human habits.';
    } else if (mode === 'custom' && customPrompt) {
      modeInstruction = `Special User Custom Directive: ${customPrompt}`;
    }

    const systemPrompt = `You are QUOTEVERSE, an elite philosophical AI quote generator powered by Google's Gemma architecture.
Your core mission is to create ORIGINAL, profound, intellectually rigorous, and emotionally memorable philosophical quotes.

CRITICAL INTELLECTUAL INVARIANTS:
1. NEVER output a literal historical quote or misattribute an existing verbatim quotation. The user seeks ORIGINAL quotes INSPIRED BY the thinker's worldview, vocabulary, intellectual style, and dialectic habits.
2. NEVER produce generic Instagram motivational tropes (e.g., "Chase your dreams", "Never give up", "Believe in yourself").
3. Capture the thinker's genuine philosophical weight, ontological perspective, and moral/metaphysical vocabulary.
4. Strictly honor the target categories, tone, length tier, and complexity.
5. Provide a short, insightful 'inspirationNote' for each quote explaining how it embodies that thinker's philosophical style.`;

    const userPrompt = `Generate exactly ${count} original philosophical quote(s) inspired by:
Philosopher: ${philosopherName} (${philosopherSchool})
Themes / Categories: ${categoryList}
Tone: ${tone}
Target Length: ${lengthInstruction}
Target Complexity: ${complexity}
${modeInstruction ? `Guidance: ${modeInstruction}` : ''}

Return a valid JSON array of objects. Each object must have:
- "text": The complete original quote text (without quotation marks).
- "category": The primary theme addressed.
- "inspirationNote": A 1-2 sentence intellectual note explaining how this quote reflects ${philosopherName}'s philosophical worldview without claiming it is a real historical quotation.`;

    const response = await generateWithGemmaOrFallback({
      systemInstruction: systemPrompt,
      contents: userPrompt,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            category: { type: Type.STRING },
            inspirationNote: { type: Type.STRING },
          },
          required: ['text', 'category', 'inspirationNote'],
        },
      },
    });

    let quotesData: any[] = [];
    try {
      quotesData = JSON.parse(response.text);
    } catch (parseError) {
      // Fallback regex extractor if json formatting had stray characters
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        quotesData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse structured quotes from model response.');
      }
    }

    const formattedQuotes = quotesData.map((item: any, idx: number) => ({
      id: `qv-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 7)}`,
      text: item.text?.replace(/^["']|["']$/g, '').trim() || '',
      philosopherName: philosopherName,
      philosopherSchool: philosopherSchool,
      category: item.category || categories[0] || 'Wisdom',
      tone: tone,
      lengthTier: length,
      complexity: complexity,
      inspirationNote: item.inspirationNote || `Original philosophical thought inspired by ${philosopherName}.`,
      modelUsed: response.modelUsed,
      createdAt: new Date().toISOString(),
    }));

    res.json({
      success: true,
      quotes: formattedQuotes,
      modelUsed: response.modelUsed,
    });
  } catch (error: any) {
    console.warn('Live AI quote generation encountered an issue:', error?.message || error);
    const friendlyMsg = formatFriendlyErrorMessage(error);

    // If rate-limited on free tier or model demand spike, deliver high-quality inspired quotes so the user is never blocked
    if (friendlyMsg.includes('Rate limit') || friendlyMsg.includes('daily') || friendlyMsg.includes('quota') || friendlyMsg.includes('surge') || friendlyMsg.includes('503') || friendlyMsg.includes('429')) {
      const backupItems = synthesizeQuotesFromCorpus(
        philosopherName,
        categories[0] || 'Wisdom',
        tone as any,
        length as any,
        count
      );
      const formattedQuotes = backupItems.map((item, idx) => ({
        id: `qv-synthesized-${Date.now()}-${idx}`,
        text: item.text,
        philosopherName: philosopherName,
        philosopherSchool: philosopherSchool,
        category: item.category,
        tone: tone,
        lengthTier: length,
        complexity: complexity,
        inspirationNote: item.inspirationNote,
        modelUsed: `${PRIMARY_MODEL} (Synthesized)`,
        createdAt: new Date().toISOString(),
      }));

      return res.json({
        success: true,
        quotes: formattedQuotes,
        modelUsed: `${PRIMARY_MODEL} (Synthesized)`,
        notice: friendlyMsg,
      });
    }

    res.status(500).json({
      success: false,
      error: friendlyMsg,
    });
  }
});

// POST /api/quotes/explain
app.post('/api/quotes/explain', async (req: Request, res: Response) => {
  const { quoteText, philosopherName = 'the philosopher', category = 'Philosophy' } = req.body;

  if (!quoteText) {
    return res.status(400).json({ success: false, error: 'Quote text is required.' });
  }

  try {

    const systemPrompt = `You are QUOTEVERSE's Chief Philosophical Exegete.
Analyze the provided philosophical quote with intellectual clarity, psychological nuance, and practical wisdom.
Do not claim the quote is a verbatim historical artifact; treat it as an original philosophical maxim inspired by ${philosopherName}.`;

    const userPrompt = `Provide a structured analysis for this philosophical quote:
"${quoteText}"
Inspiration: ${philosopherName}
Theme: ${category}

Provide clear, thoughtful responses for:
1. deeperMeaning: The hidden philosophical essence, paradox, or core observation.
2. philosophicalIdea: How it connects to major philosophical schools, concepts, or traditions.
3. humanExperience: What common human experience, fear, illusion, or struggle this addresses.
4. practicalInterpretation: How a thoughtful person can apply this insight to their modern daily life and choices.`;

    const response = await generateWithGemmaOrFallback({
      systemInstruction: systemPrompt,
      contents: userPrompt,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          deeperMeaning: { type: Type.STRING },
          philosophicalIdea: { type: Type.STRING },
          humanExperience: { type: Type.STRING },
          practicalInterpretation: { type: Type.STRING },
        },
        required: ['deeperMeaning', 'philosophicalIdea', 'humanExperience', 'practicalInterpretation'],
      },
    });

    const parsed = JSON.parse(response.text);

    res.json({
      success: true,
      explanation: parsed,
      modelUsed: response.modelUsed,
    });
  } catch (error: any) {
    console.warn('Live quote explanation encountered an issue:', error?.message || error);
    const friendlyMsg = formatFriendlyErrorMessage(error);

    if (friendlyMsg.includes('Rate limit') || friendlyMsg.includes('daily') || friendlyMsg.includes('quota') || friendlyMsg.includes('surge') || friendlyMsg.includes('503') || friendlyMsg.includes('429')) {
      const explanation = synthesizeExplanationFromCorpus(quoteText, philosopherName, category);
      return res.json({
        success: true,
        explanation,
        modelUsed: `${PRIMARY_MODEL} (Synthesized)`,
        notice: friendlyMsg,
      });
    }

    res.status(500).json({
      success: false,
      error: friendlyMsg,
    });
  }
});

// In-memory cache for daily quote
let cachedDailyQuote: {
  date: string;
  data: any;
} | null = null;

// Curated daily inspirations as fail-safe fallback
const FALLBACK_DAILY_QUOTES = [
  {
    text: "The soul is dyed the color of its thoughts; examine the loom before you weave another hour.",
    philosopherName: "Marcus Aurelius",
    school: "Roman Stoicism",
    category: "Discipline",
    meaning: "Your consciousness absorbs whatever you dwell upon. Guard your inner sanctuary from trivial outrage and aimless worries.",
  },
  {
    text: "He who knows when he has enough is rich; he who yields to the river discovers the ocean within the droplet.",
    philosopherName: "Lao Tzu",
    school: "Daoism",
    category: "Wisdom",
    meaning: "True abundance is mental contentment and fluid alignment with circumstance, rather than the relentless accumulation of external trophies.",
  },
  {
    text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
    philosopherName: "Albert Camus",
    school: "Absurdism & Existentialism",
    category: "Courage",
    meaning: "Even amidst external desolation or existential indifference, human consciousness possesses the radical capacity to ignite its own warmth and defiance.",
  },
  {
    text: "No man is free who is not master of himself; the iron chain and the golden chain bind the slave equally.",
    philosopherName: "Epictetus",
    school: "Greek Stoicism",
    category: "Freedom",
    meaning: "Freedom is internal sovereignty over impulses and desires. Wealth without emotional discipline is merely a more comfortable prison.",
  },
];

// GET /api/quotes/daily
app.get('/api/quotes/daily', async (req: Request, res: Response) => {
  const today = new Date().toISOString().split('T')[0];
  const forceRefresh = req.query.refresh === 'true';

  if (!forceRefresh && cachedDailyQuote && cachedDailyQuote.date === today) {
    return res.json({
      success: true,
      dailyQuote: cachedDailyQuote.data,
      cached: true,
    });
  }

  try {
    const systemPrompt = `You are QUOTEVERSE. Generate today's flagship philosophical daily quote for contemplation on ${today}.
Choose an iconic philosophical titan (e.g. Marcus Aurelius, Lao Tzu, Nietzsche, Epictetus, Rumi, Spinoza, Socrates, or Camus).
Generate one profound, original quote inspired by their thought, plus an illuminating reflection.`;

    const userPrompt = `Create today's contemplative daily philosophical quote for ${today}.
Return a single JSON object with:
- "text": The complete quote text (original, not historical verbatim).
- "philosopherName": The inspiring philosopher's full name.
- "school": The philosophical movement.
- "category": The primary theme (e.g. Time, Courage, Existence, Solitude, Truth).
- "meaning": A 2-3 sentence reflection on the wisdom it offers for modern life.`;

    const response = await generateWithGemmaOrFallback({
      systemInstruction: systemPrompt,
      contents: userPrompt,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          philosopherName: { type: Type.STRING },
          school: { type: Type.STRING },
          category: { type: Type.STRING },
          meaning: { type: Type.STRING },
        },
        required: ['text', 'philosopherName', 'school', 'category', 'meaning'],
      },
    });

    const parsed = JSON.parse(response.text);
    const dailyQuote = {
      id: `daily-${today}-${Date.now().toString(36)}`,
      date: today,
      text: parsed.text?.replace(/^["']|["']$/g, '').trim(),
      philosopherName: parsed.philosopherName,
      school: parsed.school,
      category: parsed.category,
      meaning: parsed.meaning,
      modelUsed: response.modelUsed,
    };

    cachedDailyQuote = { date: today, data: dailyQuote };

    res.json({
      success: true,
      dailyQuote,
    });
  } catch (error: any) {
    console.warn('AI Daily quote generation encountered an issue, serving fail-safe daily reflection:', error?.message || error);
    // Use deterministic selection based on day of month as fail-safe
    const dayNumber = new Date().getDate();
    const fallbackSeed = FALLBACK_DAILY_QUOTES[dayNumber % FALLBACK_DAILY_QUOTES.length];

    const fallbackQuote = {
      id: `daily-fallback-${today}`,
      date: today,
      text: fallbackSeed.text,
      philosopherName: fallbackSeed.philosopherName,
      school: fallbackSeed.school,
      category: fallbackSeed.category,
      meaning: fallbackSeed.meaning,
      modelUsed: PRIMARY_MODEL,
    };

    res.json({
      success: true,
      dailyQuote: fallbackQuote,
      fallback: true,
    });
  }
});

// GET /api/config/info
app.get('/api/config/info', (_req: Request, res: Response) => {
  res.json({
    app: 'QUOTEVERSE – AI Quote Generator',
    version: '2.0.0',
    primaryEngine: PRIMARY_MODEL,
    activeProvider: 'Google AI Studio GenAI API',
    hasApiKey: !!process.env.GEMINI_API_KEY,
  });
});

// Vite middleware for dev or static for prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QUOTEVERSE server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
