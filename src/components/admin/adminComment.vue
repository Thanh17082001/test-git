<template>
 <div>
      <h3>Đánh giá sản phẩm</h3>
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
      <table class="w-100">
        <thead>
            <tr class="row gx-0">
                <th class="col-1">STT</th>
                <th class="col">
                    <div class="admin-table-title">
                        <p>Tên sản phẩm</p>
                        <div class="admin-sort">
                            <i class="fa-solid fa-sort"></i>
                            <ul class="admin-sort-list">
                                <li @click="sort(1, 'nameProduct')">Từ A đến Z</li>
                                <li @click="sort(-1, 'nameProduct')">Từ Z về A</li>
                                <div class="filter-admin-input">
                                    <input
                                        type="text"
                                        placeholder="Nhạp từ khóa..."
                                        v-model="filterInput"
                                        @input="handleFitter('nameProduct')"
                                    />
                                </div>
                            </ul>
                        </div>
                    </div>
                </th>
                <th class="col">
                    <div class="admin-table-title">
                        <p>Nội dung</p>
                        <div class="admin-sort">
                            <i class="fa-solid fa-sort"></i>
                            <ul class="admin-sort-list">
                                <div class="filter-admin-input">
                                    <input
                                        type="text"
                                        placeholder="Nhạp từ khóa..."
                                        v-model="filterInput"
                                        @input="handleFitter('content')"
                                    />
                                </div>
                            </ul>
                        </div>
                    </div>
                </th>
                <th class="col">
                    <div class="admin-table-title">
                        <p>Số sao đánh giá</p>
                        <div class="admin-sort">
                            <i class="fa-solid fa-sort"></i>
                            <ul class="admin-sort-list">
                                <div class="filter-admin-input">
                                    <input
                                        type="text"
                                        placeholder="Nhạp từ khóa..."
                                        v-model="filterInput"
                                        @input="handleFitter('rate')"
                                    />
                                </div>
                            </ul>
                        </div>
                    </div>
                </th>
                <th class="col">
                    <div class="admin-table-title">
                        <p>Trạng thái</p>
                        <div class="admin-sort">
                            <i class="fa-solid fa-sort"></i>
                            <ul class="admin-sort-list">
                                <li @click="sort(true, 'approve')">Đã phê duyệt</li>
                                <li @click="sort(false, 'approve')">Chưa phê duyệt</li>
                            </ul>
                        </div>
                    </div>
                </th>
                <th class="col">Ngày tạo</th>
                <th class="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr class="row gx-0" v-for="(comment, index) in comments" :key="comment._id">
                <td class="col-1"> {{ index+1 }} </td>
                <td class="col ellipsis"> {{ comment.productId?.name }} </td>
                <td class="col ellipsis"> {{ comment.content }} </td>
                <td class="col"> {{ comment.rate }} </td>
                <td class="col">{{comment.approve ? 'Đã duyệt':'Chưa duyệt'}}</td>
                <td class="col">{{comment.createdAt}}</td>
                <td class="col"><span class="btn btn-outline-info" @click="openDetail(comment._id)"><i class="fa-solid fa-circle-info"></i></span></td>
            </tr>
        </tbody>
      </table>

      <div class="overlay" v-if="activeDetail && !!commentInfo">
        <div class="comment-detail">
            <div class="d-flex justify-content-end">
                <i class="fa-solid fa-xmark text-danger fs-3" @click="activeDetail=false; commentInfo={}"></i>
            </div>
            <h3 class="text-uppercase text-warning">chi tiết đánh giá </h3>
            <div class="row">
                <h4>Thông tin người đánh giá</h4>
                <div class="col-6">
                    <strong class="text-start">Tên người đánh giá:</strong> <br> <span>{{ commentInfo.name }}</span>
                </div>
                <div class="col-6">
                    <strong class="text-start">Email:</strong> <br> <span>{{commentInfo.email}}</span>
                </div>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h4>Hình ảnh minh họa</h4>
                <img class="img-comment" :src="'http://localhost:3000'+commentInfo.image" alt="">
            </div>
            <div class="star">
                <span class="col-lg-12"><i class="fa-solid fa-star" :class="{'active-star': int<=commentInfo.rate}" v-for="int in 5" :key="int"></i></span>
            </div>
            <div class="">
                <h4>Nội dung</h4>
                <div class="scroll">
                    <p>{{ commentInfo.content }}</p>
                </div>
            </div>
            <div>
                <button class="btn btn-success px-5" v-if="!commentInfo.approve" @click="approve(commentInfo._id,1)">Phê duyệt</button>
                <button class="btn btn-danger px-5" v-else-if="commentInfo.approve" @click="approve(commentInfo._id,-1)">Gỡ phê duyệt</button>
            </div>
        </div>
      </div>
 </div>
</template>

<script>
import commentService from '@/service/comment.service';
import format from '@/utils/format';
export default {
    data(){
        return {
            pageNumber:1,
            pageSize:8,
            lengthPage:1,
            activePage:1,
            years:[],
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            filterInput:'',
            isSort:false,
            activeDetail:false,
            comments:[],
            commentInfo:{}
        }
    },
    methods:{
        async getComment(){
            try {
                const length = await commentService.getAll()
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await commentService.getAll(this.pageNumber,this.pageSize)
                this.comments=[
                    ...response.data
                ]
                this.comments.map(order =>{
                    order.createdAt = format.formatDate(order.createdAt)
                })
            } catch (error) {
                console.log(error);
            }
        },
        handleFitter(name) {
            if(this.idTimeOut==null){
                this.isSort=false
            }
            clearTimeout(this.idTimeOut);
            this.getComment();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            if(this.filterInput !=''){
                this.isSort = true;
                const regex = new RegExp(this.filterInput.trim(), 'i');
                let abc=[] 
                if(name === 'nameProduct'){
                     abc = this.comments.filter((order) => {
                        return regex.test(order.productId['name']);
                    });
                }
                else{
                    abc = this.comments.filter((order) => {
                        return regex.test(order[name]);
                    });
                }
                this.comments = abc;
            }
            else{
                this.isSort = false;
                this.getComment()
            }
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if(field =='nameProduct'){
                this.comments.sort((a, b) => {
                    if (type == 1) {
                        return a.productId['name'].localeCompare(b.productId['name']);
                    } else if (type == -1) {
                        return b.productId['name'].localeCompare(a.productId['name']);
                    }
                });
            }
            else{
                await this.getComment();
                this.comments = this.comments.filter((order) => order[field] == type);
            }
            
        },
        offSort() {
            this.isSort = false;
            this.getComment();
            this.filterInput = '';
            this.dateFilter= {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            }
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await commentService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.comments = [...response.data];
            this.comments.map(order =>{
                order.createdAt = format.formatDate(order.createdAt)
            })
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        async openDetail(id){
            try {
                const response = await commentService.getById(id)
                this.commentInfo=response.data
                this.activeDetail=true
                console.log(this.commentInfo);
            } catch (error) {
                console.log(error);
            }
        },
        async approve(id,type){
            try {
                const response = await commentService.update(id, {type:type})
                if(response.data.status){
                    alert('Cập nhật thành công')
                    this.commentInfo=response.data.result
                    this.getComment()
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getYears()
        this.getComment()
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
}
th{
    color: #fff;
}
th:nth-child(1){
    text-align: center;
}
.ellipsis{
    white-space: nowrap;         /* Ngăn ngừng xuống dòng */
    overflow: hidden;           /* Ẩn phần nội dung bị tràn ra ngoài */
    text-overflow: ellipsis;     /* Hiển thị dấu ba chấm khi quá dài */
    width: 200px;
    text-align: left;         
}
.comment-detail{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 600px;
    min-height: 600px;
    background: #fff;
    padding: 20px;
}
.img-comment{
    width: 200px;
    aspect-ratio: 1/1;
}
.active-star{
    color: yellow;
}

.star span i{
    font-size: 23px;
    margin:10px 5px;
}
.scroll{
    height: 90px;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
</style>