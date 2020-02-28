<template>
  <GridView>
    <GoodsListItem v-for="(item,index) in categoryDetail" :key="index" :goodsItem="item" />
  </GridView>
</template>

<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";
export default {
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    categoryDetail: Array,
    default() {
      return [];
    }
  }
};
</script>

<style scoped>
</style>