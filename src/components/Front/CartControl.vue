<template>
  <div>
    <div class="number-decrement" @click="decrementNumber">
      <span class="decrease">-</span>
    </div>
    <input class="input-number" type="text" v-model="inputValue" @change="$emit('qtyValue', inputValue)" oninput="value=value.replace(/[^\d]/g,'')"/>
    <div class="number-increment" @click="UpdateAddToCartValue">
      <span class="add">+</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateInputeQty: Number
  },
  data() {
    return {
      inputValue: 1
    }
  },
  methods: {
    decrementNumber() {
      if (this.inputValue <= 1) {
        this.inputValue = 1;
      }else {
        this.inputValue--;
      }
      this.$emit('qtyValue', this.inputValue);
    },
    incrementNumber() {
      this.inputValue++;
      this.$emit('qtyValue', this.inputValue);
    },
    updateQty() {
      this.inputValue += this.updateInputeQty -1 || 0
    },
    UpdateAddToCartValue() {
      this.incrementNumber();
      this.$emit('emitUpdateItemQty', this.inputValue);
    }
  },
  created() {
    this.updateQty();
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