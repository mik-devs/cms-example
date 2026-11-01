import { Contrast } from 'lucide-react';
import { useState } from 'react';
import type { A11ySize } from '@/hooks/use-a11y';

type Language = 'EN' | 'FIL' | 'CEB';

interface TopBarProps {
    size: A11ySize;
    onSizeChange: (size: A11ySize) => void;
    contrast: boolean;
    onToggleContrast: () => void;
}

const sizeOptions: { label: string; value: A11ySize; ariaLabel: string }[] = [
    { label: 'A-', value: 'sm', ariaLabel: 'Decrease text size' },
    { label: 'A', value: 'md', ariaLabel: 'Reset text size' },
    { label: 'A+', value: 'lg', ariaLabel: 'Increase text size' },
];

const languages: { code: Language; ariaLabel: string }[] = [
    { code: 'EN', ariaLabel: 'English' },
    { code: 'FIL', ariaLabel: 'Filipino' },
    { code: 'CEB', ariaLabel: 'Cebuano' },
];

export default function TopBar({
    size,
    onSizeChange,
    contrast,
    onToggleContrast,
}: TopBarProps) {
    const [language, setLanguage] = useState<Language>('EN');

    const buttonClass =
        'border border-white/20 bg-white/10 px-1.5 py-0.5 rounded text-[0.7rem] text-white transition-all hover:border-gold hover:bg-gold hover:text-maroon-dark';
    const activeButtonClass = 'border-gold bg-gold text-maroon-dark';

    return (
        <div className="fixed top-0 right-0 left-0 z-[100] flex h-[34px] items-center border-b-2 border-gold bg-maroon-dark text-[0.78rem] text-gold-soft shadow-k-soft">
            <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4">
                <span className="hidden md:inline">
                    Republic of the Philippines
                </span>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="hidden opacity-70 sm:inline">
                            Text Size:
                        </span>

                        {sizeOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onSizeChange(option.value)}
                                aria-label={option.ariaLabel}
                                aria-pressed={size === option.value}
                                className={
                                    size === option.value
                                        ? `${buttonClass} ${activeButtonClass}`
                                        : buttonClass
                                }
                            >
                                {option.label}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={onToggleContrast}
                            aria-label="Toggle high contrast"
                            aria-pressed={contrast}
                            className={`ml-2.5 inline-flex items-center gap-1 ${contrast ? `${buttonClass} ${activeButtonClass}` : buttonClass}`}
                        >
                            <Contrast className="size-3.5" />
                            Contrast
                        </button>
                    </div>

                    <div className="hidden gap-0.5 sm:flex">
                        {languages.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                onClick={() => setLanguage(item.code)}
                                aria-label={item.ariaLabel}
                                aria-pressed={language === item.code}
                                className={
                                    language === item.code
                                        ? 'px-1 py-0.5 text-[0.7rem] font-bold text-gold'
                                        : 'px-1 py-0.5 text-[0.7rem] text-white/60'
                                }
                            >
                                {item.code}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
