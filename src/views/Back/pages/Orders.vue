<template>
  <div>
    <loading :active="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th class="d-lg-table-cell d-none">購買款項</th>
          <th>應付金額</th>
          <th class="d-lg-table-cell d-none">是否付款</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at }}</td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td class="d-lg-table-cell d-none">
            <ul class="list-unstyled">
              <li v-for="(order, i) in item.products" :key="i">
                {{ order.product.title }}:{{ order.qty }}
                {{ order.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ $filters.currency(item.total) }}</td>
          <td class="d-lg-table-cell d-none">
            <strong class="text-success" v-if="item.is_paid">已付款</strong>
            <span class="text-muted" v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 產品列表分頁 -->
    <div class="product-pagination">
      <pagination class="pagination-inner" :paginations="pagination" @emitGetProducts="getOrders"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    pagination
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;  // 取得商品列表
      vm.isLoading = true; 
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    }
  },
  created() {
    this.getOrders();
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