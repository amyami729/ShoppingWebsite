<template>
  <div>
    <loading :active="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-success" @click="createCoupon">新增優惠券</button>
    </div>

    <div class="table-responsive-xl mt-4">
      <table class="table nowrap">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th class="d-sm-table-cell d-none">是否啟用</th>
            <th>編輯/刪除</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ item.due_date }}</td>
            <td class="d-sm-table-cell d-none">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span class="text-muted" v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-outline-success me-2 btn-sm" @click="editCoupon(item)">編輯</button>
              <button class="btn btn-outline-danger me-2 btn-sm" @click="showDeleteCouponModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 建立/編輯Modal -->
    <couponModal ref="couponModal" :currentItem="currentCoupon" @emit-hide="showCouponModal(false)" @emit-getCoupons="getCoupons">
      <template v-slot:title>{{ modalTitle }}</template>
    </couponModal>
    <!-- 刪除Modal -->
    <deleteModal ref="deleteModal" :currentItem="currentCoupon" @emit-hide="showDeleteModal(false)" @deleteItem="deleteCoupon">
      <template v-slot:title>{{ modalTitle }}</template>
    </deleteModal>
    <!-- 產品列表分頁 -->
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="getCoupons"></pagination>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import couponModal from '@/components/Back/CouponModal.vue';
import deleteModal from '@/components/Back/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      coupons: [],  // 用來儲存JSON資料
      pagination: {},  // 撈頁碼數
      currentCoupon: {},  // 用來存放新建立好的商品資料＆編輯過後的資料
      isNew: false,     // 用來判斷此時的行為是true(建立優惠券)還是false(編輯優惠券)
      modalTitle: '',
      couponModal: '',
      deleteModal: '',
      isLoading: false   // 預設為停止loading狀態
    }
  },
  components: {
    couponModal,
    deleteModal,
    pagination
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;  // 取得優惠券列表
      // 取得JSON數據時即執行loading狀態
      this.isLoading = true;

      this.$http.get(api).then((response) => {
        // 取得JSON數據之後即停止loading狀態
        this.isLoading = false; 

        this.coupons = response.data.coupons;
        this.pagination = response.data.pagination;
      });
    },
    showCouponModal(isShow) {
      if (isShow) {
        this.couponModal.show();
      }else {
        this.couponModal.hide();
      }
    },
    showDeleteModal(isShow) {
      if (isShow) {
        this.deleteModal.show();
      }else {
        this.deleteModal.hide();
      }
    },
    createCoupon() {
      this.currentCoupon = {};
      this.showCouponModal(true);
      this.modalTitle = '新增優惠卷';
      this.isNew = true;     // 為建立新的優惠券
    },
    editCoupon(item) {
      this.currentCoupon = Object.assign({}, item);
      this.showCouponModal(true);
      this.modalTitle = '編輯優惠卷';
      this.isNew = false;    // 為編輯優惠券
    },
    showDeleteCouponModal(item) {
      this.showDeleteModal(true);
      this.currentCoupon = item;
      this.modalTitle = '刪除優惠卷';
    },
    deleteCoupon(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`;  // 刪除優惠券
      this.$http.delete(api).then((response) => {
        if (response.data.success) {     // 若優惠券刪除成功,
          this.showDeleteModal(false);   // 關閉modal
          this.getCoupons();            // 重新取得產品資料
        }
      });
    }
  },
  created() {
    this.getCoupons();
  },
  mounted() {
    this.couponModal = new Modal(this.$refs.couponModal.$el);
    this.deleteModal = new Modal(this.$refs.deleteModal.$el);
  }
}
</script>

<style scoped lang="scss">
.product-pagination{
  display: flex;
  justify-content: center;
  margin-top: -16px;

  .pagination-inner{
    width: 50%;
    height: 93px;
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
}
</style>