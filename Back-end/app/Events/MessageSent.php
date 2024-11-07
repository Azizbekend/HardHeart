<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Messages;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $id_chat;
    public $message;
    public $user;
    public $timestamp;

    public function __construct($user, $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('messages'); // Публичный канал для обмена сообщениями в реальном времени
    }

    public function broadcastAs()
    {
        return 'message-sent'; // Имя события в Pusher
    }
}
