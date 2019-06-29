<template>
  <div class="row justify-content-center p-5">
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 bg-dark p-5" v-if="$store.state.isAdmin">
      <h1>INPUT NEW PRODUCTS</h1>
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
          <input type="submit" class="btn btn-secondary btn-block" value="Input new Products" />
        </div>
      </form>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-8">LIST OF PRODUCTS</div>
  </div>
</template>

<script>
export default {
  name: "productspage",
  methods :{
    inputNewProduct (){
      console.log("yeay input")
    }
  }
};
</script>

