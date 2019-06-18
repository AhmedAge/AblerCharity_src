import { ISec_Menu } from './ISec_Menu';

export interface MenusInfo {
    menuId: number;
    menuTitleAr: string;
    menuTitleEn: string;
    menuPah: string;
    menuParentId: number;
    menuIcon: string;
    IsActive: string;
    MenuOrder: number;
    Images: string;
    Description: string;
    color:string;
    UserName:string;
    UserImage:string;
    childMenusInfo:ISec_Menu[];
}