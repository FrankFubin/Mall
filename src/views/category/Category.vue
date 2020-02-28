<template>
  <div id="category">
    <NavBar class="category-nav">
      <div slot="center">商品分类</div>
    </NavBar>
    <div class="category-content">
      <div>
        <TabMenu :category="category" @selectItem="selectItem"/>
        <Scroll id="tab-content" :data="[categoryData]">
<!--          <TabContent :subcategories="showSubcategory"/>-->
          <TabControl :titles="['综合','新品','销量']" @tabClick="tabClick"/>
        </Scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContent from "./childComps/TabContent";
  import TabControl from "components/content/tabControl/TabControl"

  import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";

  export default {
    name: "category",
    components: {
      TabMenu,
      NavBar,
      Scroll,
      TabContent,
      TabControl
    },
    data() {
      return {
        category: [],
        categoryData: [],
        currentIndex: -1,
        currentType:"pop"
      };
    },
    computed: {
      showSubcategory() {
        if(this.currentIndex == -1) return []
        return this.categoryData[this.currentIndex].subcategories;
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        getCategory().then(res => {
          // 1.获取分类数据
          this.category = res.data.category.list;
          // 2.初始化每个分类的子数据
          for (let i = 0; i < this.category.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this.getSubcategoryFn(0);
        });
      },
      getSubcategoryFn(index) {
        this.currentIndex = index;
        const maitKey = this.category[index].maitKey;

        getSubcategory({maitKey: maitKey}).then(res => {
          console.log("getSubcategory",res)
          this.categoryData[index].subcategories = res.data;
          this.categoryData = {...this.categoryData}
          this.getCategoryDetailFn("pop");
          this.getCategoryDetailFn("new");
          this.getCategoryDetailFn("sell");
        });
      },
      getCategoryDetailFn(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.category[this.currentIndex].miniWallkey;
        getCategoryDetail({"miniWallkey": miniWallkey, "type": type}).then(res => {
          // console.log("getCategoryDetail:", res)
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }
      },
      selectItem(index) {
        this.getSubcategoryFn(index);
      }
    }
  };
</script>
<style scoped>
  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .category-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
    overflow: hidden;
  }

  .tab-content {
    height: 100%;
    flex: 1;
  }
</style>
