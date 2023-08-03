/**
 *dva 里面的router和我们react-router-dom 一样 
 */
import {RouterAPI} from 'dva'
import {Router,Route,Switch} from "dva/router"
import Layout from "./layout/layout"
import Login from "./pages/login/login"

export default (api?:RouterAPI) => {
	if(api){
		return (
			<Router history={api.history}>
				<Switch>
					<Route path="/login">
						<Login></Login>
					</Route>
					<Route path="/">
						<Layout></Layout>
					</Route>
				</Switch>
			</Router>
		)
	}
	return {}
	
}