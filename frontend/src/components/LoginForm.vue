<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["login:user"],
    props: {
        user: { type: Object, required: true },
        message: { type: String },
        loading: { type: Boolean },
    },
    data() {
        const schema = yup.object().shape({
            username: yup.string().required("Username is required."),
            password: yup.string().required("Password is required."),
        });

        return {
            schema,
        };
    },
    methods: {
        loginUser() {
            this.$emit("login:user", this.user);
        },
    }
}
</script>

<template>
    <div class="login container container-fluid p-0 mt-5">
        <div class="login-container rounded shadow">
            <h3 class="text-center">Login</h3>
            <Form @submit="loginUser" :validation-schema="schema">
                <div class="form-group">
                    <label for="username">Username</label>
                    <Field name="username" type="text" class="form-control" placeholder="Type your username" v-model="user.username"/>
                    <ErrorMessage name="username" class="error-feedback" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" type="password" class="form-control" placeholder="Type your password" v-model="user.password"/>
                    <ErrorMessage name="password" class="error-feedback" />
                </div>

                <div class="form-group d-flex justify-content-between mt-3">
                    <button class="btn btn-light btn-block text-primary shadow" :disabled="loading">
                        <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                        <router-link class="nav-link" :to="{ name: 'register' }">Create account</router-link>
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