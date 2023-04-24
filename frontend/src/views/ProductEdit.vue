<template>
    <div v-if="product" class="page">
        <ProductForm :product="product" @submit:product="updateProduct" @delete:product="deleteProduct" />
    </div>
</template>

<script>
import ProductForm from "@/components/ProductForm.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductForm,
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
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.message = "Product is updated successfully";
                alert(this.message);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct() {
            if (confirm("Do you want to delete this product?")) {
                try {
                    await ProductService.delete(this.product._id);
                    this.message = "Product is deleted successfully";
                    alert(this.message);
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getProduct(this.id);
        this.message = "";
    },
}
</script>