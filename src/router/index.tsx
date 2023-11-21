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
import React, { lazy } from 'react'//路由懒加载
import Layout from '@/layout'
// import About from '@/views/About/About'
const Home = lazy(() => import("@/views/Home/Home"))
const Login = lazy(() => import("@/views/Login/Login"))

// 重定向
import { Navigate } from 'react-router-dom'

// 懒加载模式的组件必须在外层套React.Suspense  loading....
const withLoadingComponent = (comp: JSX.Element) => {
    return (
        <React.Suspense fallback={<div>loading...</div>}>
            {comp}
        </React.Suspense>
    )
}
const routes = [
    {
        path: "/login",
        element: withLoadingComponent(<Login />)
    },
    {
        path: "/",
        element: <Navigate to="/home" />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home", //首页
                element: withLoadingComponent(<Home />)
            }
        ]
    },
]

export default routes