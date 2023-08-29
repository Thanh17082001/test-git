<template>
  <div class="overlay">
    <form class="spe-form" action="" @submit.prevent.stop="{}">
        <i class="fa-solid fa-xmark spe-close " @click="closeSpe"></i>
        <p>Thông số kỹ thuật</p>
        <span class="text-danger" v-if="mesFail">{{ mesFail }}</span>
        <span class="text-success" v-if="mesSuccess">{{ mesSuccess }}</span>
        <div class="spe-group">
            <label for="">Tốc độ</label>
            <input required v-model="infoSpe.speed" type="text" placeholder="Nhập tốc độ">
        </div>
        <div class="spe-group">
            <label for="">Kích thước giấy</label>
            <input required v-model="infoSpe.paperSize" type="text" placeholder="Nhập Kích thước giấy">
        </div>
        <div class="spe-group">
            <label for="">Khay giấy</label>
            <input required v-model="infoSpe.paperTray" type="text" placeholder="Nhập Khay giấy">
        </div>
        <div class="spe-group">
            <label for="">Màn hình</label>
            <input required v-model="infoSpe.screen" type="text" placeholder="Nhập Màn hình">
        </div>
        <div class="spe-group">
            <label for="">Công nghệ</label>
            <input required v-model="infoSpe.connectionTechnology" type="text" placeholder="Nhập Công nghệ">
        </div>
        <div class="btn btn-outline-success" v-if="!create" @click="createSpe">Sửa</div>
        <div class="btn btn-outline-success" v-else @click="createSpe">Thêm</div>
    </form>
  </div>
</template>

<script>
import specificationService from '@/service/specifications.service'
export default {
    data(){
        return{
            infoSpe:{},
            create:true,
            mesSuccess:'',
            mesFail:''
        }
    }, 
    props:{
        isActiveSpe:Boolean,
        idProduct:String
    },
    emits:['closeSpe'],
    methods:{
        closeSpe(){
            this.$emit('closeSpe')
        },
        async getByIdProduct(){
            try {
                const response = await specificationService.findByIdProduct(this.idProduct)
                if(response.data.status && Object.keys(response.data.data).length >0){
                    this.infoSpe={
                        ...response.data.data
                    }
                    this.create=false
                }
            } catch (error) {
                console.log(error);
            }
        },
        async createSpe(){
            try {
                console.log(Object.keys(this.infoSpe), this.create);
                if(Object.keys(this.infoSpe).length > 0){
                    this.infoSpe.idProduct=this.idProduct
                    if(this.create){
                        const response = await specificationService.create(this.infoSpe)
                        if(response.data.status){
                            this.mesSuccess=response.data.mes
                            this.mesFail=''
                            this.getByIdProduct()
                        }
                        else{
                            this.mesSuccess=''
                            this.mesFail=response.data.mes
                        }
                    }
                    else{
                        const response = await specificationService.update(this.infoSpe._id,this.infoSpe)
                        if(response.data.status){
                            this.mesSuccess=response.data.mes
                            this.mesFail=''
                            this.infoSpe=response.data.data
                        }
                        else{
                            this.mesSuccess=''
                            this.mesFail=response.data.mes
                        }
                    }
                }
                else{
                    this.mesSuccess=''
                    this.mesFail='Chưa nhập dữ liệu'
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getByIdProduct()
    }
}
</script>

<style scoped>

</style>