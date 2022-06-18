<template>
  <div class="home">
    <loading :active="isLoading"></loading>
    <carousel class="carousel" v-slot="{ currentSlide }">
      <slide v-for="(slide, index) in carouselSlides" :key="index">
        <div class="slide-info" v-show="currentSlide === index + 1">
          <img :src="require(`@/assets/img/${slide}.png`)" alt="">
        </div>
      </slide>
    </carousel>

    <div class="banner">
      <img src="@/assets/img/banner.png" alt="">
      <div class="receive-discount">
        <p>立即領取</p> 
      </div>
    </div>

    <div class="featured-list">
      <span>
        <i class="fas fa-thumbs-up"></i>
        特色商品推薦
        <router-link to="/products?categoryId=特色推薦" class="more">
          查看更多
          <i class="fas fa-caret-right"></i>
        </router-link>
      </span>
      <div class="card-wrapper" data-aos="fade-up" data-aos-duration="1000" :class="{ hide : index === 3  }" v-for="(obj, index) in recommendProducts" :key="obj.id">
        <card class="card" :product="obj"></card>
      </div>
    </div>

    <div class="featured-banner-top row" data-aos="zoom-in-left" data-aos-duration="1100">
      <div class="banner-content-left">
        <p>
          在家渡假好輕鬆
          <br />躺椅享七折優惠
        </p>
        <span class="d-none d-md-block">
          即刻入手進口高品質躺椅
          <br />讓度假不再需要出遠門!
        </span>
        <router-link to="/products?categoryId=木椅" class="goShope">
          去逛逛
        </router-link>
      </div>
    </div>
    
    <div class="featured-banner-bottom row" data-aos="zoom-in-right" data-aos-duration="1100">
      <div class="banner-content-right offset-md-8">
        <p>
          好看與舒適兼具
          <br />不再只當視覺系
        </p>
        <span class="d-none d-md-block">
          嚴選舒適美學沙發以及精
          <br />緻抱枕直接一次擁有!
        </span>
        <router-link to="/products?categoryId=沙發" class="goShope">
          去逛逛
        </router-link>
      </div>
    </div>

    <div class="newsletter">
      <div class="title">
          <h2>訂閱電子報</h2>
          <p>立即訂閱「奇木奇奇」，一手掌握所有好康優惠!</p>
      </div>
      <div class="content">
        <Form class="emailForm d-flex align-items-start" ref="form" tag="form">
          <Field name="email" type="email" id="username" class="form-control" rules="email" placeholder="請輸入您的電子郵件"/>
          <button type="submit" value="訂閱" class="btn btn-tertiary subscription">訂閱</button>
          <br /><ErrorMessage class="error-message" name="email" />
        </Form>
      </div>
    </div>

    <div class="go-top" @click="goTop">
      <i class="fas fa-angle-double-up topArrow"></i>
    </div>
  </div>
</template>

<script>
import carousel from '@/components/Front/Carousel.vue';
import slide from '@/components/Front/Slide.vue';
import card from '@/components/Front/Card.vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'Home',
  components: {
    carousel,
    slide,
    card,
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    const carouselSlides = ['slide_01', 'slide_02'];
    return { carouselSlides };
  },
  data() {
    return {
      products: [],
      recommendProducts: [],  // 用來儲存篩選後的商品資料
      isLoading: false
    }
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;  // 取得全部商品列表
      vm.isLoading = true; 
      this.$http.get(api).then((response) => {
        vm.isLoading = false; 
        vm.products = response.data.products;
        vm.productsFilter();
      });
    },
    // 商品篩選器
    productsFilter() {
      const vm = this;
      let result = vm.products.filter(object => object.category === '特色推薦');
      result = result.reverse().slice(0, 4);
      vm.recommendProducts = result;
    },
    goTop() {
      window.scrollTo({ top: 0 });
    }
  },
  created() {
    this.getProducts();
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

.home{
  width: 1124px;
  margin: 0 auto;
  @include desktop() {
    width: 100%;
    padding: 0 10px;
  }

  .carousel{
    position: relative;

    img{
      @include Width-Height(1124px, 396px);
      object-fit: cover;
      -webkit-user-drag: none;  //禁止圖片拖動
      @include desktop() {
        @include Width-Height(100%, 100%);
      }
    }
  }

  .banner{
    margin: 60px 0 46px;
    position: relative;
    @include desktop() {
      margin: 25px 0 18px;
    }

    img{
      @include Width-Height(1124px, 100px);
      -webkit-user-drag: none;
      @include desktop() {
        @include Width-Height(100%, 100%);
      }
    }

    .receive-discount{
      position: absolute;
      @include Width-Height(130px, 45px);
      background: #88644e;
      text-align: center;
      display: table;
      left: 960px;
      top: 28px;
      text-decoration: none;
      @include desktop() {
        left: 75%;
        top: 20%;
        @include Width-Height(20%, 60%);
      }

      p{
        color: #ffffff;
        display: table-cell;
        vertical-align: middle;
        @include desktop() {
          font-size: 13px;
        }
      }

      &:hover{
        opacity: 0.8;
      }
    }
  }

  .featured-list{
    height: 410px;
    @include desktop() {
      height: 100%;
    }
    
    span{
      color: #616161;
      font-size: 20px;
      @include desktop() {
        font-size: 16px;
        display: block;
      }

      i{
        padding-right: 5px;
      }

      .more{
        margin-left: 860px;
        text-decoration: none;
        color: #a67e65;
        @include desktop() {
          margin-left: 0;
          float: right;
        }

        &:hover{
          color: #88644e;
        }
      }
    }

    .card-wrapper{
      margin-right: 28px;
      display: inline-block;
      @include desktop() {
        margin-right: 0;
        display: block;
      }

      &:nth-child(5){
        margin-right: 0;
      }
    }
  }

  .featured-banner-top{
    margin: 60px 0;
    height: 427px;
    background: url(../../../assets/img/featured-banner.png) no-repeat 0 60%;
    @include desktop() {
      background-position:  15% 60%;
    }
    
    .banner-content-left{
      width: 375px;
      background: #c49d81;
      opacity: 0.8;
      @include desktop() {
        float: left;
        width: 60%;
      }

      p{
        color: #ffffff;
        padding: 80px 50px 10px 30px;
        font-size: 37px;
        @include desktop() {
          font-size: 25px;
        }
      }

      span{
        color: #ffffff;
        padding-left: 30px;
        padding-bottom: 35px;
        line-height: 40px;
        font-size: 25px;
      }

      .goShope{
        border: 1px solid #ffffff;
        margin-left: 30px;
        color: #ffffff;
        text-decoration: none;
        font-size: 18px;
        padding: 13px 30px;

        &:hover{
          background: white;
          color: #c49d81;
        }
      }
    }
  }

  .featured-banner-bottom{
    margin: 0 0 60px;
    height: 427px;
    background: url(../../../assets/img/featured-banner.png) no-repeat right 60%;
    @include desktop() {
      background-position:  70% 60%;
    }

    .banner-content-right{
      width: 375px;
      background: #9b9b9b;
      opacity: 0.8;
      @include desktop() {
        float: right;
        margin-left: 40%;
        width: 60%;
      }

      p{
        color: #ffffff;
        padding: 80px 50px 10px 30px;
        font-size: 37px;
        @include desktop() {
          font-size: 25px;
        }
      }

      span{
        color: #ffffff;
        padding-left: 30px;
        padding-bottom: 35px;
        line-height: 40px;
        font-size: 25px;
      }

      .goShope{
        border: 1px solid #ffffff;
        margin-left: 30px;
        color: #ffffff;
        text-decoration: none;
        font-size: 18px;
        padding: 13px 30px;

        &:hover{
          background: white;
          color: #9b9b9b;
        }
      }
    }
  }

  .newsletter{
    margin: 0 0 60px;
    height: 280px;
    background: linear-gradient(rgba(97,97,97,.6),rgba(97,97,97,.6)) no-repeat top/cover fixed,
    url(../../../assets/img/newsletter-background.png) no-repeat 50%/150% fixed;    

    .title{
      height: 140px;

      h2{
        text-align: center;
        padding-top: 48px;
        font-size: 35px;
        color: white;
        @include desktop() {
          font-size: 26px;
        }
      }

      p{
        height: 55px;
        text-align: center;
        font-size: 25px;
        padding-top: 8px;
        color: white;
        @include desktop() {
          font-size: 21px;
        }
      }
    }

    .content{
      height: 140px;

      .emailForm{
        height: 68px;

        .form-control{
          @include Width-Height(500px, 45px);
          margin-left: 274px;
          margin-top: 22px;
          @include desktop() {
            @include Width-Height(50%, 60%);
            margin-left: 15%;
            margin-top: 10%;
          }
        }

        .subscription{
          position: absolute;
          background: #a67e65;
          color: white;
          margin-left: 774px;
          margin-top: 22px;
          @include Width-Height(80px, 45px);
          @include desktop() {
            margin-left: 0;
            margin-top: 9%;
            right: 15%;
          }

          &:hover{
            background: #89644f;
          }
        }

        .error-message{
          width: 125px;
          color: white;
          font-size: 13px;
          position: absolute;
          margin-left: 275px;
          margin-top: 70px;
        }
      }
    }
  }

  .go-top{
    position: absolute;
    margin-left: 545px;
    margin-top: 247px;
    @include Width-Height(35px, 38px);
    background: white;
    cursor: pointer;
    @include desktop() {
      display: none;
    }

    i{
      display: block;
      text-align: center;
      margin-top: 8px;
      font-size: 22px;
      color: #616161;
      -webkit-text-stroke: 2px white;

      &:hover{
        color: #c49d81;
      }
    }
  }
}
</style>