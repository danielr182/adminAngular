export interface IMenu {
  title: string;
  icon: string;
  submenu: ISubMenu[];
}

export interface ISubMenu {
  title: string;
  url: string;
}
