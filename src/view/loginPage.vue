<template>
    <div class="background-form">
        <form action="" class="form" @submit.prevent.stop="login" enctype="multipart/form-data">
            <div class="form-head">
                <h2 class="title">Đăng nhập</h2>
                <span class="description">Đăng nhập tài khoản tại đây</span>
                <span class="mes-success" v-if="!!messageSuccess">{{ messageSuccess }}</span>
                <span class="mes-failed" v-if="!!messageFailure">{{ messageFailure }}</span>
            </div>
            <div class="form-group">
                <input
                    v-model="inforUser.email"
                    name="email"
                    type="email"
                    ref="inputRef"
                    class="form-emai"
                    placeholder="Email của bạn"
                />
                <span class="err-pass" v-if="!!valid.email">{{ valid.email }}</span>
                <input
                    v-model="inforUser.password"
                    name="password"
                    type="password"
                    class="form-pass"
                    placeholder="Mật khẩu"
                />
                <span class="err-pass" v-if="!!valid.password">{{ valid.password }}</span>
            </div>
            <div class="forget-pass" @click="openForm"><span>Quên mật khẩu</span></div>
            <button type="submit" class="form-submit">Đăng nhập</button>
            <a class="login-google" href="http://localhost:3000/user/google">
                <svg width="40" height="40" role="img" class="google-icon">
                    <g id="Google-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="40" height="40" rx="2"></rect>
                        <g id="logo_googleg_48dp" transform="translate(8, 8) scale(1.4300000000000002)">
                            <path
                                d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z"
                                id="Shape"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z"
                                id="Shape"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z"
                                id="Shape"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z"
                                id="Shape"
                                fill="#EA4335"
                            ></path>
                            <path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path>
                        </g>
                    </g>
                </svg>
                <span> Google</span>
            </a>
            <div class="change">
                Chưa có tài khoản chọn
                <RouterLink to="/register" class="change-link">Đăng ký</RouterLink>
            </div>
        </form>

        <!-- quen mat khau -->
        <forgetPassVue :activeFormForget="activeFormForget" @closeFormFG="closeForm"></forgetPassVue>

       
    </div>
</template>

<script>
import userService from '@/service/user.service';
import forgetPassVue from '@/components/user/forgetPass.vue';
import cartService from '@/service/cart.service';
export default {
    components:{
        forgetPassVue
    },
    data() {
        return {
            inforUser: {},
            valid: {
                email: '',
                password: '',
            },
            isValid: false,
            messageSuccess: '',
            messageFailure: '',
            activeFormForget:false
        };
    },
    methods: {
        async login() {
            this.messageSuccess = '';
            this.messageFailure = '';
            this.validate(this.inforUser);
            if (this.isValid) {
                try {
                    const response = await userService.login(this.inforUser);
                    if (response.status == 200) {
                        if (response.data.status) {
                            const cart = await cartService.getByUserId(response.data.user.user._id)
                            this.$store.commit('addToCart', cart?.data?.products ||[])
                            this.inforUser = {};
                            this.messageSuccess = response.data.mes;
                            this.messageFailure = '';
                            const user = JSON.stringify(response.data.user);
                            sessionStorage.setItem('user', user);
                            console.log( response.data.user.user);
                            this.$store.commit('changeInfo', response.data.user.user)
                            const inforUser= response.data.user
                            if(inforUser.user.isAdmin || inforUser.user.roles.length>0){
                                this.$router.push('/admin')
                            }else{
                                
                                this.$router.push('/');
                            }
                        } else {
                            this.messageSuccess = '';
                            this.messageFailure = response.data.mes;
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log('chauw đúng thông tin');
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
        validate({ password, email }) {
            if (!email || !email?.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                this.valid.email = 'Không đúng định dạng email';
            } else {
                this.valid.email = false;
            }

            if (!password || !password.match(/^[A-Za-z0-9]{5,}$/)) {
                this.valid.password = 'Mật khẩu quá ngắn';
            } else {
                this.valid.password = false;
            }
            this.isValid = this.hasFalseValue(this.valid);
        },
        openForm() {
            this.activeFormForget = true;
            this.messageFailure=''
            this.messageSuccess=''
        },
        closeForm() {
            this.activeFormForget = false;
            this.messageFailure=''
            this.messageSuccess=''
        },
    },
    mounted() {
        this.$refs.inputRef.focus();
    },
};
</script>

<style scoped>
@import url(../assets/css/user.css);
</style>
