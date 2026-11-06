export function renderEmphasisTitle(title: string, emphasis: string | null) {
  if (!title) return title;

  const cleanTitle = title.replace(/<\/?em>/gi, '');
  
  let wordsToHighlight: string[] = [];
  
  if (emphasis && emphasis.trim() !== '') {
    wordsToHighlight = emphasis.split('|').map(w => w.trim()).filter(Boolean);
  } else {
    // SMART FALLBACK: If no emphasis provided, highlight "Kiblawan" or the last word
    if (cleanTitle.toLowerCase().includes('kiblawan')) {
      wordsToHighlight = ['Kiblawan'];
    } else {
      const words = cleanTitle.split(' ');
      if (words.length > 0) wordsToHighlight = [words[words.length - 1]];
    }
  }

  const escapedWords = wordsToHighlight.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');
  const parts = cleanTitle.split(regex);
  
  return parts.map((part, index) => {
    const isHighlighted = wordsToHighlight.some(w => w.toLowerCase() === part.toLowerCase());
    return isHighlighted 
      ? <span key={index} className="text-gold not-italic">{part}</span> 
      : part;
  });
}