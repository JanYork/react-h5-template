import {useState, useEffect} from 'react';

export const STORAGE_AUTHORIZE_KEY = 'token';

export const useAuthorization = () => {
    const [currentToken, setCurrentToken] = useState(localStorage.getItem(STORAGE_AUTHORIZE_KEY));

    // 同步 localStorage 变更
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_AUTHORIZE_KEY) {
                setCurrentToken(localStorage.getItem(STORAGE_AUTHORIZE_KEY));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token: string) => {
        localStorage.setItem(STORAGE_AUTHORIZE_KEY, token);
        setCurrentToken(token);
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_AUTHORIZE_KEY);
        setCurrentToken(null);
    };

    const isLogin = () => {
        return !!currentToken;
    };

    return {
        token: currentToken,
        login,
        logout,
        isLogin
    };
};
