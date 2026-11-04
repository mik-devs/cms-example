import { Container } from '@/components/kiblawan/ui/container';
import { PageHeader } from '@/components/kiblawan/ui/page-header';
import PublicLayout from '@/layouts/public/public-layout';

export default function PrivacyPolicy() {
    return (
        <PublicLayout title="Privacy Policy">
            <PageHeader
                title="Privacy Policy"
                subtitle="How the Municipality of Kiblawan collects, uses, and protects your personal information."
            />
            <Container className="py-12 md:py-16">
                <article className="prose prose-lg mx-auto max-w-3xl text-ink">
                    <p>
                        This Privacy Policy explains how the Municipality of
                        Kiblawan, Davao del Sur (the &quot;Municipality&quot;)
                        collects, uses, stores, and protects personal information
                        in compliance with the Data Privacy Act of 2012 (Republic
                        Act No. 10173) and its implementing rules and regulations.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>
                        We may collect personal information that you voluntarily
                        provide when you use our website, contact our offices, or
                        avail of municipal services. This may include your name,
                        address, contact number, email address, and other details
                        necessary to process your request.
                    </p>

                    <h2>How We Use Your Information</h2>
                    <ul>
                        <li>To respond to inquiries and provide municipal services.</li>
                        <li>To process permits, licenses, and other government transactions.</li>
                        <li>To improve our website and public service delivery.</li>
                        <li>To comply with legal and regulatory requirements.</li>
                    </ul>

                    <h2>Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell or rent your personal information. We may
                        share information only when required by law, authorized by
                        you, or necessary to fulfill a government function.
                    </p>

                    <h2>Data Security</h2>
                    <p>
                        We implement reasonable organizational, physical, and
                        technical security measures to protect your personal data
                        against unauthorized access, alteration, disclosure, or
                        destruction.
                    </p>

                    <h2>Your Rights</h2>
                    <p>
                        You have the right to be informed, to access, to
                        rectification, to erasure or blocking, to data
                        portability, and to file a complaint. To exercise these
                        rights, please contact the Municipal Hall.
                    </p>

                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time.
                        Changes will be posted on this page with an updated
                        effective date.
                    </p>

                    <p className="text-sm text-ink-muted">
                        Effective date: January 1, 2026
                    </p>
                </article>
            </Container>
        </PublicLayout>
    );
}
