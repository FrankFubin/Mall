import { request } from "./request"

export function getCategory() {
    return request({
        url: "/category"
    })
}

export function getSubcategory(params) {
    return request({
        url: "/subcategory",
        params
    })
}

export function getCategoryDetail(params) {
    return request({
        url: "/subcategory/detail",
        params
    })
}