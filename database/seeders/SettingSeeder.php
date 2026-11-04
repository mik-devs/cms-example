<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name' => 'Municipality of Kiblawan',
            'tagline' => 'Davao del Sur, Philippines',
            'description' => 'Serbisyong Mabilis, Bayang Maasahan. Ang opisyal na portal ng Pamahalaang Bayan ng Kiblawan.',
            'address' => 'Dagohoy Street, Barangay Poblacion, Kiblawan, Davao del Sur, Philippines',
            'phone' => '(082) 000-0000',
            'email' => 'info@kiblawan.gov.ph',
            'office_hours' => 'Mon – Fri · 8:00 AM – 5:00 PM',
            'logo' => '/images/image.png',
            'map_embed' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126769.88829534827!2d125.18891737431639!3d6.658127993312388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f85df5582ba10f%3A0x6b23438c395397b6!2sKiblawan%2C%20Davao%20del%20Sur!5e0!3m2!1sen!2sph!4v1715000000000!5m2!1sen!2sph',
        ];

        foreach ($settings as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => $key === 'map_embed' ? 'text' : 'string',
                    'group' => in_array($key, ['address', 'phone', 'email', 'office_hours', 'map_embed'], true) ? 'contact' : 'general',
                ],
            );
        }

        Setting::updateOrCreate(
            ['key' => 'kiblawan_history'],
            [
                'value' => <<<'TEXT'
The Municipality of Kiblawan is a town located in the province of Davao del Sur, Philippines. Its history is rooted in the early communities of Mindanao, indigenous culture, agriculture, and the development of local governance.

1. Origin of the Name Kiblawan
According to local tradition, the name Kiblawan originated from the combination of the names of two lovers, Kib and Lawan. Lawan was said to be the daughter of a Kaulo tribal chieftain residing in Tumbag, while Kib was an ordinary member of their community. Their relationship reportedly faced opposition from Lawan's family. Their tragic love story became known among the local community, and their names were eventually combined to form the name Kiblawan. This is a local historical account rather than an origin established by an official law.

2. Establishment of the Municipality
Before becoming an independent municipality, Kiblawan was part of the Municipality of Sulop, Province of Davao. On March 5, 1965, President Diosdado Macapagal issued Executive Order No. 143, which initially provided for the creation of Kiblawan. However, its formal establishment was subsequently provided for by Republic Act No. 4748, approved on June 18, 1966. The law separated 13 barrios and seven sitios from Sulop to establish the Municipality of Kiblawan. The seat of municipal government was designated at the existing Barrio Kiblawan, now known as Barangay Poblacion.

3. Early Communities and Indigenous Heritage
Kiblawan is also associated with the cultural heritage of indigenous communities, particularly the B'laan people. Their traditions, cultural practices, and connection to ancestral lands form part of the municipality's historical and cultural identity. The municipality continues to recognize the importance of its indigenous heritage.

4. Agricultural Development
Agriculture has played an important role in the development of Kiblawan. Farming has provided livelihood and economic opportunities for many local families. Among the agricultural products associated with the municipality are Banana, Sugarcane, Corn, Rice, and other agricultural crops. The municipality's agricultural resources continue to contribute to its local economy.

5. Kiblawan Today
Today, Kiblawan continues to develop as one of the municipalities of Davao del Sur. It is composed of 30 barangays and is recognized for its agricultural activities, indigenous heritage, local traditions, and growing community. Its history reflects the journey of a community that developed from its early settlements into an independent municipality.
TEXT,
                'type' => 'text',
                'group' => 'general',
            ]
        );

        Setting::updateOrCreate(['key' => 'gov_welcome_text'], [
            'value' => 'The Municipality of Kiblawan is led by the Municipal Mayor, who heads the Executive branch, alongside the Vice Mayor and the Sangguniang Bayan, who form the Legislative branch. Together, they work to enact ordinances, deliver public services, and ensure the continuous progress of our municipality.',
            'type' => 'text',
            'group' => 'government',
        ]);

        Setting::updateOrCreate(['key' => 'gov_vision'], [
            'value' => 'A progressive, resilient, and inclusive Municipality of Kiblawan where every citizen enjoys a sustainable and quality life.',
            'type' => 'text',
            'group' => 'government',
        ]);

        Setting::updateOrCreate(['key' => 'gov_mission'], [
            'value' => 'To provide efficient and transparent public service, promote sustainable economic growth, and protect our natural and cultural heritage for future generations.',
            'type' => 'text',
            'group' => 'government',
        ]);
    }
}
