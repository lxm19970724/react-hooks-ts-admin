//模块化引入样式
import styles from './index.module.scss'
import { Layout } from "antd";
const { Content } = Layout;
import { Outlet } from "react-router-dom";
import BreadCrumbComponent from "../BreadCrumb"
import RouterBeforEach from '@/views/RouterBeforEach/RouterBeforEach';

const ContentComponent = () => {
    return (
        <Content className={styles.content}>
            <BreadCrumbComponent />
            <RouterBeforEach />
        </Content>
    )
}

export default ContentComponent
