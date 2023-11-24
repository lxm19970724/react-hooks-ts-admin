//模块化引入样式
import styles from './index.module.scss'
import { Layout } from "antd";
const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header style={{ padding: 0 }}>123123</Header>
    )
}

export default HeaderComponent
