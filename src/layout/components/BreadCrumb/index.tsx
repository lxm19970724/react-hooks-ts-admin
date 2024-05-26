import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "@/router";
import { MenuItem } from "@/types";

interface IBreadCrumb {
  title: string;
  path: string;
}
const BreadCrumbComponent = () => {
  const { pathname } = useLocation();
  const [breadCrumb, setBreadCrumb] = useState<IBreadCrumb>([]);
  const routeList = routes[2].children?.filter((item) => !item.meta.hidden);
  let routeParents: MenuItem[] = [];

  useEffect(() => {
    routeParents = handleRoute(routes[2].children).filter(
      (item: any) => !item.meta.hidden
    );
    handleBreadCrumb(handleRoute(routeList), pathname);
  }, [pathname]);

  const handleRoute = (routes: MenuItem[]) => {
    console.log(routes, 'handleBreadCrumb');
    return routes.reduce((pre, next) => {
      return pre.concat(
        Array.isArray(next.children) ? handleRoute(next.children) : next
      );
    }, []);
  };

  const handleBreadCrumb = (routes: MenuItem[], path: string) => {
    let arr = [];
    let breadPath = []; //面包屑需要跳转的链接
    routes.forEach((item) => {
      if (item.path === path) {
        console.log(item.parentpath, 'item.parentpath')
        if (item.parentpath === "/") {
          setBreadCrumb([{ title: item.meta.title }]);
        } else {
          // 当为三级及以上菜单时，需要给二级面包屑的第二级加上跳转功能
          const parentPath = item.parentpath.split("/").filter((item) => item);
          parentPath.map((item: any, index: number) => {
            routeParents.map((item2) => {
              if (item === item2.path) {
                if (index < parentPath.length - 1) {
                  // 除了最后一项 其他都要把path 存进去
                  breadPath.push(item2.path);
                }
                if (parentPath.length >= 2 && index !== 0) {
                  // 说明是三级及以上的菜单层级
                  // 不给面包屑的第一层级加跳转 功能
                  arr.push({
                    title: item2.meta.title,
                    path: breadPath[index + 1],
                  });
                } else {
                  arr.push({ title: item2.meta.title });
                }
              }
            });
          });
          arr.push({ title: item.meta.title });
          setBreadCrumb(arr);
        }
      }
    });
  };

  console.log(breadCrumb);

  return (
    <Breadcrumb separator=">">
      {breadCrumb.map((item) => {
        item.path ? (
          <Breadcrumb.Item href="{item.path}">{item.title}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item>{item.title}</Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadCrumbComponent;
