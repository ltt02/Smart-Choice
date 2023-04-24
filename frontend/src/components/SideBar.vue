<template>
    <div class="sidebar shadow">
        <div class="sidebar-title d-flex justify-content-between">
            <h5 class="">Product Category</h5>
        </div>
        <ul class="list-group">
            <form class="list-group-item">
                <div class="filtered-title d-flex justify-content-between align-items-baseline">
                    <h5 class="">Brand</h5>
                    <a class="filtered-clear text-decoration-none" @click="clearFilter" type="reset">Clear</a>
                </div>

                <div class="list-group-flush">
                    <label class="list-group-item" :class="{ 'active-brand-name': selectedBrand === 'iPhone' }">
                        <input class="form-check-input me-1" type="radio" name="brand" value="iPhone"
                            @change="selectBrand('Apple')">
                        Apple
                    </label>
                    <label class="list-group-item" :class="{ 'active-brand-name': selectedBrand === 'Samsung' }">
                        <input class="form-check-input me-1" type="radio" name="brand" value="Samsung"
                            @change="selectBrand('Samsung')">
                        Samsung
                    </label>
                    <label class="list-group-item" :class="{ 'active-brand-name': selectedBrand === 'Xiaomi' }">
                        <input class="form-check-input me-1" type="radio" name="brand" value="Xiaomi"
                            @change="selectBrand('Xiaomi')">
                        Xiaomi
                    </label>
                </div>
            </form>
        </ul>
    </div>
</template>

<script>
import { useProductStore } from "../stores/ProductStore";
import { mapStores } from "pinia";
export default {
    data() {
        return {
            selectedBrand: null
        };
    },
    computed: {
        ...mapStores(useProductStore),
    },
    methods: {
        selectBrand(brand) {
            this.selectedBrand = brand;
            this.productStore.setSelectedBrand(brand);
            this.$emit('filterByBrand', brand);
        },
        clearFilter() {
            this.selectedBrand = null;
            this.$emit('clearFilter');
        }
    }
};
</script>

<style scoped>
.sidebar {
    background-color: #f8f9fa;
    padding: 20px;
}

.filtered-title {
    font-size: 18px;
    margin-bottom: 15px;
}

.filtered-clear {
    font-size: 15px;
    color: #ff6900;
    cursor: pointer;
}
</style>