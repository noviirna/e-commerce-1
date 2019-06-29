<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import navbar from "@/components/Navbar.vue";
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
  }
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
