<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
  created() {
    window.addEventListener('beforeunload', this.updateLocalStorage);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.updateLocalStorage);
  },
  methods: {
    updateLocalStorage() {
      localStorage.setItem('isAuthenticated', false);
      localStorage.setItem('currentUser', null);
      localStorage.setItem('isAdmin', false);
    }
  }
};
</script>
<template>
  <router-view />
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>