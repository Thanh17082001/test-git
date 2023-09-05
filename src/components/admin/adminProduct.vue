<template>
    <div>
        <h3 class="h3">Bảng sản phẩm</h3>
        <table class="table-product">
            <thead class="table-head">
                <tr>
                    <th class="column1-th text-center">
                      <div class="admin-table-title">
                        <span v-if="isSort" @click="offSort" class="active-sort">
                          Lọc
                        </span>
                        <p>Tên sản phẩm</p> 
                        <div class="admin-sort">
                          <i class="fa-solid fa-sort"></i>
                          <ul class="admin-sort-list">
                            <li @click="sort(1, 'name')">Từ A đến Z</li>
                            <li @click="sort(-1, 'name')">Từ Z về A</li>
                          </ul>
                        </div>
                      </div>
                    </th>
                    <th class="column2"> <div class="admin-table-title">
                      <p>Số lượng nhập</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                          <li @click="sort(1, 'importQuantity')">Từ nhỏ đến lớn</li>
                          <li @click="sort(-1, 'importQuantity')">Từ lớn đến nhỏ</li>
                          <li @click="sort(0, 'importQuantity')">Bằng 0</li>
                        </ul>
                      </div>
                    </div></th>
                    <th class="column3">
                      <div class="admin-table-title">
                      <p>Số lượng bán</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                           <li @click="sort(1, 'soldQuantity')">Từ nhỏ đến lớn</li>
                          <li @click="sort(-1, 'soldQuantity')"> Từ lớn đến nhỏ</li>
                          <li @click="sort(0, 'soldQuantity')">Bằng 0</li>
                        </ul>
                      </div>
                    </div>
                    </th>
                    <th class="column6">
                      <div class="admin-table-title">
                      <p>Giá nhập</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                           <li @click="sort(1, 'inputQuantity')">Từ nhỏ đến lớn</li>
                          <li @click="sort(-1, 'inputQuantity')">Từ lớn đến nhỏ</li>
                          <li @click="sort(0, 'inputQuantity')">Bằng 0</li>
                        </ul>
                      </div>
                    </div>
                    </th>
                    <th class="column7">
                      <div class="admin-table-title">
                      <p>Giá bán</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                           <li @click="sort(1, 'priceSale')">Từ nhỏ đến lớn</li>
                          <li @click="sort(-1, 'priceSale')">Từ lớn đến nhỏ</li>
                        </ul>
                      </div>
                    </div>
                    </th>
                    <th class="column8">
                      <div class="admin-table-title">
                      <p>Giá thuê</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                           <li  @click="sort(1, 'priceRental')">Từ nhỏ đến lớn</li>
                          <li @click="sort(-1, 'priceRental')">Từ lớn đến nhỏ</li>
                        </ul>
                      </div>
                    </div>
                    </th>
                    <th class="column4-th"><div class="admin-table-title">
                      <p>lịch sử</p> 
                      <div class="admin-sort">
                        <i class="fa-solid fa-sort"></i>
                        <ul class="admin-sort-list">
                           <li @click="sort(-1, 'createdAt')">Mới nhất</li>
                          <li @click="sort(1, 'createdAt')">Cũ</li>
                        </ul>
                      </div>
                    </div></th>
                    <th class="column5-th">
                        <span class="me-3 ms-3 text-left">Xem</span>
                        <span class="me-3 ms-2 text-left">Sửa</span>
                        <span class="ms-2">Thêm</span>
                        <span class="ms-4">Xóa</span>
                    </th>
                </tr>
            </thead>
            <tbody class="table-body">
                <tr v-for="product in products" :key="product._id">
                    <td class="column1">
                        {{ product.name }}
                    </td>
                    <td class="column2">{{ product.inputQuantity }}</td>
                    <td class="column3">{{ product.soldQuantity }}</td>
                    <td class="column6">{{ product.priceImport }}</td>
                    <td class="column7">{{ product.priceSale }}</td>
                    <td class="column8">{{ product.priceRental }}</td>
                    <td class="column4">
                        <span><b>Tạo:</b> {{ product.createdAt }}</span>
                        <span><b>Sử:</b> {{ product.updatedAt }}</span>
                    </td>
                    <td class="column5">
                        <div class="btn btn-outline-info me-3" @click="handleProductDetail(product._id)"><i class="fa-solid fa-circle-info"></i></div>
                        <router-link :to="{name:'product.edit', params:{id:product._id}}" class="btn btn-outline-warning me-3">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </router-link>
                        <div class="btn btn-outline-success me-3" @click="handleProductSpe(product._id)"><i class="fa-solid fa-plus"></i></div>
                        <div class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></div>
                    </td>
                      
                </tr>
                
            </tbody>
        </table>
        <div class="product-pagination">
          <ul class="pagination">
              <li><span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span></li>
              <li><span>...</span></li>
              <li v-for="index in lengthPage" :key="index">
                <span :class="{active_page:activePage === index}" @click="handlePage(index)">{{ index }}</span>
              </li>
             
              <li><span>...</span></li>
              <li><span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span></li>
            </ul>
        </div>
        <!--  product detail -->
      <admin-product-detail :activeProductDetail="activeProductDetail" :id="id" @closeProductDetail="closeProductDetail"></admin-product-detail>
      <admin-specification-vue v-if="isActiveSpe" :isActiveSpe="isActiveSpe" :idProduct="id" @closeSpe="isActiveSpe=false"></admin-specification-vue>
      
      

    </div>
</template>

<script>
import productService from '@/service/product.service';
import adminProductDetail from '@/components/admin/adminProductDetail.vue'
import adminSpecificationVue from './adminSpecification.vue';
import format from '@/utils/format'
export default {
  components:{
    adminProductDetail,
    adminSpecificationVue
  },
  data(){
    return{
      activePage:1,
      products:[],
      lengthPage:1,
      activeProductDetail:false,
      isActiveSpe:false,
      id:'',
      pageNumber:1,
      pageSize:8,
      isSort:false
    }
  },
  methods:{
    handlePage(index){
      this.activePage=index
      this.pageNumber=index
      this.getproducts()
    },
    handleProductDetail(id){
      this.activeProductDetail=true
      this.id=id
    },
    handleProductSpe(id){
      this.isActiveSpe=true
      this.id=id
    },
    nextPage(){
      if(this.pageNumber>=this.lengthPage){
        alert('Trang cuối')
      }
      else{
        this.pageNumber+=1
        this.activePage+=1
        this.getproducts()
      }
    },
    previousPage(){
      if(this.pageNumber<= 1){
        alert('Trang đầu')
      }
      else{
        this.pageNumber-=1
        this.activePage-=1
        this.getproducts()
      }
    },
    closeProductDetail(){
      this.activeProductDetail=false
      this.id=''
    },
    offSort(){
      this.getproducts()
      this.isSort=false
    },
    async getproducts(){
        try {
            const length = await productService.getProducts()
            this.lengthPage= Math.ceil(length.data.length/this.pageSize) 
            const response = await productService.getProducts(this.pageNumber, this.pageSize)
            response.data.forEach(product => {
              product.priceSale=format.formatCurrency(product.priceSale)
              product.priceImport=format.formatCurrency(product.priceImport)
              product.priceRental=format.formatCurrency(product.priceRental)
              product.createdAt=format.formatDateNoTime(product.createdAt)
              product.updatedAt=format.formatDateNoTime(product.updatedAt)
            });
            this.products=response.data
        } catch (error) {
            console.log(error);
        }
    },
    async sort(type, field){
      try {
        const response = await productService.sortProduct(type, field, this.pageNumber, this.pageSize)
        response.data.forEach(product => {
              product.priceSale=format.formatCurrency(product.priceSale)
              product.priceImport=format.formatCurrency(product.priceImport)
              product.priceRental=format.formatCurrency(product.priceRental)
              product.createdAt=format.formatDateNoTime(product.createdAt)
              product.updatedAt=format.formatDateNoTime(product.updatedAt)
            });
            this.products=response.data
            this.isSort=true
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    this.getproducts()
  }
};
</script>

<style></style>
