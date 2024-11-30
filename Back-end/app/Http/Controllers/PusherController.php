<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Events\PusherBroadcast;
use App\Models\Messages;
use Illuminate\Http\Request;

class PusherController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = Messages::create([
            'id_chat' => $request->idChat,
            'id_user' => $request->idUser, 
            'message' => $request->message, 
            'timestamp' => now(),
        ]);
    
        broadcast(new PusherBroadcast($message->toArray()))->toOthers();
        return response()->json($message); // Возвращаем всё сообщение
    }
    

    public function getMessage(Request $request){
            // Получаем id_chat из запроса
            $idChat = $request->query('id_chat'); 
            // Получаем сообщения по id чата
            $messages = Messages::where('id_chat', $idChat)->get(); 
            
            // Возвращаем сообщения в формате JSON
            return response()->json($messages);
    }

    // public function broadcast(Request $request)
    // {
    //     // Шлем сообщение через Pusher
    //     broadcast( new PusherBroadcast( $request->get('messages')))->toOthers();
    //     return response()->json(['status' => 'Message broadcasted successfully']);
    // }

    public function receive(Request $request)
    {
        return response()->json($request);
    }
}