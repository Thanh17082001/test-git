<template>
  <div>
    <router-view name="header"></router-view>
    <router-view />
    <router-view name="footer"></router-view>
  </div>
</template>

<script>

export default {
  
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400");
#app {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
