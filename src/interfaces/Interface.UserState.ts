export interface UserState {
    userNiceName: string;
    userEmail: string;
    isLoggedIn: boolean;
    setUser: (userNiceName: string, userEmail: string) => void;
    logout: () => void;
}
