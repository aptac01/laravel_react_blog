<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NewCommentEvent implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels, Queueable;

    public $comment;
    public $articleId;

    /**
     * Create a new event instance.
     */
    public function __construct($comment, $articleId)
    {
        $this->comment = $comment;
        $this->articleId = $articleId;
    }

    public function broadcastOn()
    {
        return [
            new Channel('article.' . $this->articleId)
        ];
    }

    public function broadcastAs()
    {
        return 'new_comment';
    }

    public function broadcastWith()
    {
        return [
            'comment' => [
                'id' => $this->comment->id,
                'article_id' => $this->comment->article_id,
                'author_name' => $this->comment->author_name,
                'content' => $this->comment->content,
                'created_at' => $this->comment->created_at,
            ],
            'article_id' => $this->articleId
        ];
    }
}
