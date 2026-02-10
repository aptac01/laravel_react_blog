<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;
use Database\Factories\ArticleFactory;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        ArticleFactory::times(10)->create();
    }
}
