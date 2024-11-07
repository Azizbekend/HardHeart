import { useEffect, useState } from "react";
import { seriousDate, freeDate, conversation, newExperience } from '../../Imports/media'
import { nameTexts, smokingTexts, bodyTypeTexts, zodiacTexts, finansTexts } from '../../Imports/data'
import { useForm } from 'react-hook-form';
import { SVGIcon } from '../../Imports/components';


export default function ProfileModals({ nameModal, modalClose, user, updateUser, setUser }) {

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
        getValues,
        setError
    } = useForm({
        mode: "onBlur",
    });

    // aboutData
    const [aboutData, setAboutData] = useState({
        drinks: null,
        smoking: null,
        financialSituation: null,
        rangeBody: null,
        rangeWidth: null,
        body: null,
        zodiac: null,
    });

    const onSubmitProfile = async (data, name) => {
        if (name == "name") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/name', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        userName: data.userName,
                        userCity: data.userCity,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        setError('passwordLogin', { type: 'manual', message: errorData.message });
                    } else {
                        console.log('Ошибка регистрации:', errorData);
                        throw new Error('Ошибка регистрации');
                    }
                }
                const responseData = await response.json();
                modalClose();

                user.name = responseData.name
                user.city = responseData.city
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "purpose") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/purpose', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        userPurpose: data.userPurpose,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        setError('passwordLogin', { type: 'manual', message: errorData.message });
                    } else {
                        console.log('Ошибка регистрации:', errorData);
                        throw new Error('Ошибка регистрации');
                    }
                }

                const responseData = await response.json();
                console.log(responseData)
                modalClose();
                user.goal = responseData.goal
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "description") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/description', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        description: data.descriptionName ? data.descriptionName : null,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        setError('passwordLogin', { type: 'manual', message: errorData.message });
                    } else {
                        console.log('Ошибка регистрации:', errorData);
                        throw new Error('Ошибка регистрации');
                    }
                }

                const responseData = await response.json();
                console.log(responseData)
                modalClose();
                user.description = responseData.description
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "about") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/about', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        drinksUser: data.drinks != 100 ? data.drinks : null,
                        smokingUser: data.smoking != 100 ? data.smoking : null,
                        rangeBodyUser: data.rangeBody,
                        rangeWidthUser: data.rangeWidth,
                        bodyUser: data.body != 100 ? data.body : null,
                        financialSituationUser: data.financialSituation != 100 ? data.financialSituation : null,
                        zodiacUser: data.zodiac != 100 ? data.zodiac : null,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.message) {
                        setError('passwordLogin', { type: 'manual', message: errorData.message });
                    } else {
                        console.log('Ошибка регистрации:', errorData);
                        throw new Error('Ошибка регистрации');
                    }
                }

                const responseData = await response.json();
                console.log(responseData)
                user.alcohol = responseData.alcohol
                user.smoking = responseData.smoking
                user.height = responseData.height
                user.weight = responseData.weight
                user.bodyType = responseData.bodyType
                user.financialSituation = responseData.financialSituation
                user.zadiak = responseData.zadiak
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "addEducation") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/addEducation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        name: data.education,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Ошибка регистрации:', errorData);
                    throw new Error('Ошибка регистрации');
                }

                const responseData = await response.json();
                reset()
                updateUser(prevUser => ({ ...prevUser, educations: responseData }))
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "removeEducation") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/removeEducation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        id: data,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Ошибка регистрации:', errorData);
                    throw new Error('Ошибка регистрации');
                }

                const responseData = await response.json();
                console.log(responseData)
                updateUser(prevUser => ({ ...prevUser, educations: responseData }))
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "addInterests") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/addInterests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        name: data.interests,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Ошибка регистрации:', errorData);
                    throw new Error('Ошибка регистрации');
                }

                const responseData = await response.json();
                reset()
                updateUser(prevUser => ({ ...prevUser, interests: responseData }))
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
        if (name == "removeInterests") {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/removeInterests', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUser: user.id,
                        id: data,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.log('Ошибка регистрации:', errorData);
                    throw new Error('Ошибка регистрации');
                }

                const responseData = await response.json();
                console.log(responseData)
                updateUser(prevUser => ({ ...prevUser, interests: responseData }))
                setUser(user)
            } catch (error) {
                console.error('Ошибка регистрации:', error.message);
            }
        }
    }


    // Номер модального окна about
    const [aboutModalNumber, setAboutModalNumber] = useState(1);
    // Все модальные окна
    const profileModal = (modal) => {
        switch (modal) {
            case "name":
                return (
                    <>
                        <h3 className="modal__name _mini">Профиль</h3>
                        <form className="modal__items" onSubmit={handleSubmit((data) => onSubmitProfile(data, "name"))}>
                            <input type="text"
                                className="modal__inp _borderBtn"
                                placeholder="Имя:"
                                {...register('userName', {
                                    required: "Поле обязательна",
                                    maxLength: {
                                        value: 30,
                                        message: "Максимум 30 символов",
                                    }
                                })}
                            />
                            {errors?.userName && (<p style={{ color: "red" }}>{errors?.userName?.message}</p>)}
                            <select className="modal__inp _borderBtn" {...register("userCity")}>
                                <option value="Казань">Казань</option>
                                <option value="Москва">Москва</option>
                                <option value="СПб">Санкт-Петербург</option>
                            </select>
                            <button type="submit" className="_btn _green _borderBtn" disabled={!isValid}>Сохранить</button>
                        </form>
                    </>
                );
            case "purpose":
                return (
                    <>
                        <h3 className="modal__name _mini">Профиль</h3>
                        <form className="modal__items _profile" onSubmit={handleSubmit((data) => onSubmitProfile(data, "purpose"))}>
                            {itemInputRadioPurpose("purpose", 1, "серьёзные отношения", seriousDate)}
                            {itemInputRadioPurpose("purpose", 2, "свободные отношения", freeDate)}
                            {itemInputRadioPurpose("purpose", 3, "Дружеское общение", conversation)}
                            {itemInputRadioPurpose("purpose", 4, "Новый опыт", newExperience)}
                            <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        </form>
                    </>
                );
            case "description":
                return (<>
                    <h3 className="modal__name _mini">Профиль</h3>
                    <form className="modal__items" onSubmit={handleSubmit((data) => onSubmitProfile(data, "description"))} >

                        <textarea name="description" className="modal__inp _textarea" placeholder="Текст..."
                            {...register('descriptionName')}></textarea>

                        <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                    </form>
                </>);
            case "about": return (aboutModals(aboutModalNumber))
            case "education":
                return (<>
                    <h3 className="modal__name _mini">Образование</h3>
                    <div className="modal__items">
                        <form className="modal__inp _flex  _borderBtn" onSubmit={handleSubmit((data) => onSubmitProfile(data, "addEducation"))}>
                            <input type="text" placeholder="Название" {...register('education')} />
                            <button>
                                <SVGIcon name="checkMark" />
                            </button>
                        </form>
                        {user.educations.map((education, index) =>
                            <span className="modal__inp _flex _borderBtn" key={index}>
                                {education.name}
                                <button onClick={() => onSubmitProfile(education.id, "removeEducation")}>
                                    <SVGIcon name="close" />
                                </button>
                            </span>
                        )}
                    </div>
                </>);
            case "interests":
                return (<>
                    <h3 className="modal__name _mini">Интересы</h3>
                    <div className="modal__items">
                        <form className="modal__inp _flex _borderBtn" onSubmit={handleSubmit((data) => onSubmitProfile(data, "addInterests"))}>
                            <input type="text" placeholder="Название" {...register('interests')} />
                            <button>
                                <SVGIcon name="checkMark" />
                            </button>
                        </form>

                        <div className="modal__items _flex">
                            {user.interests.map((interest, index) =>
                                <span className="modal__inp _flex _card _borderBtn" key={index}>
                                    {interest.name}
                                    <button onClick={() => onSubmitProfile(interest.id, "removeInterests")}>
                                        <SVGIcon name="close" />
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                </>);
            default:
                return null;
        }
    };

    function itemInputRadioPurpose(name, id, text, img) {
        return (<>
            <label htmlFor={`${name}-${id}`} className="modal__radioInp">
                <input type="radio" id={`${name}-${id}`} {...register("userPurpose")} value={id} />
                <div className="modal__inp _radio _left _borderBtn">
                    <img src={img} alt="seriousDate" />
                    <span>{text}</span>
                </div>
            </label>
        </>)
    }

    // Модальные окна about
    const aboutModals = (modalLvl) => {
        switch (modalLvl) {
            case 1:
                return (<>
                    {modalLayout(modalLvl, "Вы пьёте?", nameTexts, "drinks")}
                </>)
            case 2:
                return (<>
                    {modalLayout(modalLvl, "Вы курите?", smokingTexts, "smoking")}
                </>)
            case 3:
                return (<>
                    <h2 className="modal__name _mini">{`шаг ${modalLvl} из 7`}</h2>
                    <h3 className="modal__name _black">Какой у вас вес?</h3>
                    <form className="modal__items _profile"
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="modal__range">
                            <p className="modal__range-count">{rangeValueBody} кг</p>
                            <input type="range" id="range" min="40" max="160"
                                value={rangeValueBody}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${progressBody}%, #ccc ${progressBody}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => rangeInputBody(event)}
                                {...register("rangeBody")}
                            />
                        </div>
                        <button className="_btn _purple _borderBtn" onClick={() => { setAboutModalNumber(++modalLvl); setAboutData(prevState => ({ ...prevState, rangeBody: Number(rangeValueBody) })) }}>Продолжить</button>
                        <label className="modal__radioInp" onClick={() => { setAboutModalNumber(++modalLvl); setAboutData(prevState => ({ ...prevState, rangeBody: null })) }}>
                            <div className="modal__inp _radio _borderBtn">
                                <span>Не указывать</span>
                            </div>
                        </label>
                    </form>
                </>)
            case 4:
                return (<>
                    <h2 className="modal__name _mini">{`шаг ${modalLvl} из 7`}</h2>
                    <h3 className="modal__name _black">Какого вы роста?</h3>
                    <form className="modal__items _profile"
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="modal__range">
                            <p className="modal__range-count">{rangeValueWidth} см</p>
                            <input type="range" id="range" min="150" max="220"
                                value={rangeValueWidth}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${progressWidth}%, #ccc ${progressWidth}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => rangeInputWidth(event)}
                                {...register("rangeWidth")}
                            />
                        </div>
                        <button className="_btn _purple _borderBtn" onClick={() => { setAboutModalNumber(++modalLvl); setAboutData(prevState => ({ ...prevState, rangeWidth: Number(rangeValueWidth) })) }}>Продолжить</button>

                        <label className="modal__radioInp" onClick={() => { setAboutModalNumber(++modalLvl); setAboutData(prevState => ({ ...prevState, rangeWidth: null })) }}>
                            <div className="modal__inp _radio _borderBtn">
                                <span>Не указывать</span>
                            </div>
                        </label>
                    </form>
                </>)
            case 5:
                return (<>
                    {modalLayout(modalLvl, "Какое у вас телосложение?", bodyTypeTexts, "body")}
                </>)
            case 6:
                return (<>
                    {modalLayout(modalLvl, "Каково ваше финансовое положение?", finansTexts, "financialSituation")}
                </>)
            case 7:
                return (<>
                    {modalLayout(modalLvl, "Ваш знак зодиака?", zodiacTexts, "zodiac", "end")}
                </>)
        }
    }

    // Фунция создания контента модальных окон about
    function modalLayout(modalLvl, title, textsData, name, end) {
        let idNextModal = modalLvl === 7 ? 1 : (modalLvl + 1);
        return (
            <>
                <h2 className="modal__name _mini">{`шаг ${modalLvl} из 7`}</h2>
                <h3 className="modal__name _black">{title}</h3>
                <form className="modal__items _profile"
                    onSubmit={(e) => e.preventDefault()}
                >

                    {textsData.map((text, index) => itemInputRadio(name, index, text))}
                    {itemInputRadio(name, 100, 0, "next", idNextModal)}

                    {end ?
                        <button className="_btn _purple _borderBtn" onClick={() => { modalClose(); onSubmitProfile(aboutData, "about"); setTimeout(() => { setAboutModalNumber(1); }, 1000); }}>Сохранить</button>
                        :
                        <button className="_btn _purple _borderBtn" onClick={() => setAboutModalNumber(idNextModal)}>Продолжить</button>
                    }
                </form >
            </>
        )
    }
    // Функция создания radio элементов
    function itemInputRadio(name, id, text, type = "radio") {
        // Обязательно передавайте имя для `register` в зависимости от типа
        return (
            <label htmlFor={`${name}-${id}`} className="modal__radioInp" key={id} onClick={() => setAboutData(prevState => ({ ...prevState, [name]: id }))}>
                <input type="radio" id={`${name}-${id}`} value={type === "radio" ? id : "null"} {...register(name)} />
                <div className="modal__inp _radio _borderBtn">
                    <span>{type === "radio" ? text : "Не указывать"}</span>
                </div>
            </label>
        );
    }


    // range slider Рость
    const [rangeValueBody, setRangeValueBody] = useState(40)
    const progressBody = ((rangeValueBody - 40) / (160 - 40)) * 100;
    function rangeInputBody(event) {
        const tempSliderValue = event.target.value;
        setRangeValueBody(tempSliderValue);
    }
    // range slider Вес
    const [rangeValueWidth, setRangeValueWidth] = useState(150)
    const progressWidth = ((rangeValueWidth - 150) / (220 - 150)) * 100;
    function rangeInputWidth(event) {
        const tempSliderValue = event.target.value;
        setRangeValueWidth(tempSliderValue);
    }

    return (
        <>
            {profileModal(nameModal)}
        </>
    );
}
