<template>
  <div>
    <div>THIS IS ROUTER VIEW</div>
    <div v-if="$store.state.isAdmin">THIS IS LIST OF ALL TRANSACTIONS</div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
