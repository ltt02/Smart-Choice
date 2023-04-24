<script>
import SideBarMenu from "@/components/SideBarMenu.vue";
import InputSearch from "@/components/InputSearch.vue";
import ProductTable from "@/components/ProductTable.vue";

import { useProductStore } from "../stores/ProductStore";
import { mapStores } from "pinia";

export default {
    components: {
        SideBarMenu,
        InputSearch,
        ProductTable,
    },
    props: {
        activeProduct: {
            type: Object,
        },
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
        }
    },
    computed: {
        ...mapStores(useProductStore),
        allProducts() {
            this.products = this.productStore.allProducts;
            return this.products;
        },
        allProductsCount() {
            this.products = this.productStore.allProducts;
            return this.allProducts.length;
        },
        getActiveProduct() {
            if (!this.activeProduct) return null;
            return this.activeProduct;
        }
    }
}
</script>

<template>
    <div class="row">
        <div class="col-sm-3 sidebar-menu-container">
            <SideBarMenu />
        </div>
        <div class="col-sm-9 p-4 products-table-container">
            <InputSearch />
            <hr>
            <ProductTable v-if="allProductsCount > 0" :products="allProducts" v-model:activeIndex="activeIndex"
                :activeProduct="activeProduct" />
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {}

.sidebar-menu-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 280px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    background-color: #f8f9fa;
}

.products-table-container {
    margin-left: 280px;
    overflow-y: auto;
}
</style>