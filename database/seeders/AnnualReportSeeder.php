<?php

namespace Database\Seeders;

use App\Models\AnnualReport;
use Illuminate\Database\Seeder;

class AnnualReportSeeder extends Seeder
{
    public function run(): void
    {
        $reports = [
            'Local Government Support Fund',
            'Manpower Complement',
            'Bid Results on Civil Works',
            'Supplemental Procurement Plan',
        ];

        foreach ($reports as $index => $title) {
            AnnualReport::query()->updateOrCreate(
                ['title' => $title],
                [
                    'category' => 'Full Disclosure',
                    'pdf_path' => '',
                    'year' => 2026,
                    'date_posted' => '2026-06-22',
                ],
            );
        }
    }
}
