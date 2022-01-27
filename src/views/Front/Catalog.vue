<template>
  <div id="catalog">
    <header>
      <navbar></navbar>
    </header>

    <alertMessage></alertMessage>
    
    <main>
      <router-view></router-view>
    </main> 
    
    <footer>
      <footerMessage></footerMessage>
    </footer>
  </div>
</template>

<script>
import navbar from './Navbar.vue';
import alertMessage from '@/components/AlertMessage.vue';
import footerMessage from '../../components/Front/FooterMessage.vue';
export default {
  components: {
    navbar,
    alertMessage,
    footerMessage
  }
}
</script>
