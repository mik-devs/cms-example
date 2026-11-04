import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

export default function TermsOfUse() {
    return (
        <PublicLayout title="Terms of Use">
            <PageHeader
                title="Terms of Use"
                subtitle="Rules and conditions for using the official website of the Municipality of Kiblawan."
            />
            <Container className="py-12 md:py-16">
                <article className="prose prose-lg mx-auto max-w-3xl text-ink">
                    <p>
                        By accessing and using this website, you agree to comply
                        with and be bound by these Terms of Use. If you do not
                        agree, please discontinue use of the site.
                    </p>

                    <h2>Use of the Website</h2>
                    <p>
                        This website is provided by the Municipality of Kiblawan
                        for public information and service access. You agree to
                        use it only for lawful purposes and in a manner that does
                        not infringe the rights of others or restrict their use.
                    </p>

                    <h2>Accuracy of Information</h2>
                    <p>
                        While we strive to keep information accurate and
                        up-to-date, the Municipality makes no warranties regarding
                        completeness or accuracy. Official documents and
                        transactions should be verified with the Municipal Hall.
                    </p>

                    <h2>Intellectual Property</h2>
                    <p>
                        All content, logos, and materials on this website are the
                        property of the Municipality of Kiblawan unless otherwise
                        stated. Unauthorized reproduction or distribution is
                        prohibited.
                    </p>

                    <h2>External Links</h2>
                    <p>
                        This website may contain links to external sites. The
                        Municipality is not responsible for the content or privacy
                        practices of those sites.
                    </p>

                    <h2>Limitation of Liability</h2>
                    <p>
                        The Municipality shall not be liable for any damages
                        arising from the use or inability to use this website.
                    </p>

                    <h2>Changes to These Terms</h2>
                    <p>
                        We may revise these Terms of Use at any time. Continued
                        use of the website constitutes acceptance of the updated
                        terms.
                    </p>

                    <p className="text-sm text-ink-muted">
                        Effective date: January 1, 2026
                    </p>
                </article>
            </Container>
        </PublicLayout>
    );
}
