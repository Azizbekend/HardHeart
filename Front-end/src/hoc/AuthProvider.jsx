import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // localStorage.removeItem("user"); // Очищаем данные при выходе
    // Проверяем наличие сохранённого пользователя в localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser || { role: "main" });

    useEffect(() => {
        // Сохраняем пользователя в localStorage при изменении user
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const signin = (newUser, cb) => {
        setUser(newUser);
        cb();
    }

    const signout = (cb) => {
        setUser({ role: "main" });
        localStorage.removeItem("user"); // Очищаем данные при выходе
        cb();
    }

    const setUserInfo = (userNew) => {
        localStorage.setItem("user", JSON.stringify(userNew));
    }

    const value = { user, signin, signout, setUserInfo, setUser };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
