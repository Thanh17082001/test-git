<template>
     <section class="col-lg sec-right">
        <header-admin></header-admin>
        <router-view></router-view>
    </section>
</template>

<script>
import headerAdmin from '@/components/layout/headerAdmin.vue'
export default {
    components:{
        headerAdmin
    }
}
</script>

<style>

</style>