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
.footerMessage{
  width: 1124px;
  margin: 0 auto;
  height: 285px;
  background: #616161;

  .simpleMessage{
    float: left;
    width: 320px;
    height: 285px;

    .logo{
      height: 110px;
      padding-top: 65px;
      padding-left: 32px;
    }

    p{
      padding-top: 25px;
      padding-left: 32px;
      font-size: 16px;
      color: #ffffff;
    }
  }

  .contactMessage{
    float: right;
    width: 804px;
    height: 285px;

    .contact{
      float: left;
      width: 650px;
      height: 285px;

      .title{
        height: 110px;
        padding-left: 570px;
        padding-top: 83px;

        span{
          font-size: 20px;
          color: #ffffff;
        }
      } 

      .envelope{
        height: 55px;

        p{
          float: left;
          width: 185px;
          font-size: 16px;
          margin-left: 415px;
          margin-top: 20px;
          color: #ffffff;
        }

        .envelope-logo{
          float: right;
          margin-right: 1px;
          margin-top: 20px;
          width: 25px;
          height: 25px;
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

        p{
          float: left;
          width: 102px;
          font-size: 16px;
          margin-left: 498px;
          margin-top: 5px;
          color: #ffffff;
        }

        .phone-logo{
          float: right;
          margin-right: 1px;
          margin-top: 5px;
          width: 25px;
          height: 25px;
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
        transform:rotate(-180deg); /* 定義旋轉的角度 */
        /* 兼容處理 */
        -ms-transform:rotate(-180deg); /* IE 9 */
        -moz-transform:rotate(-180deg); /* Firefox */
        -webkit-transform:rotate(-180deg); /* Safari and Chrome */
        -o-transform:rotate(-180deg); /* Opera */
      }
    }

    .follow{
      float: right;
      width: 154px;
      height: 285px;

      .title{
        height: 110px;
        padding-left: 43px;
        padding-top: 83px;

        span{
          font-size: 20px;
          color: #ffffff;
        }
      } 

      .aboveSocial{
        height: 55px;

        .instagram-logo{
          float: left;
          margin-top: 20px;
          margin-left: 43px;
          width: 25px;
          height: 25px;
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
          width: 25px;
          height: 25px;
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

        .facebook-logo{
          float: left;
          margin-top: 11px;
          margin-left: 43px;
          width: 25px;
          height: 25px;
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
        width: 25px;
        height: 25px;
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
  width: 1124px;
  margin: 0 auto;
  height: 55px;

  p{
    width: 610px;
    padding-top: 10px;
    margin-left: 270px;
    font-size: 18px;
    color: #616161;
  }
}
</style>