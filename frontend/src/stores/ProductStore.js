import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
    state: () => ({
        allProducts: [],
        selectedBrand: null,
        activeIndex: -1,
    }),
    getters: {

    },
    actions: {
        setAllProduct(products) {
            this.allProducts = products;
        },
        setSelectedBrand(brand) {
            this.selectedBrand = brand;
        },
        clearSelectedBrand() {
            this.selectedBrand = null; // Clear the currentProduct data
        },
        setActiveIndex(index) {
            this.activeIndex = index;
        },
    }
})