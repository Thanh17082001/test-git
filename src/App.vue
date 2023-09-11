<template>
  <div>
    <!-- <div class="contact-public">
      <a href="https://zalo.me/0366176577"><img src="https://inkythuatso.com/uploads/images/2021/09/zalo-logo-inkythuatso-14-15-03-04.jpg" alt=""></a>
      <a href="tel:0366176577" class="mt-2"><img src="https://hapotravel.com/wp-content/uploads/2023/04/tong-hop-25-logo-dien-thoai-dep-nhat-nam-2023_2.jpg" alt=""></a>
    </div> -->
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
.contact-public{
  position: fixed;
  left: 20px;
  top: 45%;
  z-index: 1000;
}
.contact-public img{
  width: 70px;
  aspect-ratio: 1/1 ;
  animation: ring linear 1s infinite;
}
.contact-public a{
  display: block;
  border-radius: 50%;
}
@keyframes ring {
  0% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
10% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
}
20% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
}

30% {
    -webkit-transform: rotate(-25deg) scale(1) skew(1deg);
}
40% {
    -webkit-transform: rotate(25deg) scale(1) skew(1deg);
}
50% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
100% {
    -webkit-transform: rotate(0) scale(1) skew(1deg);
}
}
</style>
