/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import { ax, swal } from "@/axios.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    products: [],
    allcarts: [],
    carts: [],
    user: {},
    shoppingcart: [],
    serverURL: "http://localhost:3000"
  },
  mutations: {
    ADD_TO_CART(state, data) {
      if (state.shoppingcart.length == 0) {
        state.shoppingcart.push(data);
      } else {
        let index = -1;
        for (let i = 0; i < state.shoppingcart.length; i++) {
          if (state.shoppingcart[i]._id == data._id) {
            index = i;
          }
        }
        if (index == -1) {
          console.log("ga ada di cart store");
          state.shoppingcart.push(data);
        } else {
          console.log("ada di cart store");
          state.shoppingcart[index].item += data.item;
          state.shoppingcart[index].amount += data.amount;
        }
      }
      localStorage.setItem(
        `cart${JSON.parse(localStorage.user)._id}`,
        `${JSON.stringify(state.shoppingcart)}`
      );
      swal.fire(
        "horray",
        `Added "${data.name}" to your shopping cart!`,
        "success"
      );
    },
    SET_ISLOGIN(state, data) {
      state.isLogin = data;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    SET_ISADMIN(state, data) {
      state.isAdmin = data;
    },
    SET_PRODUCTS(state, data) {
      state.products = data;
    },
    SET_USERCARTS(state, data) {
      state.carts = data;
    },
    SET_ALLCARTS(state, data) {
      state.allcarts = data;
    },
    PUSH_NEWPRODUCT(state, data) {
      let arr = [];
      for (let i = 0; i < state.products.data.length; i++) {
        arr.push(state.products.data[i]);
      }
      arr.push(data);
      state.products.data = arr;
    },
    POP_PRODUCT(state, data) {
      let arr = [];
      for (let i = 0; i < state.products.data.length; i++) {
        if (state.products.data[i]._id !== data._id) {
          arr.push(state.products.data[i]);
        }
      }
      state.products.data = arr;
    },
    SET_SHOPPINGCART(state, data) {
      state.shoppingcart = data;
      localStorage.setItem(
        `cart${JSON.parse(localStorage.user)._id}`,
        `${JSON.stringify(state.shoppingcart)}`
      );
    }
  },
  actions: {
    GETSHOPPINGCART({ commit }) {
      let data = [];
      if (localStorage.getItem(`cart${JSON.parse(localStorage.user)._id}`)) {
        data = JSON.parse(
          localStorage.getItem(`cart${JSON.parse(localStorage.user)._id}`)
        );
      }
      commit("SET_SHOPPINGCART", data);
    },
    GETALLPRODUCTS({ commit }) {
      ax({
        method: "get",
        url: "/products",
        headers: {
          token: localStorage.token
        }
      }).then(products => {
        commit("SET_PRODUCTS", products);
      });
    },
    CHECKLOGIN({ commit }) {
      if (localStorage.token) {
        commit("SET_ISLOGIN", true);
        commit("SET_USER", JSON.parse(localStorage.user));
        if (JSON.parse(localStorage.user).email == "admin@ecommerce.com") {
          commit("SET_ISADMIN", true);
        }
      } else {
        commit("SET_ISLOGIN", false);
        commit("SET_USER", {});
        commit("SET_ISADMIN", false);
      }
    },
    GETALLCARTS({ commit }) {
      ax({
        method: "GET",
        url: "/carts",
        headers: {
          token: localStorage.token
        }
      })
        .then(carts => {
          console.log(carts);
          commit("SET_ALLCARTS", carts);
        })
        .catch(err => {
          console.log(err);
        });
    },
    GETUSERCARTS({ commit }, id) {
      ax({
        method: "GET",
        url: "/carts/user/" + id,
        headers: {
          token: localStorage.token
        }
      })
        .then(carts => {
          commit("SET_USERCARTS", carts);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
