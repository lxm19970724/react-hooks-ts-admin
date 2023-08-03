import { Button, Card, Form, Input } from "antd";
import "./login.scss";
import { ILoginParams, ILoginResponse } from "./login.type";
import API from "../../api";
export default () => {

	const login = async (values:ILoginParams) => {
		const data = await API.login(values)
		console.log(data);
		/**
		 * axios 封装token 
		 * 过滤角色
		*/
		
	}

	return (
		<div id="login">
			<Card style={{ width: 400 }}>
				<div className="title">活动管理平台</div>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={login}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名!' }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码!' }]}
					>
						<Input.Password />
					</Form.Item>
					<div className="login-btn">
						<Button htmlType="submit">登录</Button>
					</div>
				</Form>
			</Card>

		</div>
	)
}
