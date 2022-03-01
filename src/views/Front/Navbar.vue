<template>
  <div id="navbar">
    <div class="left">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="" class="navbar-logo">
        </router-link>
      </div>
      <div class="left-list">
        <ul>
          <li class="foremost">
            <router-link to="/home" class="nav-item">
              首頁
              <i class="line"></i>
            </router-link> 
          </li>
          <li>
            <router-link to="/products?categoryId=全部商品" class="nav-item">
              本店商品
              <i class="line" style="width: 80px; left: 13px;"></i>
            </router-link> 
          </li>
          <li>
            <router-link to="/discount" class="nav-item">
              超值優惠
              <i class="line" style="width: 80px; left: 13px;"></i>
            </router-link> 
          </li>
        </ul>
      </div>
    </div>

    <div class="right">
      <div class="right-list">
        <ul>
          <li>
            <router-link to="/login" class="nav-item">
              <i class="fas fa-user-circle"></i>
            </router-link> 
          </li>
          <li>
            <a href="#">
              <i class="fas fa-heart"></i>
            </a>
          </li>
          <li>
            <span class="cartModal" @click="showCartModal(true)">
              <i class="fas fa-shopping-cart"></i>
              <span class="num" v-show="cartProducts.length > 0">{{ cartProducts.length }}</span>
            </span>
          </li>
        </ul>

        <div class="cart-modal" v-if="cartModalShow">
          <i class="fas fa-caret-up"></i>
          <p class="cart-top"  v-if="cartProducts.length !== 0">最近加入的商品</p>
          <div class="cart-content-box">
            <div class="cart-content" v-for="item in cartProducts.slice(0, 5)" :key="item">
              <router-link :to="`/product-info/${item.id}`">
                <img :src="item.imageUrl" alt="">
                <div class="lists-info">
                  <p class="product-title">{{ item.title }}</p>
                  <p class="selling-price">{{ $filters.currency(item.price) }}</p>
                </div>
              </router-link>
            </div>
          </div>
          <div class="cart-footer">
            <p class="footer-left" v-if="cartProducts.length > 5"><b>{{ cartProducts.length - 5 }}</b> 看購物車裡的商品</p>
            <router-link to="/cart">
              <div class="footer-right-box" v-if="cartProducts.length !== 0">
                <p class="footer-right">查看我的購物車</p>
              </div>
            </router-link>
          </div>

          <div class="cart-otherContent" v-if="cartProducts.length === 0">
            <img src="@/assets/img/empty_cart.png" alt="" class="emptyCart-logo">
            <p>你的購物車是空的ㄛ</p>
          </div>
        </div>

        <div class="cart-mask" v-if="cartModalShow" @click="showCartModal(false)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      cartModalShow: false
    }
  },
  methods: {
    showCartModal(isShow) {
      if (isShow) {
        this.cartModalShow = true;
      }else {
        this.cartModalShow = false;
      }
    }
  },
  computed: {
    ...mapState('shoppingCart', {
      cartProducts: state => state.cartProducts.reverse()
    })
  },
  created() {
    this.$store.dispatch('shoppingCart/getCartContents');
  },
}
</script>

<style scoped lang="scss">
#navbar{
  width: 1124px;
  height: 100px;
  margin: 0 auto;

  .left{
    height: 100px;
    float: left;

    .logo{
      margin-top: 27px;
      width: 100px;

      .navbar-logo{
        width: 100px;
        height: 45px;
      }
    }

    .left-list{
      margin-left: 100px;
      margin-top: -35px;

      li{
        list-style: none;
        display: inline-block;
        padding-right: 32px;

        .nav-item{
          color: #616161;
          text-decoration: none;
          position: relative;
          z-index: 1;

          &:hover{
            color: gray;
          }
        }
      }

      .foremost{
        padding-left: 7px;
      }
    }
  }

  //router構造配置，用來添加樣式類名
  .active .line{
    width: 50px;
    height: 3px;
    display: inline-block;
    background: #c2987b;
    position: absolute;
    left: 50%;
    bottom: -3px;
    margin-left: -25px;
  }

  .right{
    height: 100px;
    width: 300px;
    float: right;

    .right-list{
      line-height: 60px;
      position: relative;

      li{
        list-style: none;
        display: inline-block;
        padding-left: 75px;

        i{
          width: 28px;
          height: 30px;
          font-size: 23px;
          position: absolute;
          text-align: center;
          padding-top: 4px;
          color: #616161;

          &:hover{
            color: #c2987b;
          }
        }

        .cartModal{
          cursor: pointer;

          .num{
            display: inline-block;
            width: 19px;
            height: 19px;
            position: absolute;
            line-height: 15px;
            border-radius: 50%;
            font-size: 9px;
            color: white;
            background: red;
            right: 7px;
            bottom: 13px;
            text-align: center;
            padding-top: 2px;
          }
        }
      }

      .cart-modal{
        width: 350px;
        border: 1px solid #e7e7e5;
        background: #fff;
        position: absolute;
        z-index: 50;
        top: 75px;
        right: 0;
        box-shadow: 3px 3px 9px #c4c4c4;

        i{
          width: 80px;
          font-size: 28px;
          color: #e7e7e5;
          position: absolute;
          left: 269px;
          top: -19px;
          padding-left: 45px;
        }

        .cart-otherContent{
          line-height: 0;
          text-align: center;
          margin-bottom: 100px;

          .emptyCart-logo{
            padding-bottom: 25px;
            padding-top: 25px;
          }

          p{
            font-size: 16px;
            color: #616161;
          }
        }

        .cart-top{
          height: 40px;
          line-height: 0;
          padding-top: 20px;
          padding-left: 10px;
          color: #bdbdbd;
        }

        .cart-content-box{
          margin-top: -16px;

          .cart-content{
            height: 50px;

            &:hover{
              background: #f8f8f8;
            }

            img{
              float: left;
              width: 40px;
              height: 40px;
              margin-left: 10px;
              margin-top: 4px;
            }
          
            .lists-info{
              float: right;
              width: 292px;
              height: 48px;
              line-height: 0;

              .product-title{
                float: left;
                width: 227px;
                height: 48px;
                padding-top: 20px;
                color: #616161;

                white-space: nowrap;  /* 設定內容強制顯示一行,直到內容結束或<br> */
                text-overflow: ellipsis;  /* 內容超出時,在後方補上逗號 */
                overflow: hidden;  /* 超出文字隱藏 */
              }

              .selling-price{
                float: right;
                width: 65px;
                height: 48px;
                padding-left: 10px;
                color: #db4949;
                padding-top: 20px;
              }
            }
          }
        }

        .cart-footer{
          height: 60px;
          padding-left: 10px;
          line-height: 0;

          .footer-left{
            float: left;
            color: #616161;
            margin-top: 30px;
          }

          .footer-right-box{
            float: right;
            width: 140px;
            height: 40px;
            margin-top: 10px;
            margin-right: 10px;
            background: #c2987b;

            &:hover{
              opacity: 0.9;
            }

            .footer-right{
              padding-left: 21px;
              margin-top: 20px;
              color: white;
            }
          }
        }
      }

      .cart-mask{
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 49;
        background: rgba(7, 17, 27, 0.3);
      }
    }
  }
}
</style>