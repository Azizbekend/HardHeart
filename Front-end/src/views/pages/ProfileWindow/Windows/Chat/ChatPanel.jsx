import { Link } from "react-router-dom"
import { chatFoto } from '../../../../Imports/media'
// DeleteMe
function chatItem(boolka = false) {
    return (
        <Link to="/profileWindow/chat/:idChat" className={`pwp__item ${boolka && "_active"}`}>
            <img className="pwp__item-img" src={chatFoto} alt="" />
            <div className="pwp__item-info">
                <p className="pwp__item-name">Имя фамилия</p>
                <p className="pwp__item-text">Привет, как дела?</p>
            </div>
        </Link>
    )
}

export default function ChatPanel() {
    return (
        <>
            <div className="profileWindow__panel pwp _full">
                <div className="pwp__title">Чаты</div>
                <div className="pwp__items">
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                    {chatItem(false)}
                </div>
            </div>
        </>
    )
}