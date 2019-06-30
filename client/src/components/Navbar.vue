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
              >Cart</a
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
      loginpassword: ""
    };
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
          console.log(JSON.stringify(err.response.data, undefined, 2));
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
    }
  }
};
</script>

<style></style>
