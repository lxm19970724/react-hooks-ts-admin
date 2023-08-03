/**
 * 登录传的参数
 * **/

import { Role } from "../../type"

export interface ILoginParams {
    username:string
    password:string
}

/**
 * 登录接口的返回值
*/
export interface ILoginResponse {
    token:string,
    roles:Role[]
}