<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * The default content blocks for the History page.
     *
     * @var array<int, array<string, string>>
     */
    public const HISTORY_BLOCKS = [
        [
            'image' => '/images/about/kiblawan-thriving-municiplality.png',
            'kicker' => 'Overview',
            'title' => 'From Tribal Lands to a Thriving Municipality',
            'subtitle' => 'Honoring Indigenous Traditions While Moving Toward Progress',
            'body' => "Historically, Kiblawan was inhabited by the B'laan indigenous tribe, who lived off the land through hunting, farming, and trading.",
            'image_position' => 'left',
        ],
        [
            'image' => '/images/about/kiblawan-agri.png',
            'kicker' => 'History',
            'title' => 'A Municipality Shaped by Change',
            'subtitle' => 'Agriculture, Mining, and a Growing Community',
            'body' => 'With the arrival of Christian settlers, the town expanded its agricultural and mining industries. Today, Kiblawan remains a culturally rich and economically growing municipality, balancing its indigenous heritage with modern development.',
            'image_position' => 'left',
        ],
        [
            'image' => '/images/about/kiblawan-tradition.png',
            'kicker' => 'Culture',
            'title' => "A Stronghold of B'laan Indigenous Traditions",
            'subtitle' => 'Preserving Ancestral Ways While Embracing Development',
            'body' => "Kiblawan's culture is deeply influenced by its B'laan roots, with many locals continuing to practice traditional weaving, beadwork, and music. Festivals and community gatherings highlight tribal dances, rituals, and storytelling, showcasing the rich cultural heritage of the town.",
            'image_position' => 'left',
        ],
    ];

    /**
     * Seed the About Kiblawan pages without overwriting admin edits.
     */
    public function run(): void
    {
        $pages = [
            [
                'slug' => 'history',
                'title' => 'History of Kiblawan',
                'content' => json_encode(
                    self::HISTORY_BLOCKS,
                    JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
                ),
            ],
            [
                'slug' => 'demographic',
                'title' => 'Demographic Profile',
                'content' => <<<'HTML'
<p>A snapshot of the people and communities that make Kiblawan vibrant.</p>

<h2>At a Glance</h2>
<ul>
    <li><strong>Population:</strong> 52,400</li>
    <li><strong>Barangays:</strong> 30</li>
    <li><strong>Land Area:</strong> 258 km²</li>
    <li><strong>Languages:</strong> Cebuano / B'laan</li>
</ul>

<p><strong>People &amp; community</strong></p>
<h2>A Community of Farmers, Miners, and Indigenous Tribes</h2>
<p><strong>Where Bisaya, B'laan, and Tagalog Cultures Blend</strong></p>
<p>Kiblawan's population consists of Cebuano (Bisaya) speakers, B'laan indigenous communities, and Tagalog-speaking settlers. English and Tagalog are commonly used in education, government, and business, ensuring accessibility for investors and visitors.</p>
<figure>
    <img src="/images/about/kiblawan-community-photo.png.png" alt="Residents and community life in Kiblawan">
    <figcaption>Kiblawan, Davao del Sur</figcaption>
</figure>
HTML,
            ],
            [
                'slug' => 'socio-economic',
                'title' => 'Socio-Economic Profile',
                'content' => <<<'HTML'
<p>Insights into the livelihoods, industries, and economy of Kiblawan.</p>

<h2>Livelihoods rooted in land and enterprise</h2>
<p><strong>Local economy</strong></p>
<p>Agriculture, natural resources, and local producers support Kiblawan's economy and connect the municipality with markets across Mindanao.</p>

<h3>Rice, Corn, &amp; Coconut Farming</h3>
<p>Kiblawan is a major producer of staple crops, supplying local and regional markets.</p>
<figure>
    <img src="/images/about/agriculture.png" alt="Rice, corn, and coconut farming in Kiblawan">
    <figcaption>Rice, corn, and coconut farming</figcaption>
</figure>

<h3>Banana &amp; Coffee Plantations</h3>
<p>The town cultivates high-value crops, supporting Mindanao's agribusiness and export industries.</p>
<figure>
    <img src="/images/about/coffee-plantation.png" alt="Banana and coffee plantations in Kiblawan">
    <figcaption>Banana and coffee plantations</figcaption>
</figure>

<h3>Mining &amp; Mineral Extraction</h3>
<p>The mountains of Kiblawan contain gold, copper, and other mineral deposits, attracting small-scale and industrial mining operations.</p>
<figure>
    <img src="/images/about/mineral-extraction.png" alt="Mining and mineral extraction in Kiblawan">
    <figcaption>Mining and mineral extraction</figcaption>
</figure>

<h3>Livestock &amp; Poultry Farming</h3>
<p>Many residents raise cattle, pigs, and poultry, contributing to Mindanao's meat production industry.</p>
<figure>
    <img src="/images/about/poultry-farming.png" alt="Livestock and poultry farming in Kiblawan">
    <figcaption>Livestock and poultry farming</figcaption>
</figure>

<h2>Discover Kiblawan</h2>
<p><strong>Places &amp; experiences</strong></p>
<p>Mountain scenery, cultural heritage, and natural attractions create memorable ways to experience the municipality.</p>

<h3>Digos-Malalag Mountain Ranges</h3>
<p>A scenic area perfect for hiking, camping, and nature photography.</p>
<figure>
    <img src="/images/about/mountain-ranges.jpg" alt="Digos-Malalag Mountain Ranges">
    <figcaption>Digos-Malalag Mountain Ranges</figcaption>
</figure>

<h3>B'laan Cultural Villages</h3>
<p>Experience the rich traditions, crafts, and tribal rituals of the B'laan people.</p>
<figure>
    <img src="/images/about/cultural-villages.jpg" alt="B'laan Cultural Villages">
    <figcaption>B'laan Cultural Villages</figcaption>
</figure>

<h3>Kiblawan Hot Springs</h3>
<p>Discover hidden waterfalls and soothing natural hot springs tucked away in the mountains.</p>
<figure>
    <img src="/images/about/kiblawan-hotspring.png" alt="Kiblawan Hot Springs">
    <figcaption>Kiblawan Hot Springs</figcaption>
</figure>
HTML,
            ],
            [
                'slug' => 'geography',
                'title' => 'Physical / Geographical Profile',
                'content' => <<<'HTML'
<p>Explore the landscapes, topography, and natural features of our town.</p>

<p><strong>Place &amp; landscape</strong></p>
<h2>A Land of Valleys, Mountains, and Agricultural Prosperity</h2>
<p><strong>Spanning Over 258 Square Kilometers of Diverse Terrain</strong></p>
<p>Kiblawan covers 258 square kilometers, featuring fertile lowlands for farming, rugged hills for livestock, and mineral-rich mountains. The Digos-Malalag Mountain Range provides essential resources for agriculture, mining, and eco-tourism, making it a vital part of Davao del Sur's economy.</p>
<figure>
    <img src="/images/about/kiblawan-farm.png" alt="Agricultural landscape in Kiblawan">
    <figcaption>Kiblawan, Davao del Sur</figcaption>
</figure>

<h2>Climate &amp; Transportation</h2>
<p><strong>Getting here &amp; getting around</strong></p>

<h3>Climate &amp; Environment</h3>
<p>Kiblawan enjoys a tropical climate, with moderate-to-high rainfall that supports agriculture and livestock. The local government and environmental groups promote sustainable farming, responsible mining, and reforestation programs.</p>
<figure>
    <img src="/images/about/kiblawan-climate.png" alt="Climate and landscape of Kiblawan">
    <figcaption>Climate and landscape of Kiblawan</figcaption>
</figure>

<h3>Transportation &amp; Accessibility</h3>
<p>Kiblawan is approximately 2-3 hours from Davao City, accessible via buses, vans, and private vehicles traveling along national highways. Within the municipality, tricycles, habal-habal, and jeepneys serve as the main modes of transportation.</p>
<figure>
    <img src="/images/about/Bus-icon.png" alt="Bus transportation serving Kiblawan">
    <figcaption>Bus transportation serving Kiblawan</figcaption>
</figure>
HTML,
            ],
        ];

        foreach ($pages as $page) {
            Page::query()->firstOrCreate(
                ['slug' => $page['slug']],
                [
                    'title' => $page['title'],
                    'content' => $page['content'],
                ],
            );
        }
    }
}
