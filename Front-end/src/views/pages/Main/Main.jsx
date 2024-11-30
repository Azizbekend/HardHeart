import React, { useState, useRef } from 'react';
// ===Импорт фотографий===
import { redHeartIcon, friendIcon, girlFriendIcon, fireHeartIcon, bannerCenterFoto, bannerLeftFoto, bannerRightFoto, payInstallment, slide_1, slide_2, slide_3 } from '../../Imports/media'
// ===Импорт компонентов===
import { UseWordEffect, Header, Footer, AccordionItem, SVGIcon, Modal, LoginModal } from '../../Imports/components'

// ===Импорт компонентов===
import { accordionData } from '../../Imports/data'

// ===Swiper===
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Main() {
    // ДЛя анимации печатания слова
    const words = ['половинку', 'друга', 'подругу'];
    const { displayedText, typeCard, wordIndex, setWordIndex } = UseWordEffect(words);

    // Изменение иконок под картинками
    const getImageSrc = () => {
        switch (words[wordIndex]) {
            case 'половинку':
                return redHeartIcon;
            case 'друга':
                return friendIcon;
            case 'подругу':
                return girlFriendIcon;
            default:
                return '';
        }
    };
    // Анимация ховер для кнопки знакомиться в банннер
    const [isHovered, setIsHovered] = useState(false);

    // Штуки дрюки для свайпера
    const [isOpen, setIsOpen] = useState(false)
    const toggle = (index) => {
        setIsOpen(prevIndex => (prevIndex === index ? null : index));
    };

    const swiperRef = useRef(null)
    const swiperRefText = useRef(null)
    const slideClickPrev = () => {
        swiperRef.current.swiper.slidePrev()
        swiperRefText.current.swiper.slidePrev()
    }
    const slideClickNext = () => {
        swiperRef.current.swiper.slideNext()
        swiperRefText.current.swiper.slideNext()
    }

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className='wripper'>
            <Header />
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <LoginModal onClose={() => setModalOpen(false)} />
            </Modal>
            <div className="banner container">
                <div className="banner__text">
                    <h1>Найди <span>{displayedText}<span className='cursor'>|</span></span></h1>
                    <p>Сделай шаг навстречу</p>
                    <button className="_btn _purple  _borderBtn" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => setModalOpen(true)}>
                        <img src={isHovered ? fireHeartIcon : redHeartIcon} alt="redHeartIcon" />
                        Знакомиться
                    </button>
                </div>
                <div className="banner__imgs">
                    <div className="banner__cards">
                        <img className="banner__card" src={bannerCenterFoto} alt="bannerCenterFoto" />
                        <div className="banner__cards-back">
                            <img className="banner__card _back _rigth" src={bannerLeftFoto} alt="bannerCenterFoto" />
                            <img className="banner__card _back _left" src={bannerRightFoto} alt="bannerCenterFoto" />
                        </div>
                    </div>
                    <div className={`banner__symbol ${typeCard}`}>
                        <div className="banner__symbol-circle__blur"></div>
                        <div className="banner__symbol-icon">
                            <img src={getImageSrc()} alt="icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="about">
                <div className="about__text container">

                    <p><span>HardHeart</span>
                        <br />
                        уникальная платформа для тех, кто ищет настоящие, глубокие отношения, основанные на эмоциональной связи и взаимопонимании.</p>
                    <button className="_btn _purple _borderBtn" onClick={() => setModalOpen(true)}>Знакомиться</button>

                    <img src={payInstallment} className="about__img _top _left" alt="payInstallment" />
                    <img src={payInstallment} className="about__img _top _right" alt="payInstallment" />
                    <img src={payInstallment} className="about__img _bottom _left" alt="payInstallment" />
                    <img src={payInstallment} className="about__img _bottom _right" alt="payInstallment" />
                </div>
            </div>

            <div className="slider container">
                <Swiper ref={swiperRef} spaceBetween={30} slidesPerView={1} loop={true} allowTouchMove={false} className='slider__cards'>
                    <SwiperSlide className="slider__card"><img src={slide_1} alt="slide_1" /></SwiperSlide>
                    <SwiperSlide className="slider__card"><img src={slide_2} alt="slide_2" /></SwiperSlide>
                    <SwiperSlide className="slider__card"><img src={slide_3} alt="slide_3" /></SwiperSlide>
                </Swiper>
                <div className="slider__card _fixed">
                    <Swiper ref={swiperRefText} spaceBetween={30} slidesPerView={1} loop={true} allowTouchMove={false} className='slider__cards'>
                        <SwiperSlide><h3>Заполни анкету, чтобы тебя нашёл подходящий человек</h3></SwiperSlide>
                        <SwiperSlide><h3>Ищите подходящего партнёра по интересам</h3></SwiperSlide>
                        <SwiperSlide><h3>Не знаешь о чём заговорить? У нас есть готовые вопросы и ответы</h3></SwiperSlide>
                    </Swiper>
                    <div className="slider__btns">
                        <button className="slider__btn" onClick={() => slideClickPrev()}>
                            <SVGIcon name="ArrowLeftLong" />
                        </button>
                        <button className="slider__btn" onClick={() => slideClickNext()}>
                            <SVGIcon name="ArrowRightLong" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="faq container">
                <h2>FAQ</h2>
                <div className="faq__cards">

                    {accordionData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.title}
                            content={item.content}
                            isOpen={isOpen === index}
                            onToggle={() => toggle(index)}
                        />
                    ))}


                </div>
            </div>
            <Footer />
        </div>
    );
}
