<template>
  <div class="card">
    <router-link :to="`/product-info/${product.id}`" class="card-img-link">
      <img :src="product.imageUrl" class="card-img" />
    </router-link>

    <div class="card-body">
      <div class="card-ti">
        <router-link :to="`/product-info/${product.id}`" class="card-title">
          <span>{{ product.title }}</span>
        </router-link>
      </div>
      <div class="product-content">
        <div class="product-price">
          <del class="original-price">{{ $filters.currency(product.origin_price) }}</del>
          <p class="on-sale-price">{{ $filters.currency(product.price) }}</p>
        </div>

        <div class="card-btn-group">
          <button class="btn-favorite" ref="btnFavorite" @click="updateStatus(product)">
            <i class="fas fa-heart" ref="favoriteI"></i>
          </button>
          <button class="btn-cart" @click="addToCart(product)">
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['product'],
  data() {
    return {
      isSave: false
    }
  },
  methods: {
    addToCart(item, qty = 1) {
      this.$store.dispatch('shoppingCart/addToCart', { item, qty });
    },
    updateStatus(item) {
      const vm = this;
      vm.isSave = !vm.isSave;
      if (this.isSave) {
        vm.$refs.btnFavorite.style.background = 'white';
        vm.$refs.favoriteI.style.color = 'red';
        this.$store.dispatch('favorite/addToFavorite', item);
      }else {
        vm.$refs.btnFavorite.style.background = '';
        vm.$refs.favoriteI.style.color = '';
        this.$store.dispatch('favorite/removeFavorite', item);
      }
    }
  },
  computed: {
    ...mapState('favorite', {
      favorites: state => state.favorites
    })
  },
  mounted() {
    this.favorites.forEach((favoriteItem) => {
      if (this.product.id === favoriteItem.id) {
        this.isSave = true;
        this.$refs.btnFavorite.style.background = 'white';
        this.$refs.favoriteI.style.color = 'red';
      }
    });
  },
  created() {
    this.$store.dispatch('favorite/getFavoriteContents');
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};
@mixin cardBtn($color) {
  background: $color;
  border: 1px solid $color;
  width: 40px;
  padding-top: 4px;
  font-size: 20px;
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

.card{
  @include Width-Height(260px, 370px);
  margin-top: 15px;
  @include desktop() {
    width: 90%;
    margin: 10% auto;
    margin-top: 5%;
  }
  
  .card-img-link{
    overflow: hidden;

    img{
      padding: 13px;
      @include Width-Height(258px, 279px);
      transform: scale(1,1);
      transition: all 0.5s ease-out;
      @include desktop() {
        width: 100%;
      }

      &:hover{
        transform: scale(1.2,1.2);
      }
    }
  }

  .card-body{
    height: 60px;
    padding-top: 1px;
    @include desktop() {
      height: 90px;
    }

    .card-ti{
      height: 35px;
      line-height: 18px;

      .card-title{
        text-decoration: none;

        span{
          display: block;
          text-align: center;
          font-size: 15px;
          color: #616161;

          display: -webkit-box;   /* 將對象作為彈性伸縮盒子模型顯示 */
          -webkit-box-orient: vertical;   /* 設置或檢索伸縮盒子的子元素排列方式 */
          -webkit-line-clamp: 2;   /* 用來定義塊元素顯示文本行數 */
          overflow: hidden;  /* 超出文字隱藏 */
          text-overflow: ellipsis;  /* 內容超出時,在後方補上逗號 */
          @include desktop() {
            font-size: 17px;
          }

          &:hover{
            color: black;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .product-content{
    padding-top: 4px;
    height: 45px;

    .product-price{
      float: left;

      .original-price{
        font-size: 15px;
        color: #909090;
      }

      .on-sale-price{
        height: 8px;
        font-size: 17px;
        color: #db4949;
        font-weight: bold;
      }
    }

    .card-btn-group{
      @include Width-Height(95px, 35px);
      margin-top: 6px;
      float: right;

      .btn-favorite{
        margin-right: 5px;
        @include cardBtn(#909090);

        &:hover{
          background: #616161;
        }
      }

      .btn-cart{
        @include cardBtn(#c2987b);

        &:hover{
          background: #a77e66;
        }
      }
    
      i{
        vertical-align: middle;
        margin-top: -7px;
        font-size: 20px;
        color: #ffffff;
      }
    }
  } 
}
</style>