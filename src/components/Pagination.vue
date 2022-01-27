<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !paginations.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getProductPages(paginations.current_page -1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in paginations.total_pages" :key="page" :class="{'active': paginations.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getProductPages(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled': !paginations.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProductPages(paginations.current_page +1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props:{
    paginations: Object
  },
  methods: {
    getProductPages(page) {
      this.$emit('emitGetProducts', page);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
}
</script>
