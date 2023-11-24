import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import Slider from "./components/Slider"
import ContentComponent from "./components/Content"

import { Layout } from "antd";

const LayoutComponent = () => {
  return (
    <Layout style={{height:"100%"}}>
      <Slider/>
      <Layout>
        <HeaderComponent />
        <ContentComponent />
        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
