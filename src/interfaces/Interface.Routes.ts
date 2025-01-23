export interface Route {
    path: string;
    text: string;
}

export interface Routes {
    [key: string]: Route;
}
