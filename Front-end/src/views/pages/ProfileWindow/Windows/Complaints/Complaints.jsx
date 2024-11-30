import { useEffect, useState } from "react";
import SVGIcon from "../../../../components/SVGIcon";
import { getFetch, postFetch } from "../../../../components/Fetch";
import AgeCalculate from "../../../../components/AgeCalculate";
import getTextById from "../../../../components/getTextById";
import { Link } from "react-router-dom";
import CountdownTimer from "./Timer";

export default function Complaints() {
    const [cardTypeBtn, setCardTypeBtn] = useState("new");
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                const endpoint = cardTypeBtn === "new" ? "claimListNew" : "claimListCorrecting";
                const data = await getFetch(endpoint, null, setLoading);
                setListUsers(data || []);
            } catch (err) {
                setError("Ошибка при загрузке данных");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [cardTypeBtn]);

    function removeClaim(id) {
        const endpoint = cardTypeBtn === "new" ? "claimListNew" : "claimListCorrecting";

        postFetch("removerClaim", { id: id, type: endpoint })
            .then((data) => setListUsers(data))
    }

    function cardInfo(cardType) {
        if (loading) {
            return <p>Загрузка...</p>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        if (listUsers.length === 0) {
            return <p>Нет данных для отображения</p>;
        }

        return listUsers.map((listUser) => (
            <div className="complaints__card" key={listUser?.id}>
                {cardType === "new" ? (
                    <>
                        <div className="complaints__user">
                            <Link to={`/profileWindow/adminPanel/SearchOne/${listUser?.id}_${listUser?.whomInfo?.id}`} className="complaints__user-name">
                                {listUser?.whomInfo?.name || "Имя не указано"}, {AgeCalculate(listUser?.whomInfo?.age)}
                            </Link>
                            <p className="complaints__user-id">id: {listUser?.whomInfo?.id || "неизвестно"}</p>
                        </div>
                        <div className="complaints__center">
                            <p>{getTextById("discriptionClaims", listUser?.discription || "Описание отсутствует")}</p>
                            <SVGIcon name="ArrowRightLong" />
                        </div>
                        <div className="complaints__user">
                            <Link to={`/profileWindow/adminPanel/SearchOne/${listUser?.id}_${listUser?.whoInfo?.id}`} className="complaints__user-name">
                                {listUser?.whoInfo?.name || "Имя не указано"}, {AgeCalculate(listUser?.whoInfo?.age)}
                            </Link>
                            <p className="complaints__user-id">id: {listUser?.whoInfo?.id || "неизвестно"}</p>
                        </div>
                        <button className="complaints__user _close" onClick={() => removeClaim(listUser?.id)}>
                            <SVGIcon name={"close"} />
                        </button>
                    </>
                ) : (
                    <>
                        <div className="complaints__user">
                            <Link to={`/profileWindow/adminPanel/SearchOne/${listUser?.id}_${listUser?.whoInfo?.id}`} className="complaints__user-name">
                                {listUser?.whoInfo?.name || "Имя не указано"}, {AgeCalculate(listUser?.whoInfo?.age)}
                            </Link>
                            <p className="complaints__user-id">id: {listUser?.whoInfo?.id || "неизвестно"}</p>
                        </div>
                        <div className="complaints__center">
                            <CountdownTimer targetDate={listUser?.timer} />
                        </div>
                        <div className="complaints__user">
                            <p className="complaints__user-name">
                                {getTextById("discriptionClaims", listUser?.discription || "Описание отсутствует")}
                            </p>
                        </div>
                        <button className="complaints__user _close" onClick={() => removeClaim(listUser?.id)}>
                            <SVGIcon name={"close"} />
                        </button>
                    </>
                )}
            </div>
        ));
    }

    return (
        <div className="complaints">
            <div className="like__header">
                <p className="like__name">Жалобы</p>
                <p className="like__name">
                    <button
                        className={cardTypeBtn === "new" ? "_active" : ""}
                        onClick={() => setCardTypeBtn("new")}
                    >
                        новые
                    </button>{" "}
                    /{" "}
                    <button
                        className={cardTypeBtn === "correcting" ? "_active" : ""}
                        onClick={() => setCardTypeBtn("correcting")}
                    >
                        исправляющиеся
                    </button>
                </p>
            </div>
            <div className="like__container">
                <div className="complaints__cards">
                    {cardInfo(cardTypeBtn)}
                </div>
            </div>
        </div>
    );
}
