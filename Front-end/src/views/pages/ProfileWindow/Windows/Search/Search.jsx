import { getTextById, Modal, ProfileWindowModal, SVGIcon, useAuth, AgeCalculate, likeUser, dislikeUser } from '../../../../Imports/components'
import { bannerCenterFoto, karta, smoke, alkogol, strelka, ruler, zadiak } from '../../../../Imports/media'

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

    // Текущий выбор
    const [userNow, setUserNow] = useState(user);
    const [userList, setUserList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        try {
            fetch(`http://127.0.0.1:8000/api/usersList?id=${user.id}&birth_date=${user.age}&gender=${user.gender}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserList(data);
                    setUserNow(data[0]);
                    setCurrentIndex(0);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
        }
    }, []);

    function nextUserNow() {
        const nextIndex = (currentIndex + 1);
        setUserNow(userList[nextIndex]);
        setCurrentIndex(nextIndex);
    }


    // Проверка about
    const [switchAbout, setSwitchAbout] = useState(false);

    useEffect(() => {
        if (userNow) {
            if (userNow.alcohol != null || userNow.smoking != null || userNow.height != null || userNow.weight != null || userNow.financialSituation != null || userNow.zadiak != null) {
                setSwitchAbout(true)
            } else {
                setSwitchAbout(false)
            }
        }
        console.log(userNow);
    }, [userNow])

    const [modal, setModal] = useState("");
    function openModal(modalName) {
        setModal(modalName);
        setTimeout(() => { setModalOpen(true) }, 500)
    }

    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ProfileWindowModal modal={modal} body={{ "whom": user.id, "who": userNow?.id }} closeModal={() => setModalOpen(false)} />
            </Modal>

            {/* <button className='profileWindow__filter' onClick={() => openModal("filterMain")}><SVGIcon name="filter" /></button> */}

            <div className="search__window">
                {!userNow ?
                    <div className='search__window-end'>
                        Закончился выбор =(
                    </div>
                    :
                    <>
                        <div className="search__imgCards swi">
                            <div className="swi__imgCard">
                                <Swiper className="swi__imgCard-swiper"
                                    ref={swiperRef}
                                    speed={500}
                                    allowTouchMove={false}
                                    spaceBetween={50}
                                >
                                    {userNow['imgs']
                                        ?
                                        userNow['imgs'].map((img, index) => (
                                            <SwiperSlide key={index} className='swi__imgCard-slide'><img src={`http://127.0.0.1:8000/api/images/${img.name}`} alt="asd" /></SwiperSlide>
                                        ))
                                        :
                                        <SwiperSlide className='swi__imgCard-slide'><img src={bannerCenterFoto} alt="" /></SwiperSlide>
                                    }
                                </Swiper >

                                <div className="swi__imgCard-swiper__btns">
                                    <div className="swi__imgCard-swiper__btn" onClick={() => swiperRef.current.swiper.slidePrev()}></div>
                                    <div className="swi__imgCard-swiper__btn" onClick={() => swiperRef.current.swiper.slideNext()}></div>
                                </div>

                                <div className="swi__imgCard-btns">
                                    <button className="swi__imgCard-btn _btn _red" onClick={() => { dislikeUser(user.id, userNow.id); nextUserNow() }}>
                                        <SVGIcon name="closeWhite" />
                                    </button>
                                    <button className="swi__imgCard-btn _btn _blue" onClick={() => { likeUser(user.id, userNow.id); nextUserNow() }}>
                                        <SVGIcon name="heart" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`search__texts pi ${switchInfo ? "_active" : ""}`}>
                            <div className="search__texts-down">
                                <div className="pi__infoBlock">
                                    <p className="pi__name">{userNow.name}, {AgeCalculate(userNow.age)}</p>
                                    <p className="pi__city">из {userNow.city}</p>
                                </div>
                                <button className={switchInfo ? "_active" : ""} onClick={() => setSwitchInfo(!switchInfo)}><SVGIcon name="ArrowDownNotLong" /></button>
                            </div>

                            <div className="pi__infoBlock">
                                <p className="pi__infoBlock-name">Я ищу</p>
                                <span className="pi__infoBlock-card _p20">{getTextById("goal", userNow.goal)}</span>
                                {userNow.description &&
                                    <p className='pi__infoBlock-card _discreption _block'>
                                        {userNow.description}
                                    </p>
                                }

                            </div>

                            {switchAbout &&
                                <div className="pi__infoBlock">
                                    <p className="pi__infoBlock-name">О себе</p>
                                    <div className="pi__cards">

                                        {userNow.alcohol &&
                                            <span className="pi__infoBlock-card">
                                                <img src={alkogol} alt="" />
                                                {getTextById("alcohol", userNow.alcohol)}
                                            </span>
                                        }

                                        {userNow.smoking &&
                                            <span className="pi__infoBlock-card">
                                                <img src={smoke} alt="" />
                                                {getTextById("smoking", userNow.smoking)}
                                            </span>
                                        }
                                        {userNow.height &&
                                            <span className="pi__infoBlock-card">
                                                <img src={ruler} alt="" />
                                                {userNow.height} см
                                            </span>
                                        }
                                        {userNow.weight &&
                                            <span className="pi__infoBlock-card">
                                                <img src={strelka} alt="" />
                                                {userNow.weight} кг
                                            </span>
                                        }
                                        {userNow.financialSituation &&
                                            <span className="pi__infoBlock-card">
                                                <img src={karta} alt="" />
                                                {getTextById("financialSituation", userNow.financialSituation)}
                                            </span>
                                        }
                                        {userNow.zadiak &&
                                            <span className="pi__infoBlock-card">
                                                <img src={zadiak} alt="" />
                                                {getTextById("zadiak", userNow.zadiak)}
                                            </span>
                                        }
                                    </div>
                                </div>
                            }

                            {userNow.educations.length != 0 &&
                                <div className="pi__infoBlock">
                                    <p className="pi__infoBlock-name">Образование</p>
                                    <div className="pi__cards">
                                        {userNow.educations.map((education, index) =>
                                            <span className="pi__infoBlock-card _p20" key={index}>{education.name}</span>
                                        )}
                                    </div>
                                </div>
                            }
                            {userNow.interests.length != 0 &&
                                <div className="pi__infoBlock">
                                    <p className="pi__infoBlock-name">Интересы</p>
                                    <div className="pi__cards">
                                        {userNow.interests.map((interest, index) =>
                                            <span className="pi__infoBlock-card" key={index}>
                                                {interest.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            }

                            <button onClick={() => openModal("claim")}>Пожаловаться</button>

                        </div>
                    </>
                }
            </div >
        </>
    )
}