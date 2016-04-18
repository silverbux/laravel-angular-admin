<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CreatePostTest extends TestCase
{
    public function testStoresPostSuccessfully()
    {

        $post = factory(App\Post::class)->make();

        $this->post('/api/posts', [
          'name' => $post->name,
          'topic' => $post->topic,
          ])->seeApiSuccess()
          ->seeJsonObject('post')
          ->seeJsonKeyValueString('name', $post->name)
          ->seeJsonKeyValueString('topic', $post->topic);

        $this->seeInDatabase('posts', [
          'name' => $post->name,
          'topic' => $post->topic,
          ]);
    }
}
