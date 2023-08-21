<template>
    <div class="pass-forget">
        <div class="overlay" v-if="activeFormConfirm">
            <form class="form-forget">
                <div class="close-form"  @click="closeFormConfirm" >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="form-head">
                    <h2 class="title">Nhập mã xác nhận</h2>
                    <span class="mes-failed" v-if="!!messageFailure">{{ messageFailure }}</span>
                    <span class="mes-success" v-if="!!messageSuccess">{{ messageSuccess }}</span>
                    <div class="lds-dual-ring" v-if="loading"></div>
                </div>
                <div class="form-group">
                    <input
                        class="code-input"
                        v-for="number in 6"
                        :key="number"
                        v-model="verificationCode[number - 1]"
                        ref="verificationInputs"
                        :maxlength="1"
                        @keyup="handleKeyDown"
                    />
                </div>
                <button type="submit" class="form-submit" @click.prevent.stop="confirm">Xác nhận</button>
                <span class="login-again" @click="sendAgain">Gửi lại</span>
            </form>
        </div>
    </div>
    <reset-pass :activeFormReset="activeFormReset" :email="email" @closeRS="closeFormReset"></reset-pass>
</template>

<script>
import userService from '@/service/user.service';
import resetPass from '@/components/user/resetPass.vue'
export default {
    components:{
        resetPass
    },
    data() {
        return {
            verificationCode: [],
            messageFailure: '',
            messageSuccess:'',
            activeFormReset:false,
            loading:false
        };
    },
    props: {
        activeFormConfirm: { type: Boolean },
        email:String
    },
    emits: ['closeCF'],
    methods: {
        handleKeyDown(event) {
            let currentIndex = this.$refs.verificationInputs.indexOf(event.target);
            if (event.key === 'Backspace') {
                (this.verificationCode[currentIndex] = ''), this.$refs.verificationInputs[currentIndex].focus();
            }
            if (event.key.match(/^[0-9]+$/)) {
                if (currentIndex < 5) {
                    this.$refs.verificationInputs[currentIndex + 1].focus();
                }
            } else {
                (this.verificationCode[currentIndex] = ''), this.$refs.verificationInputs[currentIndex].focus();
            }
        },
        async confirm() {
            try {
                const code = this.verificationCode.join('');
                const email = this.email;
                const response = await userService.confirm({ email, code });
                console.log(response);
                if (response.data.status) {
                    this,this.activeFormReset=true,
                    this.closeFormConfirm()
                    this.verificationCode=[]
                } else {
                    this.messageFailure = response.data.mes;
                    this.verificationCode=[]
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeFormConfirm() {
            this.messageFailure =''
            this.$emit('closeCF');
        },
        closeFormReset(){
            this.closeFormConfirm()
            this.activeFormReset=false
        },
        async sendAgain(){
            try {
                this.loading=true
                const response = await userService.forget({ email:this.email })
                this.loading=false
            if(response.data.status){
                this.messageSuccess="Mã xác nhận đã được gửi"
                this.messageFailure=''
            }else{
                this.messageSuccess=''
                this.messageFailure=response.data.mes
            }
            } catch (error) {
              console.log(error);  
            }
        }
    },
};
</script>

<style></style>
