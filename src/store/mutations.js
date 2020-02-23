import * as TYPES from "./mutation-types";
export default {
  [TYPES.ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [TYPES.ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
};
