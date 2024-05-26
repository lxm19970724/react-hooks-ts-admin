import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
const RouterBeforEach = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const whitelist = ["/login"]; // 白名单
  console.log(location.pathname, '/////');
  
  useEffect(() => {
    const isLogin = localStorage.getItem('token');
    if (isLogin) {
      if (whitelist.indexOf(location.pathname) === -1) {
        message.warning("请先登录");
        navigate("/home");
        return;
      }
    }
  }, [location.pathname]);
  return <Outlet />;
};

export default RouterBeforEach;
