<?php

use Inertia\Testing\AssertableInertia as Assert;

test('renders the public home page with homepage data', function () {
    $response = $this->get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->hasAll([
                'settings',
                'heroSlides',
                'stats',
                'services',
                'latestNews',
                'achievements',
                'barangays',
                'tourismSpots',
                'latestJobs',
                'emergencyContacts',
                'bids',
                'annualReports',
                'mayorMessage',
            ]));
});
