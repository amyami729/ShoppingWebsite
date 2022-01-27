<template>
  <div class="home">
    <loading :active="isLoading"></loading>
    <carousel class="carousel" v-slot="{ currentSlide }">
      <slide v-for="(slide, index) in carouselSlides" :key="index">
        <div class="slide-info" v-show="currentSlide === index + 1">
          <!-- 透過require引入另一個模組（module.exports） -->
          <img :src="require(`@/assets/img/${slide}.png`)" alt="">
        </div>
      </slide>
    </carousel>

    <div class="banner">
      <img src="@/assets/img/banner.png" alt="">
      <router-link to="/discount"  class="receive-discount">
        立即領取
      </router-link> 
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
      products: [],  // 用來儲存JSON資料
      recommendProducts: [],  // 用來儲存篩選後的商品資料
      isLoading: false   // 預設為停止loading狀態
    }
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;  // 取得全部商品列表
      // 取得JSON數據時即執行loading狀態
      vm.isLoading = true; 

      this.$http.get(api).then((response) => {
        // 取得JSON數據之後即停止loading狀態
        vm.isLoading = false; 
        vm.products = response.data.products;
        vm.productsFilter();
      });
    },
    // 商品篩選器
    productsFilter() {
      const vm = this;
      let result = vm.products.filter((object) => {
        if (object.category === '特色推薦') {
          return object;
        }
        return false;
      });
      result = result.reverse().slice(0, 4);
      vm.recommendProducts = result;
    },
    goTop() {
      window.scrollTo({ top: 0 });
    }
  },
  created() {
    this.getProducts();
  },
}
</script>

<style scoped lang="scss">
.home{
  width: 1124px;
  margin: 0 auto;

  .carousel{
    position: relative;

    img{
      width: 1124px;
      height: 396px;
      object-fit: cover;
      -webkit-user-drag:none;  //禁止图片拖动
    }
  }

  .banner{
    margin: 60px 0 46px;
    position: relative;

    img{
      width: 1124px;
      height: 100px;
      -webkit-user-drag:none;
    }

    .receive-discount{
      position: absolute;
      width: 130px;
      height: 45px;
      background: #88644e;
      text-align: center;
      color: #ffffff;
      padding-top: 10px;
      left: 960px;
      top: 28px;
      text-decoration: none;

      &:hover{
        opacity: 0.8;
      }
    }
  }

  .featured-list{
    height: 410px;
    
    span{
      color: #616161;
      font-size: 20px;

      i{
        padding-right: 5px;
      }

      .more{
        margin-left: 860px;
        text-decoration: none;
        color: #a67e65;

        &:hover{
          color: #88644e;
        }
      }
    }
    .card-wrapper{
      margin-right: 28px;
      display: inline-block;

      &:nth-child(5){
        margin-right: 0;
      }
    }
  }

  .featured-banner-top{
    margin: 60px 0;
    height: 427px;
    background: url(../../../assets/img/featured-banner-01.png) no-repeat center;
    
    .banner-content-left{
      width: 375px;
      background: #c49d81;
      opacity: 0.8;

      p{
        color: #ffffff;
        padding: 80px 50px 10px 30px;
        font-size: 37px;
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
    background: url(../../../assets/img/featured-banner-02.png) no-repeat center;

    .banner-content-right{
      width: 375px;
      background: #9b9b9b;
      opacity: 0.8;

      p{
        color: #ffffff;
        padding: 80px 50px 10px 30px;
        font-size: 37px;
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
      }

      p{
        height: 55px;
        text-align: center;
        font-size: 25px;
        padding-top: 8px;
        color: white;
      }
    }

    .content{
      height: 140px;

      .emailForm{
        height: 68px;

        .form-control{
          width: 500px;
          height: 45px;
          margin-left: 274px;
          margin-top: 22px;
        }

        .subscription{
          position: absolute;
          background: #a67e65;
          color: white;
          margin-left: 774px;
          margin-top: 22px;
          width: 80px;
          height: 45px;

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
    width: 35px;
    height: 38px;
    background: white;
    cursor: pointer;

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