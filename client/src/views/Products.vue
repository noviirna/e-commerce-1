<template>
  <div>
    <div v-if="!$route.params.id" class="row d-flex justify-content-center">
      <div
        class="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-0 container-fluid"
        v-if="$store.state.isAdmin"
      >
        <div class="row d-flex justify-content-between">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 bg-dark p-5 px-1">
            <h3 class="text-white">INPUT NEW PRODUCTS</h3>
            <form @submit.prevent="inputNewProduct">
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
                <label for="productpicture">Product picture</label>
                <input id="productpicture" type="file" @change="selectPicture" class="form-control" />
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
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8 bg-dark p-5 px-1">
            <h3 class="text-white">DASHBOARD</h3>
            <div class="p-3">
              <h5 class="text-white">Ready Stock</h5>
            </div>
            <div class="p-3">
              <h5 class="text-white">Stock is not Ready</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto p-5 m-1 container-fluid">
        <div class="col-12 text-center mb-3">
          <h3 class="text-dark">ALL OF OUR COLLECTION</h3>
        </div>
        <div class="col-12">
          <div class="row d-flex justify-content-around mt-2">
            <div
              v-for="(pro) in $store.state.products.data"
              :key="pro._id"
              class="col-lg-2 col-sm-12 col-md-5 my-3"
            >
              <productcard :product="pro"></productcard>
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
      name: "",
      description: "",
      stock: "",
      price: "",
      picture: "",
      tags: [],
      tag: ""
    };
  },
  computed: {
    ready() {
      let arr = this.$store.state.products;
      let ready = [];
      arr.forEach(item => {
        if (item.stock > 0) {
          ready.push(item);
        }
      });
      return ready;
    },
    notready() {
      let arr = this.$store.state.products;
      let notready = [];
      arr.forEach(item => {
        if (item.stock == 0) {
          notready.push(item);
        }
      });
      return notready;
    }
  },
  created() {
    if (this.$store.state.products.length == 0) {
      this.$store.dispatch("GETALLPRODUCTS");
    }
  },
  methods: {
    addTag() {
      if (this.tag !== "") {
        this.tags.push(this.tag);
        this.tag = "";
      }
    },
    removeTag(tag) {
      let index = tag.indexOf(this.tags);
      this.tags.splice(index, 1);
    },
    r_product() {
      this.name = "";
      this.description = "";
      this.stock = "";
      this.price = "";
      this.picture = "";
      this.tags = [];
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
                  swal.fire(
                    "product added",
                    "success inputting new product",
                    "success"
                  );
                  this.$store.commit("PUSH_NEWPRODUCT", data);
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
