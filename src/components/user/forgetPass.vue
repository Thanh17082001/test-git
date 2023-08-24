<template>
    <div class="pass-forget">
        <div class="overlay" v-if="activeFormForget">
            <form class="form-forget">
                <div class="close-form"  @click="closeFormForget" >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="form-head">
                    <h2 class="title">Quên mật khẩu</h2>
                    <span class="description">Nhập Email để nhận mã xác nhận</span>
                    <span class="mes-success" v-if="!!messageSuccess">{{ messageSuccess }}</span>
                    <span class="mes-failed" v-if="!!messageFailure">{{ messageFailure }}</span>
                    <div class="lds-dual-ring" v-if="loading"></div>
                </div>
                <div class="form-group1">
                    <input
                        v-model="forgetEmail"
                        name="email"
                        type="email"
                        ref="inputRef"
                        class="form-email"
                        placeholder="Email của bạn"
                    />
                    <span class="err-pass" v-if="!!valid.email">{{ valid.email }}</span>
                </div>
                <button type="submit" class="form-submit" @click.prevent.stop="forget">Gửi mã</button>
            </form>
        </div>
    </div>
    <confirm-pass :activeFormConfirm="activeFormConfirm" :email="forgetEmail" @closeCF="closeFormConfirm"></confirm-pass>
</template>

<script>
import userService from '@/service/user.service';
import confirmPass from '@/components/user/confirmPass.vue';
export default {
    components: {
        confirmPass,
    },
    data() {
        return {
            valid: {
                email: '',
                password: '',
            },
            isValid: false,
            messageSuccess: '',
            messageFailure: '',
            forgetEmail: '',
            loading: false,
            activeFormConfirm: false,
            verificationCode: [],
        };
    },
    props: {
        activeFormForget: { type: Boolean },
    },
    emits: ['closeFormFG'],
    methods: {
        closeFormForget() {
            this.$emit('closeFormFG');
        },
        async forget() {
            try {
                const email = this.forgetEmail;
                this.loading = true;
                const response = await userService.forget({ email });
                this.loading = false;
                if (!response.data.status) {
                    this.messageSuccess = '';
                    this.messageFailure = response.data.mes;
                } else {
                    this.closeFormForget(), (this.activeFormConfirm = true);
                    this.messageSuccess = '';
                    this.messageFailure = '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        closeFormConfirm() {
            this.activeFormConfirm = false;
            this.closeFormForget();
        },
    },
};
</script>

<style>
@import url('../../assets/css/user.css');
</style>
