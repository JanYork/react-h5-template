import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                name: '',
                avatar: '',
                email: ''
            },
            setUser: (user: User) => set({user}),
            clearUser: () => set({
                user: null
            }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        },
    ),
)