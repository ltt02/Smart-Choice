import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "jquery/dist/jquery.slim"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import './assets/css/style.css'
// import './assets/main.css'

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount('#app');