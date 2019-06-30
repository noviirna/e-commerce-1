<template>
  <div>
    <div v-if="!$route.params.id" class="row d-flex justify-content-center">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0 m-0">
        <div class="col-12 text-right mb-3">
          <a
            class="btn btn-info"
            v-if="$store.state.isAdmin && showDashboard == false"
            @click="showDashboard = true"
            href="#form"
          >Show Dashboard</a>
        </div>
        <div class="col-12 mt-3 p-3">
          <div class="col-12 text-center my-3">
            <h1 class="text-dark">OUR COLLECTION</h1>
          </div>
          <div class="col-12">
            <div class="row d-flex justify-content-around p-5">
              <div
                v-for="pro in $store.state.products.data"
                :key="pro._id"
                class="col-lg-3 col-sm-12 col-md-5 my-3"
              >
                <productcard @edit="edit" @delete="deleteProduct" :product="pro"></productcard>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 container-fluid"
        v-if="$store.state.isAdmin && showDashboard"
      >
        <div class="row d-flex justify-content-between" id="form">
          <div class="col-12 bg-dark d-flex justify-content-between align-items-start">
            <div class="col-6 p-2 m-2">
              <p class="text-white">You are now logged in as admin</p>
            </div>
            <div class="col-6 d-flex justify-content-end">
              <button class="btn btn-danger btn-sm" @click="showDashboard = false">
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-dark px-5 pb-5">
            <h3 v-if="!selectedID" class="text-white">INPUT NEW PRODUCTS</h3>
            <h3 v-if="selectedID" class="text-white">Update Product</h3>
            <small v-if="selectedID">Update product with ID : {{ selectedID }}</small>
            <form @submit.prevent="inputNewProduct" v-if="!selectedID">
              <div class="form-group">
                <label for="productname">Product name</label>
                <input id="productname" v-model="name" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productdesc">Product description</label>
                <textarea id="productdesc" v-model="description" class="form-control" row="10"></textarea>
              </div>
              <div class="form-group">
                <label for="productstock">Product stock</label>
                <input id="productstock" v-model="stock" type="number" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productprice">Product price</label>
                <input id="productprice" v-model="price" type="number" class="form-control" />
              </div>
              <div class="form-group">
                <label for="inputpicture">Product picture</label>
                <input id="inputpicture" type="file" @change="selectPicture" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productprice">Product categories</label>
                <input
                  id="productprice"
                  v-model="tag"
                  type="text"
                  class="form-control"
                  @keyup.space="addTag"
                />
                <small>Press "space" key to add a tag category</small>
                <div class="form-group">
                  <a
                    class="badge badge-light mx-1"
                    href
                    v-for="tag in tags"
                    :key="tag"
                    @click.prevent="removeTag(tag)"
                  >{{ tag }}</a>
                </div>
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-secondary btn-block" value="Input new Products" />
              </div>
            </form>
            <form @submit.prevent="updateProduct" v-if="selectedID">
              <div class="form-group">
                <label for="productname">Product name</label>
                <input id="productname" v-model="name" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productdesc">Product description</label>
                <textarea id="productdesc" v-model="description" class="form-control" row="10"></textarea>
              </div>
              <div class="form-group">
                <label for="productstock">Product stock</label>
                <input id="productstock" v-model="stock" type="number" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productprice">Product price</label>
                <input id="productprice" v-model="price" type="number" class="form-control" />
              </div>
              <div class="form-group">
                <label for="updatepicture">Product picture</label>
                <input id="updatepicture" type="file" @change="selectPicture" class="form-control" />
              </div>
              <div class="form-group">
                <label for="productprice">Product categories</label>
                <input
                  id="productprice"
                  v-model="tag"
                  type="text"
                  class="form-control"
                  @keyup.space="addTag"
                />
                <small>Press "space" key to add a tag category</small>
                <div class="form-group">
                  <a
                    class="badge badge-light mx-1"
                    href
                    v-for="tag in tags"
                    :key="tag"
                    @click.prevent="removeTag(tag)"
                  >{{ tag }}</a>
                </div>
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-secondary btn-block" value="Update" />
              </div>
            </form>
            <button v-if="selectedID" class="btn btn-warning" @click="r_edit">
              <i class="fa fa-refresh fa-2x"></i>
            </button>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-dark px-5 pb-5">
            <h3 class="text-white">DASHBOARD</h3>
            <hr />
            <div class="p-3 mt-3">
              <h5 class="text-white">Ready Stock</h5>
              <hr />
              <p>{{ ready.length }} items are on stock</p>
            </div>
            <div class="p-3">
              <h5 class="text-white">Stock is not Ready</h5>
              <hr />
              <p>{{ notready.length }} items are needed to be updated</p>
            </div>
            <div class="p-3">
              <h5 class="text-white">Stock summary</h5>
              <hr />
              <div v-for="(product, i) in $store.state.products.data" :key="product._id">
                <div>
                  <p>{{ i + 1 }}. {{ product.name }} ({{ product.stock }}) items</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$route.params.id">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ax, swal } from "@/axios.js";
import productcard from "@/components/ProductCard.vue";

export default {
  name: "productspage",
  components: {
    productcard
  },
  data() {
    return {
      showDashboard: false,
      name: "",
      description: "",
      stock: "",
      price: "",
      picture: "",
      tags: [],
      tag: "",
      selectedID: "",
      ready: [],
      notready: []
    };
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      this.getdashboard();
    }, 500);
  },
  created() {
    if (this.$store.state.products.length == 0) {
      this.$store.dispatch("GETALLPRODUCTS");
    }
  },
  methods: {
    getdashboard() {
      let ready = [];
      let notready = [];
      let arr = this.$store.state.products.data;
      arr.forEach(item => {
        if (item.stock > 0) {
          ready.push(item);
        }
        if (item.stock == 0) {
          notready.push(item);
        }
      });
      this.ready = ready;
      this.notready = notready;
    },
    deleteProduct(product) {
      swal
        .fire({
          title: "Are you sure?",
          text: "Delete this product?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Delete"
        })
        .then(result => {
          if (result.value) {
            ax({
              method: "DELETE",
              url: "/products/" + product._id,
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                this.$store.commit("POP_PRODUCT", data);
                this.getdashboard();
              })
              .catch(err => {
                console.log(err);
                console.log(err.response.data);
                swal.fire("sorry", err.response.data.message, "error");
              });
          }
        });
    },
    r_edit() {
      document.getElementById("updatepicture").value = "";
      this.selectedID = "";
      this.name = "";
      this.description = "";
      this.stock = "";
      this.price = "";
      this.picture = "";
      this.tags = [];
      this.tag = "";
    },
    edit(e) {
      let {
        name,
        description,
        stock,
        price,
        picture,
        tags,
        _id,
        showDashboard
      } = e;
      this.showDashboard = showDashboard;
      setTimeout(() => {
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.picture = "";
        this.tags = tags;
        this.selectedID = _id;
        console.log(tags);
      }, 500);
    },
    addTag() {
      if (this.tag !== " ") {
        if (this.tags.indexOf(this.tag) === -1) {
          if (this.tag.length > 12 || this.tag.length < 3) {
            swal.fire("Tags should consists of 3 - 12 characters");
          } else {
            if (this.tags.length == 5) {
              swal.fire("Maximal tags is 5 tag per item");
            } else {
              this.tags.push(this.tag.toLowerCase());
            }
          }
        }
      }
      this.tag = "";
    },
    updateProduct() {
      let updValue = {};
      let name = this.name;
      let description = this.description;
      let stock = this.stock;
      let price = this.price;
      let picture = this.picture;
      let tags = this.tags;
      console.log(this.picture, "~~~~~~~~~~");

      if (name !== "") {
        updValue.name = name;
      }
      if (description !== "") {
        updValue.description = description;
      }
      if (stock !== "") {
        updValue.stock = stock;
      }
      if (price !== "") {
        updValue.price = price;
      }
      if (picture !== "") {
        updValue.picture = picture;
      }
      if (tags !== []) {
        updValue.tags = tags;
      }

      swal
        .fire({
          title: "Are you sure?",
          text: "Update this data?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "update data"
        })
        .then(result => {
          if (result.value) {
            if (this.picture !== "" && updValue !== {}) {
              const blob = new Blob([picture], {
                type: picture.type
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
                  console.log("url gcs", data);
                  updValue.picture = data;
                  return ax({
                    method: "PATCH",
                    url: "/products/" + this.selectedID,
                    data: updValue,
                    headers: {
                      token: localStorage.token
                    }
                  });
                })
                .then(({ data }) => {
                  console.log("update berhasil yuhu");
                  this.$store.dispatch("GETALLPRODUCTS");
                  this.r_edit();
                  swal.fire(
                    "product updated",
                    "success updating product",
                    "success"
                  );
                  setTimeout(() => {
                    this.getdashboard();
                  }, 500);
                })
                .catch(err => {
                  console.log(err);
                  console.log(err.response.data);
                  swal.fire("sorry", err.response.data.message, "error");
                });
            } else if (this.picture == "" && updValue != {}) {
              ax({
                method: "PATCH",
                url: "/products/" + this.selectedID,
                data: updValue,
                headers: {
                  token: localStorage.token
                }
              })
                .then(({ data }) => {
                  console.log("update berhasil yuhu");

                  this.$store.dispatch("GETALLPRODUCTS", data);
                  this.r_edit();
                  swal.fire(
                    "product updated",
                    "success updating product",
                    "success"
                  );
                  setTimeout(() => {
                    this.getdashboard();
                  }, 500);
                })
                .catch(err => {
                  console.log(err);
                  console.log(err.response.data);
                  swal.fire("sorry", err.response.data.message, "error");
                });
            } else {
              swal.fire("Complete the form to update the data!");
            }
          }
        });
    },
    removeTag(tag) {
      let arr = this.tags;
      let index = "";
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == tag) {
          index = i;
        }
      }

      arr.splice(index, 1);
      this.tags = arr;
    },
    r_product() {
      this.name = "";
      this.description = "";
      this.stock = "";
      this.price = "";
      this.picture = "";
      this.tags = [];
      this.tag = "";
      document.getElementById("inputpicture").value = "";
    },
    inputNewProduct() {
      let name = this.name;
      let description = this.description;
      let stock = this.stock;
      let price = this.price;
      let picture = this.picture;
      let tags = this.tags;

      if (
        name == "" ||
        description == "" ||
        stock == "" ||
        price == "" ||
        picture == "" ||
        tags.length == 0
      ) {
        swal.fire("please complete the form before submitting!");
      } else {
        swal
          .fire({
            title: "Confirmation",
            text: "Input this?",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Input"
          })
          .then(confirm => {
            if (confirm.value) {
              const blob = new Blob([picture], {
                type: picture.type
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
                  picture = data;
                  console.log(picture, localStorage.token);
                  return ax({
                    method: "POST",
                    url: "/products",
                    data: {
                      name,
                      description,
                      stock,
                      picture,
                      price,
                      tags
                    },
                    headers: {
                      token: localStorage.token
                    }
                  });
                })
                .then(({ data }) => {
                  this.$store.commit("PUSH_NEWPRODUCT", data);
                  this.r_product();
                  swal.fire(
                    "product added",
                    "success inputting new product",
                    "success"
                  );
                  this.getdashboard();
                })
                .catch(err => {
                  console.log(err);
                  console.log(err.response.data);
                  swal.fire("sorry", err.response.data.message, "error");
                });
            }
          });
      }
    },
    selectPicture(event) {
      this.picture = event.target.files[0];
    }
  }
};
</script>
