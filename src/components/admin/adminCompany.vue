<template>
  <div class="admin-profile-company">
    <h3>Thông tin doanh nghiệp</h3>
    <div class="row">
        <form class="col-lg-12" @submit.prevent.stop="updateProfileCompany">
           <div class="row info">
            <div class="logo">
                <div>
                    <img ref="imgRef" :src="imgSrc" alt="">
                    <input type="file" class="d-none" @change="handleSelectFile" id="admin-company-logo">
                    <label for="admin-company-logo" ><i class="fa-solid fa-file-pen"></i></label>
                </div>
            </div>
                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-earth-americas me-2"></i> Tên Doanh nghiệp</label>
                    <span ref="adminCompany1" class="col-lg-5"><input type="text" disabled v-model="infoCompany.name"> 
                        <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany1')"></i>
                    </span>
                    
                </div>
                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-hashtag me-2"></i> Mã số thuế </label>
                    <span ref="adminCompany2" class="col-lg-5"><input type="text" disabled v-model="infoCompany.taxCode"> 
                        <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany2')"></i>
                    </span>
    
                </div>
                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-location-dot me-2"></i> Địa chỉ</label>
                    <span ref="adminCompany3" class="col-lg-5"><input type="text" disabled v-model="infoCompany.address"> 
                         <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany3')"></i>
                    </span>
                </div>

               <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-phone me-2"></i> Số điện thoại</label>
                    <span ref="adminCompany4" class="col-lg-5"><input type="text" disabled v-model="infoCompany.phone"> 
                         <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany4')"></i>
                    </span>
    
               </div>
                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-envelope me-2"></i> Địa chỉ Email</label>
                    <span ref="adminCompany5" class="col-lg-5"><input type="text" disabled v-model="infoCompany.email"> 
                         <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany5')"></i>
                    </span>
    
                </div>
                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-user me-2"></i> Người đại diện</label>
                    <span ref="adminCompany6" class="col-lg-5"><input type="text" disabled v-model="infoCompany.president"> 
                         <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany6')"></i>
                    </span>
                </div>

                <div>
                    <hr>
                    <label class="col-lg-2" for=""><i class="fa-solid fa-building me-2"></i> Giới thiệu</label>
                    <span ref="adminCompany7" class="col-lg-5"><input type="text" disabled v-model="infoCompany.introduce"> 
                         <i class="ms-2 fa-solid fa-pen-to-square" @click="handleDisable('adminCompany7')"></i>
                    </span>
                </div>
           </div>
           <div>
            <span class="text-danger fs-5">{{ mesFaild }}</span>
            <span class="text-success fs-5">{{ mesSuccess }}</span>
           </div>
           <button class="mt-3 mb-3 btn btn-warning">Thay đổi thông tin</button>
        </form>
        
    </div>
  </div>
</template>

<script>
import companyService from '@/service/company.service'
export default {
    data(){
        return{
            infoCompany:{},
            imgSrc:'',
            mesFaild:'',
            mesSuccess:''
        }
    },
    methods:{
        handleDisable(adminCompany){
            const ref = this.$refs[adminCompany]
            const input = ref.querySelector('input')
            input.disabled= !input.disabled
            input.focus()
        },
        async getCompany(){
            try {
                const response = await companyService.get()
                this.infoCompany={
                    ...response.data[0]
                }
            this.imgSrc='http://localhost:3000/'+this.infoCompany.logo
            } catch (error) {
                console.log(error);
            }
        },
        handleSelectFile(event){
            const files= event.target.files[0]
            this.infoCompany.image=files
            if(files){
            const src = URL.createObjectURL(files)
            this.$refs.imgRef.src= src
            }
        },
        async updateProfileCompany(){
            try {
                const response = await companyService.update(this.infoCompany._id, this.infoCompany)
                if(response.data.status){
                    this.mesFaild=''
                    this.mesSuccess=response.data.mes
                    this.infoCompany={
                        ...response.data.data
                    }
                }
                else{
                    this.mesSuccess=''
                    this.mesFaild=response.data.mes
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getCompany()
    }
}
</script>

<style>

</style>