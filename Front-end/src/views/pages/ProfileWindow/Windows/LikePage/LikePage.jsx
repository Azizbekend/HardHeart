import { useEffect, useState } from "react";
import { SVGIcon, useAuth, Modal, ProfileWindowModal, getFetch, postFetch, } from '../../../../Imports/components'
import UserCard from "./UserCard";


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



    const [userList, setUserList] = useState([]);
    useEffect(() => {
        if (user.role == "user") {
            getUserList("userListLikeMe")
        } else {
            getUserList("userListAll")
        }
    }, [])


    const [likeSearch, setLikeSearch] = useState('');
    const [filteredItems, setFilteredItems] = useState();
    useEffect(() => {
        setFilteredItems(userList)
    }, [userList])
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setLikeSearch(value);
        const result = userList.filter((item) => {
            const idMatch = item.id.toString().includes(value);
            const nameMatch = item.name.toLowerCase().includes(value);
            return idMatch || nameMatch;
        });
        setFilteredItems(result);
    };


    function likeHeader(userRole) {
        switch (userRole) {
            case "user":
                return (<>
                    <div className="like__header">
                        <p className="like__name">Лайки</p>
                        <p className="like__name">
                            <button className={cardTypeBtn === "likeMe" ? "_active" : ""} onClick={() => { setCardTypeBtn("likeMe"); getUserList("userListLikeMe") }}>меня</button>
                            /
                            <button className={cardTypeBtn === "" ? "_active" : ""} onClick={() => { setCardTypeBtn(""); getUserList("userListLikeEachOther") }}>взаимные</button>
                        </p>
                    </div>
                </>)
            case "admin":
                return (<>
                    {/* <button className='profileWindow__filter _like' onClick={() => setModalOpen(true)}><SVGIcon name="filter" /></button> */}

                    <div className="like__header">
                        <p className="like__name">Список пользователей</p>
                    </div>
                    <div className="like__search">
                        <input type="text" name="likeSearch" value={likeSearch} onChange={handleSearch} placeholder="Найти по имени" />
                        <button className="_btn _green ">Найти</button>
                    </div>
                </>)
        }
    }

    const [loading, setLoading] = useState(true);
    // Получение пользователей
    function getUserList(type) {
        setLoading(true);
        if (type === "userListAll") {
            getFetch("userListAll", "", setLoading).then((data) => {
                setUserList(data);
            });
        }
        if (type === "userListLikeMe") {
            postFetch("userListLikeMe", { idUser: user.id }, setLoading).then((data) => {
                setUserList(data);
            });
        }

        if (type === "userListLikeEachOther") {
            postFetch("userListLikeEachOther", { idUser: user.id }, setLoading).then((data) => {
                setUserList(data);
            });
        }
    }



    // Блокировка пользователя
    const [blockedUsers, setBlockedUsers] = useState({});

    const toggleBlockUser = (userId) => {
        setBlockedUsers((prev) => ({
            ...prev,
            [userId]: !prev[userId],
        }));
    };

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
                        {loading ? <p>Загрузка...</p> :
                            userList && userList.length > 0 ?
                                filteredItems ?
                                    (filteredItems.map((userLike, index) => (
                                        <UserCard userInfo={userLike} typeBtn={cardTypeBtn} setUserList={setUserList} user={user} key={index} />
                                    ))
                                    )
                                    :
                                    (userList.map((userLike, index) => (
                                        <UserCard userInfo={userLike} typeBtn={cardTypeBtn} setUserList={setUserList} user={user} key={index} />
                                    ))
                                    ) : (
                                    <p>НЕТУ</p>
                                )}
                    </div>
                </div>
            </div>
        </>
    )
}