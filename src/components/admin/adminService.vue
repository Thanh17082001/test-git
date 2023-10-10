<template>
    <div class="admin-news">
        <div class="alert alert-success" role="alert" v-if="deleted">
            Xóa dịch vụ thành công
          </div>
        <h3>Tất cả dịch vụ</h3>
        <div class="d-flex justify-content-end align-items-center my-3">
            <div class="input-admin-filter">
                <form class="filter-admin-date" @submit.prevent.stop="filterDate">
                    <select name="" id="" v-model="dateFilter.day" required>
                        <option value="0">Ngày</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.month" required>
                        <option value="0">Tháng</option>
                        <option v-for="month in 12" :value="month" :key="month">Tháng {{ month }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.year" required>
                        <option value="0">Năm</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select name="" id="" v-model="dateFilter.field" required>
                        <option value="">Chọn kiểu</option>
                        <option value="0">Tất cả</option>
                        <option value="createdAt">Ngày tạo</option>
                        <option value="updatedAt">Ngày sửa</option>
                    </select>
                    <button>Lọc</button>
                </form>
                
            </div>
            <div class="admin-export">
                <div class="btn btn-success" @click="exportToExcel">
                    <i class="fa-solid fa-file-excel"></i> Excel
                </div>
                <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
            </div>
        </div>
        <div class="d-flex mb-2">
            <button class="btn btn-info" @click="activeCreate=true">Thêm dịch vụ</button>
        </div>
        <div class="isSort" :class="{ 'isSort-active': isSort }">
            <span @click="offSort">Đang lọc</span>
        </div>
        <table class="w-100 ">
            <thead>
                <tr class="">
                    <th class="col-1">STT</th>
                    <th class="col-4">
                        <div class="admin-table-title text-start">
                            <p>Tên dịch vụ</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('name')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Giá</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'price')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'price')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'price')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('price')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">Lịch sử</th>
                    <th class="col text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in services" :key="item._id">
                    <td class="col-1 text-center">{{index+1}}</td>
                    <td class="col">{{ item.name }}</td>
                    <td class="col">{{item.price}}</td>
                    <td class="col">Tạo: {{item.createdAt}}</td>
                    <td class="col-2">
                        <span class="ms-5 btn btn-outline-warning me-2" @click="editService(item._id)"><i class="fa-solid fa-pen-to-square"></i></span>
                        <!-- <span class="btn btn-outline-info me-2" @click="detailNews(item._id)"><i class="fa-solid fa-circle-info"></i></span> -->
                        <span class="btn btn-outline-danger" @click="deleteNews(item._id)"><i class="fa-solid fa-trash"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
       <!-- create service -->
        <adminServiceCreate v-if="activeCreate" @close-create="closeCreate"></adminServiceCreate>
        <adminServiceEdit v-if="activeEdit" :id="id" @close-edit="closeEdit"></adminServiceEdit>
        <!-- pagination -->
        <div class="product-pagination mt-5">
            <ul class="pagination">
                <li>
                    <span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span>
                </li>
                <li><span>...</span></li>
                <li v-for="index in lengthPage" :key="index">
                    <span :class="{active_page: activePage === index }" @click="handlePage(index)">{{ index }}</span>
                </li>

                <li><span>...</span></li>
                <li>
                    <span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import serviceService from '@/service/service.service';
import format from '@/utils/format';
import adminServiceCreate from './adminServiceCreate.vue';
import adminServiceEdit from './adminServiceEdit.vue';
export default {
    components:{
        adminServiceCreate,
        adminServiceEdit
    },
    data(){
        return {
            services:[],
            pageNumber:1,
            pageSize:8,
            lengthPage:1,
            activePage:1,
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            years:[],
            isSort:false,
            id:'',
            activeEdit:false,
            activeDetail:false,
            filterInput:'',
            deleted:false,
            activeCreate:false
        }
    },
    methods:{
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAll();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAll();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAll();
            }
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        offSort() {
            this.isSort = false;
            this.getAll();
            this.filterInput = '';
            this.dateFilter= {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            }
        },
        async getAll(){
            try {
                const length = await serviceService.getAll()
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await serviceService.getAll(this.pageNumber,this.pageSize)
                this.services=[
                    ...response.data
                ]
                this.services.map(order =>{
                    order.createdAt = format.formatDateNoTime(order.createdAt)
                }) 
                console.log(this.services);
            } catch (error) {
                console.log(error);
            }
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await serviceService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.services = [...response.data];
            this.services.map(order =>{
                order.createdAt = format.formatDateNoTime(order.createdAt)
            })
        },
        handleFitter(name) {
            if(this.idTimeOut==null){
                this.isSort=false
            }
            clearTimeout(this.idTimeOut);
            this.getAll();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            if(this.filterInput !=''){
                this.isSort = true;
                const regex = new RegExp(this.filterInput.trim(), 'i');
                let abc=[]
                if(name === 'name'){
                     abc = this.services.filter((item) => {
                        return regex.test(item[name]);
                    });
                }
                else if(name=='price'){
                    abc = this.services.filter((item) => {
                        return item[name] >= parseInt(this.filterInput);
                    });
                }
                
                this.services = abc;
            }
            else{
                this.isSort = false;
                this.getAll()
            }
        },
        editService(id){
            this.id=id
            this.activeEdit=true
        },
        detailNews(id){
            this.id=id
            this.activeDetail=true
        },
        closeEdit(){
            this.activeEdit=false
            this.getAll()
        },
        closeCreate(){
            this.activeCreate=false
            this.getAll()
        },
        async deleteNews(id){
            try {
                if(confirm("Hành động này sẽ xóa bài viết")){
                    const response = await serviceService.delete(id)
                    if(response.data.status){
                        this.deleted=true
                        setTimeout(()=>{this.deleted=false},2000)
                        this.getAll()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if (field === 'name') {
                this.services.sort((a, b) => {
                    if (type == 1) {
                        return a[field].localeCompare(b[field]);
                    } else if (type == -1) {
                        return b[field].localeCompare(a[field]);
                    }
                });
            } else {
                // sắp xếp
                this.services.sort((a, b) => {
                    if (type == 1) {
                        return parseFloat(a[field]) - parseFloat(b[field]);
                    } else if (type == -1) {
                        return parseFloat(b[field]) - parseInt(a[field]);
                    }
                });
                // lấy ra bằng 0
                if (type === 0) {
                    const productEqualZero = this.services.filter((product) => product[field] === 0);
                    this.services = [];
                    this.services = [...productEqualZero];
                }
            }
        },
        
    },
    mounted(){
        this.getAll()
        this.getYears()
    }
}
</script>

<style scoped>
thead{
    background: #0E8388;
}
tr{
    height: 50px;
}
th,td {
    border: 1px solid  #ccc;
    height: 100%;
    padding-left: 10px;
    height: 50px;
}
th{
    color: #fff;
}
th:nth-child(1){
    text-align: center;
}
td img{
    height: 100%;
    width: 100px;
    object-fit: fill;
}
</style>