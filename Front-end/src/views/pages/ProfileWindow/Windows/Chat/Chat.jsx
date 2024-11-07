import { Link, useParams } from "react-router-dom";
import { chatFoto } from '../../../../Imports/media'
import { Modal, SVGIcon, ChatModal, useAuth } from '../../../../Imports/components'
import { useEffect, useRef, useState } from "react";

export default function Chat() {
    const [modalOpen, setModalOpen] = useState(false)
    const [sendInp, setSendInp] = useState('')
    const { idChat } = useParams()

    const user = useAuth();

    // Следит за разрешением
    const [isWideProfile, setIsWideProfile] = useState(window.innerWidth >= 991);
    const [isWideLinkBack, setIsWideLinkBack] = useState(window.innerWidth >= 1170);
    const handleResize = () => {
        setIsWideLinkBack(window.innerWidth >= 1170);
        setIsWideProfile(window.innerWidth >= 991);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    // ---end

    // Нижняя панель
    const [chatDown, setChatDown] = useState(false)

    // Поле ввода
    const [value, setValue] = useState('');
    const textareaRef = useRef(null);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    

    const appendText = (text) => {
        setValue((prevValue) => prevValue + text);
    };


    return (
        <>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ChatModal />
            </Modal>
            <div className="chat">
                {!idChat ? (<>
                    <h1>Нету чата</h1>
                </>) :
                    (<>
                        <div className="chat__window">
                            <div className="chat__header">

                                {isWideLinkBack ? (
                                    <Link to="/profileWindow/">← <span>назад</span></Link>
                                ) : (
                                    <Link to="/profileWindow/chatpanel">← <span>назад</span></Link>
                                )}
                                <p>Имя фамилия</p>
                                <div className="chat__header-foto" onClick={() => setModalOpen(true)}>
                                    <img src={chatFoto} alt="" />
                                </div>
                            </div>
                            <div className="chat__messages">
                                <div className="chat__message _left">
                                    Пойдёт
                                </div>

                                <div className="chat__message _right">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo nostrum repudiandae rem iusto blanditiis dolorum nulla maiores deleniti, quaerat explicabo sit id numquam! Ex aut voluptate minus nulla quo quam!
                                </div>


                                <div className="chat__message _left">
                                    Привет, как дела?
                                </div>
                            </div>
                            <div className="chat__inpBlock">
                                <div className="chat__inp">
                                    <textarea
                                        ref={textareaRef}
                                        value={value}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Написать сообщение..." />
                                    <SVGIcon name='send' />
                                </div>
                            </div>

                            {!isWideProfile && (
                                <div className={`chat__down ${chatDown && "_active"}`}>
                                    <button className="chat__down-btn" onClick={() => setChatDown(!chatDown)}>Готовые вопросы <SVGIcon name="ArrowDownNotLongWhite" /></button>
                                    {(user == "admin") ? (
                                        <div className="cp__timer">
                                            <div className="cp__timer-inps">
                                                <input className="_borderBtn" type="text" placeholder="00" />
                                                :
                                                <input className="_borderBtn" type="text" placeholder="00" />
                                                <button className="_borderBtn _btn _green"><SVGIcon name="chekWhite" /></button>
                                            </div>
                                            <button className="_btn _red _borderBtn">Блокировать</button>
                                        </div>
                                    ) : (
                                        <div className="cp__words">
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                            <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                        <div className="chat__panel cp">
                            <div className="cp__header">
                                <div className="cp__foto">
                                    <img src={chatFoto} alt="" />
                                </div>
                                <p className="cp__name">Имя фамилия 19</p>
                                <button onClick={() => setModalOpen(true)}>Открыть профиль</button>
                            </div>

                            {(user == "admin") ? (
                                <div className="cp__timer">
                                    <p className="cp__timer-name">Время на исправление:</p>
                                    <div className="cp__timer-inps">
                                        <input className="_borderBtn" type="text" placeholder="00" />
                                        :
                                        <input className="_borderBtn" type="text" placeholder="00" />
                                        <button className="_borderBtn _btn _green"><SVGIcon name="chekWhite" /></button>
                                    </div>
                                    <button className="_btn _red _borderBtn">Блокировать</button>
                                </div>
                            ) : (
                                <div className="cp__words">
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                    <button className="cp__word" onClick={() => appendText("Как дела?")}>Как дела?</button>
                                </div>
                            )}
                        </div>
                    </>
                    )}
            </div >
        </>
    )
}