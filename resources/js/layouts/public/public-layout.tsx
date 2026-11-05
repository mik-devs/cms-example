import { useEffect, useState } from 'react';
import Footer from '@/components/kiblawan/layout/footer';
import Navbar from '@/components/kiblawan/layout/navbar';
import TopBar from '@/components/kiblawan/layout/top-bar';
import { ChatbotWidget } from '@/components/kiblawan/chatbot-widget';

import { LanguageProvider } from '@/context/language-context';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title }: PublicLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.title = title ?? 'Municipality of Kiblawan';
    }, [title]);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <LanguageProvider>
            <div className="min-h-screen overflow-x-hidden bg-cream pt-[var(--nav-offset)] font-sans leading-[1.8] tracking-[0.005em] text-ink">
                <TopBar isScrolled={isScrolled} />
                <Navbar isScrolled={isScrolled} />
                <main>{children}</main>
                <Footer />
                <ChatbotWidget />
            </div>
        </LanguageProvider>
    );
}
