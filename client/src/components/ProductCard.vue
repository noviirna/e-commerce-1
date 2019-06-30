<template>
  <div class="card" v-if="product.stock > 0">
    <img :src="product.picture" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{product.name}}</h5>
      <p class="card-text">{{product.description}}.</p>
    </div>

    <div class="card-body">
      <p>IDR {{rupiah}}</p>
      <p>{{product.stock}} left</p>
      <span v-for="tag in product.tags" :key="tag" class="badge badge-primary m-1">{{tag}}</span>
    </div>

    <div class="card-footer d-flex">
      <button class="btn btn-dark btn-sm mx-2" v-if="!$store.state.isAdmin">
        <i class="fa fa-shopping-cart fa-2x"></i>
      </button>
      <button class="btn btn-dark btn-sm mx-2" v-if="$store.state.isAdmin">
        <i class="fa fa-trash fa-2x"></i>
      </button>
      <button class="btn btn-dark btn-sm mx-2" v-if="$store.state.isAdmin">
        <i class="fa fa-pencil fa-2x"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "productcard",
  props: ["product"],
  created() {},
  computed: {
    rupiah() {
      let arr = this.product.price
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&.")
        .split(".");
      arr.pop();
      let rp = arr.join(".");
      return rp;
    }
  }
};
</script>

<style></style>
