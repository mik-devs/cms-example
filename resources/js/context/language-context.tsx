import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { translations, type Language } from '@/lib/translations';

const LANGUAGE_KEY = 'site-language';

interface LanguageContextValue {
    lang: Language;
    setLang: (language: Language) => void;
    t: (typeof translations)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
    return value === 'en' || value === 'fil' || value === 'ceb';
}

function getStoredLanguage(): Language {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

    return isLanguage(storedLanguage) ? storedLanguage : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>(getStoredLanguage);

    const setLang = useCallback((nextLanguage: Language) => {
        setLangState(nextLanguage);
        window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    }, []);

    const value = useMemo(
        () => ({ lang, setLang, t: translations[lang] }),
        [lang, setLang],
    );

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextValue {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
}
