export interface UserState {
    userNiceName: string;
    userEmail: string;
    isLoggedIn: boolean;
    userID: number;
    userDisplayName: string;
    setUser: (userNiceName: string, userEmail: string, userID: number, userDisplayName: string) => void;
    logout: () => void;
}
