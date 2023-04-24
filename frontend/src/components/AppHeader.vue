<script>
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia";
import { computed } from 'vue';
export default {
    props: {
        currentUser: { type: Object, required: true },
    },
    computed: {
        ...mapStores(useUserStore)
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand" href="#">SmartChoice</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'products' }" class="nav-link" aria-current="page"
                            href="#">Products</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'about' }" class="nav-link" href="#">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contact' }" class="nav-link" href="#">Contact</router-link>
                    </li>
                    <!-- <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li> -->
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit"><i class="fas fa-search"></i></button>
                </form>
                <ul class="navbar-nav ms-2">
                    <li class="nav-item">
                        <router-link :to="{ name: 'login' }" class="nav-link" href="#"><i
                                class="fas fa-user"></i></router-link>
                    </li>
                    <li class="nav-item ms-2">
                        <router-link :to="{ name: 'cart' }" class="nav-link" href="#">
                            <i class="fas fa-shopping-cart">
                                <badge v-if="userStore.currentUser" id="mini-number" class="position-absolute">1</badge>
                            </i>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navbar .btn-outline-success {
    color: #1abc9c;
    border-color: #1abc9c;
    background-color: transparent;
}

.navbar .btn-outline-success:hover {
    color: #fff;
    background-color: #1abc9c;
    border-color: #1abc9c;
}

.navbar .btn-outline-success:focus {
    color: #fff;
    background-color: #1abc9c;
    border-color: #1abc9c;
    box-shadow: none;
}
</style>