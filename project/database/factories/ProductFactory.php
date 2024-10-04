<?php
namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(), 
            'name' => $this->faker->word, 
            'description' => $this->faker->sentence, 
            'price' => $this->faker->randomFloat(2, 1, 100), 
            'is_available' => true, 
            'image' => $this->faker->imageUrl(), 
            'times_purchased' => 0, 
        ];
    }
}

