import { Link } from '@inertiajs/react';
import type { Service } from '@/types';
import { DynamicIcon } from './dynamic-icon';

export function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            href={service.link ?? '#'}
            className="group block rounded-[20px] border border-line bg-white p-10 px-8 text-center shadow-k-card transition-colors duration-300 ease-k-smooth hover:border-primary/30 hover:shadow-k-glow"
        >
            <div className="mx-auto mb-5 flex size-[66px] items-center justify-center rounded-full bg-green-soft text-green-dark ring-1 ring-green/10 transition-colors duration-300 ease-k-smooth group-hover:bg-green group-hover:text-white">
                <DynamicIcon name={service.icon} className="size-6" />
            </div>
            <h4 className="mb-3 font-sans text-[1.05rem] font-extrabold tracking-[0.01em] text-primary">
                {service.title}
            </h4>
            <p className="m-0 text-[0.84rem] leading-snug text-ink-muted">
                {service.description}
            </p>
        </Link>
    );
}
