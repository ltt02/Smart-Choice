<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Carousel from "@/components/Carousel.vue";
import ProductList from "@/components/ProductList.vue";
import ProductCard from "@/components/ProductCard.vue";
import AdminView from "@/views/AdminView.vue";
import ProductService from "@/services/product.service";

import { useProductStore } from "../stores/ProductStore";
import { mapStores } from "pinia";

export default {
  components: {
    AppHeader,
    Carousel,
    ProductList,
    ProductCard,
    AppFooter,
    AdminView
  },
  data() {
    return {
      products: [],
      activeIndex: -1,
      searchText: "",
      productPerRow: 'col-sm-2-4',
      specificView: 'home-view',
      isAdmin: localStorage.getItem('isAdmin'),
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    ...mapStores(useProductStore),
    productStrings() {
      return this.products.map((product) => {
        const { name, description, category, brand, price } = product;
        return [name, description, category, brand, price].join("").toLowerCase();
      });
    },
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    updatedActiveIndex() {
      return this.productStore.activeIndex;
    },
    activeProduct() {
      if (this.productStore.activeIndex < 0) return null;
      return this.filteredProducts[this.productStore.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
    mostSaleProducts() {
      return [...this.products].sort((a, b) => b.salePercent - a.salePercent)
        .slice(0, 10);
    }
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
        this.productStore.setAllProduct(this.products);
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveProducts();
    },
    async removeAllProducts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ProductService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddProduct() {
      this.$router.push({ name: "product.add" });
    },
  },
  mounted() {
    this.refreshList();
    this.activeIndex = this.productStore.activeIndex;
  },
};
</script>

<template>
  <AdminView v-if="isAdmin === 'true'" :activeProduct="activeProduct"/>
  <div v-else class="container-fluid p-0 mt-5">
    <AppHeader />
    <Carousel />
    <div class="home container-fluid">
      <div class="product-list-title text-center fw-bold">Most sale products</div>
      <div class="row">
        <ProductCard v-for="product in mostSaleProducts" :key="product._id" :product="product"
          :productPerRow="productPerRow" :specificView="specificView" :activeProduct="activeProduct"/>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style>
.page {
  text-align: left;
  max-width: 800px;
}

.product-item_sale.home-view {
  left: -3px;
  bottom: 450px;
}

.product-list-title {
  font-size: 24px;
  margin-bottom: 12px;
}

@media (min-width: 1024px) {
  .home {
    margin-top: 12px;
    min-height: 100vh;
    align-items: center;
  }
}
</style>