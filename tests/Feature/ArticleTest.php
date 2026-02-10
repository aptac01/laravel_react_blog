<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Article;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ArticleTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_retrieve_articles()
    {
        Article::factory()->count(3)->create();

        $response = $this->getJson('/api/articles');
        $response->assertStatus(200)
                ->assertJsonCount(3);
    }

    public function test_can_create_article()
    {
        $data = [
            'title' => $this->faker->sentence,
            'content' => $this->faker->paragraph
        ];

        $response = $this->postJson('/api/articles', $data);
        $response->assertStatus(201)
                ->assertJsonFragment($data);
    }
}

