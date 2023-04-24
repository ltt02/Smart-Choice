<script>
import { useProductStore } from "../stores/ProductStore";
import { mapStores } from "pinia";
export default {
    props: {
        products: {
            type: Array,
            default: [],
        },
        activeIndex: {
            type: Number,
            default: -1,
        },
        activeProduct: {
            type: Object,
        }
    },
    emits: ["update:activeIndex"],
    computed: {
        ...mapStores(useProductStore)
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
            this.productStore.setActiveIndex(index);
            localStorage.setItem('activeIndex', index);
        },
        goToAddProduct() {
            this.$router.push({ name: "product.add" });
        },
    }
}
</script>


<template>
    <router-link :to="{ name: 'product.add' }">
        <button class="btn btn-sm btn-success mb-3" @click="goToAddProduct">
            <i class="fas fa-plus"></i> Add
        </button>
    </router-link>
    <table class="table table-bordered">
        <thead>
            <tr class="text-center align-middle">
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Brand</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Image</th>
                <th scope="col">Sale percent</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-center align-middle" :class="{ 'table-secondary': index === activeIndex }"
                v-for="(product, index) in products" :key="product._id" @click="updateActiveIndex(index - 1)">
                <th scope="row">{{ ++index }}</th>
                <td>{{ product.name }}</td>
                <td class="text-start">
                    <div class="product-description">
                        {{ product.description }}
                    </div>
                </td>
                <td>{{ product.category }}</td>
                <td>{{ product.brand }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td class="text-start">{{ product.image }}</td>
                <td>{{ product.salePercent }}</td>
                <td>
                    <router-link v-if="activeProduct" :to="{
                            name: 'product.edit',
                            params: { id: activeProduct._id ? activeProduct._id : 1 },
                        }">
                        <i class="fas fa-edit"></i>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
.product-description {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    height: 3.2rem;
}
</style>