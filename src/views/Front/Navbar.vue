<template>
  <div id="navbar">
    <input type="checkbox" name="" id="menu-control">
    <div class="left">
      <label for="menu-control" class="hamburger-menu">
        <span>漢堡選單</span>
      </label>

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
        </ul>
      </div>
    </div>

    <div class="right">
      <div class="right-list">
        <ul>
          <li>
            <router-link to="/login">
              <i class="fas fa-user-circle"></i>
            </router-link> 
          </li>
          <li>
            <router-link to="/favorite">
              <i class="fas fa-heart"></i>
              <span class="favoriteNum" v-show="favorites.length > 0">{{ favorites.length }}</span>
            </router-link> 
          </li>
          <li>
            <span class="cartModal" @click="showCartModal(true)">
              <i class="fas fa-shopping-cart"></i>
              <span class="shoppingNum" v-show="cartProducts.length > 0">{{ cartProducts.length }}</span>
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
            <div class="emptyCart-box">
              <img src="@/assets/img/empty.png" alt="">
            </div>
            <p>你的購物車是空的ㄛ</p>
          </div>
        </div>

        <div class="cart-mask" v-if="cartModalShow" @click="showCartModal(false)"></div>
      </div>
    </div>

    <!-- Menu list -->
    <div class="menu-list">
      <label for="menu-control">
        <div class="close-icon">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </label>
      <ul @click="closeMenuModal">
        <li>
          <router-link to="/home">首頁</router-link>
        </li>
        <li>
          <router-link to="/products?categoryId=全部商品">本店商品</router-link>
        </li>
        <li>
          <router-link to="/favorite">收藏清單</router-link> 
        </li>
        <li>
          <router-link to="/cart">購物車</router-link> 
        </li>
      </ul>
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
    },
    closeMenuModal() {
      const menuControl = document.querySelector('#menu-control');
      menuControl.checked = false;
    }
  },
  computed: {
    ...mapState('shoppingCart', {
      cartProducts: state => state.carts.reverse()
    }),
    ...mapState('favorite', {
      favorites: state => state.favorites
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
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

#navbar{
  @include Width-Height(1124px, 100px);
  margin: 0 auto;
  position: relative;
  @include desktop() {
    width: 100%;
  }

  #menu-control{
    position: absolute;
    top: 27px;
    z-index: -2;
    opacity: 0;
    @include desktop() {
      left: 10px;
    }
  }

  .left{
    height: 100px;
    float: left;

    .hamburger-menu{
      @include Width-Height(40px, 40px);
      overflow: hidden;
      cursor: pointer;
      position: absolute;
      top: 30px;
      right: 10px;
      z-index: 1;
      display: none;
      @include desktop() {
        display: block;
      }

      &::before{
        // content: 用於輔助元素生成
        content: '';
        position: absolute;
        @include Width-Height(34px, 3px);
        left: 3px;
        background: #aaa;
        // 置中
        top: 0;
        bottom: 0;
        margin: auto;
        // x軸 y軸移8px 0模糊 色彩
        box-shadow: 0 8px 0 #aaa,
                    0 -8px 0 #aaa;
      }

      span{
        opacity: 0;
      }
    }

    .logo{
      margin-top: 27px;
      @include Width-Height(100px, 44px);
      overflow: hidden;
      @include desktop() {
        margin-left: 10px
      }

      .navbar-logo{
        width: 100px;
        -webkit-user-drag: none;
      }
    }

    .left-list{
      margin-left: 100px;
      margin-top: -35px;
      @include desktop() {
        display: none;
      }

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

  // router構造配置，用來添加樣式類名
  .active .line{
    @include Width-Height(50px, 3px);
    display: inline-block;
    background: #c2987b;
    position: absolute;
    left: 50%;
    bottom: -3px;
    margin-left: -25px;
  }

  .right{
    @include Width-Height(300px, 100px);
    float: right;
    @include desktop(){
      @include Width-Height(0, 0);
    }

    .right-list{
      line-height: 60px;
      position: relative;

      li{
        list-style: none;
        display: inline-block;
        padding-left: 75px;
        @include desktop(){
          display: none;
        }

        i{
          @include Width-Height(28px, 30px);
          font-size: 23px;
          position: absolute;
          text-align: center;
          padding-top: 4px;
          color: #616161;

          &:hover{
            color: #c2987b;
          }
        }

        .favoriteNum{
          display: block;
          @include Width-Height(19px, 19px);
          position: absolute;
          line-height: 15px;
          border-radius: 50%;
          font-size: 9px;
          color: white;
          background: #cd921e;
          right: 80px;
          bottom: 11px;
          text-align: center;
          padding-top: 2px;
        }

        .cartModal{
          cursor: pointer;

          .shoppingNum{
            display: inline-block;
            @include Width-Height(19px, 19px);
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
          top: -20px;
          padding-left: 45px;
        }

        .cart-otherContent{
          line-height: 0;
          text-align: center;
          margin-bottom: 100px;

          .emptyCart-box{
            @include Width-Height(104px, 122px);
            margin: 25px auto;
            overflow: hidden;

            img{
              -webkit-user-drag: none;
            }
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
              @include Width-Height(40px, 40px);
              margin-left: 10px;
              margin-top: 4px;
            }
          
            .lists-info{
              float: right;
              @include Width-Height(292px, 48px);
              line-height: 0;

              .product-title{
                float: left;
                @include Width-Height(227px, 48px);
                padding-top: 20px;
                color: #616161;

                white-space: nowrap;  /* 設定內容強制顯示一行,直到內容結束或<br> */
                text-overflow: ellipsis;  /* 內容超出時,在後方補上逗號 */
                overflow: hidden;  /* 超出文字隱藏 */
              }

              .selling-price{
                float: right;
                @include Width-Height(65px, 48px);
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
            @include Width-Height(140px, 40px);
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
        @include Width-Height(100%, 100%);
        z-index: 49;
        background: rgba(7, 17, 27, 0.3);
      }
    }
  }

  .menu-list{
    display: none;
  }

  @include desktop() {
    #menu-control:checked ~ .menu-list{
      display: block;
    }
      
    .menu-list{
      display: block;
      position: absolute;
      @include Width-Height(29vh, 100vh);
      background: #ffffff;
      box-shadow: 3px 3px 9px #c4c4c4;
      top: 0;
      right: 0;
      z-index: 9999;
      display: none;

      .close-icon{
        @include Width-Height(50px, 50px);

        i{
          font-size: 22px;
          padding: 15px 15px;
          color: #616161;
        }
      }

      ul{
        padding-left: 0;
        margin: 1rem 0;

        li{
          list-style: none;
          line-height: 55px;
          font-size: 20px;
          text-align: center;
        
          a{
            display: block;
            text-decoration: none;
            color: #616161;
            font-weight: bold;
          }
        }
      }

      .active{
        background: #a77e65;
        display: block;
        color: #ffffff;
      }
    }
  }
}
</style>