<?php

namespace Database\Seeders;

use App\Models\Bid;
use Illuminate\Database\Seeder;

class BidSeeder extends Seeder
{
    public function run(): void
    {
        $bids = [
            ['title' => 'Supply and Delivery of Well Milled Rice', 'date_posted' => '2026-06-22'],
            ['title' => 'Medicines for Tuberculosis Patients', 'date_posted' => '2026-06-22'],
        ];

        foreach ($bids as $bid) {
            Bid::query()->updateOrCreate(
                ['title' => $bid['title']],
                $bid + ['pdf_path' => null, 'status' => 'open'],
            );
        }
    }
}
