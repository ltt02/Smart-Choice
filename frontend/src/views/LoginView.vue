<script>
import LoginForm from "@/components/LoginForm.vue";
import AuthService from "@/services/auth.service";
import { useUserStore } from "../stores/UserStore";
import { mapStores } from "pinia";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      message: "",
      user: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    async handleLogin(user) {
      try {
        const result = await AuthService.login(user);
        console.log(result);
        this.message = "Login successfully";
        alert(this.message);
        localStorage.setItem('currentUser', user.username);
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('isAdmin', result.user.isAdmin);
        // if (localStorage.getItem('isAdmin') === 'true') {
        //   this.$router.push({ name: 'admin' });
        // }
        // else 
          this.$router.push({ name: 'home' });
        this.userStore.setCurrentUser(user);
        console.log(this.userStore.currentUser);
      } catch (error) {
        console.log(error);
        this.message = error.response.data.message || "Failed to login. Please try again.";
      }
    }
  },
  created() {
    this.message = "";
  },
};
</script>

<template>
  <LoginForm :user="user" :message="message" :loading="loading" @login:user="handleLogin"/>
</template>

<style>
@import "@/assets/form.css";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 510px;
  padding: 50px;
  border: 1px solid #dadce0;
}

@media (min-width: 1024px) {
}
</style>