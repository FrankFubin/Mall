<template>
  <Scroll id="tab-menu">
    <div class="menu-list-item" :class="{active:currentIndex==index}" v-for="(item,index) in category" :key="index"
         @click="tabClick(index)">
      {{item.title}}
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "TabMenu",
    components: {
      Scroll
    },
    props: {
      category: Array,
      default() {
        return [];
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        this.$emit("selectItem",index);
      }
    }
  };
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
