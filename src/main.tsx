import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//引入重置样式
import "reset-css"

//引入全局样式
import "@/assets/styles/global.scss"

//引入路由(18以下版本写法)
// import Router from './router'

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//       <Router />
//   </React.StrictMode>,
// )


//18及以上版本写法
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
