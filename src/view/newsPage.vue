<template>
 <div class="mb-5"> 
    <h3 class="text-uppercase text-primary mt-2">Tin tức nổi bật</h3>
    <div class="container">
        <div class="row">
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-lg-4" v-for="item in news" :key="item._id">
                        <div class="news-card" @click="detailPage(item._id)">
                            <img :src="'http://localhost:3000/'+item.image" alt="">
                            <div class="info-new">
                                <span>{{item.createdAt}}</span>
                                <h5>{{item.title}}</h5>
                                <p>{{item.content}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 text-start">
                <h4 style="color:#333; font-weight:600">Giới thiệu doanh nghiệp</h4>
                <h6 class="fw-700 mb-0 text-uppercase">{{ company.name }} </h6>
                <div class="mt-3"><strong>Địa chỉ:</strong> {{ company.address }} </div>
                <div class="mt-3"><strong>Số điện thoại:</strong> {{ company.phone }} </div>
                <div class="mt-3"><strong>Email:</strong> {{ company.email }} </div>
            </div>
        </div>
    </div>
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
import companyService from '@/service/company.service';
import newsService from '@/service/news.service';
import format from '@/utils/format';
export default {
    data(){
        return {
            company:{},
            news:[],
            pageNumber:1,
            pageSize:6,
            activePage:1
        }
    }, methods:{
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAllNews();
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAllNews();
            }
        },
        async getCompany(){
            try {
                const response = await companyService.get()
                this.company=response.data[0]
            } catch (error) {
                console.log(error);
            }
        },
        async getAllNews(){
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
                console.log(this.news);
            } catch (error) {
                console.log(error);
            }
        },
        detailPage(id){
            this.$router.push({name:'news.detail', params:{id:id}})
        }
    }, 
    mounted(){
        this.getCompany()
        this.getAllNews()
    }
}
</script>

<style scoped>
.news-card{
    width: 100%;
    padding: 10px;
}
.news-card img{
    width: 100%;
    aspect-ratio: 2/2.5;
}
.news-card p , h5{
    white-space: nowrap;       /* Ngăn text xuống dòng */
  overflow: hidden;         /* Ẩn phần vượt ra ngoài */
  text-overflow: ellipsis;  /* Hiển thị dấu ba chấm khi vượt quá kích thước */
  width:100%;             /* Kích thước của vùng chứa text, điều chỉnh theo ý muốn */
  padding: 5px;
}
</style>