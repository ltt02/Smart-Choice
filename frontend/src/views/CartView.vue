<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <AppHeader/>
  <div class="products container">
    <h1>This is a cart page</h1>
  </div>
  <AppFooter/>
</template>

<style>
@media (min-width: 1024px) {
  .products {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>