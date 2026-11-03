import { Phone } from 'lucide-react';
import type { EmergencyContact } from '@/types';
import { DynamicIcon } from './dynamic-icon';

export function HotlineCard({ contact }: { contact: EmergencyContact }) {
    return (
        <div className="group h-full rounded-[20px] border border-white/15 bg-white/10 p-6 px-6 transition-colors duration-300 ease-k-smooth hover:border-gold hover:bg-white/15">
            <div className="mb-2.5 flex items-center gap-2.5 text-[0.95rem] leading-tight font-extrabold text-white">
                <span className="inline-grid size-[42px] shrink-0 place-items-center rounded-full border border-gold-soft/35 bg-gold/15 text-gold-soft">
                    <DynamicIcon name={contact.icon} className="size-4" />
                </span>
                <span>{contact.name}</span>
            </div>
            <div className="flex items-center gap-2.5 pl-[calc(42px+0.65rem)] text-[0.9rem] font-semibold tracking-[0.02em] text-mint-pale">
                <Phone className="size-3.5 text-gold-soft" />
                {contact.phone}
            </div>
        </div>
    );
}
