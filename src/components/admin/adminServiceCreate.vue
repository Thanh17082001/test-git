<template>
    <div class="overlay">
        <form  class="admin-news" @submit.prevent.stop="addService">
            <div class="d-flex justify-content-end">
                <i @click="closeCreate" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h3>Thêm dịch vụ</h3>
            <div class="row">
                <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
                <div class="spe-group col-lg-6">
                    <label for="">Tên dịch vụ<span>*</span></label>
                    <input v-model="infoService.name" type="text" placeholder="Tên của dịch vụ..." required>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Mô tả  <span>*</span></label>
                    <textarea v-model="infoService.description" class="note" placeholder="Mô tả" required></textarea>
                </div>
            </div>
            <button class="btn btn-success mt-2">Thêm dịch vụ</button>
        </form>
    </div>
</template>

<script>
import serviceService from '@/service/service.service'
export default {
    data(){
        return{
            infoService:{},
            mesFail:'',
            messSuc:''
        }
    },
    emits:['closeCreate'],
    methods:{
        closeCreate(){
            this.$emit('closeCreate')
        },
        async addService(){
            try {
                const response = await serviceService.create(this.infoService)
                if(response.data.status){
                    this.messSuc=response.data.mes
                    this.mesFail=''
                    this.infoService={}
                }
                else{
                    this.messSuc=''
                    this.mesFail=response.data.mes
                }
            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>
form{
    width: 800px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
}
    .note{
        background-color: #fff;
        margin: 0;
        width: 100%;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        height: 300px;
    }
</style>