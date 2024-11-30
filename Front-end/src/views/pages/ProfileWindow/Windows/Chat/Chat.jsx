import { Link, useParams } from "react-router-dom";
import { chatFoto } from '../../../../Imports/media'
import { Modal, SVGIcon, ChatModal, useAuth, AgeCalculate, postFetch } from '../../../../Imports/components'
import { useEffect, useRef, useState } from "react";
import { phrasesList } from '../../../../Imports/data'
// 
import Pusher from 'pusher-js';
import axios from 'axios';

export default function Chat() {

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
            // console.log('Подписка на канал successful');
            fetchMessages(); // Вызываем функцию для получения сообщений
        });

        // Обработка новых сообщений
        channelRef.current.bind('message-sent', (data) => {
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
        setLoading(true);

        if (!socketId) {
            console.error("Socket ID не определен, подождите подключения Pusher.");
            return;
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get-messages?id_chat=${idChat}`, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    'X-Socket-Id': socketId
                }
            });

            setLoading(false);
            setMessages(response.data);
        } catch (error) {
            console.log("Ошибка:" + error);
        }
    };

    // Отправляем сообщение
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (blockFormText) {
            const message = messageInputRef.current.value;
            const socketId = pusherRef.current.connection?.socket_id;
            setValue("");

            if (!socketId) {
                console.error("Socket ID не определен, подождите подключения Pusher.");
                return;
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/send-message/', {
                    _token: csrfToken,
                    idChat: Number(idChat),
                    message: message,
                    idUser: user.id,
                }, {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                        'X-Socket-Id': socketId
                    }
                });

                // Добавьте сообщение в состояние, чтобы сразу отобразить его отправителю
                setMessages(messages => [...messages, response.data]);
            } catch (error) {
                console.log("Ошибка:" + error);
            }
        }
    };

    // -----------

    const { idChat, idUserFriend } = useParams()
    const { user } = useAuth();

    const [modalOpen, setModalOpen] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false);

    function ulrIds(type) {
        if (type == "idUserNow") {
            return idUserFriend.split("_").length > 1 ? idUserFriend.split("_")[1] : idUserFriend.split("_")[0]
        }
        if (type == "idClaimNow") {
            return idUserFriend.split("_").length > 1 && idUserFriend.split("_")[0]
        }
    }

    useEffect(() => {
        if (idChat != ":idChat") {
            fetch(`http://127.0.0.1:8000/api/getMessages?idChat=${idChat}&idUserFriends=${Number(ulrIds("idUserNow"))}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setMessages(data['messageList'])
                    setFriend(data['friend'])
                    console.log(data['friend'])
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [idChat])

    const [hoursInp, setHoursInp] = useState('');
    const [minutesInp, setMinutesInp] = useState('');
    const [timerStart, setTimerStart] = useState(false);

    function timeInp(value, changeFnc, isHour) {
        const isValidInput = /^\d*$/.test(value);
        const maxLength = isHour ? 3 : 2;
        if (isValidInput && value.length <= maxLength) {
            changeFnc(value);
        }
    }

    function postTime() {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + Number(hoursInp));
        currentDate.setMinutes(currentDate.getMinutes() + Number(minutesInp));

        postFetch('postTime', { id: Number(ulrIds("idClaimNow")), timer: currentDate })
            .then((data) => setTimerStart(true));
    }

    const handleBlockToggle = () => {
        const apiName = isBlocked ? "razBlockUser" : "blockUser";
        postFetch(apiName, { idUser: Number(ulrIds("idUserNow")) })
            .then(() => setIsBlocked(!isBlocked))
            .catch(err => console.log(err));
    };

    // Следит за разрешением
    const [isWideProfile, setIsWideProfile] = useState(window.innerWidth >= 991);
    const [isWideLinkBack, setIsWideLinkBack] = useState(window.innerWidth >= 1170);
    const handleResize = () => {
        setIsWideLinkBack(window.innerWidth >= 1170);
        setIsWideProfile(window.innerWidth >= 991);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // ---end

    // Нижняя панель
    const [chatDown, setChatDown] = useState(false)

    // Поле ввода
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const appendText = (text) => {
        setValue((prevValue) => prevValue + text);
    };

    const [messages, setMessages] = useState([]);
    const [friend, setFriend] = useState();
    const [loading, setLoading] = useState(true);

    const [placeholderText, setPlaceholderText] = useState("")
    const [blockFormText, setBlockFormText] = useState(true)
    useEffect(() => {
        if (user.role != "block") {
            if (friend?.role == "block") {
                setBlockFormText(false)
                setPlaceholderText("Пользователь заблокирован")
            } else {
                setPlaceholderText("Написать сообщение...")
            }
        } else {
            setBlockFormText(false)
            setPlaceholderText("Вы были заблокированы")
        }
    }, [friend, user.role])

    return (
        <>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ChatModal friendInfo={{ friend }} />
            </Modal>

            <div className="chat">
                {!idChat ? (<>
                    <h1>Нету чата</h1>
                </>) :
                    (<>
                        <div className="chat__window">
                            <div className="chat__header">

                                {isWideLinkBack ? (
                                    user.role === "user" ? (
                                        <Link to="/profileWindow/userChats/">← <span>назад</span></Link>
                                    ) : (
                                        <Link to="/profileWindow/userChats/">← <span>назад</span></Link>
                                    )
                                ) : (
                                    <Link to="/profileWindow/chatpanel">← <span>назад</span></Link>
                                )}

                                <p>{friend?.name}</p>
                                <div className="chat__header-foto" onClick={() => setModalOpen(true)}>
                                    <img src={`http://127.0.0.1:8000/api/images/${friend?.img || "bannerCenter.png"}`} alt="" />
                                </div>
                            </div>

                            <div className="chat__messages">
                                {loading ? (
                                    <p>Загрузка</p>
                                ) : (
                                    messages.map((message, index) => (
                                        <div className={`chat__message ${message.id_user == user.id ? "_right" : "_left"}`}>
                                            {message.message}
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="chat__inpBlock">
                                <form className="chat__inp" onSubmit={handleSubmit} >
                                    <textarea
                                        ref={messageInputRef}
                                        value={value}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder={placeholderText}
                                        disabled={friend?.role == "block" ? true : false}
                                    />
                                    <button>
                                        <SVGIcon name='send' />
                                    </button>
                                </form>
                            </div>

                            {!isWideProfile && (
                                <div className={`chat__down ${chatDown && "_active"}`}>
                                    <button className="chat__down-btn" onClick={() => setChatDown(!chatDown)}>Готовые вопросы <SVGIcon name="ArrowDownNotLongWhite" /></button>
                                    {(user.role == "admin") ? (
                                        <div className="cp__timer">
                                            <div className="cp__timer-inps">
                                                <input className="_borderBtn" type="text" placeholder="00" />
                                                :
                                                <input className="_borderBtn" type="text" placeholder="00" />
                                                <button className="_borderBtn _btn _green"><SVGIcon name="chekWhite" /></button>
                                            </div>
                                            <button className="_btn _red _borderBtn">Блокировать</button>
                                        </div>
                                    ) : (
                                        <div className="cp__words">
                                            {phrasesList.map((phrase, index) => (
                                                <button key={index} className="cp__word" onClick={() => appendText(phrase)}>{phrase}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                        <div className="chat__panel cp">
                            <div className="cp__header">
                                <div className="cp__foto">
                                    <img src={`http://127.0.0.1:8000/api/images/${friend?.img || "bannerCenter.png"}`} alt="" />
                                </div>
                                <p className="cp__name">{friend?.name} {AgeCalculate(friend?.age)}</p>
                                <button onClick={() => setModalOpen(true)}>Открыть профиль</button>
                            </div>

                            {(user.role === "admin") ? (

                                <div className="cp__timer">

                                    {
                                        timerStart ?
                                            <p className="cp__timer-name">Таймер создан</p>
                                            :
                                            <>
                                                <p className="cp__timer-name">Время на исправление:</p>
                                                <div className="cp__timer-inps">
                                                    <input className="_borderBtn" type="text" placeholder="00" value={hoursInp} onChange={(e) => { timeInp(e.target.value, setHoursInp, true) }} />
                                                    :
                                                    <input className="_borderBtn" type="text" placeholder="00" value={minutesInp} onChange={(e) => { timeInp(e.target.value, setMinutesInp, false) }} />
                                                    <button className="_borderBtn _btn _green" onClick={() => postTime()}><SVGIcon name="chekWhite" /></button>
                                                </div>
                                            </>
                                    }

                                    {isBlocked ?
                                        <button className="_btn _green _borderBtn" onClick={() => { handleBlockToggle() }}>Разблокировать</button>
                                        :
                                        <button className="_btn _red _borderBtn" onClick={() => { handleBlockToggle() }}>Блокировать</button>
                                    }
                                </div>
                            ) : (
                                <div className="cp__words">
                                    {phrasesList.map((phrase, index) => (
                                        <button key={index} className="cp__word" onClick={() => appendText(phrase)}>{phrase}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                    )}
            </div>
        </>
    )
}