//模块化引入样式
import styles from './index.module.scss'
import { Layout } from "antd";
const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    )
}

export default FooterComponent
