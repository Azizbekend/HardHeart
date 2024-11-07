import { useEffect, useState, useRef } from 'react';
import { Header, Footer, SVGIcon, Modal, useAuth } from '../../Imports/components'
import { bannerCenterFoto, friendIcon, chatFoto } from '../../Imports/media'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';


export default function ProfileWindow() {
    const { user } = useAuth();
    const { panel } = useParams()
    const [panelCarse, setPanelCase] = useState("");

    // Следит за разрешением
    const [isWideProfile, setIsWideProfile] = useState(window.innerWidth >= 1170);
    const handleResize = () => {
        setIsWideProfile(window.innerWidth >= 1170);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const localUrl = useLocation()
    useEffect(() => {
        setPanelCase(windowPanel(panel, false));
    }, [panel, localUrl.pathname]);
    // DeleteMe
    function chatItem(boolka = false) {
        return (
            <Link to="/profile/chat/:idChat" className={`pwp__item ${boolka && "_active"}`}>
                <img className="pwp__item-img" src={chatFoto} alt="" />
                <div className="pwp__item-info">
                    <p className="pwp__item-name">Имя фамилия</p>
                    <p className="pwp__item-text">Привет, как дела?</p>
                </div>
            </Link>
        )
    }

    function adminPanelItem(name, iconName, link) {
        const isActive = localUrl.pathname === link;  // Сохраним активное состояние
        return (
            <Link to={link} className={`pwp__item _pdng ${isActive ? "_active" : ""}`}>
                <SVGIcon className="pwp__item-img" name={iconName} />
                <p className="pwp__item-name _notM">{name}</p>
            </Link>
        );
    }


    useEffect(() => {
        setPanelCase(windowPanel(panel, false))
    }, [panel])

    function windowPanel(panel, boolka) {
        switch (panel) {
            case "userChats":
                return (<>
                    <div className="profileWindow__panel pwp">
                        <div className="pwp__title">Чаты</div>
                        <div className="pwp__items">
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                        </div>
                    </div>
                </>)
            case "adminPanel":
                return (<>
                    <div className="profileWindow__panel pwp">
                        <div className="pwp__title">
                            <div className="pwp__title-foto">
                                <SVGIcon name="user" />
                            </div>
                            <p>Админ Админов</p>
                        </div>
                        <div className="pwp__items">
                            {adminPanelItem("Список пользователей", "users", "/profileWindow/adminPanel/like")}
                            {/* {adminPanelItem("Статистика", "statistic", "#")} */}
                            {adminPanelItem("Жалобы", "chatsAdmin", "/profileWindow/adminPanel/complaints")}
                        </div>
                    </div>
                </>)
            case "adminChats":
                return (<>
                    <div className="profileWindow__panel pwp">
                        <div className="pwp__title">Чаты</div>
                        <div className="pwp__items">
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                            {chatItem(boolka)}
                        </div>
                    </div>
                </>)
            default:
                break;
        }
    }

    return (
        <>
            <Header />
            <div className='wripper'>
                <div className="container">
                    <div className="profileWindow">

                        {isWideProfile && (
                            <>
                                {panelCarse}
                            </>
                        )}

                        <Outlet />
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}