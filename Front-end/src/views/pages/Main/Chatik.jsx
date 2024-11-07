import { useEffect, useRef, useState } from "react";
import SVGIcon from "../../components/SVGIcon";
import Pusher from 'pusher-js';


export default function Chatik() {

    // const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    // const handleInputChange = (event) => {
    //     setValue(event.target.value);
    // };


    // const [messengs, setMessenge] = useState([{ user: 1, text: "hi" }, { user: 2, text: "Now" }])
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    // const handlePostRequest = async () => {
    //     try {
    //         const response = await fetch('http://127.0.0.1:8000/api/send-message', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 user: Math.random() < 0.5 ? 1 : 2,
    //                 message: message
    //             }),
    //         });

    //         if (response.ok) {
    //             const data = await response.json();
    //             setMessages([...messages, data]);
    //         } else {
    //             console.error('Ошибка:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Ошибка запроса:', error);
    //     }
    // };


    //* Работающий
    // useEffect(() => {
    //     // Enable pusher logging - don't include this in production
    //     Pusher.logToConsole = true;

    //     const pusher = new Pusher('937e16cb686597348715', {
    //         cluster: 'eu',
    //     });

    //     const channel = pusher.subscribe('messages');
    //     channel.bind('my-event', (data) => {
    //         alert(JSON.stringify(data));
    //     });

    //     // Cleanup subscription on component unmount
    //     return () => {
    //         channel.unbind_all();
    //         channel.unsubscribe();
    //     };
    // }, []);
    // *end

    // ---------------


    //* Работающий
    // useEffect(() => {
    //     const pusher = new Pusher('937e16cb686597348715', {
    //         cluster: 'eu',
    //         encrypted: true,
    //     });

    //     const channel = pusher.subscribe('messages');
    //     channel.bind('MessageSent', (data) => {
    //         console.log(data)
    //         setMessages((prevMessages) => [...prevMessages, data]);
    //     });

    //     // return () => {
    //     //     pusher.unsubscribe('chat');
    //     // };

    //     return () => {
    //         pusher.unsubscribe('Messages');
    //     };
    // }, []);
    // *end


    // const sendMessage = async (event) => {
    //     event.preventDefault();

    //     console.log(JSON.stringify({ user: Math.random() < 0.5 ? 1 : 2, message: message }))
    //     try {
    //         await fetch('http://127.0.0.1:8000/api/send-message', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ user: Math.random() < 0.5 ? 1 : 2, message: message }),
    //         });
    //         // setMessage('');
    //     } catch (error) {
    //         console.error('Error sending message:', error);
    //     }
    // };



    // ----------








    const pusher = new Pusher('937e16cb686597348715', { cluster: 'eu' });
    const channel = pusher.subscribe('public');

    // Получение сообщений
    channel.bind('chat', function (data) {
        $.post("/receive", {
            _token: '{{csrf_token()}}',
            message: data.message
        })
            .done(function (res) {
                $(".messages > .message").last().after(res);
                $(document).scrollTop($(document).height());
            });
    });

    // Обработка отправки формы
    $("form").submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: "/broadcast",
            method: 'POST',
            headers: {
                'X-Socket-Id': pusher.connection.socket_id
            },
            data: {
                _token: '{{csrf_token()}}',
                message: $("form #message").val()
            }
        })
            .done(function (res) {
                $(".messages > .message").last().after(res);
                $("form #message").val("");
                $(document).scrollTop($(document).height());
            });
    });








    return (
        <>
            <div className="chat__window"

                style={{
                    width: "95%",
                    margin: "100px 20px 100px 20px"
                }}

            >
                <div className="chat__header">
                    <p>Имя фамилия</p>
                </div>
                <div className="chat__messages messages">
                    <div className="chat__message _left">
                        Пойдёт
                    </div>

                    <div className="chat__message _right">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo nostrum repudiandae rem iusto blanditiis dolorum nulla maiores deleniti, quaerat explicabo sit id numquam! Ex aut voluptate minus nulla quo quam!
                    </div>


                    <div className="chat__message _left">
                        Привет, как дела?
                    </div>

                    {/* {messages.map((message, index) => ( */}
                    {/* <div className={`chat__message ${message.user == 1 ? "_right" : "_left"}`} key={index}> */}
                    {/* {message.message} */}
                    {/* </div> */}
                    {/* ))} */}
                    <div className={`chat__message message`}>
                    </div>


                    {/* {JSON.stringify(messengs, null, 2)} */}
                </div>
                <div className="chat__inpBlock">
                    <form
                        className="chat__inp"
                        onSubmit={(e) => {
                            sendMessage(e);
                        }}
                    >
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            type="text"
                            placeholder="Написать сообщение..."
                            id="message"
                        />
                        {/* <textarea
                            ref={textareaRef}
                            value={value}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Написать сообщение..."
                        /> */}
                        <button type="submit">
                            <SVGIcon name="send" />
                        </button>
                    </form>

                </div>
            </div >
        </>
    )
}