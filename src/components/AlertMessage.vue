<template>
  <div class="message-alert">
    <div class="alert alert-dismissible" :class="'alert-' + item.status" v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="btn-close" @click="removeMessage(i)" aria-label="Close">
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    removeMessage(num) {
      this.$store.commit('alertModules/messageSplice', num);
    }
  },
  computed: {
    ...mapGetters('alertModules', ['messages']),
  }
};
</script>

<style scope lang="scss">
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 20px;
  left: 630px;
  z-index: 1100;

  .alert-dismissible{
    font-size: 18px;
  }
}
</style>
