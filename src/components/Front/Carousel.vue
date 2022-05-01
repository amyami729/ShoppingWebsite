<template>
  <div id="carousel">
    <!-- 將保留一個空間讓外部傳入內容的出口 -->
    <slot :currentSlide="currentSlide"></slot>

    <!-- Navigation -->
    <div class="navigate">
      <div class="toggle-page left">
        <i @click="prevSlide" class="fas fa-chevron-left"></i>
      </div>
      <div class="toggle-page right">
        <i @click="nextSlide" class="fas fa-chevron-right"></i>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <span @click="goToSlide(index)" v-for="(slide, index) in getSlideCount" :key="slide" :class="{ 'a_ctive': index + 1 === currentSlide }">
      </span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    //ref 方法用來建立一個響應式的資料物件，該物件包含一個 value 屬性，值為響應式資料本身
    const currentSlide = ref(1);   //用來顯示當前圖片是第幾張
    const getSlideCount = ref(null);    //用來控制圖片
    const autoPlayEnabled = ref(true);
    const timeoutDuration = ref(5000);

    // prev slide
    const prevSlide = () => {
      if (currentSlide.value === 1) {
        currentSlide.value = getSlideCount.value;
        return;
      }
      currentSlide.value -= 1;
    };

    // next slide
    const nextSlide = () => {
      if (currentSlide.value === getSlideCount.value) {
        currentSlide.value = 1;
        return;
      }
      currentSlide.value += 1;
    };

    // pagination toggle
    const goToSlide = (index) => {
      currentSlide.value = index + 1;
    }

    // autoplay
    const autoPlay = () => {
      setInterval(() => {
        nextSlide();
      }, timeoutDuration.value);
    }

    if (autoPlayEnabled.value) {
      autoPlay();
    }

    //定義鉤子函數: 掛載目標元素，獲取slide總長度
    onMounted(() => {
      getSlideCount.value = document.querySelectorAll('#slide').length;
    });

    return {
      currentSlide,
      nextSlide,
      prevSlide,
      getSlideCount,
      goToSlide
    }
  }
}
</script>

<style scoped lang="scss">
.navigate{

  .toggle-page{
    position: absolute;
    top: 175px;

    i{
      cursor: pointer;
      text-align: center;
      vertical-align: middle;
      padding-top: 14px;
      border-radius: 50%;
      width: 45px;
      height: 45px;
      font-size: 20px;
      background: white;
      color: #c8aa96;
      opacity: 0.6;

      &:hover{
        opacity: 0.9;
      }
    }
  }

  .left{
    left: 50px;
  }

  .right{
    right: 50px;
  }
}

.pagination{
  position: absolute;
  top: 365px;
  width: 100%;
  gap: 16px;
  justify-content: center;

  span {
    cursor: pointer;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: #e7e7e5;
  }

  .a_ctive {
    background-color: #c2987b;
  }
}
</style>