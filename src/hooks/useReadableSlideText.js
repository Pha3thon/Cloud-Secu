/**
 * Hook and text generator for Text-To-Speech (TTS) reading of curriculum slides.
 * Formats slide content for clean speech synthesis without reading raw URLs aloud.
 */

export function getReadableSlideText(slide) {
  if (!slide) return '';

  const format = slide.format || (slide.isOfficialDefinition ? 'official-definition' : 'standard');

  if (format === 'eli5') {
    const content = typeof slide.body === 'string'
      ? slide.body
      : (slide.textLines || []).join('. ');
    return `${slide.title}. In simple words: ${content}`;
  }

  if (format === 'official-definition') {
    const stdName = slide.standardName || slide.standardBody || '';
    const stdTitle = slide.standardFullTitle || slide.standardTitle || '';
    const def = slide.definitionText || '';
    const bridge = slide.bridgeLine || '';
    return `Official Definition from ${stdName}, ${stdTitle}. Definition: ${def}. Plain language connection: ${bridge}. Official source link available on screen.`;
  }

  // Standard slide
  const lines = (slide.textLines || (typeof slide.body === 'string' ? [slide.body] : slide.body) || []).join('. ');
  let text = `${slide.title}. ${lines}`;
  if (slide.realLifeExample?.analogy) {
    text += `. Real life analogy: ${slide.realLifeExample.analogy}`;
  }
  return text;
}

export default function useReadableSlideText(slide) {
  return getReadableSlideText(slide);
}
