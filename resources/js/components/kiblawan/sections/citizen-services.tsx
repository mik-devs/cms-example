import { Container } from '@/components/kiblawan/ui/container';
import { Headline } from '@/components/kiblawan/ui/headline';
import { Section } from '@/components/kiblawan/ui/section';
import { ServiceCard } from '@/components/kiblawan/ui/service-card';
import type { Service } from '@/types';

export function CitizenServices({ services }: { services: Service[] }) {
    return (
        <Section className="bg-cream">
            <Container>
                <Headline
                    title="Citizen Services"
                    action={{ label: 'View All Services →', href: '/services' }}
                />
                <div className="grid grid-cols-1 gap-8 min-[576px]:grid-cols-2 min-[992px]:grid-cols-4">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </Container>
        </Section>
    );
}
