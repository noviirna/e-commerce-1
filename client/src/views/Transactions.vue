<template>
  <div>
    <router-view v-if="$route.params.id" />
    <div v-if="$route.params.user && !$route.params.id">
      LIST OF USER {{ $route.params.user }}'s TRANSACTIONS
    </div>
    <div
      v-if="$store.state.isAdmin && !$route.params.id && !$route.params.user"
    >
      THIS IS LIST OF ALL TRANSACTIONS
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
