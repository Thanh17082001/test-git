<template>
    <div class="pass-forget">
        <div class="overlay" v-if="activeFormReset">
            <form action="" class="form-forget" @submit.prevent.stop="reset">
                <div class="close-form"  @click="closeFormReset" >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="form-head">
                    <h2 class="title">Đặt lại mật khẩu</h2>
                    <span class="description"></span>
                    <span class="mes-success" v-if="!!messageSuccess">{{ messageSuccess }} </span>
                    <span class="login-again" @click="closeFormReset" v-if="!!messageSuccess">Đăng nhập lại</span>
                    <span class="mes-failed" v-if="!!messageFailure">{{ messageFailure }}</span>
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        v-model="inforUser.password"
                        ref="inputRef"
                        class="form-pass"
                        name="password"
                        placeholder="Mật khẩu mới"
                    />
                    <span class="err-pass" v-if="!!valid.passWord">{{ valid.passWord }}</span>
                    <input
                        type="password"
                        v-model="inforUser.confirmPass"
                        class="mt-1 form-pass"
                        placeholder="Nhập lại mật khẩu"
                    />
                    <span class="err-pass" v-if="!!valid.confirmPass">{{ valid.confirmPass }}</span>
                </div>
                <button type="submit" class="form-submit">Đặt lại mật khẩu</button>
            </form>
        </div>
    </div>
</template>

<script>
import userService from '@/service/user.service';
export default {
    data() {
        return {
            inforUser: {},
            valid: {
                passWord: '',
                confirmPass: '',
            },
            isValid: false,
            messageSuccess: '',
            messageFailure: '',
        };
    },
    props: {
        activeFormReset: Boolean,
        email:String
    },
    emits: ['closeRS'],
    methods: {
        async reset() {
            this.validate(this.inforUser);
            if (this.isValid) {
                try {
                    console.log(this.email, this.inforUser.password);
                    const data={
                        email:this.email, 
                        password:this.inforUser.password
                    }
                    const response=await userService.reset(data)
                    if(response.data.status){
                        this.messageSuccess=response.data.mes
                        this.messageFailure=''
                    }
                    else{
                        this.messageFailure=response.data.mes
                        this.messageSuccess=''
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('sai');
            }
        },
        hasFalseValue(obj) {
            let temp = false;
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (obj[key] === false) {
                        temp = true;
                    } else {
                        temp = false;
                        break;
                    }
                }
            }
            return temp;
        },
        validate({ password, confirmPass }) {
            if (password != confirmPass) {
                this.valid.confirmPass = 'Mật khẩu không trùng khớp';
            } else {
                this.valid.confirmPass = false;
            }
            if (!password || !password.match(/^[A-Za-z0-9]{5,}$/)) {
                this.valid.passWord = 'Mật khẩu quá ngắn';
                this.valid.confirmPass = 'Mật khẩu không trùng khớp';
            } else {
                this.valid.passWord = false;
            }
            this.isValid = this.hasFalseValue(this.valid);
        },
        closeFormReset(){
            this.$emit('closeRS')
        }
    },
};
</script>

<style></style>
