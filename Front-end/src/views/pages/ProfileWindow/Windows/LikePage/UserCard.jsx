import { useEffect, useState } from "react";
import AgeCalculate from "../../../../components/AgeCalculate";
import { bannerCenterFoto } from "../../../../Imports/media";
import { SVGIcon, disLikeUserPage, likeUserPage } from "../../../../Imports/components";
import { postFetch } from "../../../../components/Fetch";
import { Link } from "react-router-dom";

export default function UserCard({ userInfo, typeBtn, setUserList, user, key }) {

    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        setIsBlocked(userInfo.role == "block")
        console.log(userInfo)
    }, [])

    const handleBlockToggle = () => {
        const apiName = isBlocked ? "razBlockUser" : "blockUser";
        postFetch(apiName, { idUser: userInfo.id })
            .then(() => setIsBlocked(!isBlocked))
            .catch(err => console.log(err));
    };

    // Удаление пользователя
    const removeUser = (userId) => {
        setUserList(prevUserList =>
            prevUserList.filter(user => user.id !== userId)
        );
    };


    function likeCardTypeBtn(type, userLikeId) {
        switch (type) {
            case "likeMe":
                return (<>
                    <div className="like__btns">
                        <button className="like__btn-svg _btn _red" onClick={() => { disLikeUserPage(userLikeId, user.id); removeUser(userLikeId) }}>
                            <SVGIcon name="closeWhite" />
                        </button>
                        <button className="like__btn-svg _btn _blue" onClick={() => { likeUserPage(userLikeId, user.id); removeUser(userLikeId) }}>
                            <SVGIcon name="heart" />
                        </button>
                    </div>
                </>)
            case "usersList":
                return (<>
                    <div className="like__btns">
                        <button
                            className={`like__btn _btn ${isBlocked ? '_blue' : '_red'} _borderBtn`}
                            onClick={handleBlockToggle}
                        >
                            {isBlocked ? "Разблокировать" : "Блокировать"}
                        </button>
                    </div >
                </>)
            default:
                return null;
        }
    }

    return (
        <>
            <div className={`like__card ${isBlocked ? "_red" : ""}`} key={key}>
                <div className="like__card-img">
                    <img src={`http://127.0.0.1:8000/api/images/${userInfo?.img || "bannerCenter.png"}`} alt="bannerCenterFoto" />
                    {likeCardTypeBtn(typeBtn, userInfo.id)}
                </div>
                <Link to={`/profileWindow/adminPanel/SearchOne/0_${userInfo.id}`}>
                    <p className="like__card-name">{userInfo.name}, {AgeCalculate(userInfo.age)}</p>
                </Link>
                <p className="like__card-city">из {userInfo.city}</p>
            </div>
        </>
    )
}