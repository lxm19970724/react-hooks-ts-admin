import axios, { AxiosResponse } from "axios";
import {IBaseResponse} from "../type"
import { message } from "antd";

/**
 * AxiosResponse 接收两个泛型
 * 第一个T是规定业务层的请求体类型,也就是接口定义的类型
 * 所以我们用统一的返回结构IBaseResponse
 * 
 * IBaseResponse 又接收一个类型  这个类型泛指具体业务
*/

axios.interceptors.response.use((response: AxiosResponse<IBaseResponse<any>>) => {
    /**
     * 根据业务需求判断前端显示的msg
    */
    if (response.data.code !== 200) {
        // 提示错误信息
        message.error(response.data.message)
        //抛出错误,阻塞后续程序运行
        throw new Error(response.data.message)
    }
    /**
     * 正常返回
     * 返回给业务层的数据
    */
    return response.data.data;
})

export default axios