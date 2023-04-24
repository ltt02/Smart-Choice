<script>
import ProductCard from '@/components/ProductCard.vue';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
<template>
    <div class="row">
        <ProductCard v-for="product in products" :key="product._id" :product="product" class="col-6 col-sm-2-4 mb-12" />
    </div>
    <!-- <ul class="list-group">
        <li class="list-group-item" v-for="(product, index) in products" :key="product._id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ product.name }}
        </li>
    </ul> -->
</template>