import React, { useEffect, useState } from 'react';
import { Link, Navigate, replace, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../Imports/components'

export default function LoginModal({ onClose }) {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);

    const { signin } = useAuth();

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

    // ЗАПРОС НА РЕГИСТРАЦИЮ
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    age: data.date,
                    email: data.email,
                    gender: data.gender,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();



                if (errorData.email) {
                    setError('email', { type: 'manual', message: 'Почта занята' });
                } else {
                    console.log('Ошибка регистрации:', errorData);
                    throw new Error('Ошибка регистрации');
                }
            }

            const responseData = await response.json();
            reset()
            signin(responseData.user, () => navigate("/profile"), { replace: true })
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
        }
    };

    // ЗАПРОС НА АВТОРИЗАИЦЮ
    const onSubmitLogin = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.emailLogin,
                    password: data.passwordLogin,
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
            reset()

            if (responseData.role == "user") {
                signin(responseData, () => navigate("/profile"), { replace: true })
            } else if (responseData.role == "admin") {
                signin(responseData, () => navigate("/profileWindow/adminPanel/like"), { replace: true })
            } else if (responseData.role == "block") {
                signin(responseData, () => navigate("/block"), { replace: true })
            }

            console.log('Успешная регистрация:', responseData);
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
        }
    }

    return (
        <>
            {isLogin ? (
                <>
                    <h3 className="modal__name">Авторизация</h3>
                    <form className="modal__items" onSubmit={handleSubmit(onSubmitLogin)}>
                        <input className="modal__inp _borderBtn"
                            type="email"
                            placeholder="почта:"
                            {...register('emailLogin', {
                                required: "Поле обязательно",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Не корректная почта',
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Максимум 100 символов",
                                }
                            })}
                        />
                        {errors?.emailLogin && (<p style={{ color: "red" }}>{errors?.emailLogin?.message}</p>)}

                        <input
                            type="password"
                            className="modal__inp _borderBtn"
                            placeholder="Пароль:"

                            {...register('passwordLogin', {
                                required: "Поле обязательно",
                                maxLength: {
                                    value: 20,
                                    message: "Максимум 20 символов",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Минимум 6 символов",
                                }
                            })}
                        />
                        {errors?.passwordLogin && (<p style={{ color: "red" }}>{errors?.passwordLogin?.message}</p>)}

                        <button type="submit" className="_btn _purple _borderBtn" disabled={!isValid}>Войти</button>
                        <Link className="_btn _nFon _borderBtn" to="#" onClick={() => setIsLogin(false)}>Создать профиль</Link>
                    </form>
                </>
            ) : (
                <>
                    <h3 className="modal__name">Регистарция</h3>
                    <form className="modal__items" onSubmit={handleSubmit(onSubmit)}>
                        <input className="modal__inp _borderBtn"
                            placeholder="Имя:"

                            {...register('name', {
                                required: "Поле обязательно",
                                pattern: {
                                    value: /^[А-яA-z]+$/,
                                    message: "Разрешены только буквы"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Максимум 20 символов",
                                }
                            })}
                        />
                        {errors?.name && (<p style={{ color: "red" }}>{errors?.name?.message}</p>)}

                        <input type="date" className="modal__inp _borderBtn"
                            {...register('date', {
                                required: "Поле обязательно",
                            })}
                        />
                        {errors?.date && (<p style={{ color: "red" }}>{errors?.date?.message}</p>)}

                        <select className='modal__inp _borderBtn' {...register("gender")}>
                            <option value="man">Мужчина</option>
                            <option value="woman">Женщина</option>
                        </select>

                        <input className="modal__inp _borderBtn"
                            type="email"
                            placeholder="почта:"
                            {...register('email', {
                                required: "Поле обязательно",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Не корректная почта',
                                },
                                maxLength: {
                                    value: 100,
                                    message: "Максимум 100 символов",
                                }
                            })}
                        />
                        {errors?.email && (<p style={{ color: "red" }}>{errors?.email?.message}</p>)}

                        <input type="password"
                            className="modal__inp _borderBtn"
                            placeholder="Пароль:"

                            {...register('password', {
                                required: "Поле обязательно",
                                maxLength: {
                                    value: 20,
                                    message: "Максимум 20 символов",
                                },
                                minLength: {
                                    value: 6,
                                    message: "Минимум 6 символов",
                                }
                            })}
                        />
                        {errors?.password && (<p style={{ color: "red" }}>{errors?.password?.message}</p>)}

                        <input type="password"
                            className="modal__inp _borderBtn"
                            placeholder="Повторите пароль:"

                            {...register('password_r', {
                                required: "Поле обязательно",
                                validate: (value) => value === getValues('password') || "Пароли не совпадают",
                            })}
                        />
                        {errors?.password_r && (<p style={{ color: "red" }}>{errors?.password_r?.message}</p>)}

                        <button type="submit" className="_btn _purple _borderBtn" disabled={!isValid}>Регистрация</button>
                        <Link className="_btn _nFon _borderBtn" to="#" onClick={() => setIsLogin(true)}>Назад</Link>
                        <p className='modal__docsText'>Продолжая, вы принимаете условия <span className='modal__linkDocs'><Link to="/documen/sogl" onClick={() => onClose()}>Соглашения</Link></span> и <span className='modal__linkDocs'><Link to="/documen/politic" onClick={() => onClose()}>Конфиденциальности</Link></span>
                        </p>
                    </form>
                </>
            )}
        </>
    )
}