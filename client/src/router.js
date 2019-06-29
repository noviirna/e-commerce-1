import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import Transactions from "@/views/Transactions.vue";
import TransactionDetail from "@/views/Transactions.vue";
import ProductDetail from "@/components/ProductDetail.vue";

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
      component: Products,
      children: [
        {
          path: ":id",
          component: ProductDetail
        }
      ]
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import(/* webpackChunkName: "faq" */ "./views/FAQ.vue")
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions,
      children: [
        {
          path: ":id",
          component: TransactionDetail
        }
      ]
    }
  ]
});
