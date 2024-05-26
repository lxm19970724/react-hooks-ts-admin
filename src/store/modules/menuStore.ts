// 从toolkit中引入 createSlice
import { createSlice } from "@reduxjs/toolkit";

// 引入类型
import { menuStateType } from "@/types";

// 初始化state
const initialState: menuStateType = {
  collapsed: false,
};

// 定义数据
const menuStore = createSlice({
  name: "menu",
  initialState,
  // 修改状态的方法 同步  支持直接修改
  reducers: {
    setCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
});

// 结构出来的actionCreater函数
const { setCollapsed } = menuStore.actions;

// 获取reducer
const reducer = menuStore.reducer;

// 按需导出actionCreater
export { setCollapsed };

// 默认导出reducer
export default reducer;
