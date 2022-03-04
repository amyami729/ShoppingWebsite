<template>
  <div class="productInfo">
    <loading :active="isLoading"></loading>
    <div class="listOptions">
      <router-link to="/home" class="listContent goToPage">首頁</router-link>
      &#47;
      <router-link to="/products?categoryId=全部商品" class="listContent goToPage">本店商品</router-link>
      &#47;
      <router-link :to="`/products?categoryId=${currentProduct.category}`" class="listContent goToPage">{{ currentProduct.category }}</router-link>
      &#47;
      <span class="listContent">{{ currentProduct.title }}</span>
    </div>

    <div class="productDetails">
      <div class="productPicture">
        <img :src="currentProduct.imageUrl" />
      </div>

      <div class="productDescription">
        <p class="productCategory">{{ currentProduct.category }}</p>
        <h3 class="productTitle">{{ currentProduct.title }}</h3>
        <div class="producPrice">
          <span class="sellingPrice">{{ $filters.currency(currentProduct.price) }}</span>
          <del class="originalPrice">{{ $filters.currency(currentProduct.origin_price) }}</del>
        </div>
        <div class="productSize">
          <p class="sizeTitle">產品尺寸</p>
          <span class="sizeContent">{{ currentProduct.description }}</span>
        </div>
        <div class="productIntroduction">
          <p class="introductionTitle">產品說明</p>
          <span class="introductionContent">{{ currentProduct.content }}</span>
        </div>
        <div class="productQuantity">
          <span>數量 &#58;</span>
          <!-- 購物車數量鈕 -->
          <cartControl class="cartControl" @qtyValue="updateProductNum"></cartControl>
        </div>
        <div class="productInfoBtn">
          <div class="addCartBtn" @click="addToCart(productId, currentProductNum)">
            <i class="fas fa-cart-plus"></i>
            <span>加入購物車</span>
          </div>
          <router-link to="/cart">
            <div class="buy" @click="addToCart(productId, currentProductNum)">
              <span>直接購買</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from '@/components/Front/CartControl.vue';

export default {
  components: {
    cartControl
  },
  data() {
    return {
      productId: '',   // 用來儲存params傳過來的產品Id
      currentProduct: {},  // 用來儲存單一商品的資料
      isLoading: false,
      currentProductNum: 1   // 用來設定與子組件同步的值
    }
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.productId}`;  // 取得單一筆商品資料
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          this.isLoading = false;
          vm.currentProduct = response.data.product;
        }
      });
    },
    addToCart(id, qty) {
      this.$store.dispatch('shoppingCart/addItemToCart', { id, qty });
    },
    // 同步更新子組件的數量並且加入購物車
    updateProductNum(inputValue) {
      this.currentProductNum = inputValue;
    }
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProduct();
  }
}
</script>

<style scoped lang="scss">
.productInfo{
  width: 1124px;
  margin: 0 auto;

  .listOptions{
    height: 48px;
    padding-top: 10px;

    .listContent{
      text-decoration: none;
      font-size: 15px;
      color: #616161;
    }

    .goToPage{
      color: #a67e65;

      &:hover{
        color: #88644e;
        text-decoration: underline;
      }
    }
  }

  .productDetails{
    height: 718px;
    margin-bottom: 55px;

    .productPicture{
      float: left;
      margin-right: 32px;

      img{
        width: 540px;
        height: 600px;
      }
    }

    .productDescription{
      float: right;
      width: 552px;
      height: 718px;

      .productCategory{
        width: 98px;
        height: 32px;
        font-size: 20px;
        text-align: center;
        padding-top: 2px;
        margin-bottom: 0;
        color: white;
        background: #909090;
      }

      .productTitle{
        width: 552px;
        height: 30px;
        font-size: 25px;
        color: #616161;
        margin: 30px 0 48px 0;
        font-weight: normal;
        letter-spacing: 1px;
      }

      .producPrice{
        width: 552px;
        height: 60px;
        border: 1px solid #c4c4c4;
        padding-top: 6px;

        .sellingPrice{
          font-size: 30px;
          color: #db4949;
          vertical-align: middle;
          font-weight: bold;
          margin-left: 26px;
          margin-right: 26px;
        }

        .originalPrice{
          font-size: 20px;
          color: #909090;
          vertical-align: middle;
        }
      }

      .productSize{
        height: 84px;
        margin-top: 33px;

        .sizeTitle{
          font-size: 20px;
          font-weight: bold;
          color: #616161;
          margin-bottom: 8px;
        }

        .sizeContent{
          display: inline-block;
          font-size: 16px;
          color: #616161;
          width: 230px;
        }
      }

      .productIntroduction{
        height: 110px;
        margin-top: 22px;

        .introductionTitle{
          font-size: 20px;
          font-weight: bold;
          color: #616161;
          margin-bottom: 8px;
        }

        .introductionContent{
          font-size: 16px;
          color: #616161;
        }
      }

      .productQuantity{
        height: 45px;
        margin-top: 60px;

        span{
          float: left;
          font-size: 19px;
          margin-top: 8px;
          color: #616161;
        }

        .cartControl{
          float: right;
          margin-right: 345px;
        }
      }

      .productInfoBtn{
        height: 60px;
        margin-top: 60px;

        .addCartBtn{
          float: left;
          width: 260px;
          height: 60px;
          border: 1px solid #909090;
          background: #fff;
          color: #909090;
          cursor: pointer;

          &:hover{
            background: #909090;
            color: white;
          }

          i{
            float: left;
            font-size: 18px;
            margin-left: 68px;
            margin-top: 20px;
          }

          span{
            float: right;
            display: block;
            font-size: 18px;
            margin-top: 16px;
            margin-right: 70px;
          }
        }

        .buy{
          float: right;
          width: 260px;
          height: 60px;
          background: #c2987b;
          cursor: pointer;

          &:hover{
            opacity: 0.9;
          }

          span{
            display: block;
            font-size: 18px;
            color: white;
            text-align: center;
            margin-top: 17px;
          }
        }
      }
    }
  }
}
</style>