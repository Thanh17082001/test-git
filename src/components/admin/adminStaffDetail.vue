<template>
<div class="overlay" @click="closeDetail">
    <div @click.stop="" class="staff-detail">
        <div class="banner">
        </div>
        <div v-if="!!infoStaff.avatar" class="avatar">
            <img :src="'http://localhost:3000'+infoStaff.avatar" alt="ko có hình ảnh">
        </div>

        <div class="info">
            <div class="row gx-0">
                <div class="col-12">
                    <span><strong>Họ và tên: </strong>{{ infoStaff.fullName }}</span>
                </div>
                <div class="col-12">
                    <span><strong>Số điện thoại: </strong>{{infoStaff.phone}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Email: </strong>{{infoStaff.email}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Địa chỉ: </strong>{{infoStaff.address}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Ngày sinh: </strong>{{infoStaff.dateOfBirth}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Giới tính: </strong>{{infoStaff.gender}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Chức vụ: </strong>{{infoStaff.position}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Phòng ban: </strong>{{infoStaff.department}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Lương: </strong>{{infoStaff.salary}}</span>
                </div>
                <div class="col-12">
                    <span><strong>Ngày bắt đầu: </strong>{{ infoStaff.startDate }}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import staffService from '@/service/staff.service'
import format from '@/utils/format'
export default {
    data(){
        return{
            infoStaff:{}
        }
    },
    props:['idStaff'],
    emits:['closeDetail'],
    methods:{
        async getById(){
            const response = await staffService.findById(this.idStaff)
            this.infoStaff={...response.data}
            this.infoStaff.dateOfBirth=format.formatDateNoTime(this.infoStaff.dateOfBirth)
            this.infoStaff.startDate=format.formatDateNoTime(this.infoStaff.startDate)
            this.infoStaff.salary=format.formatCurrency( this.infoStaff.salary)
            console.log(this.infoStaff);
        },
        closeDetail(){
            this.$emit('closeDetail')
        }
    },
    mounted(){
        this.getById()
    }
}
</script>

<style scoped>
    .staff-detail{
        width: 450px;
        aspect-ratio: 2/3;
        background: #231e39;
        border-radius: 5px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        overflow: hidden;
    }
    .banner{
        background-image: url('http://localhost:3000/logo/logo.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 25%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        z-index: -1;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
    }
    .avatar{
        height: 90px;
        display: flex;
        justify-content: center;
        position: relative;
    }
    .avatar img{
        background-color: #231e39;
        width: 150px;
        height: 150px;
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.3);
        border-radius: 50%;
        z-index: 99999;
        position: absolute;
        top: -75px;
        border: 3px solid #14667b;
        padding: 5px;
        transition: transform linear 0.2s;
    }
    .avatar img:hover{
        transform: scale(1.1);
    }
    .info{
        height: auto;
        text-align: left;
        padding: 0 20px;
        color: #fff;
        font-size: 18px;
    }
    .info span{
        display: inline-block;
        margin: 5px 0;
    }
    .info span strong{
        color: #1c9eff;
    }
</style>