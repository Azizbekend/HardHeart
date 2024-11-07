const onSubmitProfile = async (data) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUser: user.id,
                userName: data.userName,
                userCity: data.userCity,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message) {
                setError('passwordLogin', { type: 'manual', message: errorData.message });
            } else {
                console.log('Ошибка регистрации:', errorData);
                throw new Error('Ошибка регистрации');
            }
        }
        const responseData = await response.json();
        modalClose();

        user.name = responseData.name
        user.city = responseData.city
    } catch (error) {
        console.error('Ошибка регистрации:', error.message);
    }
}