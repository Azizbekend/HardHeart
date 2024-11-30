import { useEffect, useState } from 'react';
import { Header, Footer, SVGIcon, useAuth } from '../../Imports/components';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function ProfileWindow() {
    const { user } = useAuth();
    const { panel } = useParams();
    const localUrl = useLocation();

    // Состояния
    const [isWideProfile, setIsWideProfile] = useState(window.innerWidth >= 1170);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    // Отслеживание ресайза
    useEffect(() => {
        const handleResize = () => setIsWideProfile(window.innerWidth >= 1170);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Загрузка чатов
    useEffect(() => {
        const fetchChats = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/getChats?idUser=${user.id}`);
                const data = await response.json();
                setChats(data);
            } catch (err) {
                console.error('Ошибка загрузки чатов:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchChats();
    }, [user.id]);

    // Компонент элемента панели
    const PanelItem = ({ name, iconName, link, isActive }) => (
        <Link to={link} className={`pwp__item _pdng ${isActive ? '_active' : ''}`}>
            <SVGIcon className="pwp__item-img" name={iconName} />
            <p className="pwp__item-name _notM">{name}</p>
        </Link>
    );

    // Панель чатов
    const renderChatsPanel = () => (
        <div className="profileWindow__panel pwp">
            <div className="pwp__title">Чаты</div>
            <div className="pwp__items">
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    chats.map((chat, index) => (
                        <Link
                            to={`/profileWindow/userChats/chat/${chat.idChat}/${chat.userInfo.idUserFriend}`}
                            className="pwp__item"
                            key={index}
                        >
                            <div className="pwp__item-img">
                                <img
                                    src={`${API_BASE_URL}/images/${chat.userInfo.img || 'bannerCenter.png'}`}
                                    alt=""
                                />
                            </div>
                            <div className="pwp__item-info">
                                <p className="pwp__item-name">{chat.userInfo.name}</p>
                                <p className="pwp__item-text">{chat.firstMess}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );

    // Панель администратора
    const renderAdminPanel = () => (
        <div className="profileWindow__panel pwp">
            <div className="pwp__title">
                <div className="pwp__title-foto _admin">
                    <SVGIcon name="user" />
                </div>
                <p>Админ Админов</p>
            </div>
            <div className="pwp__items">
                <PanelItem
                    name="Список пользователей"
                    iconName="users"
                    link="/profileWindow/adminPanel/like"
                    isActive={localUrl.pathname === '/profileWindow/adminPanel/like'}
                />
                <PanelItem
                    name="Жалобы"
                    iconName="chatsAdmin"
                    link="/profileWindow/adminPanel/complaints"
                    isActive={localUrl.pathname === '/profileWindow/adminPanel/complaints'}
                />
            </div>
        </div>
    );

    // Выбор панели
    const renderPanelContent = () => {
        switch (panel) {
            case 'userChats':
                return renderChatsPanel();
            case 'adminPanel':
                return renderAdminPanel();
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <div className="wripper">
                <div className="container">
                    <div className="profileWindow">
                        {isWideProfile && renderPanelContent()}
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}