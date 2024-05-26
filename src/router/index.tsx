/**
 * react 18以前的版本写法
 * **/
// import App from '../App'
// import Home from '@/views/Home'
// import About from '@/views/About'
// import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"

// //两种路由模式组件:BrowserRouter(History模式)，HashRouter(Hash模式)

// const baseRouter = () => (
//     <BrowserRouter>
//         <Routes>
//             <Route path='/' element={<App />}>
//                 {/* Navigate 重定向至home */}
//                 <Route path='/' element={<Navigate to="/home"/>}></Route>
//                 <Route path='/home' element={<Home />}></Route>
//                 <Route path='/about' element={<About />}></Route>
//             </Route>
//         </Routes>
//     </BrowserRouter>
// )

// export default baseRouter

/**
 * react 18及以后的版本写法
 *
 * **/
import React, { lazy } from "react"; //路由懒加载
import { MenuItem } from "@/types";
import Layout from "@/layout";
const Home = lazy(() => import("@/views/Home/Home"));
const SystemParam = lazy(() => import("@/views/SystemParam/SystemParam"));
const Login = lazy(() => import("@/views/Login/Login"));
const RouterBeforEach = lazy(() => import("@/views/RouterBeforEach/RouterBeforEach"));
import { SettingOutlined, HomeOutlined } from "@ant-design/icons";

// 重定向
import { Navigate } from "react-router-dom";

// 懒加载模式的组件必须在外层套React.Suspense  loading....
const withLoadingComponent = (comp: JSX.Element) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>{comp}</React.Suspense>
  );
};
const routes: MenuItem[] = [
  {
    path: "/login",
    auth: 0,
    title: "登录",
    key: "Login",
    element: withLoadingComponent(<Login />),
  },
  {
    path: "/",
    auth: 0,
    title: "首页",
    key: "RouterBeforEach",
    element: withLoadingComponent(<RouterBeforEach />),
    children: [
      {
        path: "/home",
        auth: 0,
        title: "首页",
        key: "Home",
        icon: HomeOutlined,
        parentPath: '/',
        element: withLoadingComponent(<Home />)
      },
      {
        path: "/systemParam",
        auth: 0,
        title: "系统参数",
        key: "SystemParam",
        icon: SettingOutlined,
        parentPath: '/',
        element: withLoadingComponent(<SystemParam />)
      }
    ]
  },
  // {
  //   path: "/",
  //   element: <Layout />,
  //   children: [
  //     {
  //       path: "/home", //首页
  //       name: "Home",
  //       element: withLoadingComponent(<Home />),
  //       parentpath: "/",
  //       meta: {
  //         title: "首页",
  //         hidden: false,
  //         icon: HomeOutlined,
  //       },
  //       children: [
  //         {
  //           path: "/test", //系统参数
  //           name: "Test",
  //           element: withLoadingComponent(<SystemParam />),
  //           parentpath: "/home",
  //           meta: {
  //             title: "测试",
  //             hidden: false,
  //             icon: SettingOutlined,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: "/systemParam", //系统参数
  //       name: "SystemParam",
  //       element: withLoadingComponent(<SystemParam />),
  //       parentpath: "/",
  //       meta: {
  //         title: "系统参数",
  //         hidden: false,
  //         icon: SettingOutlined,
  //       },
  //     },
  //   ],
  // },
];

export default routes;
