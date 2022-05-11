<template>
  <div class="footerMessage">
    <div class="simpleMessage">
      <div class="logo">
        <img src="@/assets/img/white-logo.png" alt="">
      </div>
      <p>如果您有任何想法或想提升您的創意項目，請隨時與我聯繫!</p>
    </div>

    <div class="contactMessage">
      <div class="contact">
        <div class="title">
          <span>聯絡我們</span>
        </div>
        <div class="envelope">
          <p>chimoochi@example.com</p>
          <a href="#" class="envelope-logo">
            <i class="fas fa-envelope"></i>
          </a>
        </div>
        <div class="phone">
          <p>0800-xxx-xxx</p>
          <a href="#" class="phone-logo">
            <i class="fas fa-phone"></i>
          </a>
        </div>
      </div>

      <div class="follow">
        <div class="title">
          <span>關注我們</span>
        </div>
        <div class="aboveSocial">
          <a href="#" class="instagram-logo">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="youtube-logo">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
        <div class="belowSocial">
          <a href="#" class="facebook-logo">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="twitter-logo">
            <i class="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="copyright">
    <p>僅用於個人學習使用，非商業用途。 2021 © Amy Chen All Rights Reserved.</p>
  </div>
</template>

<script>
export default {
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

.footerMessage{
  @include Width-Height(1124px, 285px);
  margin: 0 auto;
  background: #616161;
  @include desktop() {
    width: 100%;
  }

  .simpleMessage{
    float: left;
    @include Width-Height(320px, 285px);
    @include desktop() {
      @include Width-Height(100%, 130px);
    }

    .logo{
      height: 110px;
      padding-top: 65px;
      padding-left: 32px;
      @include desktop() {
        padding-top: 20px;
        padding-left: 0;
        height: 82px;
        text-align: center;
      }
    }

    p{
      padding-top: 25px;
      padding-left: 32px;
      font-size: 16px;
      color: #ffffff;
      @include desktop() {
        padding-top: 0;
        padding-left: 0;
        text-align: center;
        font-size: 18px;
      }
    }
  }

  .contactMessage{
    float: right;
    @include Width-Height(804px, 285px);
    @include desktop() {
      height: 156px;
    }

    .contact{
      float: left;
      @include Width-Height(650px, 285px);
      @include desktop() {
        height: 0;
      }

      .title{
        height: 110px;
        padding-left: 570px;
        padding-top: 83px;
        @include desktop() {
          display: none;
        }

        span{
          font-size: 20px;
          color: #ffffff;
        }
      } 

      .envelope{
        height: 55px;
        @include desktop() {
          margin-top: 30px;
        }

        p{
          float: left;
          width: 185px;
          font-size: 16px;
          margin-left: 415px;
          margin-top: 20px;
          color: #ffffff;
          @include desktop() {
            margin-left: 432px;
          }
        }

        .envelope-logo{
          float: right;
          margin-right: 1px;
          margin-top: 20px;
          @include Width-Height(25px, 25px);
          background: #ffffff;
          border-radius: 20%;

          &:hover{
            background: #00aaec;
          }

          i{
            padding: 4px 4px;
            font-size: 18px;
            color: #616161;

            &:hover{
              color: #ffffff;
            }
          }
        }
      }

      .phone{
        height: 120px;
        @include desktop() {
          height: 0;
        }
        

        p{
          float: left;
          width: 102px;
          font-size: 16px;
          margin-left: 498px;
          margin-top: 5px;
          color: #ffffff;
          @include desktop() {
            margin-left: 515px;
          }
        }

        .phone-logo{
          float: right;
          margin-right: 1px;
          margin-top: 5px;
          @include Width-Height(25px, 25px);
          background: #ffffff;
          border-radius: 20%;

          &:hover{
            background: #6eec71;
          }

          i{
            padding: 4px 4px;
            font-size: 18px;
            color: #616161;

            &:hover{
              color: #ffffff;
            }
          }
        }
      }
    }

    .instagram-logo, .youtube-logo,
    .facebook-logo, .twitter-logo{
      transition: 1s; /* 定義移出回去原來樣子的時間 */

      &:hover{
        transition: 1s; /* 定義旋轉過渡時間 */
        transform: rotate(-180deg); /* 定義旋轉的角度 */
        /* 兼容處理 */
        -ms-transform: rotate(-180deg); /* IE 9 */
        -moz-transform: rotate(-180deg); /* Firefox */
        -webkit-transform: rotate(-180deg); /* Safari and Chrome */
        -o-transform: rotate(-180deg); /* Opera */
      }
    }

    .follow{
      float: right;
      @include Width-Height(154px, 285px);
      @include desktop() {
        height: 0;
      }

      .title{
        height: 110px;
        padding-left: 43px;
        padding-top: 83px;
        @include desktop() {
          display: none;
        }

        span{
          font-size: 20px;
          color: #ffffff;
        }
      } 

      .aboveSocial{
        height: 55px;
        @include desktop() {
          margin-top: 30px;
        }

        .instagram-logo{
          float: left;
          margin-top: 20px;
          margin-left: 43px;
          @include Width-Height(25px, 25px);
          background: #ffffff;
          border-radius: 20%;

          i{
            padding: 3px 5px;
            font-size: 18px;
            color: #616161;

            &:hover{
              color: #cc3384;
            }
          }
        }

        .youtube-logo{
          float: right;
          margin-right: 32px;
          margin-top: 20px;
          @include Width-Height(25px, 25px);
          background: #ffffff;
          border-radius: 5px;

          i{
            padding: 4px 3px;
            font-size: 18px;
            color: #616161;

            &:hover{
              color: #f80000;
            }
          }
        }
      }

      .belowSocial{
        height: 120px;
        @include desktop() {
          height: 0;
        }

        .facebook-logo{
          float: left;
          margin-top: 11px;
          margin-left: 43px;
          @include Width-Height(25px, 25px);
          background: #ffffff;
          border-radius: 5px;

          &:hover{
            background: #446aa8;
          }

          i{
            padding: 3px 8px;
            font-size: 18px;
            color: #616161;

            &:hover{
              color: white;
            }
          }
        }
      }

      .twitter-logo{
        float: right;
        margin-right: 32px;
        margin-top: 11px;
        @include Width-Height(25px, 25px);
        background: #ffffff;
        border-radius: 5px;

        &:hover{
          background: #00a5ef;
        }

        i{
          padding: 3px 5px;
          font-size: 18px;
          color: #616161;

          &:hover{
            color: white;
          }
        }
      }
    }
  }
}

.copyright{
  @include Width-Height(1124px, 55px);
  margin: 0 auto;
  @include desktop() {
    width: 100%;
  }

  p{
    width: 610px;
    padding-top: 10px;
    margin-left: 270px;
    font-size: 18px;
    color: #616161;
    @include desktop() {
      @include Width-Height(100%, 80px);
      margin-left: 0;
      text-align: center;
    }
  }
}
</style>