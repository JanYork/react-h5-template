import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export const LANG_KEY = 'lang'
export const useI18nStore = create<LangStore>()(
    persist(
        (set, get) => ({
            lang: 'en_US',
            changeLanguage: (lang) => set({lang}),
            toggleLanguage: () => set(() => {
                return {
                    lang: get().lang.includes('zh') ? 'en_US' : 'zh_CN'
                }
            })
        }),
        {
            name: 'i18n-storage',
            storage: createJSONStorage(() => localStorage)
        },
    ),
)