<template>
    <div class="admin-news">
        <div class="alert alert-success" role="alert" v-if="deleted">
            Xóa bài viết thành công
          </div>
        <h3>Tất cả bài viết</h3>
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
                            <p>Tiêu đề</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('title')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col-2">
                        <div class="admin-table-title text-start">
                            <p>Người tạo</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('fullName')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">Hình ảnh</th>
                    <th class="col">Lịch sử</th>
                    <th class="col text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in news" :key="item._id">
                    <td class="col-1 text-center">{{index+1}}</td>
                    <td class="col">{{ item.title }}</td>
                    <td class="col-2">{{ item.createBy?.fullName }}</td>
                    <td class="col"><img :src="'http://localhost:3000/'+ item?.image" alt="hình ảnh tin tức"></td>
                    <td class="col">Tạo: {{item.createdAt}}</td>
                    <td class="col-2">
                        <span class="ms-4 btn btn-outline-warning me-2" @click="editNews(item._id)"><i class="fa-solid fa-pen-to-square"></i></span>
                        <span class="btn btn-outline-info me-2" @click="detailNews(item._id)"><i class="fa-solid fa-circle-info"></i></span>
                        <span class="btn btn-outline-danger" @click="deleteNews(item._id)"><i class="fa-solid fa-trash"></i></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Update -->
        <admin-news-update v-if="activeEdit" :id="id" @close-edit="closeEdit"></admin-news-update>
        <admin-news-detail v-if="activeDetail" :id="id" @close-detail="activeDetail=false"></admin-news-detail>
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
import newsService from '@/service/news.service';
import format from '@/utils/format';
import adminNewsUpdate from '@/components/admin/adminNewsUpdate.vue'
import adminNewsDetail from '@/components/admin/adminNewsDetail.vue'
export default {
    components:{
        adminNewsUpdate,
        adminNewsDetail
    },
    data(){
        return {
            news:[],
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
            deleted:false
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
                const length = await newsService.getAll()
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await newsService.getAll(this.pageNumber,this.pageSize)
                this.news=[
                    ...response.data
                ]
                this.news.map(order =>{
                    order.createdAt = format.formatDateNoTime(order.createdAt)
                }) 
            } catch (error) {
                console.log(error);
            }
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await newsService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.news = [...response.data];
            this.news.map(order =>{
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
                if(name === 'title'){
                     abc = this.news.filter((item) => {
                        return regex.test(item[name]);
                    });
                }
                else if(name=='fullName'){
                    abc = this.news.filter((item) => {
                        return regex.test(item.createBy[name]);
                    });
                }
                
                this.news = abc;
            }
            else{
                this.isSort = false;
                this.getAll()
            }
        },
        editNews(id){
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
        async deleteNews(id){
            try {
                if(confirm("Hành động này sẽ xóa bài viết")){
                    const response = await newsService.delete(id)
                    if(response.data.status){
                        this.deleted=true
                        setTimeout(()=>{this.deleted=false},2000)
                        this.getAll()
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        
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