<template>
  <div class="shoppingCart">
    <div class="shopCartTop">
      <p class="cartTitle">購物車清單</p>
    </div>

    <div class="shopCartContent" v-if="cartProducts.length !== 0">
      <div class="shopCartNav">
        <div class="listTitleLeft">
          <div class="checkboxTitle">
            <input class="check" type="checkbox" @click="clickCheckAll" v-model="checkAll" />
          </div>
          <div class="productMessageTitle">
            <p class="goods">商品</p>
            <p class="unitPrice">單價</p>
          </div>
        </div>
        <div class="listTitleRight">
          <div class="otherTitleLeft">
            <p class="quantity">數量</p>
          </div>
          <div class="otherTitleRight">
            <p class="totalPriceTitle">總價</p>
            <p class="operate">操作</p>
          </div>
        </div>
      </div>

      <div class="cartList" v-for="item in cartProducts" :key="item">
        <div class="cartListInfo">
          <div class="checkbox">
            <input class="check" type="checkbox" @click="clickCheckbox(item)" v-model="item.checked" />
          </div>
          <div class="productMessage">
            <img :src="item.imageUrl" alt="">
            <router-link :to="`/product-info/${item.id}`">
              <p class="productTitle">{{ item.title }}</p>
            </router-link>
          </div>
        </div>
        <div class="cartListOther">
          <div class="otherLeft">
            <span class="originalPrice">{{ $filters.currency(item.price) }}</span>
            <!-- 購物車數量鈕 -->
            <cartControl class="cartControl" :inputQty="Number(item.qty)" :product="item" @emitUpdateItemQty="updateItemQty"></cartControl>
          </div>
          <div class="otherRight">
            <span class="totalPrice">{{ $filters.currency(item.total) }}</span>
            <div class="deleteBtn" @click="removeCart(item)">
              <i class="fas fa-trash"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="cartCheckoutInfo">
        <div class="CouponUsage">
          <input  class="couponUsageInput" type="text" placeholder="請輸入優惠券序號">
          <div class="UsageBtn">
            <span>套用</span>
          </div>
        </div>
        <div class="checkoutInfo">
          <div class="checkoutLeft">
            <input class="check" type="checkbox" @click="clickCheckAll" v-model="checkAll" />
            <span class="selectAll">全選({{ cartProducts.length }})</span>
          </div>
          <div class="checkoutRight">
            <div class="productstotalPrice">
              <span class="numberOfItems">總金額 ({{ checkedNumber }} 個商品): </span>
              <span class="checkoutTotalPrice">{{ $filters.currency(checkedTotal) }}</span>
              <p class="howMuchDiscount">已省下 <span>$0</span></p>
            </div>
            <div class="checkoutBtn">
              <span>去買單</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="shopCart-otherContent" v-else>
      <div class="emptyCart-box">
        <img src="@/assets/img/empty.png" alt="" class="emptyCart-logo">
      </div>
      <p>你的購物車是空的ㄛ</p>
      <div class="jumpPage">
        <router-link to="/products?categoryId=全部商品" class="goToPageBtn">去購物吧!</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from '@/components/Front/CartControl.vue';
import { mapState } from 'vuex';

export default {
  components: {
    cartControl
  },
  data() {
    return {
      checkAll: false,  // 用來控制是否全選
      checkedNumber: 0,  // 1.根據值判斷是否全選, 2.計算已勾選的商品數
      checkedTotal: 0    // 用來計算已勾選的商品total
    }
  },
  methods: {
    removeCart(item) {
      this.checkAll = false;
      this.$store.dispatch('shoppingCart/removeCart', item);
    },
    // 同步更新子組件的數量並且重新加入購物車
    updateItemQty(productInFo) {
      this.checkAll = false;
      this.checkedNumber = 0;
      this.checkedTotal = 0;
      const item = productInFo[0];
      const qty = productInFo[1];
      this.$store.dispatch('shoppingCart/updateToCart', { item, qty });
    },
    // 全選/反選的處理
    clickCheckAll() {
      this.checkAll = !this.checkAll;  // 取反
      if (this.checkAll) {  // 全選
        this.checkedTotal = 0;
        this.cartProducts.forEach((item) => {
          item.checked = true;
          this.checkedTotal += item.total;
        });
        this.checkedNumber = this.cartProducts.length;
      }else {  // 反選
        this.cartProducts.forEach((item) => {
          item.checked = false;
          this.checkedTotal = 0;
        });
        this.checkedNumber = 0;
      }
    },
    // 複選框勾選/未勾選的處理
    clickCheckbox(item) {
      item.checked = !item.checked;  // 取反
      if (item.checked) {  // 勾選
        this.checkedNumber++;
        if (this.checkedNumber === this.cartProducts.length) {
          this.checkAll = true;
        }
        this.checkedTotal += item.total;
      }else {  // 取消勾選
        this.checkedNumber--;
        this.checkAll = false;
        this.checkedTotal -= item.total;
      }
    }
  },
  computed: {
    ...mapState('shoppingCart', {
      cartProducts: state => state.carts
    })
  },
  created() {
    this.$store.dispatch('shoppingCart/getCartContents');
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
}
@mixin checkbox($margin-top, $margin-left) {
	input[type=checkbox] {
    @include Width-Height(21px, 21px);
    position: relative;
    margin-top: $margin-top;
    margin-left: $margin-left;
  }
  input[type=checkbox]:after {
    position: absolute;
    @include Width-Height(21px, 21px);
    display: inline-block;
    visibility: visible;
    border-radius: 3px;
  }
  input[type=checkbox]:checked:after {
    content: "✓";
    font-size: 15px;
    background-color: #ff0000;
    color: #fff;
    padding: 0 4px;
    font-weight: bold;
  }
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

.shoppingCart{
  width: 1124px;
  margin: 0 auto;
  @include desktop() {
    width: 100%;
    padding: 0 10px;
  }

  .shopCartTop{
    height: 90px;
    @include desktop() {
      height: 60px;
    }

    .cartTitle{
      text-align: center;
      font-size: 30px;
      color: #616161;
      padding-top: 16px;
      @include desktop() {
        font-size: 24px;
        padding-top: 13px;
      }
    }
  }

  .shopCartNav{
    height: 60px;
    box-shadow: 3px 0px 20px 0px #c4c4c4;

    .listTitleLeft{
      float: left;
      @include Width-Height(583px, 58px);
      @include desktop() {
        width: 100%;
      }

      .checkboxTitle{
        float: left;
        @include Width-Height(50px, 60px);
        @include checkbox(20px, 13px);
      }

      .productMessageTitle{
        float: right;
        @include Width-Height(533px, 58px);
        color: #616161;
        font-size: 18px;
        @include desktop() {
          @include Width-Height(305px, 58px);
          position: absolute;
          margin-left: 50px;
        }

        .goods{
          float: left;
          margin-left: 20px;
          margin-top: 16px;
        }

        .unitPrice{
          float: right;
          margin-right: 115px;
          margin-top: 16px;
          @include desktop() {
            display: none;
          }
        }
      }
    }

    .listTitleRight{
      float: right;
      @include Width-Height(539px, 58px);
      @include desktop() {
        display: none;
      }

      .otherTitleLeft{
        float: left;
        @include Width-Height(250px, 58px);

        .quantity{
          margin-top: 16px;
          color: #616161;
          font-size: 18px;
          padding-left: 55px;
        }
      }

      .otherTitleRight{
        float: right;
        @include Width-Height(289px, 58px);
        color: #616161;
        font-size: 18px;

        .totalPriceTitle{
          float: left;
          margin-top: 16px;
          margin-left: 10px;
        }

        .operate{
          float: right;
          margin-top: 16px;
          margin-right: 40px;
        }
      }
    }
  }

  .cartList{
    @include Width-Height(1124px, 109px);
    box-shadow: 3px 0px 8px 0px #c4c4c4;
    margin-top: 15px;
    margin-bottom: 15px;
    @include desktop() {
      @include Width-Height(100%, 150px);
    }

    .cartListInfo{
      float: left;
      @include Width-Height(395px, 107px);
      @include desktop() {
        width: 100%;
      }

      .checkbox{
        float: left;
        @include Width-Height(50px, 107px);
        @include checkbox(43px, 13px);
      }

      .productMessage{
        float: right;
        @include Width-Height(335px, 107px);
        @include desktop() {
          float: left;
          width: 305px;
        }

        img{
          float: left;
          @include Width-Height(100px, 75px);
          margin-top: 16px;
          @include desktop() {
            @include Width-Height(90px, 65px);
          }
        }

        .productTitle{
          float: right;
          @include Width-Height(200px, 45px);
          margin-top: 32px;
          margin-right: 15px;
          color: #616161;
          font-size: 16px;
          @include desktop() {
            margin-right: 7px;
            margin-top: 15px;
            height: 25px;
            -webkit-line-clamp: 1;
          }

          display: -webkit-box;   /* 將對象作為彈性伸縮盒子模型顯示 */
          -webkit-box-orient: vertical;   /* 設置或檢索伸縮盒子的子元素排列方式 */
          -webkit-line-clamp: 2;   /* 用來定義塊元素顯示文本行數 */
          overflow: hidden;  /* 超出文字隱藏 */
          text-overflow: ellipsis;  /* 內容超出時,在後方補上逗號 */
        }
      }
    }

    .cartListOther{
      float: right;
      @include Width-Height(690px, 107px);
      @include desktop() {
        float: left;
        @include Width-Height(100%, 43px);
      }

      .otherLeft{
        float: left;
        @include Width-Height(400px, 107px);
        @include desktop() {
          @include Width-Height(0, 0);
          float: left;
          position: absolute;
        }

        .originalPrice{
          float: left;
          margin-top: 42px;
          color: #616161;
          font-size: 16px;
          font-weight: bold;
          @include desktop() {
            margin-left: 150px;
            margin-top: -60px;
            color: #db4949;
          }
        }

        .cartControl{
          float: right;
          @include Width-Height(250px, 107px);
          padding-top: 30px;
          padding-left: 10px;
          @include desktop() {
            float: left;
            @include Width-Height(215px, 88px);
            margin-left: 140px;
            margin-top: -45px;
          }
        }
      }

      .otherRight{
        float: right;
        @include Width-Height(290px, 107px);
        @include desktop() {
          @include Width-Height(0, 0);
          float: left;
          position: absolute;
        }

        .totalPrice{
          float: left;
          margin-top: 42px;
          color: #db4949;
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
          @include desktop() {
            display: none;
          }
        }

        .deleteBtn{
          float: right;
          @include Width-Height(45px, 45px);
          border: 1px solid #ef4c2f;
          margin-top: 32px;
          margin-right: 30px;
          cursor: pointer;
          color: #ef4c2f;
          @include desktop() {
            float: left;
            margin-left: 300px;
            margin-top: -20px;
          }

          &:hover{
            background: #ef4c2f;
            color: white;
          }

          i{
            font-size: 20px;
            margin-left: 13px;
            margin-top: 12px;
          }
        }
      }
    }
  }

  .cartCheckoutInfo{
    @include Width-Height(1124px, 150px);
    background: white;
    margin-bottom: 50px;
    box-shadow: 3px 3px 15px 0px #c4c4c4;
    position: sticky;
    bottom: 0;
    @include desktop() {
      @include Width-Height(100%, 180px);
    }

    .CouponUsage{
      height: 80px;
      border-bottom: 1px dashed #e8e8e8;

      .couponUsageInput{
        float: left;
        @include Width-Height(250px, 50px);
        padding-left: 15px;
        font-size: 16px;
        border: #c6c6c6;
        outline: none;
        box-shadow: 3px 3px 15px 0px #c4c4c4;
        margin-left: 755px;
        margin-top: 15px;
        @include desktop() {
          @include Width-Height(200px, 45px);
          margin-left: 50px;
        }
      }

      input::placeholder{
        color: #c6c6c6;
      }

      .UsageBtn{
        float: right;
        @include Width-Height(70px, 50px);
        background: #616161;
        padding-top: 12px;
        margin-right: 30px;
        margin-top: 15px;
        cursor: pointer;
        @include desktop() {
          margin-right: 15px;
          @include Width-Height(65px, 45px);
          padding-top: 9px;
          text-align: center;
        }

        &:hover{
          opacity: 0.9;
        }

        span{
          font-size: 18px;
          color: white;
          margin-left: 17px;
          @include desktop() {
            margin-left: 0;
          }
        }
      }
    }

    .checkoutInfo{
      height: 70px;
      @include desktop() {
        height: 100px;
      }

      .checkoutLeft{
        float: left;
        @include Width-Height(300px, 70px);
        @include checkbox(25px, 15px);
        @include desktop() {
          width: 125px;
        }

        .selectAll{
          float: right;
          width: 100px;
          font-size: 16px;
          margin-right: 150px;
          margin-top: 22px;
          color: #616161;
          @include desktop() {
            width: 80px;
            font-size: 14px;
            margin-right: 0;
            margin-top: 24px;
          }
        }
      }

      .checkoutRight{
        float: right;
        @include Width-Height(500px, 70px);
        @include desktop() {
          float: left;
          @include Width-Height(0, 0);
          position: absolute;
        }

        .productstotalPrice{
          float: left;
          margin-left: 10px;
          margin-top: 14px;
          @include desktop() {
            margin-left: 140px;
            margin-top: 10px;
            width: 215px;
          }

          .numberOfItems{
            font-size: 16px;
            @include desktop() {
              font-size: 14px;
            }
          }

          .checkoutTotalPrice{
            font-size: 23px;
            color: #db4949;
            @include desktop() {
              font-size: 18px;
            }
          }

          .howMuchDiscount{
            margin-left: 110px;
            margin-top: -7px;
            @include desktop() {
              margin-left: 50px;
              width: 100px;
            }

            span{
              color: red;
            }
          }
        }

        .checkoutBtn{
          float: right;
          @include Width-Height(200px, 40px);
          background: #a67e65;
          padding-top: 7px;
          margin-right: 30px;
          margin-top: 15px;
          cursor: pointer;
          @include desktop() {
            @include Width-Height(90px, 40px);
            text-align: center;
            position: absolute;
            margin-left: 265px;
            margin-top: 60px;
          }

          &:hover{
            background: #89644f;
          }

          span{
            color: white;
            font-size: 16px;
            margin-left: 75px;
            @include desktop() {
              margin-left: 0;
            }
          }
        }
      }
    }
  }

  .shopCart-otherContent{
    text-align: center;
    margin-bottom: 100px;

    .emptyCart-box{
      @include Width-Height(104px, 122px);
      margin: 25px auto;
      overflow: hidden;

      .emptyCart-logo{
        -webkit-user-drag: none;
      }
    }

    p{
      font-size: 16px;
      color: #909090;
      font-weight: bold;
    }

    .jumpPage{
      @include Width-Height(120px, 25px);
      background: #ef4c2f;
      margin-left: 502px;
      @include desktop() {
        margin-left: 0;
        margin: auto;
      }

      .goToPageBtn{
        vertical-align: middle;
        text-decoration: none;
        color: #ffffff;

        &:hover{
          color: #ffffff;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>