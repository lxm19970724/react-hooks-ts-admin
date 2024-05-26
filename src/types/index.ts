export interface menuStateType {
  collapsed: boolean;
}

export interface MenuState {
  menuReducer: menuStateType;
}
export interface MenuItem {
  path: string;
  auth: number;
  title: string;
  key: string;
  element: any;
  icon?: any;
  hidden?: boolean;
  children?: childrenMenuItem[];
}

export interface childrenMenuItem extends MenuItem {
  parentPath: string;
}
