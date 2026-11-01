import { Link } from '@inertiajs/react';
import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { HotlineCard } from '@/components/kiblawan/ui/hotline-card';
import { Section } from '@/components/kiblawan/ui/section';
import type { EmergencyContact } from '@/types';

export function EmergencyHotlines({
    contacts,
}: {
    contacts: EmergencyContact[];
}) {
    if (contacts.length === 0) {
        return null;
    }

    return (
        <Section className="bg-k-grad-green text-white">
            <Container>
                <Headline
                    title="Emergency Hotlines"
                    align="center"
                    className="text-white"
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {contacts.map((contact) => (
                        <HotlineCard key={contact.id} contact={contact} />
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/government/directories"
                        className="inline-flex items-center gap-1 text-[0.85rem] font-bold uppercase tracking-[0.05em] text-gold-soft transition-colors hover:text-gold"
                    >
                        ‹ View all Office Directories ›
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
