<template>
  <div>
    <router-view v-if="$route.params.id" />
    <div v-if="$route.params.user && !$route.params.id" class="container">
      <center class="my-3">
        <h1>{{ user.name }}'s TRANSACTIONS</h1>
      </center>
      <hr />
      <div v-for="transaction in $store.state.carts.data" :key="transaction._id" class="col-12">
        <div class="row">
          <h5>Transaction ID :</h5>
          <p>{{ transaction._id }} at {{ new Date(transaction.createdAt) }}</p>
        </div>
        <div class="row">
          <h5>Total (Product + Shipping cost) :</h5>
          <p>IDR {{ toRupiah(transaction.total) }}</p>
        </div>
        <div class="row">
          <h5>Shipping cost :</h5>
          <div class="col mr-auto">
            <p>IDR {{ toRupiah(transaction.ship_amount) }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mx-0 px-0">
            <h5>Detail Purchase :</h5>
          </div>
          <div class="col-12">
            <div v-for="item in transaction.products" :key="item._id" class="col-12">
              <div class="col-12 mx-0 px-0">
                <div class="row">
                  <div class="col-12 mx-0"></div>
                  <div class="col-lg-1 col-md-3 col-sm-4">
                    <img :src="item.picture" class="img-fluid" />
                  </div>
                  <div class="col-lg-10 col-md-8 col-sm- 7">
                    <h5>
                      {{ item.name }}
                      <small>- {{ item.item }} item</small>
                    </h5>
                    <p>Price per item IDR {{ toRupiah(item.price) }}</p>
                    <p>
                      Total item : IDR
                      <b>{{ toRupiah(item.amount) }}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h5>Status :</h5>
          <p>{{ transaction.status }}</p>
        </div>
        <div class="row">
          <h5>Receiver Address :</h5>
          <div class="col mr-auto">
            <p>{{ transaction.ship_address }}</p>
            <p>{{ transaction.ship_city }}</p>
          </div>
        </div>
        <div class="row" v-if="transaction.status !== 'cancel'">
          <h5>Shipping Receipt :</h5>
          <p>{{ transaction.ship_receipt || "has not been sent" }}</p>
        </div>
        <div v-if="transaction.transfer_receipt" class="row">
          <h5>Transfer Receipt :</h5>
          <a :href="transaction.transfer_receipt">Screenshot Receipt Link</a>
        </div>
        <div v-if="transaction.transfer_receipt && transaction.status == 'cancel'" class="row">
          <h5 class="text-danger">Attention :</h5>
          <p>
            Your order had been cancelled due to some reasons, please check your
            email to see details of refund and how to claim your refund
          </p>
        </div>
        <div class="row d-flex align-content-center">
          <div class="col-4">
            <input
              v-if="transaction.status == 'checkout'"
              type="file"
              class="form-control"
              id="transferreceipt"
              @change="selectTransferReceipt"
            />
          </div>
          <div class="col-8 d-flex justify-content-end">
            <button
              v-if="transaction.status == 'checkout'"
              class="btn btn-info mx-1"
              @click="sentTransferReceipt(transaction._id)"
            >SENT TRANSFER RECEIPT</button>
            <button
              v-if="
                transaction.status !== 'checkout' &&
                  transaction.status !== 'cancel' &&
                  transaction.status !== 'received'
              "
              class="btn btn-success mx-1"
              @click="received(transaction._id)"
            >CONFIRM RECEIVED</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <!--  -->
    <div v-if="$store.state.isAdmin && !$route.params.id && !$route.params.user">
      <center class="my-3">
        <h1>ALL OF USER TRANSACTIONS</h1>
      </center>
      <hr />
      <div v-for="transaction in $store.state.allcarts.data" :key="transaction._id" class="col-12">
        <div class="row">
          <h5>Transaction ID :</h5>
          <p>{{ transaction._id }} at {{ new Date(transaction.createdAt) }}</p>
        </div>
        <div class="row">
          <h5>Total (Product + Shipping cost) :</h5>
          <p>IDR {{ toRupiah(transaction.total) }}</p>
        </div>
        <div class="row">
          <h5>Shipping cost :</h5>
          <div class="col mr-auto">
            <p>IDR {{ toRupiah(transaction.ship_amount) }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mx-0 px-0">
            <h5>Detail Purchase :</h5>
          </div>
          <div class="col-12">
            <div v-for="item in transaction.products" :key="item._id" class="col-12">
              <div class="col-12 mx-0 px-0">
                <div class="row">
                  <div class="col-12 mx-0"></div>
                  <div class="col-lg-1 col-md-3 col-sm-4">
                    <img :src="item.picture" class="img-fluid" />
                  </div>
                  <div class="col-lg-10 col-md-8 col-sm- 7">
                    <h5>
                      {{ item.name }}
                      <small>- {{ item.item }} item</small>
                    </h5>
                    <p>Price per item IDR {{ toRupiah(item.price) }}</p>
                    <p>
                      Total item : IDR
                      <b>{{ toRupiah(item.amount) }}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <h5>Status :</h5>
          <p>{{ transaction.status }}</p>
        </div>
        <div class="row">
          <h5>User is :</h5>
          <p>{{ transaction.buyer.name || "loading..." }}</p>
        </div>
        <div class="row">
          <h5>Receiver Address :</h5>
          <div class="col mr-auto">
            <p>{{ transaction.ship_address }}</p>
            <p>{{ transaction.ship_city }}</p>
          </div>
        </div>
        <div class="row">
          <h5
            v-if="
              transaction.status !== 'cancel' &&
                transaction.status !== 'checkout' &&
                transaction.status !== 'transfer'
            "
          >Shipping Receipt :</h5>
          <p>{{ transaction.ship_receipt }}</p>
        </div>
        <div class="row d-flex align-content-center">
          <div class="col-4">
            <input
              v-if="transaction.status == 'transfer'"
              type="text"
              class="form-control bg-dark text-light"
              placeholder="Shipping receipt number (JNE)"
              v-model="shipping_receipt"
            />
          </div>
          <div class="col-8 d-flex justify-content-end">
            <button
              v-if="
                transaction.status != 'checkout' &&
                  transaction.status != 'received' &&
                  transaction.status != 'shipped' &&
                  transaction.status != 'cancel'
              "
              class="btn btn-info mx-1"
              @click="confirmShipping(transaction)"
            >CONFIRM SHIPPING</button>
            <button
              class="btn btn-danger"
              v-if="
                transaction.status !== 'cancel' &&
                  transaction.status !== 'shipped' &&
                  transaction.status !== 'received'
              "
              @click="cancelOrder(transaction)"
            >CANCEL TRANSACTION</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { ax, swal } from "@/axios.js";
export default {
  name: "transactions",
  data() {
    return {
      user: JSON.parse(localStorage.user),
      picture: "",
      shipping_receipt: ""
    };
  },
  created() {
    if (this.$store.state.isAdmin) {
      this.$store.dispatch("GETALLCARTS");
    } else {
      this.$store.dispatch("GETUSERCARTS", JSON.parse(localStorage.user)._id);
    }
  },
  methods: {
    received(id) {
      ax({
        method: "patch",
        url: "/carts/" + id,
        data: {
          buyer: JSON.parse(localStorage.user)._id,
          status: "received"
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(res => {
          this.$store.dispatch(
            "GETUSERCARTS",
            JSON.parse(localStorage.user)._id
          );
          swal.fire(
            "data updated",
            "thank you for shopping with us",
            "success"
          );
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.data);
          swal.fire("sorry", err.response.data.message, "error");
        });
    },
    toRupiah(value) {
      let arr = Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&.")
        .split(".");
      arr.pop();
      let rp = arr.join(".");
      return rp;
    },
    async updateProductsCancel(products) {
      for (let i = 0; i < products.length; i++) {
        await this.cancel_one(products[i])
          .then(data => {
            console.log("then async", JSON.stringify(data));
          })
          .catch(err => {
            console.log("catch async", JSON.stringify(err, null, 2));
          });
      }
      setTimeout(() => {
        this.$store.dispatch("GETALLPRODUCTS");
      }, 3000);
    },
    cancel_one(product) {
      let index = -1;
      for (let i = 0; i < this.$store.state.products.data.length; i++) {
        if (this.$store.state.products.data[i]._id == product._id) {
          index = i;
        }
      }
      let stock = this.$store.state.products.data[index].stock + product.item;
      let updValue = {
        stock
      };
      return new Promise((resolve, reject) => {
        ax({
          method: "PATCH",
          url: "/products/" + product._id,
          data: updValue,
          headers: {
            token: localStorage.token
          }
        })
          .then(({ data }) => {
            return resolve(data);
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
    cancelOrder(transaction) {
      swal
        .fire({
          title: "Are you sure?",
          text: "Cancel this order?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel this!"
        })
        .then(result => {
          if (result.value) {
            let updValue = {
              buyer: transaction.buyer._id,
              status: "cancel"
            };
            ax({
              method: "PATCH",
              url: "/carts/" + transaction._id,
              data: updValue,
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                this.$store.dispatch("GETALLCARTS");
                this.updateProductsCancel(transaction.products);
              })
              .catch(err => {
                console.log(err);
                console.log(err.response.data);
                swal.fire("sorry", err.response.data.message, "error");
              });
          }
        });
    },
    confirmShipping(transaction) {
      let updValue = {
        buyer: transaction.buyer._id,
        status: "shipped",
        ship_receipt: this.shipping_receipt
      };
      ax({
        method: "PATCH",
        url: "/carts/" + transaction._id,
        data: updValue,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("GETALLCARTS");
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.data);
          swal.fire("sorry", err.response.data.message, "error");
        });
    },
    sentTransferReceipt(id) {
      if (this.picture !== "") {
        const blob = new Blob([this.picture], {
          type: this.picture.type
        });
        const formdata = new FormData();
        formdata.append("image", blob);
        ax({
          method: "POST",
          url: "/uploadimg",
          data: formdata,
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.token
          }
        })
          .then(({ data }) => {
            this.picture = data;
            let updValue = {
              buyer: this.$route.params.user,
              transfer_receipt: data,
              status: "transfer"
            };
            return ax({
              method: "PATCH",
              url: "/carts/" + id,
              data: updValue,
              headers: {
                token: localStorage.token
              }
            });
          })
          .then(({ data }) => {
            document.getElementById("transferreceipt").value = "";
            this.$store.dispatch(
              "GETUSERCARTS",
              JSON.parse(localStorage.user)._id
            );
          })
          .catch(err => {
            console.log(err);
            console.log(err.response.data);
            swal.fire("sorry", err.response.data.message, "error");
          });
      }
    },
    selectTransferReceipt() {
      this.picture = event.target.files[0];
    }
  }
};
</script>

<style></style>
