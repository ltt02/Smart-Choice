import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        allUsers: [],
        currentUser: null
    }),
    getters: {

    },
    actions: {
        setAllUser(users) {
            this.allUsers = users;
        },
        setCurrentUser(user) {
            this.currentUser = user;
        },
        clearCurrentUser() {
            this.currentUser = null; // Clear the currentUser data
        },
    }
})