<template>
    <div class="col-sm-4 sidebar px-0">
        <div class="col-sm-8 blog-header">
            <!-- <h1 class="blog-title text-white">
                <a href="#">Ridozaen</a>
            </h1> -->
            <router-link :to="{name: 'home'}" tag="h3" class="blog-title text-dark">
                <a href="#">Hacktiv Press</a>
            </router-link>
            <h3 class="blog-description text-muted">Interactive Press</h3>
        </div>
        <div class="col-sm-12 blog-menu px-5">
            <ul class="nav flex-column ml-3">
                <router-link :to="{name: 'home'}" tag="li" class="nav-item">
                    <a href="#" class="nav-link">Home</a>
                </router-link>
                <!-- <li class="nav-item">
                </li> -->
                <router-link to="/admin" tag="li" class="nav-item" v-if="token">
                    <a href="#" class="nav-link">Admin</a>
                </router-link>
                <router-link to="/" tag="li" class="nav-item" v-if="token">
                    <a href="#" class="nav-link">
                    <span @click="logout">Logout</span></a>
                </router-link>
                <router-link :to="{name: 'login'}" tag="li" class="nav-item" v-else>
                    <a href="#" class="nav-link">Login</a>
                </router-link>
                <router-link :to="{name: 'register'}" tag="li" class="nav-item" v-if="!token">
                    <a href="#" class="nav-link">Register</a>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
import { eventBus } from "../main";
export default {
  data() {
    return {
      token: null
    };
  },
  methods: {
    logout() {
      console.log("logout");
      if (localStorage.getItem("curr-token")) {
        localStorage.clear();
        this.token = null
        this.$router.push({ name: "home" });
      }
    }
  },
  created() {
    console.log("created sidebar");

    if (localStorage.getItem("curr-token")) {
      this.token = localStorage.getItem("curr-token");
    }
    eventBus.$on("triggerLogin", token => {
      this.token = token;
    });
  }
};
</script>
<style scoped>
</style>


