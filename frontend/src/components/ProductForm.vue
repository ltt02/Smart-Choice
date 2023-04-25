<template>
    <div class="product-form container container-fluid p-0 mt-5">
        <div class="product-form-container rounded shadow">
            <h3 class="text-center">Product</h3>
            <Form @submit="submitProduct" :validation-schema="productFormSchema">
                <div class="form-group">
                    <label for="name">Name</label>
                    <Field name="name" type="text" class="form-control" v-model="productLocal.name" />
                    <ErrorMessage name="name" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <Field name="description" type="text" class="form-control" v-model="productLocal.description" />
                    <ErrorMessage name="description" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="category">Category</label>
                    <Field name="category" type="text" class="form-control" v-model="productLocal.category" />
                    <ErrorMessage name="category" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="brand">Brand</label>
                    <Field name="brand" type="text" class="form-control" v-model="productLocal.brand" />
                    <ErrorMessage name="brand" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="price">Price</label>
                    <Field name="price" type="number" class="form-control" v-model="productLocal.price" />
                    <ErrorMessage name="price" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <Field name="quantity" type="number" class="form-control" v-model="productLocal.quantity" />
                    <ErrorMessage name="quantity" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="image">Image</label>
                    <Field name="image" type="text" class="form-control" v-model="productLocal.image" />
                    <ErrorMessage name="image" class="error-feedback" />
                </div>

                <div class="form-group">
                    <label for="salePercent">Sale percent</label>
                    <Field name="salePercent" type="number" class="form-control" v-model="productLocal.salePercent" />
                    <ErrorMessage name="salePercent" class="error-feedback" />
                </div>

                <div class="form-group mt-3">
                    <button class="btn btn-primary me-2 shadow" type="submit">Save</button>
                    <button v-if="productLocal._id" type="button" class="ml-2 btn btn-danger shadow"
                        @click="deleteProduct">Delete</button>
                </div>
                <button class="btn btn-light btn-block text-primary mt-3 shadow">
                    <router-link class="nav-link" :to="{ name: 'home' }">
                        <i class="fas fa-home"></i>
                        Back to home page
                    </router-link>
                </button>
            </Form>
        </div>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:product", "delete:product"],
    props: {
        product: { type: Object, required: true },
    },
    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Name is required"),
            description: yup
                .string()
                .required("Description is required"),
            category: yup
                .string()
                .required("Category is required"),
            brand: yup
                .string()
                .required("Brand is required"),
            price: yup
                .string()
                .required("Price is required")
                .matches(/^-?\d+(\.\d+)?$/),
            quantity: yup
                .string()
                .required("Quantity is required")
                .matches(/^-?\d+(\.\d+)?$/),
            image: yup
                .string()
                .required("Image URL is required"),
            salePercent: yup
                .string()
                .required("Sale percent is required")
                .matches(/^-?\d+(\.\d+)?$/),
        });
        return {
            productLocal: this.product,
            productFormSchema,
        };
    },
    methods: {
        submitProduct() {
            this.$emit("submit:product", this.productLocal);
        },
        deleteProduct() {
            this.$emit("delete:product", this.productLocal.id);
        }
    }
}
</script>

<style scoped>
@import "@/assets/form.css";

.product-form {
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-form-container {
    width: 510px;
    padding: 50px;
    border: 1px solid #dadce0;
}
</style>