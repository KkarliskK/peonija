<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Creating an admin user
        User::factory()->create([
            'name' => 'Admin user',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        $categories = [
            ['name' => 'Grieztie ziedi', 'description' => 'Dažādu garumu un krāsu ziedi.'],
            ['name' => 'Tulpes', 'description' => 'Pavasara krāšņākās tulpes.'],
            ['name' => 'Rozes', 'description' => ' Dažādu garumu un krāsu rozes.'],
        ];

        foreach ($categories as $categoryData) {
            Category::factory()->create($categoryData);
        }

        $categoryIds = Category::pluck('id');

        // Create products for each category
        foreach ($categoryIds as $categoryId) {
            Product::factory()->create([
                'category_id' => $categoryId,
                'name' => 'Skaistas Puķes',
                'description' => 'A wonderful bouquet of flowers.',
                'price' => 10.99, 
                'image' => 'https://imageproxy.wolt.com/menu/menu-images/shared/5fac1c6a-cc06-11ee-a2d7-ae38fb6c5916_red_roses__2__photoroom.png?w=960',
                'times_purchased' => 3, 
            ]);
        }
    }
}
