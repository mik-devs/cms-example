import { useEffect } from 'react';
import Footer from '@/components/kiblawan/layout/footer';
import Navbar from '@/components/kiblawan/layout/navbar';
import TopBar from '@/components/kiblawan/layout/top-bar';
import { ChatbotWidget } from '@/components/kiblawan/chatbot-widget';
import { useA11y } from '@/hooks/use-a11y';
import { LanguageProvider } from '@/context/language-context';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    const { size, setSize, contrast, toggleContrast } = useA11y();

    useEffect(() => {
        document.title = title ?? 'Municipality of Kiblawan';
    }, [title]);

    return (
        <LanguageProvider>
            <div className="min-h-screen overflow-x-hidden bg-cream pt-[var(--nav-offset)] font-sans leading-[1.8] tracking-[0.005em] text-ink">
                <TopBar
                    size={size}
                    onSizeChange={setSize}
                    contrast={contrast}
                    onToggleContrast={toggleContrast}
                />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <ChatbotWidget />
            </div>
        </LanguageProvider>
    );
}
