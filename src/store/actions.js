import * as TYPES from "./mutation-types";
export default {
  addCart({ state, commit }, payload) {
    return new Promise((resolve)=>{
      const product = state.cartList.find(o => o.iid == payload.iid);
      if (product) {
        commit(TYPES.ADD_COUNTER, product);
        resolve('商品数量+1');
      } else {
        payload.count = 1;
        payload.isChecked = true;
        commit(TYPES.ADD_TO_CART, payload);
        resolve('添加了新商品');
      }
    })
    
  }
};
