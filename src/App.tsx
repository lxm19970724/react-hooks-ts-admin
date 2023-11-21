// 18以前的写法
// import { Outlet,Link } from 'react-router-dom'
// function App() {
//   return (
//     <div className="App">
//       <Link to="/home">Home</Link>
//       <Link to="/about">About</Link>
//       <Outlet></Outlet>
//     </div>
//   )
// }
// export default App



//18及以上版本的写法
import { useRoutes, Link } from 'react-router-dom'
import router from "@/router"

function App() {
  const routerView = useRoutes(router)
  return (
    <div className="App">
      {routerView}
    </div>
  )
}

export default App
