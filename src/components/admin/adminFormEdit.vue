<template>
  <div>
      <h3 class="h3">Sửa sản phẩm</h3>
      <form class="form-product row" action="" @submit.prevent.stop="editProduct" enctype="multipart/form-data">
          <span class="mes mess-success" v-if="!!addProductSuccess">{{ addProductSuccess }}</span>
          <span class="mes mes-failded" v-if="!!addProductFail">{{ addProductFail }}</span>
          <div class="overlay" v-if="loadingProduct">
                <div class="loading-add-product">
                    <div class="lds-dual-ring"></div>
                </div>
            </div>
          <div class="group col-lg-6">
              <label for="">Tên Sản phẩm <span class="required">*</span> </label>
              <input name="name-product" v-model="infoProduct.name" required placeholder="Nhập tên sản phẩm" type="text" class="product-input">
          </div>
          <div class="group col-lg-6">
            <label for="form-file">Ảnh sản phẩm <span class="required">*</span></label>
            <div class="d-flex label-file-edit">
              <label for="form-file">
                <i class="edit-icon fa-solid fa-file-pen"></i>
                </label>
            <img ref="imgRef" :src="imgSrc" alt="" class="img-admin-edit">
              <input name="abc" @change="handleSelectFile" ref="inputFile" class="form-File-edit" type="file" id="form-file" >
            </div>
          </div>
         <!-- loại -->
         <div class="group d-flex col-lg-4">
               <div class="d-flex mb-1">
                    <label for="">Loại sản phẩm <span class="required">*</span></label>
                    <span class="btn btn-info btn-brand" @click="activeFormType=true">Mới</span>
               </div>
               <!-- Them loại mơi -->
               <div class="brand">
                   <div class="overlay2" v-if="activeFormType">
                        <form action="" class="brand-form" @submit.prevent.stop="addType">
                            <div class="close-form" @click="closeFormType">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <div class="form-head me-5 ms-3">
                                <h2 class="title">Thêm thương hiệu</h2>
                                <span class="mes-success" v-if="!!mesSuccess">{{ mesSuccess }}</span>
                                <span class="mes-failed" v-if="!!mesFaild">{{ mesFaild }}</span>
                                <div class="lds-dual-ring" v-if="loading"></div>
                            </div>
                            <div class="group">
                                <label for="">Tên loại <span class="required">*</span></label>
                                <input v-model="infoType.name" type="text" required placeholder="Nhập tên thương hiệu">
                            </div>
                            <div>
                                <button class="btn btn-brand-submit">Thêm</button>
                            </div>
                       </form>
                   </div>
               </div>
                <select name="" id="" class="form-select" v-model="infoProduct.typeId" required>
                    <option value="" class="form-option">--- Chọn loại ---</option>
                    <option v-for="(type, index) in types" :key="index" class="form-option" :value="type._id">{{ type.name }}</option>
                </select>
            </div>
          <!-- thuong hieu -->
          <div class="group d-flex col-lg-4">
             <div class="d-flex mb-1">
                  <label for="">Thương hiệu sản phẩm <span class="required">*</span></label>
                  <span class="btn btn-info btn-brand" @click="activeFormbrand=true">Mới</span>
             </div>
             <!-- Them thuong hieu mơi -->
             <div class="brand">
                 <div class="overlay2" v-if="activeFormbrand">
                      <form action="" class="brand-form" @submit.prevent.stop="addBrand">
                          <div class="close-form" @click="closeFormBrand">
                              <i class="fa-solid fa-xmark"></i>
                          </div>
                          <div class="form-head me-5 ms-3">
                              <h2 class="title">Thêm thương hiệu</h2>
                              <span class="mes-success" v-if="!!mesSuccess">{{ mesSuccess }}</span>
                              <span class="mes-failed" v-if="!!mesFaild">{{ mesFaild }}</span>
                              <div class="lds-dual-ring" v-if="loading"></div>
                          </div>
                          <div class="group">
                              <label for="">Ảnh thương hiệu <span class="required">*</span></label>
                              <input @change="handleBrand" ref="fileBrand" type="file">
                          </div>
                          <div class="group">
                              <label for="">Tên thương hiệu <span class="required">*</span></label>
                              <input v-model="infoBrand.name" type="text" required placeholder="Nhập tên thương hiệu">
                          </div>
                          <div>
                              <button class="btn btn-brand-submit">Thêm</button>
                          </div>
                     </form>
                 </div>
             </div>
              <select name="" id="" class="form-select" v-model="infoProduct.brandId" required>
                  <option value="" class="form-option">--- Chọn thương hiệu ---</option>
                  <option v-for="brand in brands" :key="brand._id" class="form-option" :value="brand._id">{{ brand.name }}</option>
              </select>
          </div>
          <!-- danh mục -->
          <div class="group d-flex col-lg-4">
             <div class="d-flex mb-1">
                  <label for="">Danh mục sản phẩm <span class="required">*</span></label>
                  <span class="btn btn-info btn-brand" @click="activeFormCategory=true">Mới</span>
             </div>
             <!-- Them danh mục mơi -->
             <div class="brand">
                 <div class="overlay2" v-if="activeFormCategory">
                      <form action="" class="brand-form" @submit.prevent.stop="addCategory">
                          <div class="close-form" @click="closeFormCategory">
                              <i class="fa-solid fa-xmark"></i>
                          </div>
                          <div class="form-head me-5 ms-3">
                              <h2 class="title">Thêm Danh mục</h2>
                              <span class="mes-success" v-if="!!mesSuccess">{{ mesSuccess }}</span>
                              <span class="mes-failed" v-if="!!mesFaild">{{ mesFaild }}</span>
                              <div class="lds-dual-ring" v-if="loading"></div>
                          </div>
                          <div class="group">
                              <label for="">Tên danh mục <span class="required">*</span></label>
                              <input v-model="infoCategory.name" type="text" required placeholder="Nhập tên danh mục">
                          </div>
                          <div>
                              <button class="btn btn-brand-submit">Thêm</button>
                          </div>
                     </form>
                 </div>
             </div>
              <select name="" id="" class="form-select" v-model="infoProduct.categoryId" required>
                  <option value="" class="form-option">--- Chọn danh mục ---</option>
                  <option v-for="category in categories" :key="category._id" class="form-option" :value="category._id">{{ category.name }}</option>
              </select>
          </div>
          <div class="group col-lg-4 mt-1">
              <label for="">Giá bán sản phẩm <span class="required">*</span></label>
              <input name="price-sale" v-model="infoProduct.priceSale" required placeholder="Nhập giá bán" type="number" class="product-input">
              <span v-if="!!valid.priceSale" :class="{ 'text-danger': !!valid.priceSale }">{{
                    valid.priceSale
                }}</span>
          </div>
          <div class="group col-lg-4 mt-1">
              <label for="">Giá thuê sản phẩm <span class="required">*</span> </label>
              <input name="price-rental" v-model="infoProduct.priceRental" required placeholder="Nhập giá cho thuê/Ngày" type="number" class="product-input">
              <span v-if="!!valid.priceRental" :class="{ 'text-danger': !!valid.priceRental }">{{
                    valid.priceRental
                }}</span>
          </div>
          <div class="group col-lg-4 mt-1">
              <label for="">Số tháng bảo hành <span class="required">*</span> </label>
              <input name="price-rental" v-model="infoProduct.warrantyTime" required placeholder="Nhập số tháng bảo hành" type="number" class="product-input">
              <span v-if="!!valid.warrantyTime" :class="{ 'text-danger': !!valid.warrantyTime }">{{
                    valid.warrantyTime
                }}</span>
          </div>
          <div class="group col-lg-12">
              <label for="">Mô tả</label>
              <textarea v-model="infoProduct.description"  required placeholder="Mô tả về sản phẩm" class="col-lg-12 form-description" name="" id="" cols="30" rows="4"></textarea>
          </div>
          <div><button class="btn form-btn">Chỉnh sửa</button></div>
      </form>
     
  </div>
</template>

<script>
import productSevice from '@/service/product.service'
import brandService from '@/service/brand.service'
import categoryService from '@/service/category.service'
import typeService from '@/service/type.service'
export default {
  data(){
      return{
          infoProduct:{
              
          },
          activeFormbrand:false,
          activeFormCategory:false,
          activeFormType:false,
          infoCategory:{},
          infoBrand:{},
          infoType:{},
          mesSuccess:'',
          mesFaild:'',
          addProductSuccess:'',
          addProductFail:'',
          loading:false,
          loadingProduct:false,
          brands:[],
          categories:[],
          types:[],
          imgSrc:'',
          valid:{}
      }
  },
  props:{
    id:{ type: String }
  },
  methods:{
      async getProduct(){
        try {
          const response = await productSevice.getProductById(this.id)
          this.infoProduct={...response.data}
          this.infoProduct.brandId=this.infoProduct.brandId._id
          this.infoProduct.typeId=this.infoProduct.typeId._id
          this.infoProduct.categoryId=this.infoProduct.categoryId._id
          this.imgSrc='http://localhost:3000/'+this.infoProduct.image
        } catch (error) {
          console.log(error);
        }
      },
      closeFormCategory(){
          this.activeFormCategory=false
          this.mesFaild=''
          this.mesSuccess=''
          this.infoCategory={}
      },
      closeFormBrand(){
          this.activeFormbrand=false
          this.mesFaild=''
          this.mesSuccess=''
          this.infoBrand={}
      },
      closeFormType(){
            this.activeFormType=false
            this.mesFaild=''
            this.mesSuccess=''
            this.infoType={}
        },
      handleSelectFile(event){
        const files= event.target.files[0]
        this.infoProduct.image=files
        if(files){
          const src = URL.createObjectURL(files)
          this.$refs.imgRef.src= src
        }
      },
      handleBrand(event){
          this.infoBrand.image = event.target.files[0] || '';
      },
      validateForm(info){
            if(info.priceSale <0){
                this.valid.priceSale='Giá bán không được nhỏ hơn 0'
            }
            else{
                this.valid.priceSale=false
            }

            if(info.priceRental <0){
                this.valid.priceRental='Giá thuê không được nhỏ hơn 0'
            }
            else{
                this.valid.priceRental=false
            }
            if(info.warrantyTime <0){
                this.valid.warrantyTime='Số tháng không được nhỏ hơn 0'
            }
            else{
                this.valid.warrantyTime=false
            }
            let isValid = false;
            const arrayValid= Object.values(this.valid)
            for(let i=0;i<arrayValid.length;i++){
                if(arrayValid[i]===false){
                    isValid = true;
                } else {
                    isValid = false;
                    break
                }
            }
            return isValid;
            
        },
      async editProduct(){
          try {
            const data={
                ...this.infoProduct
            }
            const isValid = this.validateForm(data)
            if(isValid){
                this.loadingProduct=true
                const response = await productSevice.update(this.id,data)
                this.loadingProduct=false
                if(response.data.status){
                    this.addProductSuccess=response.data.mes
                    this.addProductFail=''
                    this.infoProduct={
                       ...response.data.data
                    }
                    this.$refs.inputFile.value=''
                }
                else{
                    this.addProductFail=response.data.mes
                    this.addProductSuccess=''
                }
            }
          } catch (error) {
              console.log(error);
          }
      },
      async addBrand(){
          try {
              this.loading=true
              const response = await brandService.create(this.infoBrand)
              this.loading=false
              if(response.data.status){
                  this.mesSuccess=response.data.mes
                  this.mesFaild=''
                  this.infoBrand={}
                  this.$refs.fileBrand.value=''
              }
              else{
                  this.mesFaild=response.data.mes
                  this.mesSuccess=''
              }
              this.getBrands()
          } catch (error) {
              console.log(error);
          }
      },
      
      async getBrands(){
          try {
              const response = await brandService.getAll()
              this.brands=[...response.data]
          } catch (error) {
              console.log(error);
          }
      },
      async addCategory(){
              try {
              this.loading=true
              const response = await categoryService.create(this.infoCategory)
              this.loading=false
              if(response.data.status){
                  this.mesSuccess=response.data.mes
                  this.mesFaild=''
                  this.infoCategory={}
              }
              else{
                  this.mesFaild=response.data.mes
                  this.mesSuccess=''
              }
              this.getCategories()
          } catch (error) {
              console.log(error);
          }
      },
      async getCategories(){
          try {
              const response = await categoryService.getAll()
              this.categories=[...response.data]
          } catch (error) {
              console.log(error);
          }
      },
      async addType(){
            try {
                this.loading=true
                const response = await typeService.create(this.infoType)
                this.loading=false
                if(response.data.status){
                    this.mesSuccess=response.data.mes
                    this.mesFaild=''
                    this.infoType={}
                }
                else{
                    this.mesFaild=response.data.mes
                    this.mesSuccess=''
                }
                this.getType()
            } catch (error) {
                console.log(error);
            }
        },
        async getType(){
            try {
                const response = await typeService.getAll()
                this.types=[...response.data]
            } catch (error) {
                console.log(error);
            }
        }
  },
  mounted(){
      this.getBrands()
      this.getCategories()
      this.getProduct()
      this.getType()
  },
}
</script>

<style>

</style>