<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkBtnClick" :isChecked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计：￥{{totalPrice}}</span>
    <span class="buy-product" @click="subOrder">去结算({{cartLength}})</span>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    isSelectAll() {
      if (this.cartList.length == 0) return false;
      // 1.filter
      // return !this.cartList.filter(info => !info.isChecked).length;
      // 2.find
      return !this.cartList.find(info => !info.isChecked);
    },
    totalPrice() {
      return this.cartList
        .filter(info => info.isChecked)
        .reduce((total, info) => total + info.price * info.count, 0)
        .toFixed(2);
    },
    cartLength() {
      return this.cartList.filter(info => info.isChecked).length;
    }
  },
  methods: {
    checkBtnClick() {
      // const select = !this.isSelectAll;
      // for (let item of this.cartList) {
      //   item.isChecked = select;
      // }
      if (this.isSelectAll) {
        this.cartList.forEach(item => (item.isChecked = false));
      } else {
        this.cartList.forEach(item => (item.isChecked = true));
      }
    },
    subOrder(){
      if(this.cartLength){
        this.$toast.show("跳转结算页面");
      }else{
        this.$toast.show("请选中需要结算的商品");
      }
    }
  }
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}
.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}
.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}
.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>