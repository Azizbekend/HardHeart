import { useEffect, useState } from "react";
import { SVGIcon, useAuth, Modal, ProfileWindowModal } from '../../../../Imports/components'

import { bannerCenterFoto } from "../../../../Imports/media"


export default function LikePage() {
    // Переключателт
    const { user } = useAuth();
    const [cardTypeBtn, setCardTypeBtn] = useState("usersList")
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if (user.role === "admin") {
            setCardTypeBtn("usersList");
        } else {
            setCardTypeBtn("likeMe");
        }
    }, [user]);
    // Переменные для inputs
    const [likeSearch, setLikeSearch] = useState('');

    function likeHeader(userRole) {
        switch (userRole) {
            case "user":
                return (<>
                    <div className="like__header">
                        <p className="like__name">Лайки</p>
                        <p className="like__name">
                            <button className={cardTypeBtn === "likeMe" ? "_active" : ""} onClick={() => setCardTypeBtn("likeMe")}>меня</button> / <button className={cardTypeBtn === "" ? "_active" : ""} onClick={() => setCardTypeBtn("")}>взаимные</button>
                        </p>
                    </div>
                </>)
            case "admin":
                return (<>
                    <button className='profileWindow__filter _like' onClick={() => setModalOpen(true)}><SVGIcon name="filter" /></button>

                    <div className="like__header">
                        <p className="like__name">Лайки</p>
                    </div>
                    <div className="like__search">
                        <input type="text" name="likeSearch" value={likeSearch} onChange={(e) => setLikeSearch(e.target.value)} placeholder="Найти по имени" />
                        <button className="_btn _green ">Найти</button>
                    </div>
                </>)
        }
    }

    function likeCard(btnType, block = false) {
        return (<>
            <div className={`like__card ${block && "_red"}`}>
                <div className="like__card-img">
                    <img src={bannerCenterFoto} alt="bannerCenterFoto" />
                    {likeCardTypeBtn(btnType, block)}
                </div>
                <p className="like__card-name">Имя фамилия, 19</p>
                <p className="like__card-city">из Казани</p>
            </div>
        </>)
    }

    function likeCardTypeBtn(type, block) {
        switch (type) {
            case "likeMe":
                return (<>
                    <div className="like__btns">
                        <button className="like__btn-svg _btn _red">
                            <SVGIcon name="closeWhite" />
                        </button>
                        <button className="like__btn-svg _btn _blue">
                            <SVGIcon name="heart" />
                        </button>
                    </div>
                </>)
            case "usersList":
                return (<>
                    <div className="like__btns">
                        {!block ? (<button className="like__btn _btn _red _borderBtn">Блокировать</button>) : (<button className="like__btn _btn _blue _borderBtn">Разблокировать</button>)}
                    </div>
                </>)
            default:
                return null;
        }
    }

    return (
        <>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <ProfileWindowModal modal='filterMain' />
            </Modal>

            <div className="likePage">
                {likeHeader(user.role)}
                <div className="like__container">
                    <div className="like__cards">
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, false)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                        {likeCard(cardTypeBtn, true)}
                    </div>
                </div>
            </div>
        </>
    )
}