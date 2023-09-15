<template>
    <div >
        <h3 class="h3">Bảng sản phẩm</h3>
        <div class="input-admin-filter">
            <form class="filter-admin-date" @submit.prevent.stop="filterDate">
                <select name="" id="" v-model="dateFilter.day" required>
                    <option value="">Ngày</option>
                    <option value="0">Tất cả</option>
                    <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                </select>
                <select name="" id="" v-model="dateFilter.month" required>
                    <option value="">Tháng</option>
                    <option value="0">Tất cả</option>
                    <option v-for="month in 12" :value="month" :key="month">Tháng {{ month }}</option>
                </select>
                <select name="" id="" v-model="dateFilter.year" required>
                    <option value="">Năm</option>
                    <option value="0">Tất cả</option>
                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
                <select name="" id="" v-model="dateFilter.field" required>
                    <option value="">Chọn kiểu</option>
                    <option value="0">Tất cả</option>
                    <option value="createdAt">Ngày Tạo</option>
                    <option value="updatedAt">Ngày cập nhật</option>
                    <option value="entryDate">Ngày Nhập kho</option>
                </select>
                <button>Lọc</button>
            </form>
            <div class="admin-export">
                <div class="btn btn-success" @click="exportToExcel"><i class="fa-solid fa-file-excel me-1"></i> Excel</div>
                <div class="btn btn-warning"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
            </div>
        </div>
        <table class="table-product">
            <thead class="table-head">
                <tr>
                    <th class="column1-th text-center">
                        <div class="admin-table-title">
                            <span v-if="isSort" @click="offSort" class="active-sort"> Lọc </span>
                            <p>Tên sản phẩm</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'name')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'name')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('name')">
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="column2">
                        <div class="admin-table-title">
                            <p>Số lượng nhập</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'inputQuantity')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'inputQuantity')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'inputQuantity')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('inputQuantity')">
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="column3">
                        <div class="admin-table-title">
                            <p>Số lượng bán</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'soldQuantity')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'soldQuantity')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'soldQuantity')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('soldQuantity')">
                                    </div>
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
                                    <li @click="sort(1, 'priceImport')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'priceImport')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'priceImport')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('priceImport')">
                                    </div>
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
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('priceSale')">
                                    </div>
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
                                    <li @click="sort(1, 'priceRental')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'priceRental')">Từ lớn đến nhỏ</li>
                                    <div class="filter-admin-input">
                                        <input type="text" placeholder="Tìm sản phẩm theo tên" v-model="filterInput" @input="handleFitter('priceRental')">
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="column4-th">
                        <div class="admin-table-title">
                            <p>lịch sử</p>
                            <!-- <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(-1, 'createdAt')">Mới nhất</li>
                                    <li @click="sort(1, 'createdAt')">Cũ</li>
                                </ul>
                            </div> -->
                        </div>
                    </th>
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
                    <td class="column6">{{ formatCurency(product.priceImport) }}</td>
                    <td class="column7">{{ formatCurency(product.priceSale) }}</td>
                    <td class="column8">{{ formatCurency(product.priceRental) }}</td>
                    <td class="column4">
                        <span><b>Tạo:</b> {{ formatDateNoTime(product.createdAt) }}</span>
                        <span><b>Sử:</b> {{ formatDateNoTime(product.updatedAt) }}</span>
                    </td>
                    <td class="column5">
                        <div class="btn btn-outline-info me-3" @click="handleProductDetail(product._id)">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                        <router-link
                            :to="{ name: 'product.edit', params: { id: product._id } }"
                            class="btn btn-outline-warning me-3"
                        >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </router-link>
                        <div class="btn btn-outline-success me-3" @click="handleProductSpe(product._id)">
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="product-pagination">
            <ul class="pagination">
                <li>
                    <span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span>
                </li>
                <li><span>...</span></li>
                <li v-for="index in lengthPage" :key="index">
                    <span :class="{ active_page: activePage === index }" @click="handlePage(index)">{{ index }}</span>
                </li>

                <li><span>...</span></li>
                <li>
                    <span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span>
                </li>
            </ul>
        </div>
        <!--  product detail -->
        <admin-product-detail
            :activeProductDetail="activeProductDetail"
            :id="id"
            @closeProductDetail="closeProductDetail"
        ></admin-product-detail>
        <admin-specification-vue
            v-if="isActiveSpe"
            :isActiveSpe="isActiveSpe"
            :idProduct="id"
            @closeSpe="isActiveSpe = false"
        ></admin-specification-vue>
    </div>
</template>

<script>
import productService from '@/service/product.service';
import adminProductDetail from '@/components/admin/adminProductDetail.vue';
import adminSpecificationVue from './adminSpecification.vue';
import format from '@/utils/format';
export default {
    components: {
        adminProductDetail,
        adminSpecificationVue,
    },
    data() {
        return {
            activePage: 1,
            products: [],
            lengthPage: 1,
            activeProductDetail: false,
            isActiveSpe: false,
            id: '',
            pageNumber: 1,
            pageSize: 10,
            isSort: false,
            type:'',
            field:'',
            filterInput:'',
            years:[],
            idTimeOut:null,
            dateFilter:{
                day:'',
                month:'',
                year:'',
                field:''
            }
        };
    },
    methods: {
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getproducts();
            this.isSort=false
        },
        handleProductDetail(id) {
            this.activeProductDetail = true;
            this.id = id;
        },
        handleProductSpe(id) {
            this.isActiveSpe = true;
            this.id = id;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getproducts();
            this.sort(this.type, this.field)
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getproducts();
            this.sort(this.type, this.field)

            }
        },
        closeProductDetail() {
            this.activeProductDetail = false;
            this.id = '';
        },
        offSort() {
            this.getproducts();
            this.isSort = false;
        },
        formatCurency(price){
          return format.formatCurrency(price)
        },
        formatDateNoTime(date){
          return format.formatDateNoTime(date)
        },
        async getproducts() {
            try {
                const length = await productService.getProducts();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await productService.getProducts(this.pageNumber, this.pageSize);
                // response.data.forEach((product) => {
                //     product.createdAt = format.formatDateNoTime(product.createdAt);
                //     product.updatedAt = format.formatDateNoTime(product.updatedAt);
                // });
                this.products = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async sort(type, field) {
            this.type=type
            this.field=field
            this.isSort=true
            if(field ==='name'){
                this.products.sort((a,b)=>{
                if (type == 1) {
                    return a[field].localeCompare(b[field]);
                } else if (type == -1) {
                    return b[field].localeCompare(a[field]);
                }
                })
            }

            else{
                // sắp xếp
                  this.products.sort((a, b) => {
                      if (type == 1) {
                          return parseFloat(a[field]) - parseFloat(b[field]);
                      } else if (type == -1) {
                          return parseFloat(b[field]) - parseInt(a[field]);
                      }
                  });
                // lấy ra bằng 0
                  if(type === 0){
                    const productEqualZero=this.products.filter(product => product[field]===0)
                    this.products=[]
                    this.products=[
                      ...productEqualZero
                    ]
                  }
            }
        },
        getYears(){
            const yearsTarget= new Date().getFullYear()
            for(let i=5 ; i>=1;i--){
                this.years.push(yearsTarget-i)
            }
            this.years.push(yearsTarget)
            for(let i=1 ; i<5;i++){
                this.years.push(yearsTarget+i)
            }
        },
        handleFitter(name){
            clearTimeout(this.idTimeOut);
            this.getproducts()
            this.idTimeOut=setTimeout(()=>{
                this.filter(name)
            }, 500)
        },
        filter(name){
            console.log(this.filterInput);
                const regex = new RegExp(this.filterInput.trim(), "i");
                const abc =this.products.filter(product => {
                    if(name==='name'){
                        return regex.test(product[name])
                    }
                    else{
                        return product[name]>= this.filterInput
                    }
                })
                this.products=abc;
        },
        async exportToExcel(){
            const response = await productService.exportExcel({data:this.products})
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'example.xlsx');
            document.body.appendChild(link);
            link.click();
        },
        async filterDate(){
            const {day,month,year, field} = this.dateFilter
            const response = await productService.filterByDate(day,month,year,field,this.pageNumber,this.pageSize)
            this.products=[...response.data]
        }
    },
    mounted() {
        this.getproducts();
        this.getYears()
    },
};
</script>

<style></style>
