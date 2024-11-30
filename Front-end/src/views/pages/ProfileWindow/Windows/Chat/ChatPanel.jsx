import { Link } from "react-router-dom";
import { chatFoto } from '../../../../Imports/media';
import { useEffect, useState } from "react";
import { useAuth } from "../../../../Imports/components";
const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function ChatPanel() {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Добавим для обработки ошибок
    const { user } = useAuth();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/getChats?idUser=${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Ошибка загрузки чатов');
                }

                const data = await response.json();
                setChats(data);
            } catch (err) {
                console.log(err.message);
                setError(err.message); // Устанавливаем ошибку, если она произошла
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [user.id]);

    return (
        <div className="profileWindow__panel pwp _full">
            <div className="pwp__title">Чаты</div>
            <div className="pwp__items">
                {loading ? (
                    <p>Загрузка...</p>
                ) : error ? ( // Выводим сообщение об ошибке, если она есть
                    <p>Ошибка: {error}</p>
                ) : (
                    chats.map((chat) => (
                        <Link
                            to={`/profileWindow/userChats/chat/${chat['idChat']}/${chat["userInfo"]['idUserFriend']}`}
                            className={`pwp__item`} // Условное применение класса
                            key={chat.idChat} // Используем уникальный идентификатор
                        >
                            <div className="pwp__item-img">
                                <img
                                    src={`${API_BASE_URL}/images/${chat.userInfo.img || 'bannerCenter.png'}`}
                                    alt=""
                                />
                            </div>
                            <div className="pwp__item-info">
                                <p className="pwp__item-name">{chat["userInfo"]['name']}</p>
                                <p className="pwp__item-text">{chat["firstMess"]}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
