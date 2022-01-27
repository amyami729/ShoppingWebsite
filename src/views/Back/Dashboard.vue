<template>
  <div>
    <header>
      <backNavbar></backNavbar>  
    </header>

    <alertMessage></alertMessage>

    <div class="container-fluid">
      <div class="row">
        <backSidebar></backSidebar>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import backNavbar from './BackNavbar.vue';
import backSidebar from './BackSidebar.vue';
import alertMessage from '@/components/AlertMessage.vue';

export default {
  components: {
    backNavbar,
    backSidebar,
    alertMessage
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = token;
  }
}
</script>