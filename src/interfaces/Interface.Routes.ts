export interface Route {
    path: string;
    text: string;
    protected: boolean;
    navigation: boolean;
}

export interface Routes {
    [key: string]: Route;
}
