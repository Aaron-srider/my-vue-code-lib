<template></template>

<script>
// outer vue instance
let vue;

// use vue instance
console.log(vue);

export default {
  created() {
    // when vue created, store it to global var 'vue'
    vue = this;
  },
};
</script>

<style></style>
