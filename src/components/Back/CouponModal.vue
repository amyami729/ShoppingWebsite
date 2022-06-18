<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" data-bs-backdrop="static" aria-labelledby="couponModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header">
          <h5 class="modal-title" id="couponModalLabel">
            <slot name="title"></slot>
          </h5>
          <button type="button" class="btn-close" @click="hideModel" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" v-model="currentCoupon.title" placeholder="請輸入標題">
              </div>
              <div class="mb-3">
                <label for="percent" class="form-label">優惠碼</label>
                <input type="text" class="form-control" id="percent" v-model="currentCoupon.code" placeholder="請輸入優惠碼">
              </div>
              <div class="mb-3">
                <label for="due_date">到期日</label>
                <input type="date" class="form-control" id="due_date" v-model="currentCoupon.due_date" placeholder="請輸入到期日">
              </div>
              <div class="mb-3">
                <label for="percent">打折百分比</label>
                <input type="number" class="form-control" id="percent" v-model="currentCoupon.percent" placeholder="請輸入打折百分比">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="is_enabled" v-model="currentCoupon.is_enabled" :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModel">取消</button>
          <button type="button" class="btn btn-success" @click="updateCoupon">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentItem: Object
  }, 
  data() {
    return {
      currentCoupon: {}  // 1.將當前產品之內容綁定在此
    }
  },
  methods: {
    hideModel() {
      this.$emit('emit-hide');
    },
    getCoupons() {
      this.$emit('emit-getCoupons');
    },
    // 2.將 currentCoupon 寫入資料庫
    updateCoupon() {
      let api;
      let httpMethod;
      if (this.isNew) { 
        api  = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;  // 新增優惠券
        httpMethod = 'post';
      } else{  
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${this.currentItem.id}`;  // 編輯優惠券
        httpMethod = 'put';
      }

      this.$http[httpMethod](api, {data: this.currentCoupon}).then((response) => {
        if (response.data.success) {
          this.hideModel();
          this.getCoupons();
        }
      });
    }
  },
  watch: {
    currentItem () {
      this.currentCoupon = this.currentItem;
    }
  }
}
</script>