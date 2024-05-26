import { configureStore } from "@reduxjs/toolkit";

// 引入默认导出的
import menuReducer from "./modules/menuStore";

// 创建根store组合子模块
const store = configureStore({
  reducer: {
    menuReducer,
  },
});

// 导出store
export default store
