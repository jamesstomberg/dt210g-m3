import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from '../interfaces/Interface.UserState';
import { zustandUserStorageName } from '../constants';

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userNiceName: '',
            userEmail: '',
            isLoggedIn: false,

            setUser: (userNiceName, userEmail) => {
                set({
                    userNiceName,
                    userEmail,
                    isLoggedIn: true,
                });
            },

            logout: () => {
                set({
                    userNiceName: '',
                    userEmail: '',
                    isLoggedIn: false,
                });
            },
        }),
        {
            name: zustandUserStorageName,
        }
    )
);
