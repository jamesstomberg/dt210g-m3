export interface Route {
    path: string;
    text: string;
    protected: boolean;
}

export interface Routes {
    [key: string]: Route;
}
