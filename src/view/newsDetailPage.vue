<template>
  <div class="my-5 text-start">
        <div class="container">
            <div class="row">
                <div class="col lg-9">
                    <div class="news-detail">
                        <h4 style="color:#333; font-weight:600">{{ news.title }}</h4>
                        <p>{{news.createdAt}}</p>
                        <img :src="'http://localhost:3000/'+news.image" alt="">
                        <p class="mt-3">{{news.content}}</p>
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
            news:{}
        }
    }, 
    props:['id'],
    methods:{
        async getCompany(){
            try {
                const response = await companyService.get()
                this.company=response.data[0]
            } catch (error) {
                console.log(error);
            }
        },
        async getNewsById(){
            try {
                const response = await newsService.getById(this.id)
                this.news=response.data
                this.news.createdAt = format.formatDateNoTime(this.news.createdAt)
            } catch (error) {
                console.log(error);
            }
        }
    }, 
    mounted(){
        this.getCompany()
        this.getNewsById()
    }
}
</script>

<style scoped>
.news-detail img{
    width: 100%;
    aspect-ratio: 3/1.5;
    object-fit: fill;
}
</style>