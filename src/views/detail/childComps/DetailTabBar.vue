<template>
  <nav-bar class="detail-nav">
    <div slot="left" class="backImg" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        class="title-item"
        :class="{active:index==currentIndex}"
        v-for="(item,index) in titles"
        :key="item"
        @click="itemClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailTabBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}
.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.backImg img {
  margin-top: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>