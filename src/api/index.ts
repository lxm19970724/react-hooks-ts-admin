import { ILoginParams, ILoginResponse } from '../pages/login/login.type'
import requset from '../utils/request'

export default{
    login(data:ILoginParams){
        /**
         * 第一个是接收的参数类型
         * 第二个是返回的参数类型
        */
        requset.post<ILoginParams,ILoginResponse>('/admin/base/open/login',data)
    }
}