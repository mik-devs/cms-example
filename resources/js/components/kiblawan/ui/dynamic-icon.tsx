import {
    Ambulance,
    Award,
    Briefcase,
    Building2,
    Calendar,
    Clock,
    Contrast,
    FileQuestion,
    FileText,
    HardHat,
    HeartHandshake,
    HeartPulse,
    Home,
    Mail,
    MapPin,
    Phone,
    Search,
    Shield,
    Sprout,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
    Ambulance,
    Award,
    Briefcase,
    Building2,
    Calendar,
    Clock,
    Contrast,
    FileText,
    HardHat,
    HeartHandshake,
    HeartPulse,
    Home,
    Mail,
    MapPin,
    Phone,
    Search,
    Shield,
    Sprout,
    'fa-adjust': Contrast,
    'fa-ambulance': Ambulance,
    'fa-briefcase': Briefcase,
    'fa-building': Building2,
    'fa-calendar-alt': Calendar,
    'fa-certificate': Award,
    'fa-clock': Clock,
    'fa-envelope': Mail,
    'fa-file-alt': FileText,
    'fa-file-pdf': FileText,
    'fa-hands-helping': HeartHandshake,
    'fa-hard-hat': HardHat,
    'fa-heartbeat': HeartPulse,
    'fa-home': Home,
    'fa-map-marker-alt': MapPin,
    'fa-phone-alt': Phone,
    'fa-search': Search,
    'fa-seedling': Sprout,
    'fa-shield-alt': Shield,
};

export function DynamicIcon({
    name,
    className,
}: {
    name: string;
    className?: string;
}) {
    const key = name ?? '';
    const Icon =
        iconMap[key] ?? iconMap[`fa-${key.toLowerCase()}`] ?? FileQuestion;

    return <Icon className={className} />;
}
