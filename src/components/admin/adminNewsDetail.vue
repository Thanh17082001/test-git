<template>
    <div class="overlay">
        <form  class="admin-news" @submit.prevent.stop="update">
            <div class="d-flex justify-content-end">
                <i @click="closeDetail" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h5>Xem chi tiết</h5>
            <div class="row">
                <div class="avatar">
                    <span>
                        <img :src="'http://localhost:3000'+infoNews.image" alt="">
                        <!-- <label for="avatar"><i class="fa-solid fa-file-pen"></i></label>
                        <input type="file" class="d-none" id="avatar" @change="handleImage"> -->
                    </span>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Được tạo bởi <span>*</span></label>
                    <input disabled :value="infoNews.createBy?.fullName" type="text" placeholder="Tiêu đề bài viết..." required>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Tiêu đề bài viết <span>*</span></label>
                    <input disabled v-model="infoNews.title" type="text" placeholder="Tiêu đề bài viết..." required>
                </div>
                <div class="spe-group col-lg-12">
                    <label for="">Nội dung  <span>*</span></label>
                    <textarea disabled v-model="infoNews.content" class="note" placeholder="Nội dung của bài viết" required></textarea>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import newsService from '@/service/news.service'
export default {
    data(){
        return{
            infoNews:{},
        }
    },
    props:['id'],
    emits:['closeDetail'],
    methods:{
        closeDetail(){
            this.$emit('closeDetail')
        },
        
        async getById(){
            try {
                const response = await newsService.getById(this.id)
                this.infoNews=response.data
            } catch (error) {
                console.log(error);
            }
        },

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
        height: 250px;
    }
    .loading{
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 10000;
    }
</style>