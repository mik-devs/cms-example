import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import type { Language } from '@/lib/translations';

interface ChatMessage {
    id: number;
    role: 'user' | 'bot';
    text: string;
}

const FALLBACK_REPLIES: Record<Language, string> = {
    en: 'Sorry, I am having a technical issue right now. Please try again or call the municipal hall.',
    fil: 'Paumanhin, may technical issue ako ngayon. Subukan muli o tumawag sa municipal hall.',
    ceb: 'Pasensya na, naa koy technical nga problema karon. Palihug sulayi pag-usab o tawag sa municipal hall.',
};

export function ChatbotWidget() {
    const { lang, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, role: 'bot', text: t.chat_greeting },
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const nextId = useRef(2);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        setMessages((current) =>
            current.map((message) =>
                message.id === 1 && message.role === 'bot'
                    ? { ...message, text: t.chat_greeting }
                    : message,
            ),
        );
    }, [t.chat_greeting]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    async function sendMessage(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = input.trim();
        const requestLanguage = lang;

        if (!message || isLoading) {
            return;
        }

        const userMessage: ChatMessage = {
            id: nextId.current++,
            role: 'user',
            text: message,
        };

        setMessages((current) => [...current, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, language: requestLanguage }),
            });

            const data = (await response.json().catch(() => null)) as {
                reply?: string;
            } | null;

            const reply = data?.reply ?? FALLBACK_REPLIES[requestLanguage];

            setMessages((current) => [
                ...current,
                { id: nextId.current++, role: 'bot', text: reply },
            ]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    id: nextId.current++,
                    role: 'bot',
                    text: FALLBACK_REPLIES[requestLanguage],
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div
                className={cn(
                    'fixed right-4 bottom-20 z-50 w-[min(calc(100vw-2rem),380px)] origin-bottom-right transition-all duration-300 sm:right-6 sm:bottom-24',
                    isOpen
                        ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                        : 'pointer-events-none translate-y-4 scale-95 opacity-0',
                )}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <div className="flex h-[min(70vh,560px)] flex-col overflow-hidden rounded-[24px] border border-line-soft bg-white/90 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-3 border-b border-white/10 bg-forest px-5 py-4 text-white">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line-soft bg-white shadow-sm">
                            <img
                                src="/images/image.png"
                                alt="Kiblawan Logo"
                                className="h-8 w-8 object-contain"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-sm font-bold">
                                #BastaTagaKiblawanNo.1
                            </p>
                            <p className="flex items-center gap-1.5 text-xs text-white/70">
                                <span className="size-1.5 rounded-full bg-green-400" />
                                Online
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                            aria-label="Close chat"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    <div className="k-scrollbar flex-1 space-y-3 overflow-y-auto bg-cream/60 px-4 py-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    'flex',
                                    message.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start',
                                )}
                            >
                                <p
                                    className={cn(
                                        'max-w-[85%] rounded-[18px] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line',
                                        message.role === 'user'
                                            ? 'rounded-br-md bg-forest text-white'
                                            : 'rounded-bl-md border border-line-soft bg-white text-ink shadow-sm',
                                    )}
                                >
                                    {message.text}
                                </p>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-line-soft bg-white px-4 py-3 shadow-sm">
                                    <div
                                        className="size-2 animate-[wave_1.2s_infinite_ease-in-out] rounded-full bg-ink-muted"
                                        style={{ animationDelay: '0s' }}
                                    />
                                    <div
                                        className="size-2 animate-[wave_1.2s_infinite_ease-in-out] rounded-full bg-ink-muted"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                    <div
                                        className="size-2 animate-[wave_1.2s_infinite_ease-in-out] rounded-full bg-ink-muted"
                                        style={{ animationDelay: '0.4s' }}
                                    />
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form
                        onSubmit={sendMessage}
                        className="flex items-center gap-2 border-t border-line-soft bg-white/80 px-3 py-3"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder={t.chat_placeholder}
                            maxLength={1000}
                            className="min-w-0 flex-1 rounded-full border border-line-soft bg-cream/60 px-4 py-2.5 text-sm text-ink transition-all outline-none placeholder:text-ink-muted focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)]"
                            aria-label="Chat message"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Send message"
                        >
                            <Send className="size-4" />
                        </button>
                    </form>
                </div>
            </div>

            <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="group fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-forest text-white shadow-k-deep transition-all duration-300 hover:scale-105 hover:bg-green-600 sm:right-6 sm:bottom-6"
                aria-label={
                    isOpen ? 'Close chat assistant' : 'Open chat assistant'
                }
                aria-expanded={isOpen}
            >
                <span className="absolute -inset-1 animate-ping rounded-full bg-forest/40" />
                {isOpen ? (
                    <X className="relative size-6" />
                ) : (
                    <MessageCircle className="relative size-6" />
                )}
                <span className="pointer-events-none absolute right-full mr-3 hidden w-max rounded-full bg-forest px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-k-card transition-opacity duration-200 group-hover:opacity-100 sm:block">
                    Ask #BastaTagaKiblawanNo.1
                </span>
            </button>
        </>
    );
}
