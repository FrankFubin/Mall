import { request } from "network/request";

export function getHomeMultidata() {
  return request({
    url: "/home/multidata"
  });
}
/**
 * 获取首页数据
 */
export function getHomeGoods(params) {
  return request({
    url: "/home/data",
    params
  });
}
