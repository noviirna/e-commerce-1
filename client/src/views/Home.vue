<template>
  <div>
    <div>
      <div class="jumbotron">
        <h1 class="display-3">Lux Jewelries</h1>
        <p class="lead">Get your custom jewelries here</p>
        <hr class="my-4" />
        <p>
          Log in if you already join with us or Register if you are new to us!
        </p>
        <p class="lead">
          <button class="btn btn-primary btn-lg" @click="to_productspage">
            Shop Now
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  methods: {
    to_productspage() {
      this.$router.push("/products");
    }
  }
};
</script>
