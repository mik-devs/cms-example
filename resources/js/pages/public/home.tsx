import { Head } from '@inertiajs/react';
import { AchievementsCarousel } from '@/components/kiblawan/sections/achievements-carousel';
import { BarangayMap } from '@/components/kiblawan/sections/barangay-map';
import { CitizenServices } from '@/components/kiblawan/sections/citizen-services';
import { EmergencyHotlines } from '@/components/kiblawan/sections/emergency-hotlines';
import { HeroSlider } from '@/components/kiblawan/sections/hero-slider';
import { KiblawanVideos } from '@/components/kiblawan/sections/kiblawan-hymn';
import { MayorCorner } from '@/components/kiblawan/sections/mayor-corner';
import { NewsCarousel } from '@/components/kiblawan/sections/news-carousel';
import { QuickStats } from '@/components/kiblawan/sections/quick-stats';
import { TourismHighlights } from '@/components/kiblawan/sections/tourism-highlights';
import { TransparencySeal } from '@/components/kiblawan/sections/transparency-seal';
import { WeatherWidget } from '@/components/kiblawan/sections/weather-widget';
import PublicLayout from '@/layouts/public/public-layout';
import type {
    Achievement,
    AnnualReport,
    Barangay,
    Bid,
    EmergencyContact,
    HeroSlide,
    JobPosting,
    MayorMessage,
    News,
    OfficialVideo,
    Service,
    Stat,
    TourismSpot,
} from '@/types';

interface HomeProps {
    settings: Record<string, string | null>;
    heroSlides: HeroSlide[];
    stats: Stat[];
    services: Service[];
    latestNews: News[];
    achievements: Achievement[];
    barangays: Barangay[];
    tourismSpots: TourismSpot[];
    latestJobs: JobPosting[];
    emergencyContacts: EmergencyContact[];
    bids: Bid[];
    annualReports: AnnualReport[];
    officialVideos?: OfficialVideo[];
    mayorMessage: MayorMessage | null;
}

export default function Home({
    settings,
    heroSlides,
    stats,
    services,
    latestNews,
    achievements,
    barangays,
    tourismSpots,
    latestJobs,
    emergencyContacts,
    bids,
    annualReports,
    officialVideos = [],
    mayorMessage,
}: HomeProps) {
    const mapEmbedUrl = settings.map_embed ?? '';
    const lcpImage = heroSlides[0]?.image_url;

    return (
        <PublicLayout title="Municipality of Kiblawan">
            <Head>
                <meta
                    head-key="description"
                    name="description"
                    content="Official Website of the Municipality of Kiblawan, Davao del Sur. Serbisyong Mabilis, Bayang Maasahan."
                />
                {lcpImage && (
                    <link
                        rel="preload"
                        as="image"
                        href={lcpImage}
                        fetchPriority="high"
                    />
                )}
            </Head>
            <HeroSlider slides={heroSlides} />
            <QuickStats stats={stats} />
            <CitizenServices services={services} />
            <NewsCarousel news={latestNews} />
            <AchievementsCarousel achievements={achievements} />
            <BarangayMap barangays={barangays} mapEmbedUrl={mapEmbedUrl} />
            <TourismHighlights spots={tourismSpots} />
            <MayorCorner message={mayorMessage} jobs={latestJobs} />
            <KiblawanVideos videos={officialVideos} />
            <WeatherWidget />
            <TransparencySeal bids={bids} annualReports={annualReports} />
            <EmergencyHotlines contacts={emergencyContacts} />
        </PublicLayout>
    );
}
