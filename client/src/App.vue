<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/Navbar.vue";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    navbar
  },
  created() {
    this.$store.dispatch("CHECKLOGIN");
    this.$store.dispatch("GETALLPRODUCTS");
    if (this.$store.state.isLogin && this.$store.state.isAdmin) {
      this.$store.dispatch("GETALLCARTS");
    }
    if (this.$store.state.isLogin && !this.$store.state.isAdmin) {
      this.$store.dispatch("GETUSERCARTS", JSON.parse(localStorage.user)._id);
      this.$store.dispatch("GETSHOPPINGCART");
    }
  },
  methods: {}
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  overflow-y: scroll;
  overflow-x: hidden;
}

#app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
</style>
