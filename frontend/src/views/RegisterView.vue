<script>
import RegisterForm from "@/components/RegisterForm.vue";
import AuthService from "@/services/auth.service";

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      message: "",
      user: {
        username: "",
        email: "",
        password: "",
        shippingAddress: "",
      },
      loading: false,
    };
  },
  methods: {
    async handleRegister(user) {
      try {
        await AuthService.register(user);
        this.message = "Congratulations, you have your account on the website";
        alert(this.message);
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.log(error);
        this.message = error.response.data.message || "Failed to register. Please try again.";
      }
    }
  },
  created() {
    this.message = "";
  },
}
</script>

<template>
  <RegisterForm :user="user" :message="message" :loading="loading" @register:user="handleRegister"/>
</template>

<style>
@import "@/assets/form.css";

.register {
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-container {
  width: 510px;
  padding: 50px;
  border: 1px solid #dadce0;
}

@media (min-width: 1024px) {
}
</style>