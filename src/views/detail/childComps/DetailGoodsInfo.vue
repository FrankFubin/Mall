<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="info in detailInfo.detailImage" :key="info.key">
      <div class="info-key">{{info.key}}</div>
      <div class="info-list">
        <img v-for="(item,index) in info.list" :src="item" :key="index" alt @load="imgLoad" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: Object,
    default() {
      return {};
    }
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    imgLoad() {
      // this.count++;
      // if (this.count == this.detailInfo.detailImage[0].list.length) {
      this.$emit("scrollRefresh");
      // }
    }
  }
};
</script>
<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>