<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required."),
      password: yup.string().required("Password is required."),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  // computed: {
  //   ...mapGetters(["userLoggedIn"]),
  // },
  // created() {
  //   if (this.userLoggedIn) {
  //     this.$router.push("/profile");
  //   }
  // },
  // methods: {
  //   async handleLogin(user) {
  //     this.loading = true;
  //     const [error] = await this.handle(this.$store.dispatch("login", user));
  //     if (error) {
  //       console.log(error);
  //       this.loading = false;
  //       this.message = "Đăng nhập thất bại";
  //     } else {
  //       this.$router.push("/profile");
  //     }
  //   },
  // },
};
</script>

<template>
  <div class="login container">
    <div class="login-container rounded shadow">
      <h3 class="text-center">Login</h3>
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" placeholder="Type your username"/>
          <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" placeholder="Type your password"/>
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group d-flex justify-content-between mt-3">
          <button class="btn btn-light btn-block text-primary shadow" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <router-link class="nav-link" :to="{ name: 'register' }">Create account</router-link>
          </button>

          <button class="btn btn-primary btn-block shadow" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Next</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
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
  .products {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>