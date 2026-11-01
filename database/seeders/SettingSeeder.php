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
    }
}
