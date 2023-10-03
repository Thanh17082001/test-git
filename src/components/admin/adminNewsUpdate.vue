<template>
    <div class="overlay">
        <div class="loading" v-if="loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>

        </div>
        <form  class="admin-news" @submit.prevent.stop="update">
            <div class="d-flex justify-content-end">
                <i @click="closeEdit" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h5>Chỉnh sửa bài viết</h5>
            <div class="row">
                <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
                <div class="avatar">
                    <span>
                        <img v-if="!!!imgSrc" :src="'http://localhost:3000'+infoNews.image" alt="">
                        <img v-else :src="imgSrc" alt="">
                        <label for="avatar"><i class="fa-solid fa-file-pen"></i></label>
                        <input type="file" class="d-none" id="avatar" @change="handleImage">
                    </span>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Tiêu đề bài viết <span>*</span></label>
                    <input v-model="infoNews.title" type="text" placeholder="Tiêu đề bài viết..." required>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Nội dung  <span>*</span></label>
                    <textarea v-model="infoNews.content" class="note" placeholder="Nội dung của bài viết" required></textarea>
                </div>
            </div>
            <button class="btn btn-success mt-2">Sửa bài đăng</button>
        </form>
    </div>
</template>

<script>
import newsService from '@/service/news.service'
export default {
    data(){
        return{
            infoNews:{},
            mesFail:'',
            messSuc:'',
            imgSrc:'',
            loading:false
        }
    },
    props:['id'],
    emits:['closeEdit'],
    methods:{
        closeEdit(){
            this.$emit('closeEdit')
        },
        async update(){
            try {
                const user = JSON.parse(sessionStorage.getItem('user'))
                this.infoNews.createBy=user.user._id
                this.loading=true
                const response = await newsService.update(this.id,this.infoNews)
                this.loading=false
                if(response.data.status){
                    this.messSuc=response.data.mes
                    this.mesFail=''
                    this.getById()
                }
                else{
                    this.messSuc=''
                    this.mesFail=response.data.mes
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getById(){
            try {
                const response = await newsService.getById(this.id)
                this.infoNews=response.data
            } catch (error) {
                console.log(error);
            }
        },
        changeFile(event){
            this.infoNews.image = event.target.files[0] || '';
        },
        handleImage(event){
            const image = event.target.files[0] || '';
            const src = URL.createObjectURL(image)
            this.imgSrc= src
            this.infoNews.image=image
        }
    },
    mounted() {
        this.getById()
    },
}
</script>

<style scoped>
form{
    width: 800px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
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
    .loading{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10000;
    }
</style>