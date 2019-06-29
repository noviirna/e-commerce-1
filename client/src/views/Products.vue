<template>
  <div>
    <div
      v-if="!$route.params.id"
      class="row d-flex justify-content-center py-2"
    >
      <div
        class="col-xs-12 col-sm-12 col-md-5 col-lg-4 bg-dark p-5 m-1 container-fluid"
        v-if="$store.state.isAdmin"
      >
        <h1 class="text-white">INPUT NEW PRODUCTS</h1>
        <form @submit.prevent="inputNewProduct">
          <div class="form-group">
            <label for="productname">Product name</label>
            <input id="productname" type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="productdesc">Product description</label>
            <textarea id="productdesc" class="form-control" row="10"></textarea>
          </div>
          <div class="form-group">
            <label for="productstock">Product stock</label>
            <input id="productstock" type="number" class="form-control" />
          </div>
          <div class="form-group">
            <label for="productprice">Product price</label>
            <input id="productprice" type="number" class="form-control" />
          </div>
          <div class="form-group">
            <label for="productpicture">Product picture</label>
            <input id="productpicture" type="file" class="form-control" />
          </div>
          <div class="form-group">
            <input
              type="submit"
              class="btn btn-secondary btn-block"
              value="Input new Products"
            />
          </div>
        </form>
      </div>
      
      <div
        class="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-dark p-5 m-1 container-fluid"
      >
        LIST OF PRODUCTS
      </div>
    </div>
    <div v-if="$route.params.id">{{ $route.params.id }}</div>
  </div>
</template>

<script>
export default {
  name: "productspage",
  methods: {
    inputNewProduct() {
      console.log("yeay input");
    }
  }
};
</script>
