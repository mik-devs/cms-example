export const translations = {
    en: {
        nav_home: 'Home',
        nav_about: 'About Kiblawan',
        nav_gov: 'Government',
        nav_services: 'Services',
        nav_transparency: 'Transparency',
        nav_contact: 'Contact Us',
        footer_tagline: 'Serbisyong Mabilis, Bayang Maasahan.',
        footer_quicklinks: 'Quick Links',
        footer_transparency: 'Transparency',
        footer_contact: 'Contact Us',
        chat_greeting:
            'Hello! I am #BastaTagaKiblawanNo.1, your AI assistant. How can I help you today?',
        chat_placeholder: 'Type your question...',
    },
    fil: {
        nav_home: 'Home',
        nav_about: 'Tungkol sa Kiblawan',
        nav_gov: 'Pamahalaan',
        nav_services: 'Serbisyo',
        nav_transparency: 'Transparency',
        nav_contact: 'Makipag-ugnayan',
        footer_tagline: 'Serbisyong Mabilis, Bayang Maasahan.',
        footer_quicklinks: 'Mabilis na Links',
        footer_transparency: 'Transparency',
        footer_contact: 'Kontakin Kami',
        chat_greeting:
            'Kumusta! Ako si #BastaTagaKiblawanNo.1, ang iyong AI assistant. Paano kita matutulungan ngayon?',
        chat_placeholder: 'Isulat ang iyong katanungan...',
    },
    ceb: {
        nav_home: 'Home',
        nav_about: 'Mahitungod sa Kiblawan',
        nav_gov: 'Gobyerno',
        nav_services: 'Serbisyo',
        nav_transparency: 'Transparency',
        nav_contact: 'Kontaka Kami',
        footer_tagline: 'Serbisyong Mabilis, Bayang Maasahan.',
        footer_quicklinks: 'Paspas nga Links',
        footer_transparency: 'Transparency',
        footer_contact: 'Kontaka Kami',
        chat_greeting:
            'Kumusta! Ako si #BastaTagaKiblawanNo.1, ang imong AI assistant. Unsaon nako pagtabang nimo karon?',
        chat_placeholder: 'Isulat ang imong pangutana...',
    },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['en'];
