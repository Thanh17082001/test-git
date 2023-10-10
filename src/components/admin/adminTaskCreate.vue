<template>
  <div class="overlay">
    <form action="">
        <div class="d-flex justify-content-end">
            <i @click="closeCreate" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
        </div>
        <h3>Tạo công việc</h3>
        <div class="row">
            <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
            <div class="spe-group col-lg-4">
                <label for="">Tên khách hàng<span class="text-danger ms-2">*</span></label>
                <input v-model="infoTask.name" type="text" placeholder="Tên khách hàng..." required>
            </div>
            <div class="spe-group col-lg-4">
                <label for="">Địa chỉ<span class="text-danger ms-2">*</span></label>
                <input v-model="infoTask.name" type="text" placeholder="Địa chỉ..." required>
            </div>
            <div class="spe-group col-lg-4">
                <label for="">Địa chỉ<span class="text-danger ms-2">*</span></label>
                <input v-model="infoTask.name" type="text" placeholder="Địa chỉ..." required>
            </div>
            <div class="group col-lg-6">
                <div class="d-flex mb-1">
                    <label for="" class="mt-0">Chọn nhân viên <span class="required">*</span></label>
                </div>
                <select  class="form-select" required>
                    <option value="" class="form-option">--- Chọn ---</option>
                    <option  v-for="product in products" :value="product._id" :key="product._id">{{ product.name }}</option>
                </select>
            </div>
            <div class="group col-lg-6">
                <div class="d-flex mb-1">
                    <label for="" class="mt-0">Chọn dịch vụ<span class="required">*</span></label>
                </div>
                <select  class="form-select" required>
                    <option value="" class="form-option">--- Chọn ---</option>
                    <option  v-for="product in products" :value="product._id" :key="product._id">{{ product.name }}</option>
                </select>
            </div>
        </div>
        <button class="btn btn-success mt-3">Tạo</button>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            infoTask:{}
        }
    },
    props:['info']
}
</script>

<style scoped>
    
</style>