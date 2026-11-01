import { Link } from '@inertiajs/react';
import type { Service } from '@/types';
import { DynamicIcon } from './dynamic-icon';

export function ServiceCard({ service }: { service: Service }) {
    return (
        <Link
            href={service.link ?? '#'}
            className="group block rounded-[20px] border border-line-soft bg-white/75 p-10 px-8 text-center shadow-k-card backdrop-blur-[14px] backdrop-saturate-150 transition-all duration-[400ms] ease-k-smooth hover:-translate-y-2 hover:border-gold hover:shadow-k-glow"
        >
            <div className="mx-auto mb-5 flex size-[66px] items-center justify-center rounded-full bg-green-soft text-green-600 shadow-[0_8px_20px_rgba(22,96,58,0.14)] transition-all duration-[400ms] ease-k-smooth group-hover:scale-[1.12] group-hover:bg-green group-hover:text-white group-hover:shadow-[0_12px_24px_rgba(30,122,70,0.28)]">
                <DynamicIcon name={service.icon} className="size-6" />
            </div>
            <h4 className="mb-3 font-sans text-[1.05rem] font-extrabold tracking-[0.01em] text-forest">
                {service.title}
            </h4>
            <p className="m-0 text-[0.84rem] leading-snug text-ink-muted">
                {service.description}
            </p>
        </Link>
    );
}
