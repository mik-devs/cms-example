import { Container } from '@/components/kiblawan/ui/container';
import { Section } from '@/components/kiblawan/ui/section';

export function WeatherWidget() {
    return (
        <Section className="bg-cream py-16">
            <Container>
                <div className="mb-10 text-center">
                    <h2 className="mb-3 font-display text-3xl font-bold text-primary md:text-4xl">
                        Kiblawan Weather Forecast
                    </h2>
                    <p className="mx-auto max-w-2xl leading-relaxed text-ink-muted">
                        Plan your visit with real-time weather updates, rain
                        radar, and wind conditions.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-line-soft bg-white/90 p-2 shadow-k-soft backdrop-blur md:p-4">
                    <div className="aspect-video w-full overflow-hidden rounded-xl bg-cream md:aspect-[21/9]">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=10&overlay=rain&product=ecmwf&level=surface&lat=6.65&lon=125.20&detailLat=6.65&detailLon=125.20&detail=true"
                            frameBorder="0"
                            title="Kiblawan Weather Forecast"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <p className="mt-4 text-center text-xs text-ink-muted">
                        Weather map provided by{' '}
                        <a
                            href="https://www.windy.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline transition-colors hover:text-primary"
                        >
                            Windy.com
                        </a>
                    </p>
                    <p className="mt-1 text-center text-xs text-ink-muted">
                        Note: The detailed forecast below the map is initially
                        set to Kiblawan. You may click on the map to view
                        neighboring areas.
                    </p>
                </div>
            </Container>
        </Section>
    );
}
