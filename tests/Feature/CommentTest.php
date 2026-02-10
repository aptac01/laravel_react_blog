<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Article;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_create_comment()
    {
        $article = Article::factory()->create();
        $data = [
            'author_name' => $this->faker->name,
            'content' => $this->faker->sentence
        ];

        $response = $this->postJson("/api/articles/{$article->id}/comments", $data);
        $response->assertStatus(201)
                ->assertJsonFragment($data);
    }

    public function test_comment_belongs_to_article()
    {
        $article = Article::factory()->create();
        $comment = $article->comments()->create([
            'author_name' => 'Test User',
            'content' => 'Test comment'
        ]);

        $this->assertDatabaseHas('comments', [
            'article_id' => $article->id,
            'author_name' => 'Test User',
            'content' => 'Test comment'
        ]);
    }
}
