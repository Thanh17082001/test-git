<template>
    <div>
        <h3 class="h3">Bảng sản phẩm</h3>
        <table class="table-product">
            <thead class="table-head">
                <tr>
                    <th class="column1-th text-center">Tên sản phẩm</th>
                    <th class="column2">Số lượng nhập</th>
                    <th class="column3">Số lượng bán</th>
                    <th class="column6">Giá nhập</th>
                    <th class="column7">Giá bán</th>
                    <th class="column8">Giá Thuê</th>
                    <th class="column4-th">Lịch sử</th>
                    <th class="column5-th">
                        <span class="me-3 ms-4 text-left">Xem</span>
                        <span class="me-3 ms-3 text-left">Sửa</span>
                        <span class="ms-3">Xóa</span>
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
                        <span>Ngày tạo: 17/8/2001</span>
                        <span>Ngày sửa: 18/06/2001</span>
                    </td>
                    <td class="column5">
                        <div class="btn btn-outline-info me-3"><i class="fa-solid fa-pen-to-square"></i></div>
                        <div class="btn btn-outline-warning me-3"><i class="fa-solid fa-pen-to-square"></i></div>
                        <div class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></div>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <div class="product-pagination">
          <ul class="pagination">
              <li><span><i class="fa-solid fa-angles-left"></i></span></li>
              <li><span>...</span></li>
              <li v-for="index in lengthPage" :key="index">
                <span :class="{active_page:activePage === index}" @click="handlePage(index)">{{ index }}</span>
              </li>
             
              <li><span>...</span></li>
              <li><span><i class="fa-solid fa-angles-right"></i></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import productService from '@/service/product.service';
export default {
  data(){
    return{
      activePage:1,
      products:[],
      lengthPage:1
    }
  },
  methods:{
    handlePage(index){
      this.activePage=index
      this.getproducts(index)
    },
    async getproducts(pageNumber=1){
        try {
            const length = await productService.getProducts()
            this.lengthPage= Math.ceil(length.data.length/8) 
            const response = await productService.getProducts(pageNumber, 8)
            this.products=response.data
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
