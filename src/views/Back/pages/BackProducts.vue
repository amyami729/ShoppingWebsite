<template>
  <div>
    <loading :active="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-success" @click="createProduct">新增產品</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th class="d-md-table-cell d-none">分類</th>
          <th>產品圖片</th>
          <th>產品名稱</th>
          <th class="d-lg-table-cell d-none">原價</th>
          <th class="d-lg-table-cell d-none">售價</th>
          <th class="d-lg-table-cell d-none">是否啟用</th>
          <th>編輯/刪除</th>
        </tr>
      </thead>

      <tbody>
        <tr class="align-middle" v-for="item in products" :key="item.id">
          <td class="d-md-table-cell d-none">{{ item.category }}</td>
          <td>
            <img :src="item.imageUrl" class="thumbnail">
          </td>
          <td>{{ item.title }}</td>
          <td class="d-lg-table-cell d-none">{{ $filters.currency(item.origin_price) }}</td>
          <td class="d-sm-table-cell d-none">{{ $filters.currency(item.price) }}</td>
          <td class="d-lg-table-cell d-none">{{ item.is_enabled ? '啟用' : '未啟用' }}</td>
          <td>
            <button class="btn btn-outline-success me-2 btn-sm" @click="editProduct(item)">編輯</button>
            <button class="btn btn-outline-danger me-2 btn-sm" @click="showDeleteProductModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 建立/編輯Modal -->
    <productModal ref="productModal" :currentItem="currentProduct" :isNew="isNew" @emit-hide="showProductModal(false)" @emit-getProducts="getProducts">
      <template v-slot:title>{{ modalTitle }}</template>
    </productModal>
    <!-- 刪除Modal -->
    <deleteModal ref="deleteModal" :currentItem="currentProduct" @emit-hide="showDeleteModal(false)" @deleteItem="deleteProduct">
      <template v-slot:title>{{ modalTitle }}</template>
    </deleteModal>
    <!-- 產品列表分頁 -->
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="getProducts"></pagination>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import productModal from '@/components/Back/ProductModal.vue';
import deleteModal from '@/components/Back/DeleteModal.vue';
import pagination from '@/components/Pagination.vue';

export default {
  components: {
    productModal,
    deleteModal,
    pagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      currentProduct: {},  // 用來存放新建立好的商品資料＆編輯過後的資料
      isNew: false,     // 用來判斷此時的行為是true(建立產品)還是false(編輯產品)
      modalTitle: '',
      productModal: '',
      deleteModal: '',
      isLoading: false
    }
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`;  // 取得商品列表
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products; 
        vm.pagination = response.data.pagination;
      });
    },
    showProductModal(isShow) {
      if (isShow) {
        this.productModal.show();
      }else {
        this.productModal.hide();
      }
    },
    showDeleteModal(isShow) {
      if (isShow) {
        this.deleteModal.show();
      }else {
        this.deleteModal.hide();
      }
    },
    createProduct() {
      this.currentProduct = {};
      this.showProductModal(true);
      this.modalTitle = '新增產品';
      this.isNew = true;     // 為建立新的產品
    },
    editProduct(item) {
      this.currentProduct = Object.assign({}, item);
      this.showProductModal(true);
      this.modalTitle = '編輯產品';
      this.isNew = false;    // 為編輯產品
    },
    showDeleteProductModal(item) {
      this.showDeleteModal(true);
      this.currentProduct = item;
      this.modalTitle = '刪除產品';
    },
    deleteProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${id}`;  // 刪除產品
      this.$http.delete(api).then((response) => {
        if (response.data.success) {
          this.showDeleteModal(false);
          this.getProducts();
        }
      });
    }
  },
  created() {     
    this.getProducts();
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal.$el);
    this.deleteModal = new Modal(this.$refs.deleteModal.$el);
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  height: 80px;
  width: 80px;
}

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