<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ProductService from "@/services/product.service";
export default {
    components: {
        AppHeader,
        AppFooter
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            product: null,
            message: "",
        };
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
}
</script>

<template>
    <AppHeader />

    <div class="product container">
        <div class="row">
            <div class="col-sm-6 pt-3">
                <h3>{{ product.name }}</h3>
                <img :src="product.image" style="width: 500px" alt="">
            </div>
            <div class="col-sm-6 pt-3 pb-3 shadow rounded h-50">
                <h3>Product detail:</h3>
                <hr>
                <p>
                    <span class="fw-bold">Price: </span>
                    <span class="text-dark">
                        <del>${{ product.price }}</del>
                    </span>
                </p>
                <p>
                    <span class="fw-bold">Sale price: </span>
                    <span class="text-dark fw-bold">
                        ${{ product.price * (100 - product.salePercent) / 100
                        }}
                    </span>
                </p>
                <p>
                    <span class="fw-bold">You save: </span>
                    <span class="text-danger">${{ product.price * product.salePercent / 100 }} ({{ product.salePercent
                    }}%)</span>
                </p>
                <p>
                    <span class="fw-bold">Brand: </span>
                    <span class="text-dark">
                        {{ product.brand }}
                    </span>
                </p>
                <p>
                    <span class="fw-bold">Description: </span>
                    <span class="text-dark">
                        {{ product.description }}
                    </span>
                </p>
                <div class="d-flex justify-content-center align-items-center p-0 cart">
                    <a type="button" href="" class="btn btn-light float-end col-6 shadow">
                        <i class="fas fa-shopping-basket text-danger"></i>
                    </a>
                </div>
            </div>

        </div>
    </div>

    <AppFooter />
</template>

<style>
@import '../assets/form.css';

@media (min-width: 1024px) {
    .product {
        margin-top: 76px;
        min-height: 75vh;
    }
}
</style>