/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import ax from "./axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    products: [],
    carts: [],
    user: {},
    shoppingcart: [],
    serverURL: "http://localhost:3000"
  },
  mutations: {
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
    }
  },
  actions: {
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
    GETUSERCARTS({ commit }, id) {
      ax({
        method: "GET",
        url: "/carts/user/" + id
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
