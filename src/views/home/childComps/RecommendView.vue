<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.arm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div v-text="item.title"></div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.recommend-item img {
  max-width: 85%;
  margin-bottom: 10px;
}
</style>