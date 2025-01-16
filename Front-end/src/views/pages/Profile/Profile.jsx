import { useEffect, useState, useRef } from 'react'
import { Header, Footer, useAuth, SVGIcon, Modal, ProfileModals, getTextById, AgeCalculate, getFetch, postFetch } from '../../Imports/components'
import { karta, smoke, alkogol, strelka, ruler, zadiak, bodyType } from '../../Imports/media'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, signout, setUserInfo, setUser } = useAuth();
    const navigate = useNavigate()

    const [imagesCount, setImagesCount] = useState(user['imgs'])
    const inputRef = useRef(null);

    // Переключатель модалок
    const [modalOpen, setModalOpen] = useState(false)
    const [modalName, setModalName] = useState(null)

    function openModalName(name) {
        setModalName(name)
        setModalOpen(true)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("iduser", user.id);
            formData.append("file", file);

            // Отправляем данные на сервер
            postFetch("addFoto", formData, null, true)
                .then((data) => {
                    setUser(prevUser => ({ ...prevUser, imgs: data }))
                    setUserInfo(user)
                    console.log(data)
                })
                .catch((err) => console.log(`Ошибка: ${err}`));

            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    useEffect(() => {
        let data = [];
        for (let i = 1; i < 7; i++) {
            data[i] = user["imgs"]?.[i - 1] || { count: i };
        }
        setImagesCount(data)
        console.log()
    }, [user])

    function deleteFoto(idFoto) {
        postFetch("deleteFoto", { id: idFoto })
            .then((data) => {
                setUser(prevUser => ({ ...prevUser, imgs: data }))
                setUserInfo(user)
            })
            .catch((err) => { console.log(err) })
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <>
            <div className='wripper' >
                <Header />
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <ProfileModals nameModal={modalName} modalClose={() => setModalOpen(false)} user={user} updateUser={setUser} setUser={setUserInfo} />
                </Modal>

                <div className="profile container">
                    <div className="profile__imgs">

                        {imagesCount &&
                            imagesCount.map((foto, index) => (
                                (foto.name)
                                    ?
                                    <div className='profile__img' key={index}>
                                        <button className="profile__img-remove" onClick={() => deleteFoto(foto.id)}>
                                            <SVGIcon name="closeWhite" />
                                        </button>
                                        <img src={`http://127.0.0.1:8000/api/images/${foto.name}`} alt="asd" />
                                    </div>
                                    :
                                    <label key={index}
                                        className="profile__img"
                                        htmlFor={`img-${foto.count}`}
                                    >
                                        <p>{foto.count}</p>
                                        <input type="file" onChange={(event) => handleImageChange(event)} id={`img-${foto.count}`} style={{ display: 'none' }} ref={inputRef} />
                                    </label>
                            ))}
                            
                    </div>

                    <div className="profile__info pi">
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__name">{user.name}, {AgeCalculate(user.age)}</p>
                                <button className='pi__edit' onClick={() => openModalName('name')}><SVGIcon name="edit" /></button>
                            </div>

                            <p className="pi__city">из {user.city}</p>
                        </div>
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__infoBlock-name">Я ищу</p>
                                <button className='pi__edit' onClick={() => openModalName('purpose')}><SVGIcon name="edit" /></button>
                            </div>

                            <span className="pi__infoBlock-card _p20">{getTextById("goal", user.goal)}</span>

                            <p className='pi__infoBlock-card _discreption _block'>
                                <button className='pi__edit' onClick={() => openModalName('description')}><SVGIcon name="edit" /></button>
                                {user.description ? user.description : "Думаю..."}
                            </p>
                        </div>

                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__infoBlock-name">О себе</p>
                                <button className='pi__edit' onClick={() => openModalName('about')}><SVGIcon name="edit" /></button>
                            </div>
                            <div className="pi__cards">
                                <span className="pi__infoBlock-card">
                                    <img src={alkogol} alt="" />
                                    {getTextById("alcohol", user.alcohol)}
                                </span>

                                <span className="pi__infoBlock-card">
                                    <img src={smoke} alt="" />
                                    {getTextById("smoking", user.smoking)}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={ruler} alt="" />
                                    {user.height != null ? user.height + ' см' : "думаю..."}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={strelka} alt="" />
                                    {user.weight != null ? user.weight + ' кг' : "думаю..."}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={bodyType} alt="" />
                                    {getTextById("bodyType", user.bodyType)}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={karta} alt="" />
                                    {getTextById("financialSituation", user.financialSituation)}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={zadiak} alt="" />
                                    {getTextById("zadiak", user.zadiak)}
                                </span>
                            </div>
                        </div>
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__infoBlock-name">Образование</p>
                                <button className='pi__edit' onClick={() => openModalName('education')}><SVGIcon name="edit" /></button>
                            </div>
                            <div className="pi__cards">
                                {user.educations.map((education, index) =>
                                    <span className="pi__infoBlock-card _p20" key={index}>{education.name}</span>
                                )}
                            </div>
                        </div>
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__infoBlock-name">Интересы</p>
                                <button className='pi__edit' onClick={() => openModalName('interests')}><SVGIcon name="edit" /></button>
                            </div>
                            <div className="pi__cards">
                                {user.interests.map((interest, index) =>
                                    <span className="pi__infoBlock-card" key={index}>
                                        {interest.name}
                                    </span>
                                )}

                            </div>
                        </div>
                    </div>
                    <button onClick={() => signout(() => navigate("/"), { replace: true })} className='profile__exit _btn _nFonRed _borderBtn'>Выйти</button>
                </div>

                <Footer />
            </div >
        </>
    )
}