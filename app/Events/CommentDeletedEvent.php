<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CommentDeletedEvent implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels, Queueable;

    public $articleId;
    public $commentId;

    /**
     * Create a new event instance.
     */
    public function __construct($articleId, $commentId)
    {
        $this->articleId = $articleId;
        $this->commentId = $commentId;
    }

    public function broadcastOn()
    {
        return [
            new Channel('article.' . $this->articleId)
        ];
    }

    public function broadcastAs()
    {
        return 'comment_deleted';
    }

    public function broadcastWith()
    {
        return [
            'comment_id' => $this->commentId,
            'article_id' => $this->articleId
        ];
    }
}
