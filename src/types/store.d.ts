interface User {
    name: string;
    avatar: string;
    email: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

type lang = 'zh_CN' | 'en_US'

interface LangStore {
    lang: lang;
    changeLanguage: (lang: lang) => void
    toggleLanguage: () => void
}