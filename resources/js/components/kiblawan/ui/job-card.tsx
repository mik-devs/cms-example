import { Link } from '@inertiajs/react';
import { Building2, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/format-date';
import type { JobPosting } from '@/types';

export function JobCard({ job }: { job: JobPosting }) {
    return (
        <Link
            href={`/careers/${job.id}`}
            className="group block border-b border-dashed border-line pb-4 last:border-0 last:pb-0"
        >
            <span className="mb-1.5 block text-[0.95rem] leading-tight font-extrabold text-primary transition-all group-hover:translate-x-1 group-hover:text-green-dark">
                {job.title}
            </span>
            <div className="flex justify-between text-[0.78rem] text-ink-muted">
                <span className="flex items-center gap-1">
                    <Building2 className="size-3 text-primary" />
                    {job.department}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="size-3 text-primary" />
                    {formatDate(job.deadline)}
                </span>
            </div>
        </Link>
    );
}
