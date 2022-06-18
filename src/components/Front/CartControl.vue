<template>
  <div>
    <div class="number-decrement" @click="decrementNumber">
      <span class="decrease">-</span>
    </div>
    <input class="input-number" type="text" v-model="currentQty" @change="inputNumber" oninput="value=value.replace(/[^\d]/g,'')"/>
    <div class="number-increment" @click="incrementNumber">
      <span class="add">+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputQty: Number,
    product : Object
  },
  data() {
    return {
      currentQty: 1
    }
  },
  methods: {
    inputNumber() {
      this.$emit('qtyValue', this.currentQty);
      this.UpdateAddToCartValue();
    },
    decrementNumber() {
      if (this.currentQty <= 1) {
        this.currentQty = 1;
      }else {
        this.currentQty--;
      }
      this.$emit('qtyValue', this.currentQty);
      this.UpdateAddToCartValue();
    },
    incrementNumber() {
      this.currentQty++;
      this.$emit('qtyValue', this.currentQty);
      this.UpdateAddToCartValue();
    },
    // 累加操作:1.已加入購物車後的input值再做數量+-時的數量處理 2.在ProductInfo頁面的選擇數量加入購物車的數量處理
    addQty() {
      this.currentQty += this.inputQty -1 || 0;
    },
    // 將商品id跟數量傳回ShoppingCart組件
    UpdateAddToCartValue() {
      this.$emit('emitUpdateItemQty', [this.product, Number(this.currentQty)]);
    }
  },
  created() {
    this.addQty();
  }
}
</script>

<style scoped lang="scss">
@mixin Width-Height($Wsize, $Hsize) {
  width: $Wsize;
  height: $Hsize;
};
@mixin selection($value) {
  -webkit-user-select: $value;
  -moz-user-select: $value;
  -ms-user-select: $value;
  user-select: $value;
};
@mixin desktop {
  @media screen and (max-width: 767px){
    @content
  }
};

.number-decrement{
  float: left;
  @include Width-Height(30px, 35px);
  border: 1px solid #e8e8e8;
  border-right: none;
  margin-top: 5px;
  cursor: pointer;
  @include desktop() {
    margin-top: 2px;
  }

  .decrease{
    display: inline-block;
    font-size: 28px;
    margin-left: 8px;
    margin-top: -5px;
    font-weight: lighter;
    @include selection(none);
  }
}

.input-number{
  float: left;
  @include Width-Height(70px, 35px);
  text-align: center;
  font-size: 18px;
  border: 1px solid #e8e8e8;
  margin-top: 5px;
  color: #616161;
  outline: none;
  @include desktop() {
    margin-top: 2px;
  }

  &:focus{
    box-shadow: 3px 3px 15px 0px #c4c4c4;
  }
}

.number-increment{
  float: left;
  @include Width-Height(30px, 35px);
  border: 1px solid #e8e8e8;
  border-left: none;
  margin-top: 5px;
  cursor: pointer;
  @include desktop() {
    margin-top: 2px;
  }

  .add{
    display: inline-block;
    font-size: 22px;
    margin-left: 8px;
    font-weight: lighter;
    @include selection(none);
  }
}
</style>