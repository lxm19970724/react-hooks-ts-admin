//模块化引入样式
import styles from './index.module.scss'
import { Layout } from "antd";
const { Content } = Layout;
import { Outlet } from "react-router-dom";

const ContentComponent = () => {
    return (
        <Content className={styles.content}>
            <Outlet />
        </Content>
    )
}

export default ContentComponent
