import React from "react";
//模块化引入样式
import styles from "./index.module.scss";
//从react-redux中引入useSelector useDispatch
import { useSelector, useDispatch } from "react-redux";
import { menuStateType } from "@/store/types";
interface MenuState {
  menuReducer: menuStateType;
}
// 导入方法
import { setCollapsed } from "@/store/modules/menuStore";
import { Layout } from "antd";
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const HeaderComponent = () => {
  // 解构
  const { collapsed } = useSelector((state: MenuState) => state.menuReducer);
  // 得到dispatch函数
  const dispatch = useDispatch();

  return (
    <Header className={styles.header}>
      {collapsed ? (
        <MenuUnfoldOutlined onClick={() => dispatch(setCollapsed())} />
      ) : (
        <MenuFoldOutlined onClick={() => dispatch(setCollapsed())} />
      )}
    </Header>
  );
};

export default HeaderComponent;
