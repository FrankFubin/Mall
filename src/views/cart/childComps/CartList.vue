<template>
  <div class="cart-list">
    <scroll class="cart-scroll">
      <cart-list-item v-for="(item,index) in list" :key="index" :cartInfo="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from './CartListItem';
import {mapGetters} from 'vuex';
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      list:"cartList"
    })
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.cart-scroll {
  height: 100%;
  overflow: hidden;
}
</style>