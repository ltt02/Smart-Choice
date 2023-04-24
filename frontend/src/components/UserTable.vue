<script>
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia";
export default {
    props: {
        users: {
            type: Array,
            default: [],
        },
        activeIndex: {
            type: Number,
            default: -1,
        },
        activeUser: {
            type: Object,
        }
    },
    emits: ["update:activeIndex"],
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        updateActiveUser(index) {
            this.$emit("update:activeIndex", index);
            this.userStore.setActiveIndex(index);
            localStorage.setItem('activeIndex', index);
        },
        goToAddUser() {
            this.$router.push({ name: "product.add" });
        },
    }
}
</script>


<template>
    <router-link :to="{ name: 'product.add' }">
        <button class="btn btn-sm btn-success mb-3" @click="goToAddUser">
            <i class="fas fa-plus"></i> Add
        </button>
    </router-link>
    <table class="table table-bordered">
        <thead>
            <tr class="text-center align-middle">
                <th scope="col"></th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Shipping address</th>
                <th scope="col">isAdmin</th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-center align-middle" :class="{ 'table-secondary': index === activeIndex }"
                v-for="(user, index) in users" :key="user._id" @click="updateActiveIndex(index - 1)">
                <th scope="row">{{ ++index }}</th>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.shippingAddress }}</td>
                <td v-if="user.isAdmin">{{ user.isAdmin }}</td>
                <td v-else>false</td>
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