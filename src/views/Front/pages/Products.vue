<template>
  <div class="products">
    <loading :active="isLoading"></loading>
    <div class="products-header">
      <div class="products-title">
        <div class="list-icon">
          <i class="fas fa-list"></i>
          <h3>{{ currentCategory }}</h3>
        </div>
        <span>共<i class="allProducts-length">{{ displayProducts.length }}</i>件商品</span>
      </div>

      <div class="products-filter">
        <div class="search-form">
          <label for="search" class="searchLabel">
            <i class="fas fa-search"></i>
          </label>
          <input class="form-control products-search" maxlength="18" autocomplete="off" type="search" :value="search"  @input="search = $event.target.value" @keyup.enter="getProductsBySearch" placeholder="搜尋" id="search">
        </div>
        
        <select class="products-price" @change="sortItemsByPrice">
          <option selected="true" disabled>價格排序</option>
          <option value="1">價格: 高到低</option>
          <option value="2">價格: 低到高</option>
        </select>

        <div class="search-popover" v-if="isShowSearchBar"  @click="getProductsBySearch">
          <div class="search-bar">
            <div class="shop-icon">
              <i class="fas fa-store"></i>
            </div>
              搜尋 "{{ search }}" 商品
          </div>
        </div>
      </div>
    </div>
    <div class="septalLine"></div>
    <div class="product-category">
      <button class="product-category-btn btn" @click="updateDisplayProductsByCategory(categoryItem)" :class="{ categoryActive : currentCategory === categoryItem }" v-for="(categoryItem, index) in allCategory" :key="index">{{ categoryItem }}</button>
    </div>
    <div class="card-wrapper" v-for="item in getProductsByPage(currentPage, displayProducts)" :key="item.id">
      <card :product="item"></card>
    </div>
    <div class="card-otherContent">
      <p v-if="displayProducts.length === 0">查無有關 "{{ search }}" 的商品</p>
    </div>
    <!-- 產品列表分頁 -->
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="updatePagination"></pagination>
    </div>
  </div>
</template>

<script>
import card from '@/components/Front/Card.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    card,
    pagination
  },
  data() {
    return {
      allProducts: [],
      displayProducts: [],   // 用來存放最後展示的產品
      allCategory: [],
      currentCategory: '全部商品',
      categoryId: '',
      pagination: {},   // 撈頁碼數
      currentPage: '',   //用來存放目前是第幾頁
      isLoading: false,   // 預設為停止loading狀態
      search: '',
      isShowSearchBar: false
    }
  },
  methods: {
    initAllProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;  // 取得全部商品列表
      // 取得JSON數據時即執行loading狀態
      this.isLoading = true;

      this.$http.get(api).then((response) => {
        // 取得JSON數據之後即停止loading狀態
        this.isLoading = false;

        vm.allProducts = response.data.products;
        vm.displayProducts = vm.allProducts;

        vm.updatePagination();
        vm.getParameterValueOfCategoryId();
      });
    },
    getAllProducts() {
      this.displayProducts = this.allProducts;
      this.currentCategory = '全部商品';
      this.updatePagination();
    },
    // 按不同類別去處理分頁數
    updatePagination(page = 1) {
      const vm = this;
      const numberOfProductsByPage = 12;
      // 計算真正的total page
      const totalPage = Math.ceil(vm.displayProducts.length / numberOfProductsByPage);
      // 對著pagination更新其total page
      vm.pagination['total_pages'] = totalPage;

      // 設定分頁的上下一頁按鈕的狀態
      vm.currentPage = page;
      if (vm.currentPage === totalPage) {
        vm.pagination['has_next'] = false;
      }else {
        vm.pagination['has_next'] = true;
      }

      if (vm.currentPage === 1) {
        vm.pagination['has_pre'] = false;
      }else {
        vm.pagination['has_pre'] = true;
      }
      // 對著pagination更新其current page
      vm.pagination['current_page'] = page;
    },
    // 按頁面獲取產品數
    getProductsByPage(page = 1, prodcuts = []) {
      const numberOfProductsInPage = 12;
      return prodcuts.slice(page * numberOfProductsInPage - numberOfProductsInPage, page * numberOfProductsInPage);
    },
    getCategory() {
      const vm = this;
      const api = `${process.env.VUE_APP_CATEGORYAPI}/api/product/category`;  // 取得產品分類
      this.$http.get(api).then((response) => {
        vm.allCategory = response.data;
      });
    },
    // 按類別更新顯示產品
    updateDisplayProductsByCategory(categoryItem='全部商品') {
      const vm = this;
      vm.currentCategory = categoryItem;
      // 將 categoryItem 傳進來作為 query 的參數值, 並跳轉頁面 
      this.$router.push({
        query:{
          categoryId: categoryItem
        }
      });
      if (categoryItem === '全部商品') {
        vm.displayProducts = vm.allProducts;
      } else {
        vm.displayProducts = vm.allProducts.filter((product) => product.category === categoryItem);
      }
      vm.updatePagination();
    },
    // 獲取參數值
    getParameterValueOfCategoryId(categoryItem) {
      const vm = this;
      vm.categoryId = this.$route.query.categoryId;
      if (vm.categoryId !== categoryItem) {
        vm.updateDisplayProductsByCategory(vm.categoryId);
      }
    },
    // 按搜尋獲取產品
    getProductsBySearch() {
      const vm = this;
      if (vm.search) {
        this.$router.push({
          query:{
            categoryId: '全部商品',
            keyword: vm.search
          }
        });
        vm.currentCategory = '全部商品';
        vm.displayProducts = vm.allProducts.filter((item) => item.title.indexOf(vm.search) !== -1);
        vm.isShowSearchBar = false;
      }
      vm.updatePagination();
    },
    // 按價格順序排列商品
    sortItemsByPrice() {
      const vm = this;
      const priceOptions = document.querySelector('.products-price');
      const sortedProducts = vm.allProducts;
      vm.displayProducts = sortedProducts.sort((product1, product2) => {
        if (priceOptions.value === "1") {  // 價格高到低排序
          return product2.price - product1.price;
        }else {  // 價格低到高排序
          return product1.price - product2.price;
        }
      });
      vm.updatePagination();
    }
  },
  watch: {
    // 監聽search
    search(keywords) {
      if (keywords === '') {
        // 先清空 query
        this.$router.push({ query: {} });
        // 再定義 query 的參數值
        this.$router.push({
          query:{
            categoryId: '全部商品'
          }
        });
        this.getAllProducts();
        this.isShowSearchBar = false;
      }else {
        this.isShowSearchBar = true;
      }
    }
  },
  created() {
    this.initAllProducts();
    this.getCategory();
  }
}
</script>

<style scoped lang="scss">
.products{
  width: 1124px;
  margin: 0 auto;

  .products-header{
    height: 75px;

    .products-title{
      float: left;
      height: 75px;
      
      .list-icon{
        float: left;

        i{
          width: 30px;
          height: 30px;
          font-size: 20px;
          text-align: center;
          padding-top: 8px;
          color: #616161;
        }

        h3{
          display: inline-block;
          font-size: 30px;
          color: #616161;
          padding-top: 5px;
        }
      }

      span{
        float: right;
        color: #616161;
        padding-top: 12px;
        margin-left: 30px;
        font-size: 16px;
        width: 85px;

        .allProducts-length{
          color: crimson;
          font-style:normal
        }
      }
    }

    .products-filter{
      float: right;
      width: 854px;
      height: 75px;

      .search-form{
        width: 181px;
        border: 1px solid #616161;
        margin-left: 523px;
        float: left;

        .searchLabel{
          width: 30px;
          height: 30px;
          margin-left: 2px;
          margin-top: 8px;
          position: absolute;
        }

        i{
          padding: 7px 7px;
          font-size: 16px;
          color: #616161;
        }

        .products-search{
          height: 45px;
          padding-left: 35px;
        }

        input::placeholder{
          color: #c6c6c6;
        }
      }

      .products-price{
        float: right;
        width: 130px;
        height: 45px;
        padding-left: 10px;
      }

      .search-popover{
        float: left;
        width: 181px;
        margin-left: 523px;
        padding-bottom: 4px;
        background: #c4c4c4;
        box-shadow: 3px 3px 9px #c4c4c4;
        cursor: pointer;

        &:hover{
          opacity: 0.8;
        }

        .search-bar{
          padding-left: 5px;
          padding-top: 6px;
          font-size: 10px;

          .shop-icon{
            display: inline-block;
            color: #fa4e32;
          }
        }
      }
    }
  }

  .septalLine{
    width: 100%;
    height: 1px;
    background: #c4c4c4;
  }

  .product-category{
    height: 70px;

    .product-category-btn{
      margin-top: 22px;
      margin-right: 10px;
      color: #616161;
      box-shadow: none;

      &:hover{
        color: #c2987b;
      }
    }

    .categoryActive{
      color: #c2987b;
      font-weight: bold;
    }
  }

  .card-wrapper{
    margin-left: 28px;
    display: inline-block;

    &:nth-child(4n+1){
      margin-left: 0;
    }
  }

  p{
    text-align: center;
    padding-top: 35px;
    font-size: 30px;
    color: #909090;
    font-weight: bold;
  }

  .product-pagination{
    display: flex;
    justify-content: center;

    .pagination-inner{
      width: 50%;
      height: 93px;
      display: flex;
      justify-content: center;
      padding-top: 30px;
    }
  }
}
</style> 