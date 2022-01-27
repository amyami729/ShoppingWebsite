<template>
  <div>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link to="/admin/products" class="navbar-brand col-md-3 col-lg-2 mr-0 px-4">
        後台管理
      </router-link>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <input class="form-control form-control-dark w-100" type="text" placeholder="搜尋品項名稱/Email" aria-label="Search">
      <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-4" href="#" @click.prevent="signout">登出</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((response) => {
        if (response.data.success) {
          this.$router.push('/login');
        }
      });
    }
  }
}
</script>