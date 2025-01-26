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
            userID: 0,
            userDisplayName: '',

            setUser: (userNiceName, userEmail, userID, userDisplayName) => {
                set({
                    userNiceName,
                    userEmail,
                    isLoggedIn: true,
                    userID: userID,
                    userDisplayName: userDisplayName,
                });
            },

            logout: () => {
                set({
                    userNiceName: '',
                    userEmail: '',
                    isLoggedIn: false,
                    userID: 0,
                    userDisplayName: '',
                });
            },
        }),
        {
            name: zustandUserStorageName,
        }
    )
);
