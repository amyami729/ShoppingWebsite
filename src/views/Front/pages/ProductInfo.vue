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
            <div class="addCartBtn" @click="addToCart(currentProduct, Number(currentProductNum))">
            <i class="fas fa-cart-plus"></i>
            <span>加入購物車</span>
          </div>
          <router-link to="/cart">
              <div class="buy" @click="addToCart(currentProduct, Number(currentProductNum))">
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
    addToCart(item, qty) {
      this.$store.dispatch('shoppingCart/addToCart', { item, qty });
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
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

.productInfo{
  width: 1124px;
  margin: 0 auto;
  @include desktop() {
    width: 100%;
    padding: 0 10px;
  }

  .listOptions{
    height: 48px;
    padding-top: 10px;
    @include desktop() {
      padding-top: 0;
    }

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
    @include desktop() {
      height: 850px;
      margin-bottom: 20px;
    }

    .productPicture{
      float: left;
      margin-right: 32px;
      @include desktop() {
        margin-right: 0;
        width: 100%;
      }

      img{
        @include Width-Height(540px, 600px);
        @include desktop() {
          @include Width-Height(100%, 270px);
        }
      }
    }

    .productDescription{
      float: right;
      @include Width-Height(552px, 718px);
      @include desktop() {
        float: left;
        @include Width-Height(100%, 555px);
      }

      .productCategory{
        @include Width-Height(98px, 32px);
        font-size: 20px;
        text-align: center;
        padding-top: 2px;
        margin-bottom: 0;
        color: white;
        background: #909090;
        @include desktop() {
          @include Width-Height(90px, 30px);
          margin-top: 25px;
          font-size: 17px;
        }
      }

      .productTitle{
        @include Width-Height(552px, 30px);
        font-size: 25px;
        color: #616161;
        margin: 30px 0 48px 0;
        font-weight: normal;
        letter-spacing: 1px;
        @include desktop() {
          width: 100%;
          margin: 25px 0;
          font-size: 20px;
        }
      }

      .producPrice{
        @include Width-Height(552px, 60px);
        border: 1px solid #c4c4c4;
        padding-top: 6px;
        @include desktop() {
          @include Width-Height(100%, 45px);
        }

        .sellingPrice{
          font-size: 30px;
          color: #db4949;
          vertical-align: middle;
          font-weight: bold;
          margin-left: 26px;
          margin-right: 26px;
          @include desktop() {
            font-size: 20px;
            margin-right: 20px;
          }
        }

        .originalPrice{
          font-size: 20px;
          color: #909090;
          vertical-align: middle;
          @include desktop() {
            font-size: 16px;
          }
        }
      }

      .productSize{
        height: 84px;
        margin-top: 33px;
        @include desktop() {
          margin-top: 20px;
          height: 73px;
        }

        .sizeTitle{
          font-size: 20px;
          font-weight: bold;
          color: #616161;
          margin-bottom: 8px;
          @include desktop() {
            font-size: 16px;
          }
        }

        .sizeContent{
          display: inline-block;
          font-size: 16px;
          color: #616161;
          width: 230px;
          @include desktop() {
            font-size: 14px;
          }
        }
      }

      .productIntroduction{
        height: 110px;
        margin-top: 22px;
        @include desktop() {
          margin-top: 20px;
        }

        .introductionTitle{
          font-size: 20px;
          font-weight: bold;
          color: #616161;
          margin-bottom: 8px;
          @include desktop() {
            font-size: 16px;
            margin-bottom: 3px;
          }
        }

        .introductionContent{
          font-size: 16px;
          color: #616161;
          @include desktop() {
            font-size: 14px;
          }
        }
      }

      .productQuantity{
        height: 45px;
        margin-top: 60px;
        @include desktop() {
          margin-top: 20px;
          height: 38px;
        }

        span{
          float: left;
          font-size: 19px;
          margin-top: 8px;
          color: #616161;
          @include desktop() {
            font-size: 16px;
            margin-top: 7px;
          }
        }

        .cartControl{
          float: right;
          margin-right: 345px;
          @include desktop() {
            float: right;
            margin-right: 160px;
          }
        }
      }

      .productInfoBtn{
        height: 60px;
        margin-top: 60px;
        @include desktop() {
          margin-top: 40px;
        }

        .addCartBtn{
          float: left;
          @include Width-Height(260px, 60px);
          border: 1px solid #909090;
          background: #fff;
          color: #909090;
          cursor: pointer;
          @include desktop() {
            @include Width-Height(160px, 60px);
          }

          &:hover{
            background: #909090;
            color: white;
          }

          i{
            float: left;
            font-size: 18px;
            margin-left: 68px;
            margin-top: 20px;
            @include desktop() {
              margin-left: 20px;
            }
          }

          span{
            float: right;
            display: block;
            font-size: 18px;
            margin-top: 16px;
            margin-right: 70px;
            @include desktop() {
              margin-right: 20px;
            }
          }
        }

        .buy{
          float: right;
          @include Width-Height(260px, 60px);
          background: #c2987b;
          cursor: pointer;
          @include desktop() {
            @include Width-Height(160px, 60px);
          }

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