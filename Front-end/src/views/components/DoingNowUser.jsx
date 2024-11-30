// Функция ЛАЙК в поисковике
function likeUser(id_user_whom, id_user_who) {
    fetch('http://127.0.0.1:8000/api/likeUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_user_whom: id_user_whom,
            whom_like: 1,
            id_user_who: id_user_who,
            who_like: 0,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response.json())
        })
        .catch((err) => {
            console.log(err.message);
        });
}
function dislikeUser(id_user_whom, id_user_who) {
    fetch('http://127.0.0.1:8000/api/dislikeUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_user_whom: id_user_whom,
            whom_like: 1,
            id_user_who: id_user_who,
            who_like: 0,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response.json())
        })
        .catch((err) => {
            console.log(err.message);
        });
}

// Функция ЛАЙК в страницe лайк
function likeUserPage(id_user_whom, id_user_who) {
    fetch('http://127.0.0.1:8000/api/likeUserPage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_user_whom: id_user_whom,
            id_user_who: id_user_who,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response.json())
        })
        .catch((err) => {
            console.log(err.message);
        });
}

// Функция ДИСЛАЙК в странице лайк
function disLikeUserPage(id_user_whom, id_user_who) {
    fetch('http://127.0.0.1:8000/api/disLikeUserPage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_user_whom: id_user_whom,
            id_user_who: id_user_who,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            console.log(response.json())
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export { likeUser, likeUserPage, disLikeUserPage, dislikeUser }