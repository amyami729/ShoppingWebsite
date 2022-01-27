<template>
  <div class="shoppingCart">
    <div class="shopCartTop">
      <p class="cartTitle">購物車清單</p>
    </div>

    <div class="shopCartNav">
      <div class="listTitleLeft">
        <div class="checkboxTitle">
          <input class="check" type="checkbox" name="method" value="plus"/>
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

    <div class="cartList" v-for="item in cartProducts.carts" :key="item">
      <div class="cartListInfo">  
        <div class="checkbox">
          <input class="check" type="checkbox" name="method" value="plus" />
        </div>
        <div class="productMessage">
          <img :src="item.product.imageUrl" alt="">
          <p class="productTitle">{{ item.product.title }}</p>
        </div>
      </div>
      <div class="cartListOther">
        <div class="otherLeft">
          <span class="originalPrice">{{ $filters.currency(item.product.price) }}</span>
          <!-- 購物車數量鈕 -->
          <cartControl class="cartControl" :updateInputeQty="item.qty" @emitUpdateItemQty="updateItemQty"></cartControl>
        </div>
        <div class="otherRight">
          <span class="totalPrice">$total</span>
          <div class="deleteBtn" @click="removeCartItem(item.id)">
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
          <input class="check" type="checkbox" name="method" value="plus"/>
          <span class="selectAll">全選(5)</span>
        </div>
        <div class="checkoutRight">
          <div class="productstotalPrice">
            <span class="numberOfItems">總金額 (0 個商品): </span>
            <span class="checkoutTotalPrice">$0</span>
            <p class="howMuchDiscount">已省下 <span>$38</span></p>
          </div>
          <div class="checkoutBtn">
            <span>去買單</span>
          </div>
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
      cartProducts: []
    }
  },
  methods: {
    getCartContents() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;  // 取得購物車列表
      this.$http.get(api).then((response) => {
        vm.cartProducts = response.data.data;
        // console.log(response.data.data.carts);
      });
    },
    removeCartItem(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;  // 刪除某一筆購物車資料
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.getCartContents();
        }
      });
    },
    // 同步更新子組件的數量
    updateItemQty(inputValue) {
      // const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;  // 加入購物車
      this.cartProducts.carts.forEach( item => {
        item.qty += inputValue - item.qty;
        console.log(item.qty);
        // this.$http.post(api, qty ).then((response) => {
        // console.log(response);
      // });
      });
    }
  },
  created() {
    this.getCartContents();
  }
}
</script>

<style scoped lang="scss">
.shoppingCart{
  width: 1124px;
  margin: 0 auto;

  .shopCartTop{
    height: 90px;

    .cartTitle{
      text-align: center;
      font-size: 30px;
      color: #616161;
      padding-top: 16px;
    }
  }

  .shopCartNav{
    height: 60px;
    box-shadow: 3px 0px 20px 0px #c4c4c4;

    .listTitleLeft{
      float: left;
      width: 583px;
      height: 58px;

      .checkboxTitle{
        float: left;
        width: 50px;
        height: 60px;

        input[type=checkbox] {
          width: 21px;
          height: 21px;
          position: relative;
          margin-top: 20px;
          margin-left: 13px;
        }
        input[type=checkbox]:after {
          position: absolute;
          width: 21px;
          height: 21px;
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
      }

      .productMessageTitle{
        float: right;
        width: 533px;
        height: 58px;
        color: #616161;
        font-size: 18px;

        .goods{
          float: left;
          margin-left: 20px;
          margin-top: 16px;
        }

        .unitPrice{
          float: right;
          margin-right: 115px;
          margin-top: 16px;
        }
      }
    }

    .listTitleRight{
      float: right;
      width: 539px;
      height: 58px;

      .otherTitleLeft{
        float: left;
        width: 250px;
        height: 58px;

        .quantity{
          margin-top: 16px;
          color: #616161;
          font-size: 18px;
          padding-left: 55px;
        }
      }

      .otherTitleRight{
        float: right;
        width: 289px;
        height: 58px;
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
    width: 1124px;
    height: 109px;
    box-shadow: 3px 0px 8px 0px #c4c4c4;
    margin-top: 15px;
    margin-bottom: 15px;

    .cartListInfo{
      float: left;
      width: 395px;
      height: 107px;

      .checkbox{
        float: left;
        width: 50px;
        height: 107px;

        input[type=checkbox] {
          width: 21px;
          height: 21px;
          position: relative;
          margin-top: 43px;
          margin-left: 13px;
        }
        input[type=checkbox]:after {
          position: absolute;
          width: 21px;
          height: 21px;
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
      }

      .productMessage{
        float: right;
        width: 335px;
        height: 107px;

        img{
          float: left;
          width: 100px;
          height: 75px;
          margin-top: 16px;
        }

        .productTitle{
          float: right;
          width: 200px;
          height: 45px;
          margin-top: 32px;
          margin-right: 15px;
          color: #616161;
          font-size: 16px;

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
      width: 690px;
      height: 107px;

      .otherLeft{
        float: left;
        width: 400px;
        height: 107px;

        .originalPrice{
          float: left;
          margin-top: 42px;
          color: #616161;
          font-size: 16px;
          font-weight: bold;
        }

        .cartControl{
          float: right;
          width: 250px;
          height: 107px;
          padding-top: 30px;
          padding-left: 10px;
        }
      }

      .otherRight{
        float: right;
        width: 290px;
        height: 107px;

        .totalPrice{
          float: left;
          margin-top: 42px;
          color: #db4949;
          font-size: 16px;
          font-weight: bold;
          margin-left: 10px;
        }

        .deleteBtn{
          float: right;
          width: 45px;
          height: 45px;
          border: 1px solid #ef4c2f;
          margin-top: 32px;
          margin-right: 30px;
          cursor: pointer;
          color: #ef4c2f;

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
    width: 1124px;
    height: 150px;
    background: white;
    margin-bottom: 50px;
    box-shadow: 3px 3px 15px 0px #c4c4c4;
    position: sticky;
    bottom: 0;

    .CouponUsage{
      height: 80px;
      border-bottom: 1px dashed #e8e8e8;

      .couponUsageInput{
        float: left;
        width: 250px;
        height: 50px;
        padding-left: 15px;
        font-size: 16px;
        border: #c6c6c6;
        outline: none;
        box-shadow: 3px 3px 15px 0px #c4c4c4;
        margin-left: 755px;
        margin-top: 15px;
      }

      input::placeholder{
        color: #c6c6c6;
      }

      .UsageBtn{
        float: right;
        width: 70px;
        height: 50px;
        background: #616161;
        padding-top: 12px;
        margin-right: 30px;
        margin-top: 15px;
        cursor: pointer;

        &:hover{
          opacity: 0.9;
        }

        span{
          font-size: 18px;
          color: white;
          margin-left: 17px;
        }
      }
    }

    .checkoutInfo{
      height: 70px;

      .checkoutLeft{
        float: left;
        width: 300px;
        height: 70px;

        input[type=checkbox] {
          width: 18px;
          height: 18px;
          position: relative;
          margin-top: 25px;
          margin-left: 15px;
        }
        input[type=checkbox]:after {
          position: absolute;
          width: 20px;
          height: 21px;
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

        .selectAll{
          float: right;
          width: 100px;
          font-size: 16px;
          margin-right: 150px;
          margin-top: 22px;
          color: #616161;
        }
      }

      .checkoutRight{
        float: right;
        width: 500px;
        height: 70px;

        .productstotalPrice{
          float: left;
          margin-left: 10px;
          margin-top: 14px;

          .numberOfItems{
            font-size: 16px;
          }

          .checkoutTotalPrice{
            font-size: 23px;
            color: #db4949;
          }

          .howMuchDiscount{
            margin-left: 110px;
            margin-top: -7px;

            span{
              color: red;
            }
          }
        }

        .checkoutBtn{
          float: right;
          width: 200px;
          height: 40px;
          background: #a67e65;
          padding-top: 7px;
          margin-right: 30px;
          margin-top: 15px;
          cursor: pointer;

          &:hover{
            background: #89644f;
          }

          span{
            color: white;
            font-size: 16px;
            margin-left: 75px;
          }
        }
      }
    }
  }
}
</style>