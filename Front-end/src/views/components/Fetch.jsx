async function getFetch(apiName, body, setLoading) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/${apiName}${body ? "?" + body : ""}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        return data;
    } catch (err) {
        console.log(err.message);
        return null;
    } finally {
        if (setLoading) setLoading(false);
    }
}

async function postFetch(apiName, body, setLoading, isFile) {
    try {
        const headers = isFile ? {} : { "Content-Type": "application/json" };

        const response = await fetch(`http://127.0.0.1:8000/api/${apiName}`, {
            method: 'POST',
            headers: headers,
            body: isFile ? body : JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const text = await response.text();

        const data = text ? JSON.parse(text) : {};
        return data;
    } catch (err) {
        console.log("Ошибка запроса:", err.message);
        return null;
    } finally {
        if (setLoading) setLoading(false);
    }
}


export { getFetch, postFetch }