import { Facebook, Lock } from 'lucide-react';

interface TopBarProps {
    isScrolled?: boolean;
}

export default function TopBar({ isScrolled = false }: TopBarProps) {
    return (
        <div
            className={`fixed top-0 right-0 left-0 z-[100] flex h-[34px] items-center border-b-2 border-gold bg-(--color-dark-brown) text-[0.78rem] text-cream transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4">
                <span className="hidden md:inline">
                    Republic of the Philippines
                </span>

                <div className="topbar-right flex items-center gap-4">
                    <div className="flex items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-3 py-1 text-[0.7rem] text-white/90">
                        <Lock size={10} className="text-green-400" />
                        <span>kiblawan.gov.ph</span>
                    </div>

                    <a
                        href="https://www.facebook.com/Carl-Jason-Rama-61570573016071/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 transition-colors hover:text-gold"
                        aria-label="Facebook Page"
                    >
                        <Facebook size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
