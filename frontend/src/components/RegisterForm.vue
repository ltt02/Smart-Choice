<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["register:user"],
    props: {
        user: { type: Object, required: true },
        message: { type: String },
        loading: { type: Boolean },
    },
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
            userLocal: this.user,
            schema,
        };
    },
    methods: {
        registerUser() {
            this.$emit("register:user", this.userLocal);
        },
    }
}
</script>

<template>
    <div class="register container container-fluid p-0 mt-5">
        <div class="register-container rounded shadow">
            <h3 class="text-center">Register</h3>
            <Form @submit="registerUser" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">Username</label>
                    <Field name="username" type="text" class="form-control" placeholder="Type your username" v-model="userLocal.username"/>
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" type="text" class="form-control" placeholder="Type your email" v-model="userLocal.email"/>
                    <ErrorMessage name="email" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="form-control" placeholder="Type your password" v-model="userLocal.password"/>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="confirmedPassword">Confirmed password</label>
                    <Field name="confirmedPassword" type="password" class="form-control"
                        placeholder="Confirm your password" />
                    <ErrorMessage name="confirmedPassword" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="shippingAddress">Shipping address</label>
                    <Field name="shippingAddress" type="text" class="form-control"
                        placeholder="Type your shipping address" v-model="userLocal.shippingAddress"/>
                    <ErrorMessage name="shippingAddress" class="error-feedback" />
                </div>

                <div class="form-group d-flex justify-content-between mt-3">
                    <button class="btn btn-light btn-block text-primary shadow" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
                    </button>

                    <button type="submit" class="btn btn-primary btn-block shadow" :disabled="loading">
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