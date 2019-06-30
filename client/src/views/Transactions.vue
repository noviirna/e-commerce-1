<template>
  <div>
    <router-view v-if="$route.params.id" />
    <div v-if="$route.params.user && !$route.params.id" class="container">
      <center class="my-3">
        <h1>{{ user.name }}'s TRANSACTIONS</h1>
      </center>
      <hr />
      <div v-for="(transaction) in $store.state.carts.data" :key="transaction._id" class="col-12">
        <div class="row">
          <h5>Transaction ID :</h5>
          <p>{{transaction._id}}</p>
        </div>
        <div class="row">
          <h5>Total (Product + Shipping cost) :</h5>
          <p>IDR {{toRupiah(transaction.total)}}</p>
        </div>
        <div class="row">
          <h5>Shipping cost :</h5>
          <div class="col mr-auto">
            <p>IDR {{toRupiah(transaction.ship_amount)}}</p>
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
          <p>{{transaction.status}}</p>
        </div>
        <div class="row">
          <h5>Will be sent to :</h5>
          <div class="col mr-auto">
            <p>{{transaction.ship_address}}</p>
            <p>{{transaction.ship_city}}</p>
          </div>
        </div>
        <div class="row">
          <h5>Shipping Receipt :</h5>
          <p>{{transaction.ship_receipt|| "has not been sent" }}</p>
        </div>
        <div class="row d-flex align-content-center">
          <div class="col-4">
            <input type="file" class="form-control" id="transferreceipt" />
          </div>
          <div class="col-8 d-flex justify-content-end">
            <button
              v-if="transaction.status == 'checkout'"
              class="btn btn-info mx-1"
            >SENT TRANSFER RECEIPT</button>
            <button
              v-if="transaction.status !== 'checkout'"
              class="btn btn-info mx-1"
            >CONFIRM RECEIVED</button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <!--  -->
    <div
      v-if="$store.state.isAdmin && !$route.params.id && !$route.params.user"
    >THIS IS LIST OF ALL TRANSACTIONS</div>
  </div>
</template>

<script>
export default {
  name: "transactions",
  data() {
    return {
      user: JSON.parse(localStorage.user),
      picture: ""
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
    toRupiah(value) {
      let arr = value
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&.")
        .split(".");
      arr.pop();
      let rp = arr.join(".");
      return rp;
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
              transfer_receipt: data,
              status: "transfer"
            };
          })
          .catch(err => {});
      }
    },
    selectTransferReceipt() {
      this.picture = event.target.files[0];
    }
  }
};
</script>

<style></style>
