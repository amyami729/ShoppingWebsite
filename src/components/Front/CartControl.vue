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
    productId : String
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
      this.$emit('emitUpdateItemQty', [this.productId, this.currentQty]);
    }
  },
  created() {
    this.addQty();
  }
}
</script>

<style scoped lang="scss">
.number-decrement{
  float: left;
  width: 30px;
  height: 35px;
  border: 1px solid #e8e8e8;
  border-right: none;
  margin-top: 5px;
  cursor: pointer;

  .decrease{
    display: inline-block;
    font-size: 28px;
    margin-left: 8px;
    margin-top: -5px;
    font-weight: lighter;

    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;
    user-select: none;
  }
}

.input-number{
  float: left;
  width: 70px;
  height: 35px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #e8e8e8;
  margin-top: 5px;
  color: #616161;
  outline: none;

  &:focus{
    box-shadow: 3px 3px 15px 0px #c4c4c4;
  }
}

.number-increment{
  float: left;
  width: 30px;
  height: 35px;
  border: 1px solid #e8e8e8;
  border-left: none;
  margin-top: 5px;
  cursor: pointer;

  .add{
    display: inline-block;
    font-size: 22px;
    margin-left: 8px;
    font-weight: lighter;

    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;
    user-select: none;
  }
}
</style>