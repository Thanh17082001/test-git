<template>
    <div class="background-form">
        <form action="" class="form" @submit.prevent.stop="register">
            <div class="form-head">
                <h2 class="title">Đăng ký</h2>
                <span class="description">Đăng ký tài khoản tại đây</span>
                <span class="mes-success" v-if="!!messageSuccess">{{ messageSuccess }}</span>
                <span class="mes-failed" v-if="!!messageFailure">{{ messageFailure }}</span>
            </div>
            <div class="form-group">
                <input
                    type="text"
                    v-model="inforUser.fullName"
                    ref="inputRef"
                    name="fullName"
                    class="form-fullname"
                    placeholder="Họ và tên"
                />
                <span class="err-pass" v-if="!!valid.fullname">{{ valid.fullname }}</span>
                <input
                    type="email"
                    v-model="inforUser.email"
                    class="form-emai"
                    name="email"
                    placeholder="Email của bạn"
                />
                <span class="err-pass" v-if="!!valid.email">{{ valid.email }}</span>
                <input
                    type="text"
                    v-model="inforUser.phoneNumber"
                    class="form-phone-number"
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                />
                <span class="err-pass" v-if="!!valid.phoneNumber">{{ valid.phoneNumber }}</span>
                <input
                    type="text"
                    v-model="inforUser.password"
                    class="form-pass"
                    name="password"
                    placeholder="Mật khẩu"
                />
                <span class="err-pass" v-if="!!valid.passWord">{{ valid.passWord }}</span>
                <input
                    type="text"
                    v-model="inforUser.confirmPass"
                    class="form-pass-confirm"
                    placeholder="Nhập lại mật khẩu"
                />
                <span class="err-pass" v-if="!!valid.confirmPass">{{valid.confirmPass  }}</span>
            </div>
            <button type="submit" class="form-submit">Đăng ký</button>

            <div class="change">
                Đăng nhập tại
                <RouterLink to="/login" class="change-link">Đăng nhập</RouterLink>
            </div>
        </form>
    </div>
</template>

<script>
import userService from '@/service/user.service';

export default {
    data() {
        return {
            inforUser: {},
            valid: {
                fullname: '',
                email: '',
                phoneNumber: '',
                passWord: '',
                confirmPass: '',
            },
            isValid:false,
            messageSuccess:'',
            messageFailure:''
        };
    },
    methods: {
        async register() {
            this.validate(this.inforUser)
            if(this.isValid){
                try {
                    const result = await userService.register(this.inforUser)
                    console.log(result);
                    if(result.status ==200){
                        if( result.data.status){
                            this.inforUser={}
                            this.messageSuccess=result.data.mes
                            this.messageFailure=''
                        }
                        else{
                            this.messageSuccess=''
                            this.messageFailure=result.data.mes
                        }
                    }
                    else{
                        //chuyển đến trang lỗi sever
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            
        },
        hasFalseValue(obj) {
            let temp =false
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    if (obj[key] === false) {
                        temp=true;
                    }
                    else{
                        temp= false
                        break;
                    }
                }
            }
            return temp
        },
        validate({ password, confirmPass, email, phoneNumber, fullName }){
            if (password != confirmPass || !confirmPass) {
                console.log('thien thanh');
                this.valid.confirmPass ='Mật khẩu không trùng khớp';
            } else {
                this.valid.confirmPass = false;
            }
            if (!email || !email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                this.valid.email = 'Không đúng định dạng email';
            } else {
                this.valid.email = false;
            }
            if (
                !phoneNumber ||
                !phoneNumber.match(/^(03[2-9]|05[2-9]|07[0-9]|08[1-9]|09[0-9]|01[2|6|8|9])+([0-9]{7})\b$/)
            ) {
                this.valid.phoneNumber = 'Số điện thoại không hợp lệ';
            } else {
                this.valid.phoneNumber = false;
            }
            if (!fullName) {
                this.valid.fullname = 'Tên không được bỏ trống';
            } else {
                this.valid.fullname = false;
            }
            if (!password || !password.match(/^[A-Za-z0-9]{5,}$/)) {
                this.valid.passWord = 'Mật khẩu quá ngắn';
                this.valid.confirmPass = 'Mật khẩu không trùng khớp';
            } else {
                this.valid.passWord = false;
            }
            this.isValid = this.hasFalseValue(this.valid);
        }
    },
    mounted() {
        this.$refs.inputRef.focus();
    },
};
</script>

<style scoped>
@import url(../assets/css/user.css);
</style>
