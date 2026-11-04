export function renderEmphasisTitle(title: string, emphasis: string | null) {
  if (!title) return title;

  // 1. Strip old <em> tags from the title to clean legacy data
  const cleanTitle = title.replace(/<\/?em>/gi, '');

  // 2. If there's no emphasis, just return the clean title
  if (!emphasis) return cleanTitle;
  
  const wordsToHighlight = emphasis.split(',').map(w => w.trim()).filter(Boolean);
  if (wordsToHighlight.length === 0) return cleanTitle;

  // 3. Highlight the words based on the emphasis field
  const escapedWords = wordsToHighlight.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');
  
  const parts = cleanTitle.split(regex);
  
  return parts.map((part, index) => {
    const isHighlighted = wordsToHighlight.some(w => w.toLowerCase() === part.toLowerCase());
    return isHighlighted 
      ? <span key={index} className="text-gold not-italic">{part}</span>       : part;
  });
}