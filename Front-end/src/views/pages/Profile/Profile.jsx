import { useEffect, useState } from 'react'
import { Header, Footer, useAuth, SVGIcon, Modal, ProfileModals, getTextById } from '../../Imports/components'
import { karta, smoke, alkogol, strelka, ruler, zadiak, bodyType } from '../../Imports/media'
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, signout, setUserInfo, setUser } = useAuth();
    const navigate = useNavigate()

    const imagesCount = [{ count: 1 }, { count: 2 }, { count: 3 }, { count: 4 }, { count: 5 }]
    // Переключатель модалок
    const [modalOpen, setModalOpen] = useState(false)
    const [modalName, setModalName] = useState(null)

    function openModalName(name) {
        setModalName(name)
        setModalOpen(true)
    }

    function calculateAge(birthDate) {
        // Преобразуем строку в объект даты
        const birth = new Date(birthDate);
        const today = new Date();

        // Вычисляем возраст
        let age = today.getFullYear() - birth.getFullYear();

        // Проверяем, был ли день рождения уже в этом году
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
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
                        <div className='profile__img'>
                            {/* <img src="" alt="" /> */}
                            <img src="../../../media/users/bannerCenter.png" alt="" />
                        </div>
                        {imagesCount.map((i, index) => (
                            <label
                                key={`img-label-${i.count}`}
                                className="profile__img"
                                htmlFor={`img-${i.count}`}
                            >
                                <button className="profile__img-remove">
                                    <SVGIcon name="closeWhite" />
                                </button>
                                <p>{i.count}</p>
                                <input type="file" id={`img-${i.count}`} style={{ display: 'none' }} />
                            </label>
                        ))}
                    </div>

                    <div className="profile__info pi">
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__name">{user.name}, {calculateAge(user.age)}</p>
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
                                    {user.height != null ? user.height : "думаю..."}
                                </span>
                                <span className="pi__infoBlock-card">
                                    <img src={strelka} alt="" />
                                    {user.weight != null ? user.weight : "думаю..."}
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
                    <button onClick={() => signout(() => navigate("/"), { replace: true })} className='profile__exit _btn _nFonRed _borderBtn'>Вытйи</button>
                </div>

                <Footer />
            </div >
        </>
    )
}