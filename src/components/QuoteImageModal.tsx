import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Download, Copy, Check, Sparkles, Sliders, Type, AlignLeft, AlignCenter, AlignRight, RefreshCw } from 'lucide-react';
import { Quote, ImageTemplateId, ExportFormat, QuoteImageConfig } from '../types/quote';

interface QuoteImageModalProps {
  quote: Quote | null;
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATES: { id: ImageTemplateId; name: string; desc: string; bgPreview: string }[] = [
  { id: 'dark_minimalist', name: 'Dark Minimalist', desc: 'Obsidian & hairline refinement', bgPreview: 'bg-stone-950 border-stone-800' },
  { id: 'luxury_gold', name: 'Luxury Black & Gold', desc: 'Gilded borders & regal typography', bgPreview: 'bg-black border-amber-500/60' },
  { id: 'greek_marble', name: 'Greek Marble', desc: 'Classical antiquities & stonework', bgPreview: 'bg-stone-900 border-amber-200/40' },
  { id: 'modern_typography', name: 'Modern Typography', desc: 'High-contrast editorial layout', bgPreview: 'bg-neutral-900 border-neutral-700' },
  { id: 'dark_academia', name: 'Dark Academia', desc: 'Mahogany library & candlelit study', bgPreview: 'bg-[#18110e] border-[#5e412f]' },
  { id: 'philosophical_paper', name: 'Philosophical Paper', desc: 'Archival warm limestone & dark ink', bgPreview: 'bg-[#e8e3d7] text-stone-900 border-stone-400' },
  { id: 'midnight_blue', name: 'Midnight Blue', desc: 'Celestial lapis & starlight dust', bgPreview: 'bg-[#0b1329] border-blue-900' },
  { id: 'black_and_white', name: 'Black & White', desc: 'Stark monolithic monochrome', bgPreview: 'bg-black border-white' },
  { id: 'vintage_manuscript', name: 'Vintage Manuscript', desc: 'Aged parchment & ornate framing', bgPreview: 'bg-[#2b241e] border-[#9c7a4b]' },
];

const FORMATS: { id: ExportFormat; label: string; ratio: string; width: number; height: number }[] = [
  { id: 'square', label: 'Square (1:1)', ratio: '1:1', width: 1080, height: 1080 },
  { id: 'story', label: 'Story (9:16)', ratio: '9:16', width: 1080, height: 1920 },
  { id: 'whatsapp', label: 'WhatsApp Status', ratio: '9:16', width: 1080, height: 1920 },
  { id: 'landscape', label: 'Landscape (16:9)', ratio: '16:9', width: 1200, height: 675 },
];

export const QuoteImageModal: React.FC<QuoteImageModalProps> = ({ quote, isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [config, setConfig] = useState<QuoteImageConfig>({
    template: 'luxury_gold',
    format: 'square',
    fontFamily: 'Cormorant Garamond',
    fontSize: 34,
    textColor: '#f5f5f4',
    alignment: 'center',
    showAuthor: true,
    showWatermark: true,
  });

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Helper to wrap text cleanly on canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  const drawCanvas = useCallback(() => {
    if (!quote || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentFormat = FORMATS.find((f) => f.id === config.format) || FORMATS[0];
    canvas.width = currentFormat.width;
    canvas.height = currentFormat.height;

    const W = canvas.width;
    const H = canvas.height;

    // Background rendering based on template
    switch (config.template) {
      case 'luxury_gold': {
        const bgGrad = ctx.createLinearGradient(0, 0, W, H);
        bgGrad.addColorStop(0, '#0a0a0c');
        bgGrad.addColorStop(0.5, '#121216');
        bgGrad.addColorStop(1, '#08080a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Gold hairline outer and inner frame
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
        ctx.lineWidth = 4;
        ctx.strokeRect(50, 50, W - 100, H - 100);

        ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(65, 65, W - 130, H - 130);

        // Corner accents
        const cornerSize = 35;
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        // Top-left
        ctx.strokeRect(50, 50, cornerSize, cornerSize);
        // Top-right
        ctx.strokeRect(W - 50 - cornerSize, 50, cornerSize, cornerSize);
        // Bottom-left
        ctx.strokeRect(50, H - 50 - cornerSize, cornerSize, cornerSize);
        // Bottom-right
        ctx.strokeRect(W - 50 - cornerSize, H - 50 - cornerSize, cornerSize, cornerSize);
        break;
      }
      case 'greek_marble': {
        const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W * 0.7);
        bgGrad.addColorStop(0, '#242220');
        bgGrad.addColorStop(1, '#11100f');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, W, H);

        // Classical Greek key or column borders
        ctx.strokeStyle = 'rgba(226, 203, 163, 0.35)';
        ctx.lineWidth = 3;
        ctx.strokeRect(60, 60, W - 120, H - 120);

        // Subtle geometric circle in center background
        ctx.strokeStyle = 'rgba(226, 203, 163, 0.05)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, Math.min(W, H) * 0.32, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case 'modern_typography': {
        ctx.fillStyle = '#0f0f11';
        ctx.fillRect(0, 0, W, H);

        // Huge decorative quotation mark in background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.font = 'bold 360px "Playfair Display", serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText('“', 80, 40);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, W - 80, H - 80);
        break;
      }
      case 'dark_academia': {
        const grad = ctx.createLinearGradient(0, 0, 0, H);
        grad.addColorStop(0, '#1c130e');
        grad.addColorStop(0.5, '#140d09');
        grad.addColorStop(1, '#0e0805');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = 'rgba(180, 130, 80, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(55, 55, W - 110, H - 110);
        break;
      }
      case 'philosophical_paper': {
        // Warm limestone parchment
        ctx.fillStyle = '#f4efe6';
        ctx.fillRect(0, 0, W, H);

        // Subtle ink deckled border
        ctx.strokeStyle = '#b8ad98';
        ctx.lineWidth = 3;
        ctx.strokeRect(45, 45, W - 90, H - 90);

        ctx.strokeStyle = 'rgba(120, 105, 85, 0.25)';
        ctx.lineWidth = 1;
        ctx.strokeRect(55, 55, W - 110, H - 110);
        break;
      }
      case 'midnight_blue': {
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#0d1838');
        grad.addColorStop(0.5, '#070c1e');
        grad.addColorStop(1, '#03050d');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = 'rgba(147, 197, 253, 0.25)';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, W - 100, H - 100);
        break;
      }
      case 'black_and_white': {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.strokeRect(45, 45, W - 90, H - 90);
        break;
      }
      case 'vintage_manuscript': {
        const grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, '#2d2218');
        grad.addColorStop(1, '#18120c');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = '#c5a059';
        ctx.lineWidth = 3;
        ctx.strokeRect(55, 55, W - 110, H - 110);
        break;
      }
      case 'dark_minimalist':
      default: {
        ctx.fillStyle = '#0a0a0b';
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(50, 50, W - 100, H - 100);
        break;
      }
    }

    // Typography setup
    let quoteTextColor = config.textColor;
    if (config.template === 'philosophical_paper') {
      quoteTextColor = '#1c1917';
    } else if (config.template === 'luxury_gold') {
      quoteTextColor = '#fbf8eb';
    }

    // Category / Top Kicker
    ctx.font = `600 16px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = config.template === 'philosophical_paper' ? '#786d5e' : 'rgba(212, 175, 55, 0.85)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const topY = config.format === 'story' || config.format === 'whatsapp' ? 220 : 130;
    ctx.fillText(`${quote.category.toUpperCase()} · PHILOSOPHICAL MAXIM`, W / 2, topY);

    // Decorative divider beneath kicker
    ctx.strokeStyle = config.template === 'philosophical_paper' ? 'rgba(0,0,0,0.15)' : 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 40, topY + 30);
    ctx.lineTo(W / 2 + 40, topY + 30);
    ctx.stroke();

    // Quote text wrapping and measurement
    const paddingX = W * 0.16;
    const maxContentWidth = W - paddingX * 2;
    // Scale font size according to image format
    const fontMultiplier = W / 1000;
    const computedFontSize = Math.round(config.fontSize * fontMultiplier);
    ctx.font = `italic ${computedFontSize}px "${config.fontFamily}", serif`;
    ctx.fillStyle = quoteTextColor;

    const quoteLines = wrapText(ctx, `“${quote.text}”`, maxContentWidth);
    const lineHeight = computedFontSize * 1.55;
    const totalTextHeight = quoteLines.length * lineHeight;

    // Center the block vertically
    const startY = (H - totalTextHeight) / 2 - (config.showAuthor ? 40 : 0);

    ctx.textBaseline = 'middle';
    quoteLines.forEach((line, index) => {
      const lineY = startY + index * lineHeight;
      if (config.alignment === 'center') {
        ctx.textAlign = 'center';
        ctx.fillText(line, W / 2, lineY);
      } else if (config.alignment === 'left') {
        ctx.textAlign = 'left';
        ctx.fillText(line, paddingX, lineY);
      } else {
        ctx.textAlign = 'right';
        ctx.fillText(line, W - paddingX, lineY);
      }
    });

    // Author / Inspiration label
    if (config.showAuthor) {
      const authorY = startY + quoteLines.length * lineHeight + 50;

      // Small hairline divider
      ctx.strokeStyle = config.template === 'philosophical_paper' ? 'rgba(0,0,0,0.2)' : 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 50, authorY);
      ctx.lineTo(W / 2 + 50, authorY);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.font = `600 20px "${config.fontFamily === 'Cinzel' ? 'Cinzel' : 'Playfair Display'}", serif`;
      ctx.fillStyle = config.template === 'philosophical_paper' ? '#292524' : '#e5c158';
      ctx.fillText(`Inspired by ${quote.philosopherName}`, W / 2, authorY + 32);

      if (quote.philosopherSchool) {
        ctx.font = `400 14px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = config.template === 'philosophical_paper' ? '#57534e' : 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(quote.philosopherSchool, W / 2, authorY + 60);
      }
    }

    // Watermark at bottom
    if (config.showWatermark) {
      const bottomY = H - 85;
      ctx.textAlign = 'center';
      ctx.font = `500 13px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = config.template === 'philosophical_paper' ? '#8c8273' : 'rgba(255, 255, 255, 0.35)';
      ctx.fillText(`QUOTEVERSE · AI PHILOSOPHY`, W / 2, bottomY);
    }
  }, [quote, config]);

  useEffect(() => {
    if (isOpen && quote) {
      // Draw canvas on open and config change
      const timer = setTimeout(() => {
        drawCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, quote, config, drawCanvas]);

  if (!isOpen || !quote) return null;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      const safeName = quote.philosopherName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      a.download = `QUOTEVERSE-${safeName}-${config.format}.png`;
      a.href = dataUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.warn('Clipboard write image failed, falling back to data URL:', err);
        }
      });
    } catch (e) {
      console.error('Error copying image:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0f1115] border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-[#14171d]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-semibold text-stone-100 tracking-tight">Quote Image Studio</h3>
              <p className="text-xs text-stone-400">Transform philosophical wisdom into high-resolution shareable art</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-stone-800">
          {/* Left Column: Canvas Preview */}
          <div className="lg:col-span-7 p-6 flex flex-col items-center justify-center bg-[#090a0d] min-h-[380px]">
            <div className="relative w-full max-w-md flex items-center justify-center shadow-2xl rounded-lg overflow-hidden border border-stone-800/80 bg-stone-950 p-2">
              <canvas
                ref={canvasRef}
                className="w-full h-auto object-contain rounded shadow-inner max-h-[55vh]"
              />
            </div>
            <p className="text-xs text-stone-500 mt-3 text-center">
              Rendered at high resolution ({FORMATS.find(f => f.id === config.format)?.width} × {FORMATS.find(f => f.id === config.format)?.height}px)
            </p>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 p-6 flex flex-col gap-6 overflow-y-auto bg-[#121419]">
            {/* Visual Templates */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-2.5">
                1. Visual Theme & Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setConfig((prev) => ({ ...prev, template: tmpl.id }))}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      config.template === tmpl.id
                        ? 'border-amber-400 bg-amber-500/10 text-amber-200 shadow-sm'
                        : 'border-stone-800 hover:border-stone-700 bg-stone-900/60 text-stone-300'
                    }`}
                  >
                    <div className={`w-full h-4 rounded mb-1.5 border ${tmpl.bgPreview}`} />
                    <span className="text-[11px] font-medium block leading-tight truncate">{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-2.5">
                2. Export Format & Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setConfig((prev) => ({ ...prev, format: fmt.id }))}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors text-left flex items-center justify-between ${
                      config.format === fmt.id
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>{fmt.label}</span>
                    <span className="text-[10px] opacity-70 font-mono">{fmt.ratio}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Controls */}
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-2.5">
                3. Typography & Sizing
              </label>
              <div className="space-y-3">
                {/* Font Family */}
                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">Font Family</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['Cormorant Garamond', 'Playfair Display', 'Cinzel', 'Plus Jakarta Sans'] as const).map((font) => (
                      <button
                        key={font}
                        onClick={() => setConfig((prev) => ({ ...prev, fontFamily: font }))}
                        className={`px-2.5 py-1.5 text-xs rounded border transition-colors ${
                          config.fontFamily === font
                            ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                            : 'border-stone-800 text-stone-400 hover:text-stone-300'
                        }`}
                      >
                        {font}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size Slider */}
                <div>
                  <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                    <span>Font Size</span>
                    <span className="font-mono text-amber-300">{config.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="22"
                    max="48"
                    value={config.fontSize}
                    onChange={(e) => setConfig((prev) => ({ ...prev, fontSize: parseInt(e.target.value, 10) }))}
                    className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Alignment */}
                <div>
                  <span className="text-[11px] text-stone-400 block mb-1">Text Alignment</span>
                  <div className="flex gap-2">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setConfig((prev) => ({ ...prev, alignment: align }))}
                        className={`flex-1 py-1.5 rounded border text-xs flex items-center justify-center transition-colors ${
                          config.alignment === align
                            ? 'border-amber-400 bg-amber-500/15 text-amber-200'
                            : 'border-stone-800 text-stone-400 hover:text-stone-300'
                        }`}
                      >
                        {align === 'left' && <AlignLeft className="w-3.5 h-3.5" />}
                        {align === 'center' && <AlignCenter className="w-3.5 h-3.5" />}
                        {align === 'right' && <AlignRight className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Elements Toggles */}
            <div className="pt-2 border-t border-stone-800 space-y-2">
              <label className="flex items-center justify-between text-xs text-stone-300 cursor-pointer">
                <span>Display "Inspired by {quote.philosopherName}"</span>
                <input
                  type="checkbox"
                  checked={config.showAuthor}
                  onChange={(e) => setConfig((prev) => ({ ...prev, showAuthor: e.target.checked }))}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500 w-4 h-4 bg-stone-900"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-stone-300 cursor-pointer">
                <span>Display QUOTEVERSE Watermark</span>
                <input
                  type="checkbox"
                  checked={config.showWatermark}
                  onChange={(e) => setConfig((prev) => ({ ...prev, showWatermark: e.target.checked }))}
                  className="rounded border-stone-700 text-amber-500 focus:ring-amber-500 w-4 h-4 bg-stone-900"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#14171d] border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              setConfig({
                template: 'luxury_gold',
                format: 'square',
                fontFamily: 'Cormorant Garamond',
                fontSize: 34,
                textColor: '#f5f5f4',
                alignment: 'center',
                showAuthor: true,
                showWatermark: true,
              });
            }}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Styles</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyImage}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-300 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Image'}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting...' : 'Download High-Res PNG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
