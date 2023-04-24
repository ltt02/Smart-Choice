<script>
import AppHeader from "@/components/AppHeader.vue";
import SideBar from "@/components/SideBar.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductService from "@/services/product.service";

import { useProductStore } from "../stores/ProductStore";
import { mapStores } from "pinia";

export default {
  components: {
    AppHeader,
    SideBar,
    ProductCard,
    AppFooter
  },
  data() {
    return {
      products: [],
      productPerRow: 'col-sm-3',
      specificView: 'products-view'
    };
  },
  computed: {
    ...mapStores(useProductStore),
    mostSaleProducts() {
      return [...this.products].sort((a, b) => b.salePercent - a.salePercent);
    },
    filteredProducts() {
      if (!this.productStore.selectedBrand) return this.products;
      return this.products.filter((product) => 
        product.brand === this.productStore.selectedBrand
      );
    }
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<template>
  <AppHeader/>
  <div class="products-list container-fluid mt-80">
    <div class="col-3">
      <SideBar />
    </div>
    <div class="row col-9 ml-12">
      <ProductCard v-for="product in filteredProducts" :key="product._id" :product="product" :productPerRow="productPerRow" :specificView="specificView"/>
    </div>
  </div>
  <AppFooter />
</template>

<style>
.product-item_sale.products-view {
    left: -3px;
    bottom: 430px;
}

@media (min-width: 1024px) {
  .products-list {
    min-height: 100vh;
    display: flex;
    align-items: self-start;
  }
}
</style>