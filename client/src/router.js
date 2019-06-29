import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Transactions from "@/views/Transactions.vue";
import TransactionDetail from "@/views/Transactions.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/products",
      name: "product",
      component: Products
    },
    {
      path: "/faq",
      name: "faq",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/FAQ.vue")
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions,
      children: [
        {
          path: "id",
          component: TransactionDetail
        }
      ]
    }
  ]
});
