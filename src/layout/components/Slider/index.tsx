import React, { useEffect, useState } from "react";
//模块化引入样式
import styles from "./index.module.scss";
// 引入路由
import routes from "@/router";
import { useLocation, useNavigate } from "react-router-dom";
// store & storeType
import { useSelector } from "react-redux";
import { MenuState, MenuItem, childrenMenuItem} from "@/types";
import type { MenuProps } from 'antd';
import {
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar } from "antd";
const { Sider } = Layout;
const Slider = () => {
  const [menuList, setMenuList] = useState<childrenMenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<Array<string>>([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const items = routes[2].children?.filter((item) => !item.meta.hidden);
    handleMenu(items);
  }, []);

  const handleMenu = (menuItem: childrenMenuItem[]) => {
    const list: childrenMenuItem[] = [];
    menuItem?.forEach((item: any) => {
      item.label = item.title;
      item.icon = React.createElement(item.icon)
      list.push(item);
      if (item.children) handleMenu(item.children);
    });
    setMenuList(list);
  };

  useEffect(() => {
    // 从当前url里取出路径 回显对应的菜单
    sessionStorage.setItem(
      "selectedKeys",
      pathname.slice(pathname.lastIndexOf("/") + 1)
    );
    // 当多级菜单时 还需设置openKey 回显默认展开的嵌套菜单
    if (pathname.lastIndexOf("/") !== 0) {
      sessionStorage.setItem("openKeys", pathname.match(/(?<=\/).*?(?=\/)/g));
    }

    // 回显默认选中的菜单和展开的嵌套菜单
    sessionStorage.getItem("selectedKeys")
      ? setSelectedKeys(sessionStorage.getItem("selectedKeys") || "")
      : setSelectedKeys("home");
    setOpenKeys(sessionStorage.getItem("openKeys"));
  }, [pathname]);

  const handleMenuClick: MenuProps["onclick"] = ({
    item,
    key,
    keyPath,
  }: any) => {
    // 存储key到本地 刷新页面选择的菜单也不会丢失
    sessionStorage.setItem("selectedKeys", key);
    if (keyPath.length > 1) {
      // 点击多级菜单时 存储被点击的root menu key, 用来回显
      sessionStorage.setItem("openKeys", [keyPath[keyPath.length - 1]]);
    } else {
      // 当点击一级菜单时,清空curNestedKey, 这样刷新的时候就不会展开没有被选中的二级菜单
      sessionStorage.setItem("openKeys", []);
    }
    if (item.props.parentpath === "/") {
      navigate(item.props.path);
    } else {
      navigate(`${item.props.parentpath}/${item.props.path}`);
    }
  };

  const handleOpenChange: MenuProps["onOpenChange"] = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  // 解构
  const { collapsed } = useSelector((state: MenuState) => state.menuReducer);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={styles.leftMenu}
    >
      {collapsed ? (
        <div className={styles.title}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </div>
      ) : (
        <div className={styles.title}>故事汇后台管理系统</div>
      )}
      <Menu
        items={menuList}
        theme="light"
        mode="inline"
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        onClick={handleMenuClick}
        onOpenChange={handleOpenChange}
      />
    </Sider>
  );
};

export default Slider;
