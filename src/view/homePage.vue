<template>
  <div>
    <h1 class="h1">Home page</h1>
    <span>{{ name }}</span>
    <br>
    <br>
    <button><router-link to="/register"> Đăng ký</router-link></button>
    <br>
    <br>
    <button><router-link to="/login"> Đăng nhập</router-link></button>
    <button @click="logout">Đăng xuất</button>
  </div>
</template>

<script>
import userService from '@/service/user.service'

export default {
     data(){
        return{
            name:''
        }
     },
     methods:{
        getItem(){
            const user = JSON.parse(sessionStorage.getItem('user'))
            if(user){
                this.name=user.user.fullName
            }else{
                this.name=''
            }
        },
        async logout(){
            try {
                await userService.logout()
                sessionStorage.removeItem('user')
                this.getItem()
            } catch (error) {
                console.log(error);
            }
        },
        async getInfoUser(){
            try {
                const response = await userService.getInfo()
                const user = JSON.stringify(response.data);
                sessionStorage.setItem('user', user);
                this.getItem()
            } catch (error) {
                console.log(error);
            }
        }
     },
     mounted(){
        this.getItem()
        this.getInfoUser()
     }
     
     
}
</script>

<style>

</style>