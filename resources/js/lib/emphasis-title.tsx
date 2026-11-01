const EMPHASIS_SPLIT = /(<em>.*?<\/em>)/g;
const EMPHASIS_MATCH = /^<em>(.*?)<\/em>$/;

export function renderEmphasisTitle(input: string): React.ReactNode {
    return input.split(EMPHASIS_SPLIT).map((part, index) => {
        const match = part.match(EMPHASIS_MATCH);

        if (match) {
            return (
                <em key={index} className="text-gold-soft not-italic">
                    {match[1]}
                </em>
            );
        }

        return part;
    });
}
