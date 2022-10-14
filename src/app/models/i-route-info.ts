export interface IRouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permissions?: any[];
    submenu: IRouteInfo[];
}
