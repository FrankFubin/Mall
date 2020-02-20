<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll class="detail-content" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @scrollRefresh="scrollRefresh" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailTabBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { getDetail, getRecommends, Goods, Shop } from "network/detail";
import { itemListenerMixin } from "common/mixin";
import { debounce } from "common/utils";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  mounted() {
    this.getDetail();
    this.getRecommends();
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopY.push(Number.MAX_VALUE);
    }, 50);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    getDetail() {
      getDetail({ iid: this.$route.params.id }).then(res => {
        // console.log(res);
        // 1.取出顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
        // 2.取出商品信息
        this.goods = new Goods(
          res.result.itemInfo,
          res.result.columns,
          res.result.shopInfo.services
        );
        // 3.取出店铺信息的对象
        this.shop = new Shop(res.result.shopInfo);
        // 4.取出商品的详情数据
        this.detailInfo = res.result.detailInfo;
        // 5.取出参数信息
        this.paramInfo = res.result.itemParams;
        // 6.取出评论信息
        if (res.result.rate.cRate > 0) {
          this.commentInfo = res.result.rate;
        }
      });
    },
    getRecommends() {
      getRecommends().then(res => {
        // console.log(res.data.list);
        this.recommends = res.data.list;
      });
    },
    scrollRefresh() {
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
    },
    scroll(position){
      for(let i = 0;i<this.themeTopY.length-1;i++){
        // if(i===this.themeTopY.length-1?(-position.y>=this.themeTopY[this.themeTopY.length-1]):(-position.y>=this.themeTopY[i]&&-position.y<this.themeTopY[i+1])){

        //   console.log(i);
        // }
        
        if((i!=this.currentIndex)&&(i<this.themeTopY.length-1&&-position.y>=this.themeTopY[i]&&-position.y<this.themeTopY[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
          console.log(i);
        }
      }
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 44px);
}
</style>