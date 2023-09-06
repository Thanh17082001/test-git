<template>
    <div class="overlay" @click="closeDetailEntry">
        <div @click.stop class="detail-entry">
            <h3 class="h3 my-3">Phiếu nhập hàng</h3>
            <div class="entry-content">
                <div class="entry-date my-3 row">
                    <span class="col-lg-6"><b>Mã số phiếu</b>: {{ entry._id }}</span>
                    <span class="col-lg-6"><b>Ngày lập</b>: {{ entry.createdAt }}</span>
                </div>
                <div class="content-head row">
                    <div class="col-lg-6">
                        <h5 class="text-info fs-4">Người lập phiếu</h5>
                        <span class="name"><b>Họ và tên</b>: {{ entry.createBy  ? entry.createBy.fullName : '' }}</span>
                    </div>
                    <div class="col-lg-6">
                        <h5 class="text-info fs-4">Nhà cung cấp</h5>
                        <span class="name"><b>Tên nhà cung cấp</b>: {{ entry.supplier }}</span>
                    </div>
                </div>
                <hr>
                <h5 class="mt-2">Danh sách sản phẩm</h5>
                <div class="entry-product"> 
                    <div class="row mb-3 product-head">
                        <div class="col-lg-1 text-center">STT</div>
                        <div class="col-lg-4">Tên sản phẩm</div>
                        <div class="col-lg-3">Giá nhập</div>
                        <div class="col-lg-2 text-center">Số lượng</div>
                        <div class="col-lg-2 text-center">Tổng giá</div>
                    </div>
    
                    <div class="row my-3" v-for="(product, index) in entry.products" :key="index" >
                        <div class="col-lg-1 text-center">{{ index+1 }} .</div>
                        <div class="col-lg-4">{{ product.idProduct.name }}</div>
                        <div class="col-lg-3">{{ product.priceImport }}</div>
                        <div class="col-lg-2 text-center">{{ product.inputQuantity }}</div>
                        <div class="col-lg-2 text-center">{{product.total}}</div>
                    </div>
                </div>
                <hr>
                <div class="entry-total row" >
                    <div class="entry-note col-lg-8">
                        <b class="text-warning">Ghi chú</b>
                        <p>Kiểm tra kỹ các thông tin trên phiếu</p>
                    </div>
                       <div class="entry-price col-lg-4">
                           <!-- <div>
                                <span>Tổng phụ: </span>
                                <span>34 000 000 </span>
                           </div>
                           <div>
                                <span>Phí vận chuyển: </span>
                                <span>34 000 000 </span>
                           </div> -->
                           <div class="">
                                <span><b>Tổng cộng: </b> </span>
                                <span>{{ entry.totalAmount }} </span>
                           </div>
                       </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import entryReceiptService from '@/service/entryReceipt.service';
import format from '@/utils/format';
export default {
    data() {
        return {
            entry:{},
            products:[]
        };
    },
    props: {
        id: String,
    },
    methods:{
        async getEntryById(){
            try {
                const response= await entryReceiptService.getById(this.id)
               this.entry=response.data
               this.entry.createdAt= format.formatDate(this.entry.createdAt)
               this.entry.totalAmount= format.formatCurrency(this.entry.totalAmount)
               this.entry.products.forEach((product, index) => {
                   this.entry.products[index].total=product.priceImport * product.inputQuantity
                    product.priceImport= format.formatCurrency(product.priceImport)
                    this.entry.products[index].total= format.formatCurrency(this.entry.products[index].total)
                
               });
            } catch (error) {
                console.log(error);
            }
        },
        closeDetailEntry(){
            this.$emit('closeEntry')
        }
    },
    mounted(){
        this.getEntryById()
    }
};
</script>

<style scoped>
.detail-entry{
    width: 50%;
    position: relative;
    top: 30px;
    left: 50%;
    transform: translate(-40%,0%);
    box-sizing: border-box;
    border-top:10px solid #9f181c;
    border-bottom:10px solid #ccc;
    border-left: 1px solid #111;
    border-right: 1px solid #111;
    background: #fff;
    padding: 0 20px;
}
.entry-content{
    text-align: center;
}
.detail-entry h3{
    text-transform: capitalize;
    color: #0E8388;
    font-weight: 600;
}
.content-head{
    display: flex;
    justify-content: space-around;
}
.entry-product{
    width: 95%;
    text-align: left;
    margin-left: 20px;
   height: 210px;
}
.entry-total{
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-align: left;
    margin: 10px 10px;
}
.product-head{
    height: 50px;
    line-height: 50px;
    color: #0E8388;
    font-weight: 600;
}

</style>