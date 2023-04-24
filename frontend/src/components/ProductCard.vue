<script>
export default {
    props: {
        product: {
            type: Object,
            required: true,
        },
        activeProduct: {
            type: Object,
            required: true,
        },
        productPerRow: {
            type: String,
        },
        specificView: {
            type: String,
        },
    },
}
</script>

<template>
    <div :id="product._id" class="col-6 mb-12" :class="productPerRow">
        <router-link :to="{
                name: 'product',
                params: { id: product._id },
            }" class="nav-link" aria-current="page" href="#">
            <div class="card p-3 shadow product-item position-relative">
                <a href="" class="img-detail"><img class="card-img-top img-product" :src="product.image" alt=""></a>
                <div class="card-body p-0 pt-2">
                    <div class="product-item-content">
                        <p class="fw-bold text-center product-item-name mb-2">{{ product.name }}</p>
                        <span class="product-quantity badge rounded bg-secondary mb-2">{{ product.quantity }} in
                            stock</span>
                        <div class="price row g-1 p-6">
                            <p class="product-item-price--old mb-2">
                                Price:
                                <span class="text-dark"><del>${{ product.price }}</del></span>
                            </p>
                            <p class="product-item-price mb-2">
                                Sale price:
                                <span class="text-dark fw-bold">${{ product.price * (100 - product.salePercent) / 100
                                }}</span>
                            </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div class="ratings">
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2 detail">
                            <router-link :to="{
                                    name: 'product',
                                    params: { id: product._id },
                                }" class="btn btn-dark float-end col-12 shadow" aria-current="page" href="#">
                                Detail
                            </router-link>
                        </div>
                        <div class="product-item_sale position-absolute top-0 bg-danger rounded-end px-2 py-1"
                            :class="specificView" v-if="product.salePercent > 0">
                            <span class="text-light font-weight-bold small">Sale {{ product.salePercent }}%</span>
                        </div>
                        <div class="d-flex justify-content-center align-items-center p-0 cart">
                            <a type="button" href="" class="btn btn-light float-end col-12 shadow">
                                <i class="fas fa-shopping-basket text-danger"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>

    </div>
    <!-- <div>
        <div class="p-1">
            <strong>Name:</strong>
            {{ product.name }}
        </div>
        <div class="p-1">
            <strong>Description:</strong>
            {{ product.description }}
        </div>
        <div class="p-1">
            <strong>category:</strong>
            {{ product.category }}
        </div>
        <div class="p-1">
                        <strong>Brand:</strong>
                        {{ product.brand }}
                    </div>
                    <div class="p-1">
                        <strong>Price:</strong>
                        {{ product.price }}$
                    </div>
                    <div class="p-1">
                        <img :src="product.image" alt="">
                    </div>
                </div> -->
</template>