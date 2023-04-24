<script>
import SideBarMenu from "@/components/SideBarMenu.vue";
import InputSearch from "@/components/InputSearch.vue";
import UserTable from "@/components/UserTable.vue";
import UserService from "@/services/user.service";

import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia";

export default {
    components: {
        SideBarMenu,
        InputSearch,
        UserTable,
    },
    props: {
        activeUser: {
            type: Object,
        },
    },
    data() {
        return {
            users: [],
            activeIndex: -1,
        }
    },
    computed: {
        ...mapStores(useUserStore),
        allUsers() {
            this.users = this.userStore.allUsers;
            return this.users;
        },
        allUsersCount() {
            this.users = this.userStore.allUsers;
            return this.allUsers.length;
        },
        getActiveUser() {
            if (!this.activeUser) return null;
            return this.activeUser;
        }
    },
    methods: {
        async retrieveUsers() {
            try {
                this.users = await UserService.getAll();
                this.userStore.setAllUser(this.users);
                console.log(this.users);
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retrieveUsers();
    },
}
</script>

<template>
    <div class="row">
        <div class="col-sm-3 sidebar-menu-container">
            <SideBarMenu />
        </div>
        <div class="col-sm-9 p-4 products-table-container">
            <InputSearch />
            <hr>
            <UserTable v-if="allUsersCount > 0" :users="allUsers" v-model:activeIndex="activeIndex"
                :activeUser="activeUser" />
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {}

.sidebar-menu-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 280px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    background-color: #f8f9fa;
}

.products-table-container {
    margin-left: 280px;
    overflow-y: auto;
}
</style>