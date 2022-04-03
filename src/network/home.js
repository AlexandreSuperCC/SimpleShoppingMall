import {request} from "@/network/request";

function getRandom(a){
    return Math.ceil(Math.random()*a)
}

export function getHomeMultidata(){
    return request({
        url:'/electronicItemses?page='+getRandom(30)
    })
}
export function getHomeGoods(type,page){
    return request({
        url:'/goods/cid/'+type+'/'+page,
    })
}
export function getHomeCategory() {
    return request({
        url:'/categoryElectronics'
    })
}