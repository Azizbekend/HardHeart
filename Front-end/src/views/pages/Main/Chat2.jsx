import React, { useEffect, useRef, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import SVGIcon from "../../components/SVGIcon";



// ! Проблема в том что сообщение нормально отправляется лишь 1 раз, но потом с большой задержкой (или это заново чат собирается и срабатывает получение всех сообщений). РЕШИТЬ ЭТУ ПРОБЛЕМУ



const ChatComponent = () => {
    const [messages, setMessages] = useState([]);
    const messageInputRef = useRef(null);
    const pusherRef = useRef(null);
    const channelRef = useRef(null);
    const pusherKey = '937e16cb686597348715';
    const cluster = 'eu';
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    useEffect(() => {
        Pusher.logToConsole = true;

        pusherRef.current = new Pusher(pusherKey, { cluster, forceTLS: false });
        channelRef.current = pusherRef.current.subscribe('messages');

        // Подписка на успешное подключение
        channelRef.current.bind('pusher:subscription_succeeded', () => {
            console.log('Подписка на канал successful');
            fetchMessages(); // Вызываем функцию для получения сообщений
        });

        // Обработка новых сообщений
        channelRef.current.bind('message-sent', (data) => {
            console.log(data);
            setMessages(messages => [...messages, data]);
        });
        return () => {
            channelRef.current.unbind_all();
            channelRef.current.unsubscribe();
        };
    }, [csrfToken]);


    // Получаем все сообщения
    const fetchMessages = async () => {
        const socketId = pusherRef.current.connection?.socket_id;

        if (!socketId) {
            console.error("Socket ID не определен, подождите подключения Pusher.");
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-messages?id_chat=1', {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    'X-Socket-Id': socketId
                }
            });

            console.log(response.data);
            setMessages(response.data);
        } catch (error) {
            console.log("Ошибка:" + error);
        }
    };

    // Отправляем сообщение
    const handleSubmit = async (event) => {
        event.preventDefault();

        const message = messageInputRef.current.value;
        const socketId = pusherRef.current.connection?.socket_id;

        if (!socketId) {
            console.error("Socket ID не определен, подождите подключения Pusher.");
            return;
        }


        let data = {
            id_user: 3,
            message: messageInputRef.current.value
        };
        messageInputRef.current.value = "";

        setMessages(messages => [...messages, data]);


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/send-message', {
                _token: csrfToken,
                message: message,
                // id_user: Math.random() < 0.5 ? 1 : 2,
            }, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    'X-Socket-Id': socketId
                }
            });

            console.log(response.data)

            // Добавьте сообщение в состояние, чтобы сразу отобразить его отправителю
            setMessages(messages => [...messages, response.data]);
            messageInputRef.current.value = '';
        } catch (error) {
            console.log("Ошибка:" + error);
        }
    };

    return (
        <div>
            <div className="chat__messages messages">

                {messages.map((message, index) => (
                    <div className={`chat__message ${message.id_user == 1 ? "_right" : "_left"}`} key={index}>
                        {message.message}
                    </div>
                ))}
                {/* {messages.map((msg, index) => (
                    <div className="message" key={index}>{msg.message}</div>
                ))} */}
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" ref={messageInputRef} required style={{ border: "1px solid black" }} />
                <button type="submit">
                    <SVGIcon name="send" />
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;
