<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <side-bar></side-bar>
        <router-view/>
      </div>
      <div class="row">
        <footer-bar></footer-bar>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Sidebar";
import FooterBar from "@/components/FooterBar";
export default {
  components: {
    SideBar,
    FooterBar
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
