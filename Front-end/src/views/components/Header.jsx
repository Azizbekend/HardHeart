import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SVGIcon, useAuth, LoginModal, Modal } from '../Imports/components';

export default function Header() {
    const [isWideForChat, setIsWideForChat] = useState(window.innerWidth <= 1170);
    const handleResize = () => {
        setIsWideForChat(window.innerWidth <= 1170);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // отслеживание навигации для активации ссылки 
    const localUrl = useLocation()

    // Состояние для кнопки вызова меню
    const [isActive, setIsActive] = useState(false);
    const switchNavBtn = () => {
        setIsActive(!isActive);
    };

    // Определяем пользователя
    const { user } = useAuth();

    const chatLink = isWideForChat
        ? { to: "/profileWindow/adminChats/chatpanel", icon: "chatsAdmin", label: "Чаты" }
        : {
            to: "/profileWindow/adminChats/chat/:idChat",
            icon: "chatsAdmin",
            label: "Чаты",
        };


    const typeNav = (user) => {
        const renderNav = (links) => (
            <nav className={isActive ? 'nav _active' : 'nav'}>
                {links.map(({ to, icon, label }, index) => (
                    <Link
                        key={index}
                        to={to}
                        className={`nav__link ${localUrl.pathname === to ? "_active" : ""}`}
                    >
                        <SVGIcon name={icon} />
                        {label}
                    </Link>
                ))}

                {user === "user" ? (
                    <Link to="/profile" className="nav__userIcon">
                        <SVGIcon name="user" />
                    </Link>
                ) : (
                    <Link to="/" className="nav__userIcon">
                        <SVGIcon name="exitAdmin" />
                    </Link>
                )}
            </nav>
        );

        const renderBurgerButton = () => (
            isWideForChat && (
                <button
                    className={isActive ? 'header__btnBurger _active' : 'header__btnBurger'}
                    onClick={switchNavBtn}
                >
                    <span></span>
                </button>
            )
        );

        switch (user) {
            case "main":
                return (
                    <button className="header__btn _btn _purple _borderBtn" onClick={() => setModalOpen(true)}>
                        Войти
                    </button>
                );

            case "user":
                return (
                    <>
                        {renderNav([
                            { to: "/profileWindow/userChats/", icon: "searchHeart", label: "Поиск" },
                            { to: "/profileWindow/userChats/like", icon: "heart", label: "Лайки" },
                            { to: "/profileWindow/userChats/chat/:idChat", icon: "chatsUser", label: "Чаты" }
                        ])}
                        {renderBurgerButton()}
                    </>
                );

            case "admin":
                const adminLinks = !isWideForChat ? [
                    {
                        to: "/profileWindow/adminPanel/like",
                        icon: "panelsAdmin",
                        label: "Панель",
                    },
                    chatLink
                ] : [
                    { to: "/profileWindow/adminPanel", icon: "statistic", label: "Статистика" },
                    { to: "/profileWindow/adminPanel/complaints", icon: "complaints", label: "Жалобы" },
                    { to: "/profileWindow/adminPanel/like", icon: "users", label: "Список" },
                    chatLink
                ];

                return (
                    <>
                        {renderNav(adminLinks)}
                        {renderBurgerButton()}
                    </>
                );

            default:
                return <div>No navigation available</div>; // Consider adding default behavior
        }
    };


    // Шапка сайта
    const headerBlock = (user) => (
        <div className='header'>
            <div className="header__container container">
                <Link to="/" className="logo">HardHeart</Link>
                {typeNav(user)}
            </div>
        </div>
    );

    const [modalOpen, setModalOpen] = useState(false)
    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <LoginModal />
            </Modal>
            {headerBlock(user.role)}
        </>
    );
}