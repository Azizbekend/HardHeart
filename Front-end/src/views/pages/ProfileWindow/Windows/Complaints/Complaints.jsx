import { useState } from "react"
import SVGIcon from "../../../../components/SVGIcon"

export default function Complaints() {

    const [cardTypeBtn, setCardTypeBtn] = useState("new")

    function cardItem(cardType) {
        return (<>
            <div className="complaints__card ">
                {cardInfo(cardType)}
            </div>
        </>)
    }

    function cardInfo(cardType) {
        switch (cardType) {
            case "new":
                return (<>
                    <div className="complaints__user">
                        <p className="complaints__user-name">Имя фамилия, 19</p>
                        <p className="complaints__user-id">id: 12</p>
                    </div>
                    <div className="complaints__center">
                        <p>Захотел пожаловаться</p>
                        <SVGIcon name="ArrowRightLong" />
                    </div>
                    <div className="complaints__user">
                        <p className="complaints__user-name">Имя фамилия, 19</p>
                        <p className="complaints__user-id">id: 12</p>
                    </div>
                </>)
            case "correcting":
                return (<>
                    <div className="complaints__user">
                        <p className="complaints__text">Имя фамилия, 19</p>
                        <p className="complaints__user-id">id: 12</p>
                    </div>
                    <div className="complaints__center">
                        <p>00:00:00</p>
                    </div>
                    <div className="complaints__user">
                        <p className="complaints__user-name">Сквернословит</p>
                    </div>

                </>)
        }
    }

    return (
        <>
            <div className="complaints">
                <div className="like__header">
                    <p className="like__name">Жалобы</p>
                    <p className="like__name">
                        <button className={cardTypeBtn === "new" ? "_active" : ""} onClick={() => setCardTypeBtn("new")}>новые</button> / <button className={cardTypeBtn === "correcting" ? "_active" : ""} onClick={() => setCardTypeBtn("correcting")}>исправляющиеся</button>
                    </p>
                </div>
                <div className="like__container">
                    <div className="complaints__cards">
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                        {cardItem(cardTypeBtn)}
                    </div>
                </div>
            </div>
        </>
    )
}