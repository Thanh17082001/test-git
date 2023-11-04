<template>

    <router-link :to="{name:'news.detail', params:{id:news._id}}" class="news-card">
      <div class="overlay-news">
      </div>
      <img :src="'http://localhost:3000/'+news.image" alt="">
      <div class="news-info">
        <h5>{{ news.title }}</h5>
        <span><i class="fa-regular fa-calendar"></i> {{ news.createdAt }}</span>
        <p>
          {{ news.content }}
        </p>
      </div>
    </router-link>
</template>

<script>
export default {
  props:['news'],
}
</script>

<style>
@import url('/src/assets/css/news.css');
</style>