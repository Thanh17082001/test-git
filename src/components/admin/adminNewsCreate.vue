<template>
    <form  class="admin-news" @submit.prevent.stop="addNews">
        <h3>Đăng tin tức</h3>
        <div class="row">
            <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
            <div class="spe-group col-lg-12">
                <label for="">Ảnh <span>*</span></label>
                <input @change="changeFile" type="file" class="pt-1">
            </div>
            <div class="spe-group col-lg-12">
                <label for="">Tiêu đề bài viết <span>*</span></label>
                <input v-model="infoNews.title" type="text" placeholder="Tiêu đề bài viết..." required>
            </div>
            <div class="spe-group col-lg-12">
                <label for="">Nội dung  <span>*</span></label>
                <textarea v-model="infoNews.content" class="note" placeholder="nội dung của bài viết" required></textarea>
            </div>
        </div>
        <button class="btn btn-success mt-2">Tạo bài đăng</button>
    </form>
</template>

<script>
import newsService from '@/service/news.service'
export default {
    data(){
        return{
            infoNews:{},
            mesFail:'',
            messSuc:''
        }
    },
    methods:{
        async addNews(){
            try {
                const user= JSON.parse(sessionStorage.getItem('user'))
                this.infoNews.createBy= user.user._id
                const response = await newsService.create(this.infoNews)
                if(response.data.status){
                    this.messSuc=response.data.mes
                    this.mesFail=''
                    this.infoNews={}
                }
                else{
                    this.messSuc=''
                    this.mesFail=response.data.mes
                }
            } catch (error) {
                console.log(error);
            }
        },
        changeFile(event){
            this.infoNews.image = event.target.files[0] || '';
        }
    }
}
</script>

<style scoped>
form{
    width: 80%;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
}
    .note{
        background-color: #fff;
        margin: 0;
        width: 100%;
        outline: none;
        padding: 10px;
        border-radius: 5px;
        height: 300px;
    }
</style>