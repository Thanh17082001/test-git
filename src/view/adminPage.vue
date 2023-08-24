<template>
  <div class="main row">
      <admin-menu></admin-menu>
      <adminContent></adminContent>
  </div>
</template>

<script>
import adminMenu from '@/components/admin/adminMenu.vue'
import adminContent from '@/components/admin/adminContent.vue'
export default {
    components:{
        adminMenu,
        adminContent
    }
}
</script>

<style>

</style>