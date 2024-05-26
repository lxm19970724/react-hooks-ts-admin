// 从toolkit中引入 createSlice
import { createSlice } from "@reduxjs/toolkit";

// 定义数据
const counterStore = createSlice({
  name: "counter",
  // 初始化state
  initialState: {
    count: 0,
  },
  // 修改状态的方法 同步  支持直接修改
  reducers: {
    addFn(state) {
      state.count++;
    },
    delFn(state) {
      state.count--;
    },
  },
});

// 结构出来的actionCreater函数
const { addFn, delFn } = counterStore.actions;

// 获取reducer
const reducer = counterStore.reducer;

// 按需导出actionCreater
export { addFn, delFn };

// 默认导出reducer
export default reducer
