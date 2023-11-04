<template>
    <div v-if="!!mesInfoSuc" class="position-alert">
        <div class="alert alert-success" role="alert">
            {{ mesInfoSuc }}
          </div>
    </div>
    <div v-if="mesInfoFail" class="position-alert">
        <div class="alert alert-danger" role="alert">
            {{ mesInfoFail }}
          </div>
    </div>
  <div class="container mb-5">
    <h3 class="text-uppercase my-3 text-primary">Chỉnh sửa thông tin cá nhân của bạn</h3>
    <div class="info-user">
        <div class="info-avatar">
            <div class="avatar-container"> 
                <img v-if="!!!image" :src="'http://localhost:3000'+user?.avatar" alt="">
                <img v-else :src="image" alt="">
                <label for="avt"><i class="fa-solid fa-file-pen"></i></label>
                <input type="file" name="" id="avt" class="d-none" @change="handleImage">
            </div>
        </div>
        <div class="info">
            <h4 class="text-capitalize mt-3">Thông tin cá nhân</h4>
            <form action="" class="row" @submit.prevent.stop="changeInfouser">
                <div class="col-lg-12">
                    <div class="spe-group">
                        <label for="">Tên</label>
                        <input type="text" v-model="user.fullName">
                    </div>
                    <div class="spe-group">
                        <label for="">Số điện thoại</label>
                        <input type="text" v-model="user.phoneNumber">
                    </div>
                    <div class="spe-group">
                        <label for="">Email</label>
                        <input type="text" v-model="user.email">
                    </div>
                </div>
                <span class="change-pass" @click="openFormChangePass">Đổi mật khẩu</span>
               <div class="text-center"> <button class="btn btn-success w-50">Thay đổi</button></div>
            </form>
        </div>
    </div>
    <!-- đổi mk -->

    <div class="overlay" v-if="activeChangePass">
        <form action="" class="change-pass-form" @submit.prevent.stop="changePass">
            <div class="d-flex justify-content-end">
                <i class="fa-solid fa-xmark icon-close" @click="activeChangePass=false"></i>
            </div>
            <h4 class="text-uppercase text-primary">đổi mật khẩu</h4>
            <span class="text-success" v-if="!!mesChangePassSuc">{{mesChangePassSuc}}</span>
            <span clas="text-danger" v-if="!!mesChangePassFail">{{mesChangePassFail}}</span>
            <div class="row">
                <div class="col-lg-12">
                    <div class="spe-group">
                        <label for="">Mật khẩu cũ <span class="text-danger"> *</span></label>
                        <input v-model="infoChangePass.password" type="password" placeholder="Nhập mật khẩu cũ của bạn" required minlength="6">
                    </div>
                    <div class="spe-group">
                        <label for="">Mật khẩu mới <span class="text-danger"> *</span></label>
                        <input v-model="infoChangePass.newPass" type="password" placeholder="Nhập mật khẩu mới của bạn" required minlength="6">
                        <span v-if="!!valid?.newPass" class="text-danger">{{valid.newPass}}</span>
                    </div>
                    <div class="spe-group">
                        <label for="">Nhập lại mật khẩu <span class="text-danger"> *</span></label>
                        <input v-model="infoChangePass.confirmPass" type="password" placeholder="nhập lại mật khẩu" required minlength="6">
                        <span v-if="!!valid?.confirmPass" class="text-danger">{{valid.confirmPass}}</span>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-success px-5">Gửi</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import userService from '@/service/user.service';
export default {
    data(){
        return {
            user:{},
            activeChangePass:false,
            image:'',
            mesInfoFail:'',
            mesInfoSuc:'',
            infoChangePass:{},
            valid:{},
            mesChangePassFail:'',
            mesChangePassSuc:''
        }
    },
    methods:{
        getUserToSession(){
            const sessionUser = JSON.parse(sessionStorage.getItem('user')) ;
            this.user= sessionUser.user
        },
        handleImage(event){
            this.user.avatar = event.target.files[0] || '';
            const src = URL.createObjectURL(this.user.avatar)
            this.image= src;
        },
        async changeInfouser(){
            try {
                const sessionUser = JSON.parse(sessionStorage.getItem('user')) ;
                const response = await userService.changeInfo(this.user)
                if(response.data.status){
                    this.user=response.data.result
                    const token =sessionUser.token;
                    const user={
                        token,
                        user:{
                            ...this.user
                        }
                    }
                    sessionStorage.setItem('user', JSON.stringify(user))
                    this.getUserToSession()
                    this.$store.commit('changeInfo',response.data.result)
                    this.mesInfoSuc=response.data.mes
                    this.mesInfoFail=''
                    setTimeout(()=>{
                        this.mesInfoSuc=''
                        this.mesInfoFail=''
                    }, 500)
                }else{
                    this.mesInfoSuc=''
                    this.mesInfoFail=response.data.mes
                    setTimeout(()=>{
                        this.mesInfoSuc=''
                        this.mesInfoFail=''
                    }, 500)
                }
            } catch (error) {
                console.log(error);
            }
        },
        openFormChangePass(){
            this.activeChangePass=true,
            this.infoChangePass={}
            this.mesChangePassSuc=''
            this.mesChangePassFail=''
        },
        async changePass(){
            try {
                const isValid = this.validate()
                const data={
                   _id:this.user._id,

                   ...this.infoChangePass 
                }
                if(isValid){
                    const response = await userService.changePass(data)
                    if(response.data.status){
                        this.infoChangePass={}
                        this.mesChangePassSuc=response.data.mes
                        this.mesChangePassFail=''
                    }
                    else{
                        this.mesChangePassSuc=''
                        this.mesChangePassFail=response.data.mes
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        validate(){
            if(this.infoChangePass.newPass !==this.infoChangePass.confirmPass){
                this.valid.confirmPass='Không trùng khớp'
            }
            else{
                this.valid.confirmPass=null
            }
            if(this.infoChangePass.newPass == this.infoChangePass.password){
                this.valid.newPass='Mật khẩu mới giống mật khẩu cũ'

            }
            else{
                this.valid.newPass=null
            }
            let isValid = false;
            const arrayValid= Object.values(this.valid)
            for(let i=0;i<arrayValid.length;i++){
                if(arrayValid[i]===null){
                    isValid = true;
                } else {
                    isValid = false;
                    break
                }
            }
            return isValid;
        }

    },
    mounted(){
        this.getUserToSession()
    }

}
</script>

<style scoped>
.info-avatar{
   
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar-container img{
    width: 100%;
    height: 100%;
}
.info-avatar label{
    position: absolute;
    bottom: -16px;
    right: -25px;;
    font-size: 40px;
    cursor: pointer;
}
.avatar-container{
    position: relative;
    width: 200px;
    height: 200px;
}
.info{
    width: 50%;
    text-align: center;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
.change-pass{
    font-size: 20px;
    display: block;
    cursor: pointer;
    color: blue;
    margin: 10px 0;
}
.change-pass-form{
    padding: 20px;
    width: 50%;
    background: #fff;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.icon-close{
    font-size: 30px;
    cursor: pointer;
    color:red;
}
.position-alert{
    position: fixed;
    top: 20px;
    right: 20px;
}
</style>