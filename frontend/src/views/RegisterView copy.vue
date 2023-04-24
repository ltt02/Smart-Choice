<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

import AuthService from "@/services/auth.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  // props: {
  //   user: { type: Object, required: true },
  // },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required.")
        .min(8, "Username must be at least 8 characters"),
      email: yup
        .string()
        .required("Email is required.")
        .email("Email is wrong")
        .max(50, "Email must be maximum 50 characters"),
      password: yup
        .string()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters"),
      // .matches(
      //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).*$/,
      //   "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      // ),
      confirmedPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Confirmed password is required."),
      shippingAddress: yup
        .string()
        .required("Shipping address is required.")
        .max(100, "Shipping address must be maximum 100 characters"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      // user: {
      //   username: "",
      //   email: "",
      //   password: "",
      //   shippingAddress: "",
      // }
    };
  },
  methods: {
    handleRegister() {
      this.loading = true;
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password,
        shippingAddress: this.shippingAddress,
      };
      // Make a POST request to your server-side endpoint for registering
      axios.post("/auth/register", userData)
        .then(response => {
          this.loading = false;
          this.message = "Congratulations, you have your account on the website";
          // Redirect to login form page after successful registration
          this.$router.push({ name: 'login' });
        })
        .catch(error => {
          this.loading = false;
          this.message = error.response.data.message || "Failed to register. Please try again.";
        });
    }
    // async handleRegister() {
    //   this.message = "";
    //   this.successful = false;
    //   this.loading = true;
    //   try {
    //     await AuthService.register(this.user);
    //     this.message = "Congratulations, you have your account on the website";
    //     this.successful = true;
    //     this.loading = false;
    //     alert(this.message);
    //     this.$router.push({ name: 'login' });
    //   } catch (error) {
    //     console.log(error);
    //     this.message = error.response.data.message || "Failed to register. Please try again.";
    //     this.successful = false;
    //     this.loading = false;
    //   }
    // },
  },
}
</script>

<template>
  <div class="register container">
    <div class="register-container rounded shadow">
      <h3 class="text-center">Register</h3>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" placeholder="Type your username" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" type="text" class="form-control" placeholder="Type your email" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" placeholder="Type your password" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="confirmedPassword">Confirmed password</label>
          <Field name="confirmedPassword" type="password" class="form-control" placeholder="Confirm your password" />
          <ErrorMessage name="confirmedPassword" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="shippingAddress">Shipping address</label>
          <Field name="shippingAddress" type="text" class="form-control" placeholder="Type your shipping address" />
          <ErrorMessage name="shippingAddress" class="error-feedback" />
        </div>

        <div class="form-group d-flex justify-content-between mt-3">
          <button class="btn btn-light btn-block text-primary shadow" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </button>

          <button class="btn btn-primary btn-block shadow" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Next</span>
          </button>
        </div>
        <button class="btn btn-light btn-block text-primary mt-3 shadow">
          <router-link class="nav-link" :to="{ name: 'home' }">
            <i class="fas fa-home"></i>
            Back to home page
          </router-link>
        </button>
        <div class="form-group mt-3">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
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
  .products {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>