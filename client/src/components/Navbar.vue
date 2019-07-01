<template>
  <div>
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand">LUX JEWELRIES</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products"
              >All Products</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="!$store.state.isAdmin && $store.state.isLogin"
          >
            <a class="nav-link" data-toggle="modal" data-target="#modalCart"
              >Cart ({{ $store.state.shoppingcart.length }})</a
            >
          </li>
          <li
            class="nav-item"
            v-if="$store.state.isLogin && !$store.state.isAdmin"
          >
            <router-link
              class="nav-link"
              :to="'/transactions/user/' + $store.state.user._id"
              >History</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="$store.state.isLogin && $store.state.isAdmin"
          >
            <router-link class="nav-link" to="/transactions"
              >Transactions</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="$store.state.isLogin">
            <a class="nav-link" href @click.prevent="logout">Log Out</a>
          </li>
          <li class="nav-item" v-if="!$store.state.isLogin">
            <a class="nav-link" data-toggle="modal" data-target="#modalLogin"
              >Log in</a
            >
          </li>
          <li class="nav-item" v-if="!$store.state.isLogin">
            <a class="nav-link" data-toggle="modal" data-target="#modalRegister"
              >Register</a
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/faq">FAQ</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- modal register -->
    <div
      class="modal fade"
      id="modalRegister"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalRegister"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register new account</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="r_register"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="registername">Name</label>
                <input
                  v-model="registername"
                  type="text"
                  class="form-control"
                  id="registername"
                  placeholder="Enter name"
                />
              </div>
              <div class="form-group">
                <label for="registeremail">Email address</label>
                <input
                  v-model="registeremail"
                  type="email"
                  class="form-control"
                  id="registeremail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="registerpassword">Password</label>
                <input
                  v-model="registerpassword"
                  type="password"
                  class="form-control"
                  id="registerpassword"
                  placeholder="Password"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="register"
              data-dismiss="modal"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal login -->
    <div
      class="modal fade"
      id="modalLogin"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLogin"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Log In To Your Account</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="r_register"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login">
              <div class="form-group">
                <label for="loginemail">Email address</label>
                <input
                  v-model="loginemail"
                  type="email"
                  class="form-control"
                  id="loginemail"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >We'll never share your email with anyone else.</small
                >
              </div>
              <div class="form-group">
                <label for="loginpassword">Password</label>
                <input
                  v-model="loginpassword"
                  type="password"
                  class="form-control"
                  id="registerpassword"
                  placeholder="Password"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="login"
              data-dismiss="modal"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal cart -->
    <div
      class="modal fade"
      id="modalCart"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalCart"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Your cart</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-for="(item, i) in $store.state.shoppingcart" :key="item._id">
              <div v-if="i !== 0" class="col-12">
                <div class="row">
                  <div class="col-12">
                    <hr />
                  </div>
                  <div class="col-3">
                    <img :src="item.picture" class="img-fluid" />
                  </div>
                  <div class="col-9">
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
                  <div class="col-12 d-flex justify-content-end">
                    <button
                      class="btn btn-danger btn-sm"
                      @click="
                        $store.state.shoppingcart.splice(
                          $store.state.shoppingcart.indexOf(item),
                          1
                        );
                        $store.commit(
                          'SET_SHOPPINGCART',
                          $store.state.shoppingcart
                        );
                      "
                    >
                      Delete from cart
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="i == 0" class="col-12">
                <div class="row">
                  <div class="col-12"></div>
                  <div class="col-3">
                    <img :src="item.picture" class="img-fluid" />
                  </div>
                  <div class="col-9">
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
                  <div class="col-12 d-flex justify-content-end">
                    <button
                      class="btn btn-danger btn-sm"
                      @click="
                        $store.state.shoppingcart.splice(
                          $store.state.shoppingcart.indexOf(item),
                          1
                        );
                        $store.commit(
                          'SET_SHOPPINGCART',
                          $store.state.shoppingcart
                        );
                      "
                    >
                      Delete from cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>
                Total Product : {{ $store.state.shoppingcart.length }} product (
                {{ getTotalItems($store.state.shoppingcart) }} item)
              </p>
              <p>
                Total Shopping : IDR
                {{ toRupiah(getTotalProductAmount($store.state.shoppingcart)) }}
              </p>
              <p class="mb-0">Shipping Weight :{{ getTotalWeight() }}</p>
              <small>one pc of item plus its packaging is weighed 250gr</small>
              <p class="mt-2">
                Shipping Amount : IDR {{ toRupiah(ship_amount) }}
              </p>
              <p class="mt-2 mb-0">
                <label for="shipdes"
                  >Select city and input Address to checkout :</label
                >
              </p>
              <select
                id="shipdes"
                @change="getOngkir"
                class="form-control bg-dark text-white"
                v-model="destination"
              >
                <option
                  v-for="city in cities"
                  :key="city.city_id"
                  :value="city.city_id"
                  >{{ city.type }}&nbsp;{{ city.city_name }}</option
                >
              </select>
              <p class="mt-2 mb-0">
                <label for="shipaddress">
                  Input correct and complete Address with zip code & your phone
                  number
                </label>
              </p>
              <textarea
                id="shipadress"
                class="form-control bg-dark text-white"
                v-model="address"
              ></textarea>
              <hr class="mb-3" />
              <div v-if="typeof ship_amount == 'number' && ship_amount > 0">
                Total that you had to paid is :
                <h5>
                  IDR
                  {{
                    toRupiah(
                      ship_amount +
                        getTotalProductAmount($store.state.shoppingcart)
                    )
                  }}
                </h5>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-if="destination != '' && address != ''"
              @click="checkOut"
              data-dismiss="modal"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ax, swal } from "@/axios.js";

export default {
  name: "navbar",
  data() {
    return {
      registername: "",
      registeremail: "",
      registerpassword: "",
      loginemail: "",
      loginpassword: "",
      cities: [],
      destination: "",
      address: "",
      ship_amount: 0
    };
  },
  created() {
    this.getCityName();
  },

  methods: {
    r_register() {
      this.registeremail = "";
      this.registerpassword = "";
    },
    register() {
      ax({
        method: "POST",
        url: "/users/register",
        data: {
          name: this.registername,
          email: this.registeremail,
          password: this.registerpassword
        }
      })
        .then(res => {
          this.loginemail = this.registeremail;
          swal.fire("success", "your account have been created", "success");
          this.r_register();
        })
        .catch(err => {
          console.log(err);
          console.log(JSON.stringify(err, undefined, 2));
          swal.fire("sorry", err.response.data.message, "error");
        });
    },
    r_login() {
      this.loginemail = "";
      this.loginpassword = "";
    },
    login() {
      ax({
        method: "POST",
        url: "/users/login",
        data: {
          email: this.loginemail,
          password: this.loginpassword
        }
      })
        .then(({ data }) => {
          localStorage.token = data.token;
          localStorage.user = JSON.stringify(data.user);
          this.$store.dispatch("CHECKLOGIN");
          swal.fire(
            `hello user!`,
            `you have logged in as ${data.user.name}!`,
            "success"
          );
          this.r_login();
        })
        .catch(err => {
          console.log(JSON.stringify(err.response.data, undefined, 2));
          swal.fire("sorry", err.response.data.message, "error");
        });
    },
    logout() {
      localStorage.clear();
      swal.fire("logged out", "you have logged out", "success");
      this.$router.push("/");
      setTimeout(() => {
        this.$store.dispatch("CHECKLOGIN");
      }, 300);
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
    getTotalProductAmount(products) {
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        total += products[i].amount;
      }
      return total;
    },
    getTotalItems(products) {
      let total = 0;
      for (let i = 0; i < products.length; i++) {
        total += products[i].item;
      }
      return total;
    },
    getTotalWeight() {
      return `${250 *
        this.getTotalItems(this.$store.state.shoppingcart)} gr / ${0.25 *
        this.getTotalItems(this.$store.state.shoppingcart)} kg  `;
    },
    getOngkir() {
      this.ship_amount = "loading...";
      ax({
        method: "POST",
        url: "/getongkir",
        data: {
          destination: this.destination,
          weight: Number(
            this.getTotalItems(this.$store.state.shoppingcart) * 250
          )
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.ship_amount = data[0].costs[1].cost[0].value;
        })
        .catch(err => {
          swal.fire(
            "sorry",
            "failed to calculate shipping cost, please check your internet connection",
            "error"
          );
          console.log(err);
          console.log("\n\n\n");
          console.log(JSON.stringify(err, undefined, 2));
        });
    },
    checkOut() {
      swal
        .fire({
          title: "Checkout?",
          text:
            "Make sure you have written right address with your phone number on the addres field",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, checkout"
        })
        .then(result => {
          if (result.value) {
            let weight =
              this.getTotalItems(this.$store.state.shoppingcart) * 250;
            let destination = this.destination;

            let ship_city = "";
            for (let i = 0; i < this.cities.length; i++) {
              if (this.cities[i].city_id == this.destination) {
                ship_city =
                  this.cities[i].type + " " + this.cities[i].city_name;
              }
            }
            let products = JSON.parse(
              JSON.stringify(this.$store.state.shoppingcart)
            );
            let products_amount = this.getTotalProductAmount(
              this.$store.state.shoppingcart
            );
            let buyer = JSON.parse(localStorage.user)._id;
            let status = "checkout";
            let ship_address = this.address;
            let ship_receipt = "";
            let transfer_receipt = "";
            let ship_amount = this.ship_amount;
            let total = products_amount + ship_amount;

            ax({
              method: "POST",
              url: "/carts",
              data: {
                buyer,
                status,
                products,
                products_amount,
                ship_address,
                ship_city,
                ship_amount,
                ship_receipt,
                transfer_receipt,
                total
              },
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                this.updateProductscheckout(data.products);
                swal.fire(
                  "horray",
                  "you have checked out your purchase. check your email for further info about payment!",
                  "success"
                );
                this.$store.commit("SET_SHOPPINGCART", []);
                localStorage.setItem(
                  `cart${JSON.parse(localStorage.user)._id}`,
                  []
                );
                this.destination = "";
                this.address = "";
                this.ship_amount = 0;
                console.log(JSON.stringify(data, null, 2));
                this.$router.push("/");
              })
              .catch(err => {
                swal.fire(
                  "check out failed, please check your connection or try again later"
                );
                console.log(err);
                console.log("\n\n\n");
                console.log(JSON.stringify(err, undefined, 2));
              });
          }
        });
    },
    async updateProductscheckout(products) {
      for (let i = 0; i < products.length; i++) {
        await this.update_one_stock(products[i])
          .then(data => {})
          .catch(err => {
            console.log(err);
            console.log(err.response.data);
            swal.fire("sorry", err.response.data.message, "error");
          });
      }
      setTimeout(() => {
        this.$store.dispatch("GETALLPRODUCTS");
      }, 3000);
    },
    update_one_stock(product) {
      let index = -1;
      for (let i = 0; i < this.$store.state.products.data.length; i++) {
        if (this.$store.state.products.data[i]._id == product._id) {
          index = i;
        }
      }
      let stock = this.$store.state.products.data[index].stock - product.item;
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
    getCityName() {
      ax({ method: "GET", url: "/getcities" })
        .then(({ data }) => {
          this.cities = data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
