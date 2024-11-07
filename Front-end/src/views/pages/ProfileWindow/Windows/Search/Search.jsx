import { getTextById, Modal, ProfileWindowModal, SVGIcon, useAuth } from '../../../../Imports/components'
import { bannerCenterFoto, friendIcon, smoke } from '../../../../Imports/media'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
    const { user } = useAuth()
    const [modalOpen, setModalOpen] = useState(false)

    // переключатель для информации
    const [switchInfo, setSwitchInfo] = useState(false);
    // SWIPER
    const swiperRef = useRef(null)

    // Список пользователей
    const [userList, setUserList] = useState();
    // Текущий выбор
    const [userNow, setUserNow] = useState(user);
    // Функция для выбора
    function nextUser(id = 0) {
    }

    // Запрос на поиск
    useEffect(() => {
        try {
            fetch('http://127.0.0.1:8000/api/usersList')
                .then((res) => res.json())
                .then((data) => {
                    setUserList(data)
                    setUserNow(data[0])
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
        }
    }, [])

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ProfileWindowModal modal='filterMain' />
            </Modal>

            <button className='profileWindow__filter' onClick={() => setModalOpen(true)}><SVGIcon name="filter" /></button>

            <div className="search__window">
                <div className="search__imgCards swi">
                    <div className="swi__imgCard">
                        <Swiper className="swi__imgCard-swiper"
                            ref={swiperRef}
                            speed={500}
                            allowTouchMove={false}
                            spaceBetween={50}
                        >
                            <SwiperSlide className='swi__imgCard-slide'><img src={bannerCenterFoto} alt="" /></SwiperSlide>
                            <SwiperSlide className='swi__imgCard-slide'><img src={bannerCenterFoto} alt="" /></SwiperSlide>
                            <SwiperSlide className='swi__imgCard-slide'><img src={bannerCenterFoto} alt="" /></SwiperSlide>
                        </Swiper>

                        <div className="swi__imgCard-swiper__btns">
                            <div className="swi__imgCard-swiper__btn" onClick={() => swiperRef.current.swiper.slidePrev()}></div>
                            <div className="swi__imgCard-swiper__btn" onClick={() => swiperRef.current.swiper.slideNext()}></div>
                        </div>

                        <div className="swi__imgCard-btns">
                            <button className="swi__imgCard-btn _btn _red">
                                <SVGIcon name="closeWhite" />
                            </button>
                            <button className="swi__imgCard-btn _btn _blue">
                                <SVGIcon name="heart" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`search__texts pi ${switchInfo ? "_active" : ""}`}>
                    <div className="search__texts-down">
                        <div className="pi__infoBlock">
                            <p className="pi__name">{userNow.name}, {userNow.age}</p>
                            <p className="pi__city">из {userNow.city}</p>
                        </div>
                        <button className={switchInfo ? "_active" : ""} onClick={() => setSwitchInfo(!switchInfo)}><SVGIcon name="ArrowDownNotLong" /></button>
                    </div>

                    <div className="pi__infoBlock">
                        <p className="pi__infoBlock-name">Я ищу</p>
                        <span className="pi__infoBlock-card _p20">{getTextById("goal", userNow.goal)}</span>

                        <p className='pi__infoBlock-card _discreption _block'>
                            {userNow.description}
                        </p>
                    </div>

                    <div className="pi__infoBlock">
                        <p className="pi__infoBlock-name">Я ищу</p>
                        <div className="pi__cards">


                            {userNow.alcohol &&
                                <span className="pi__infoBlock-card">
                                    <img src={alcohol} alt="" />
                                    {getTextById("smoking", userNow.alcohol)}
                                </span>
                            }

                            {userNow.smoking &&
                                <span className="pi__infoBlock-card">
                                    <img src={smoke} alt="" />
                                    {getTextById("smoking", userNow.smoking)}
                                </span>
                            }
                            {userNow &&
                                <span className="pi__infoBlock-card">
                                    <img src={smoke} alt="" />
                                    {getTextById("smoking", userNow.smoking)}
                                </span>
                            }
                            {userNow &&
                                <span className="pi__infoBlock-card">
                                    <img src={smoke} alt="" />
                                    {getTextById("smoking", userNow.smoking)}
                                </span>
                            }


                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                        </div>
                    </div>
                    <div className="pi__infoBlock">
                        <p className="pi__infoBlock-name">Образование</p>
                        <div className="pi__cards">
                            <span className="pi__infoBlock-card _p20">НИУ МГСУ (МГСУ-МИСИ)</span>
                            <span className="pi__infoBlock-card _p20">НИУ МГСУ (МГСУ-МИСИ)</span>
                        </div>
                    </div>
                    <div className="pi__infoBlock">
                        <p className="pi__infoBlock-name">Интересы</p>
                        <div className="pi__cards">
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}