const EMPHASIS_SPLIT = /(<em>.*?<\/em>)/g;
const EMPHASIS_MATCH = /^<em>(.*?)<\/em>$/;
const EMPHASIS_TAG = /<\/?em>/i;

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderLegacyEmphasis(input: string): React.ReactNode {
    return input.split(EMPHASIS_SPLIT).map((part, index) => {
        const match = part.match(EMPHASIS_MATCH);

        if (match) {
            return (
                <em key={index} className="text-gold not-italic">
                    {match[1]}
                </em>
            );
        }

        return part;
    });
}

export function renderEmphasisTitle(
    input: string,
    emphasis?: string | null,
): React.ReactNode {
    const trimmedEmphasis = emphasis?.trim();

    if (trimmedEmphasis && !EMPHASIS_TAG.test(input)) {
        const emphasisPattern = new RegExp(
            `(${escapeRegExp(trimmedEmphasis)})`,
            'gi',
        );
        const lowerEmphasis = trimmedEmphasis.toLowerCase();

        return input.split(emphasisPattern).map((part, index) =>
            part.toLowerCase() === lowerEmphasis ? (
                <em key={index} className="text-gold not-italic">
                    {part}
                </em>
            ) : (
                part
            ),
        );
    }

    return renderLegacyEmphasis(input);
}
