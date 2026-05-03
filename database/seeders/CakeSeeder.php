<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Cake;

class CakeSeeder extends Seeder
{
    public function run()
    {
        $cakes = [
            [
                'name' => 'Strawberry Cloud Chiffon',
                'price' => 1200.00,
                'description' => 'Light, fluffy, and covered in pastel pink strawberry cream.'
            ],
            [
                'name' => 'Rose Gold Raspberry Tier',
                'price' => 3500.00,
                'description' => 'Elegant tiers dusted with edible rose gold and raspberry filling.'
            ],
            [
                'name' => 'Hot Pink Velvet',
                'price' => 1500.00,
                'description' => 'A fun, bright magenta twist on the classic red velvet cake.'
            ],
            [
                'name' => 'Fairy Blossom Macaron Cake',
                'price' => 2200.00,
                'description' => 'Decorated with pink cherry blossoms and miniature macarons.'
            ],
            [
                'name' => 'Peachy Pink Vanilla Ribbon',
                'price' => 1800.00,
                'description' => 'Wrapped in beautiful pink buttercream ribbons.'
            ],
            [
                'name' => 'Cotton Candy Swirl Cake',
                'price' => 1600.00,
                'description' => 'Marbled pink and pastel blue cake layers with cotton candy buttercream.'
            ],
            [
                'name' => 'Cherry Blossom Matcha Cake',
                'price' => 2000.00,
                'description' => 'Subtle green matcha cake layered with sweet pink cherry blossom cream.'
            ],
            [
                'name' => 'Blush Watermelon Mousse',
                'price' => 1400.00,
                'description' => 'A refreshing pink watermelon mousse over a light vanilla sponge base.'
            ],
            [
                'name' => 'Magenta Bubblegum Drip',
                'price' => 1300.00,
                'description' => 'Fun layered cake with a vibrant pink white-chocolate drip.'
            ],
            [
                'name' => 'Pastel Pink Ombre Rosette',
                'price' => 2500.00,
                'description' => 'Covered entirely in beautiful pink buttercream rosettes fading from dark to light.'
            ]
        ];

        $response = Http::withoutVerifying()->get('https://api.unsplash.com/search/photos', [
            'query'     => 'pink pastel cake dessert',
            'client_id' => '7IrA-B5eUyvL01s8WhwtTptwDGTKzJkK4hHjJjbuAt4',
            'per_page'  => 10
        ]);

        $images = $response->json()['results'] ?? [];

        foreach ($cakes as $index => $cakeData) {
            $imageUrl = isset($images[$index])
                ? $images[$index]['urls']['regular']
                : 'https://via.placeholder.com/400/FFB6C1/FFFFFF?text=Pink+Cake';

            Cake::create([
                'name'        => $cakeData['name'],
                'description' => $cakeData['description'],
                'price'       => $cakeData['price'],
                'image_url'   => $imageUrl,
            ]);
        }

        $this->command->info('10 beautifully priced pink cakes seeded successfully!');
    }
}
