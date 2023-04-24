<template>
    <div class="page">
        <ProductForm :product="product" @submit:product="addProduct" />
    </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductForm,
    },
    data() {
        return {
            product: {
                name: "",
                description: "",
                category: "",
                brand: "",
                price: "",
                quantity: "",
                image: "",
                salePercent: "",
            },
            message: "",
        };
    },
    methods: {
        async addProduct(data) {
            try {
                await ProductService.create(data);
                this.message = "Product is added to products list!";
                alert(this.message);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.message = "";
    },
};
</script>