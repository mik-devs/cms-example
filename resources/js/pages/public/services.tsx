import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import { ServiceCard } from '@/components/kiblawan/ui/service-card';
import PublicLayout from '@/layouts/public/public-layout';
import type { Service } from '@/types';

export default function Services({ services }: { services: Service[] }) {
    return (
        <PublicLayout title="Services">
            <PageHeader
                title="Services"
                subtitle="Explore services provided by the Municipality of Kiblawan."
            />
            <Container className="py-12 md:py-16">
                {services.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 min-[576px]:grid-cols-2 min-[992px]:grid-cols-4">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-[20px] border border-line bg-white p-8 text-ink-muted">
                        Services will be listed here soon.
                    </p>
                )}
            </Container>
        </PublicLayout>
    );
}
