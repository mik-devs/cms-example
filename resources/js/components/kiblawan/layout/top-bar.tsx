import { Contrast } from 'lucide-react';
import type { A11ySize } from '@/hooks/use-a11y';
import { useLanguage } from '@/context/language-context';
import type { Language } from '@/lib/translations';

interface TopBarProps {
    size: A11ySize;
    onSizeChange: (size: A11ySize) => void;
    contrast: boolean;
    onToggleContrast: () => void;
}

const sizeOptions: { label: string; value: A11ySize; ariaLabel: string }[] = [
    { label: 'A-', value: 'sm', ariaLabel: 'Decrease text size (A-)' },
    { label: 'A', value: 'md', ariaLabel: 'Reset text size (A)' },
    { label: 'A+', value: 'lg', ariaLabel: 'Increase text size (A+)' },
];

const languages: { code: Language; label: string; ariaLabel: string }[] = [
    { code: 'en', label: 'EN', ariaLabel: 'English (EN)' },
    { code: 'fil', label: 'FIL', ariaLabel: 'Filipino (FIL)' },
    { code: 'ceb', label: 'CEB', ariaLabel: 'Cebuano (CEB)' },
];

export default function TopBar({
    size,
    onSizeChange,
    contrast,
    onToggleContrast,
}: TopBarProps) {
    const { lang, setLang } = useLanguage();

    const buttonClass =
        'border border-white/25 bg-white/10 px-1.5 py-0.5 rounded text-[0.7rem] text-white transition-all hover:border-gold hover:bg-gold hover:text-primary-dark';
    const activeButtonClass = 'border-gold bg-gold text-primary-dark';

    return (
        <div className="fixed top-0 right-0 left-0 z-[100] flex h-[34px] items-center border-b-2 border-gold bg-(--color-dark-brown) text-[0.78rem] text-cream">
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

                    <div className="flex gap-0.5">
                        {languages.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                onClick={() => setLang(item.code)}
                                aria-label={item.ariaLabel}
                                aria-pressed={lang === item.code}
                                className={
                                    lang === item.code
                                        ? 'px-1 py-0.5 text-[0.7rem] font-bold text-gold'
                                        : 'px-1 py-0.5 text-[0.7rem] text-white/60'
                                }
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
