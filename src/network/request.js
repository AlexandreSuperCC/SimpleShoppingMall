import axios from "axios";

export function request(config){
    //创建axios实例
    const instance1 = axios.create({
        baseURL:'http://139.224.199.41:8080/api/alibaba',
        timeout:5000
    })
    //axios拦截器
    //2.1请求拦截的作用
    instance1.interceptors.request.use(req=>{
        return req;
    },err=>{
        console.log(err);
    })
    //2.2相应拦截
    instance1.interceptors.response.use(res=>{
        return res.data;
    },error => {
        console.log(error);
    })

    return instance1(config)
}