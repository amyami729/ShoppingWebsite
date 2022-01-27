<template>
  <div id="slide">
    <transition name="moveSlide">
      <div class="slide-warpper">
        <!-- 將保留一個空間讓外部傳入內容的出口 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
/* Vue過渡效果
    <transition name="slide"> </transition>

    進入效果:
    .XXX-enter         過渡開始的狀態
    .XXX-enter-to      過渡結束的狀態
    .XXX-enter-active  過渡持續的時間、延遲、曲線函數

    離開效果:
    .XXX-leave         過渡開始的狀態
    .XXX-leave-to      過渡結束的狀態
    .XXX-leave-active  過渡持續的時間、延遲、曲線函數

*/

.moveSlide-enter-active,
.moveSlide-leave-active {
  transition: opacity 0.7s ease-in-out;
}
.moveSlide-enter-from,
.moveSlide-leave-to {
  opacity: 0;
}
.moveSlide-enter-to,
.moveSlide-leave-from {
  opacity: 1;
}
</style>