import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        
    },
    actions: {
        addCart(state, payload) {
            const product = state.cartList.find(o => o.iid == payload.iid);
            if (product) {
                product.count++;
            } else {
                payload.count = 1;
                state.cartList.push(payload);
            }
        }
    }
})

export default store