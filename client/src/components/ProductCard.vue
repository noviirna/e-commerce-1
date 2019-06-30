<template>
  <div class="card" v-if="product.stock > 0 || $store.state.isAdmin">
    <img :src="product.picture" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description }}.</p>
    </div>

    <div class="card-body">
      <p>IDR {{ rupiah }}</p>
      <p>{{ product.stock }} left</p>
      <span
        v-for="tag in product.tags"
        :key="tag"
        class="badge badge-primary m-1"
        >{{ tag }}</span
      >
    </div>

    <div class="card-footer d-flex">
      <input type="number" :max="product.stock" min="0" v-model="item" />
      <button
        class="btn btn-dark btn-sm mx-2"
        v-if="!$store.state.isAdmin && $store.state.products.data.length > 0"
        @click="addToCart(product)"
      >
        <i class="fa fa-shopping-cart fa-2x"></i>
      </button>
      <button
        class="btn btn-dark btn-sm mx-2"
        v-if="$store.state.isAdmin"
        @click="$emit('delete', product)"
      >
        <i class="fa fa-trash fa-2x"></i>
      </button>
      <a
        class="btn btn-dark btn-sm mx-2"
        v-if="$store.state.isAdmin"
        @click="$emit('edit', { ...product, showDashboard: true })"
        href="#form"
      >
        <i class="fa fa-pencil fa-2x"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { ax, swal } from "@/axios.js";
export default {
  name: "productcard",
  props: ["product"],
  data() {
    return {
      item: 0
    };
  },
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
  },
  methods: {
    addToCart() {
      let index = this.$store.state.shoppingcart.indexOf(this.product);
      if (index !== -1) {
        if (
          this.product.item > this.product.stock ||
          this.product.stock <
            this.product.item + this.$store.state.shoppingcart[index].item
        ) {
          swal.fire("You cant add item more than stock!");
        } else {
          this.product.item = Number(this.item);
          this.product.amount = this.item * this.product.price;
          this.$store.commit("ADD_TO_CART", this.product);
        }
      } else {
        this.product.item = Number(this.item);
        this.product.amount = this.item * this.product.price;
        this.$store.commit("ADD_TO_CART", this.product);
      }
      this.item = 0;
    }
  }
};
</script>

<style></style>
