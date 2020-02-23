<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list class="cart-list"></cart-list>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import BottomBar from './childComps/BottomBar';
import { mapGetters } from "vuex";
export default {
  name: "cart",
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
    // ...mapGetters(["cartLength","cartList"])
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

</style>