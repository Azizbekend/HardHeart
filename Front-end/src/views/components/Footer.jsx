import { Link } from 'react-router-dom';

import dzenIcon from '../../assets/media/icons/dzen.png';
import telegramIcon from '../../assets/media/icons/telegram.png';
import vkIcon from '../../assets/media/icons/vk.png';

export default function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer__container container">
                    <Link to="/" className="logo">HardHeart</Link>
                    <div className="footer__links">
                        <Link to="#"><img src={dzenIcon} alt="dzen" /></Link>
                        <Link to="#"><img src={telegramIcon} alt="dzen" /></Link>
                        <Link to="#"><img src={vkIcon} alt="dzen" /></Link>
                    </div>
                    <div className="footer__links">
                        <Link to="tel:+79541234585">тел: +7 (954) 123-45-85</Link>
                        <a href="https://www.google.com/maps/search/?api=1&query=Казань,+Галеева+3А" target="_blank" rel="noopener noreferrer">
                            адрес: г. Казань, Галеева 3А
                        </a>
                    </div>
                    <div className="footer__links">
                        <Link to="/">Политика конфиденциальности</Link>
                        <Link to="/">Пользовательское соглашение</Link>
                        <Link to="/">Политика cookies</Link>
                        <Link to="/">FAQ</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}