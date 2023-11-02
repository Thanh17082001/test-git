<template>
    <div class="alert alert-success position-alert" role="alert" v-if="added">
        Thêm sản phẩm thành công
    </div>
  <div class="container">
    <div class="d-flex">
        <router-link to="/product" class="back-history">
            <i class="fa-solid fa-chevron-left"></i> <span>Trở lại</span>
        </router-link>
    </div>
   <div class="product-detail mb-5">
        <!-- chi tiết sản phẩm -->
        <div >
            <div class="row">
                <div class="col-lg-5">
                    <div class="detail-img">
                        <img :src="'http://localhost:3000/'+ product?.image" alt="">
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="detail-info">
                        <h3 class="text-start text-capitalize">{{product?.name}}</h3>
                        <div class="detail-price">
                            <div>
                                <strong>Giá bán:</strong> <span>{{formatPrice(product?.priceSale)}}</span>
                            </div>
                            <div>
                                <strong>Giá thuê:</strong> <span>{{formatPrice(product?.priceRental)}}</span>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="detail-intro">
                                    <h5 class="text-start text-capitalize text-info">Thông tin về máy</h5>
                                    <div class="intro-info">
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Thương hiệu:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{product?.brandId?.name}}</span>
                                            </div>
                                        </div>
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Loại máy:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{product?.typeId?.name}}</span>
                                            </div>
                                        </div>
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Chức năng:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{product?.categoryId?.name}}</span>
                                            </div>
                                        </div>
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Bảo hành:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{product?.warrantyTime}} tháng</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6" v-if="Object.keys(spes).length>0">
                                <div class="detail-specification">
                                    <h5 class="text-start text-capitalize text-info">Một số thông số kỹ thuật cơ bản</h5>
                                    <div class="intro-info" >
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Cân nặng:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{spes?.weight}}</span>
                                            </div>
                                        </div>
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Công suất:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{spes?.wattage}}</span>
                                            </div>
                                        </div>
                                        <div class="row text-start mt-2">
                                            <div class="col-lg-6">
                                                <strong>Cổng kết nối:</strong>
                                            </div>
                                            <div class="col-lg-6">
                                                <span class="text-capitalize">{{spes?.connector}}</span>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="product?.inputQuantity<=0" class="text-start mt-3 fs-4 fst-italic">
                            <span class="text-danger" >Sản phẩm hiện hết hàng</span>
                        </div>
                    </div>
                    <button v-if="product?.inputQuantity>0" data-bs-toggle="modal" :data-bs-target="'#staticBackdrop'+product._id" class="btn-add-cart">Thêm vào giỏ hàng</button>
                    <div class="text-start mt-3" v-if="product?.inputQuantity>0">
                        <span>Thêm vào giỏ hàng bạn có thể lựa chọn mua hoặc thuê</span>
                    </div>
                    <div class="text-start mt-1">
                        <span>Gọi ngay <a href="tel:0366176577">0366176577</a> để được tư vấn (24/7)</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- giới thiệu và thông số kỹ thuật -->
        <div class="detail-more mt-2">
            <div class="row">
                <div class="detail-nav" >
                    <ul>
                        <li @click="activeNav=nav" :class="{'active-nav': activeNav== nav}" v-for="nav in navs" :key="nav">{{nav}}</li>
                    </ul>
                </div>
                <div class="detail-content mt-2 " v-if="activeNav=='Giới thiệu'">
                    <h5 class="text-start mt-2 text-capitalize text-warning">Mô tả về máy {{ product?.name }}</h5>
                    <p class="text-start">
                        {{ product?.description }}
                    </p>
                </div>
                <!-- thông số kỹ thuật -->
                <div class="detail-content mt-2 " v-if="activeNav=='Thông số kỹ thuật'">
                    <h5 class="text-start mt-2 text-capitalize text-warning">thông số kỹ thuật máy {{ product?.name }}</h5>
                    <div class="detail-spe">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Công nghệ kết nối:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.connectionTechnology}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Màn hình:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.screen}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Tốc độ:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.speed}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Độ phân giải:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.screenResolution}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Ram:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.ramMemory}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Ổ cứng:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.hardDrive}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Khổ giấy:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.paperSize}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Cân nặng:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.weight}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Khay giấy:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.paperTray}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Thời gian khởi động:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.bootTime}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Phóng to:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.zoom}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Sao chép liên tục:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.continuously}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Cổng kết nối:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.connector}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Hệ điều hành:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.operatingSystem}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Điện năng tiêu thụ:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.electricUsed}}</span>
                                    </div>
                                </div>
                                <div class="row w-75 text-start mt-2">
                                    <div class="col-lg-6">
                                        <strong>Công xuất:</strong>
                                    </div>
                                    <div class="col-lg-6">
                                        <span>{{ spes?.wattage}}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                       
                        
                    </div>
                </div>
                <!-- đánh giá -->
                <div class="detail-comment" v-if="activeNav=='Đánh giá'">
                    <h5 class="text-start mt-2 text-capitalize text-warning">Đánh giá về máy {{product?.name}}</h5>
                    <div class="comment">
                        <div class="row mt-2 text-start comment-item" v-for="( i) in 5" :key="i">
                            <span class="col-lg-12">Nguyễn thiên thanh</span>
                            <span class="col-lg-12"><i class="fa-solid fa-star" :class="{'active-star': int<=star}" v-for="int in 5" :key="int"></i></span>
                            <img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg" alt="">
                            <p class="col-lg-12">Sản phẩm rất tốt.</p>
                            <div class="mb-2 reply"><div class="p-2" @click="activeReply=!activeReply; indexReply=i ">Trả lời <i class="fa-solid fa-reply"></i></div></div>
                            <div class="d-flex align-items-center mb-2 " v-if="activeReply && indexReply==i">
                                <div class="spe-group w-50">
                                    <input type="text" placeholder="Trả lời" class="m-0">
                                </div>
                                <span class="btn btn-secondary">Gửi</span>
                            </div>
                        </div>
                    </div>

                    <form action="" class="comment-form">
                        <h5 class="text-start mt-2  text-warning">Hãy là người đánh giá máy {{product?.name}}</h5>
                        <div class="text-start mb-3">
                            <div class="spe-group"><label class=" d-block">Chọn số sao <span class="text-danger"></span></label></div>
                            <span class="me-3 start-select"><i class="fa-solid fa-star"></i></span>|
                            <span class="me-3 start-select">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>|
                            <span class="me-3 start-select">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>|
                            <span class="me-3 start-select">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>|
                            <span class="start-select">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </span>
                            
                        </div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="spe-group">
                                    <label for="">Tên của bạn <span class="text-danger">*</span></label>
                                    <input type="text" placeholder="Họ và tên">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="spe-group">
                                    <label for="">Email của bạn <span class="text-danger">*</span></label>
                                    <input type="text" placeholder="Địa chỉ email">
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="spe-group">
                                    <label for="">Ảnh</label>
                                    <input type="file" class="pt-1">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="spe-group">
                                    <label for="">Nội dung <span class="text-danger">*</span></label>
                                    <textarea name="" id="" class="w-100" placeholder="Nội dung đánh giá"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex my-3">
                            <button class="btn btn-success px-5">Gửi đi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- sản phẩm trong tầm giá -->
        <div class="product-detail-brand">
            <h3 class="text-center my-2 mb-3 text-uppercase ">Sản phẩm liên quan</h3>
            <div class="row">
                <div class="col-lg-3" v-for="item in products" :key="item._id">
                    <card-vue :product="item"></card-vue>
                </div>
            </div>
        </div>

         <!-- modal -->
         <div v-if="!!product" class="modal fade" :id="'staticBackdrop'+product._id" >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-uppercase text-warning fw-600" id="staticBackdropLabel">Thêm sản phẩm vào giỏ hàng</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start fw-500">
                  <span class="text-start text-info fs-5 text-capitalize">Thêm sản phẩm: {{ product.name }}</span>
                  <div class="add-cart-quantity">
                    <label for="">Số lượng</label>
                        <input v-model="inputQuantity" type="number" name="" id="" placeholder="Nhập số lượng sản phẩm" @input="checkInputQuantity(product, inputQuantity)">
                        <span v-if="!!isValid" class="text-danger">{{isValid}}</span>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Hủy bỏ</button>
                  <button type="button" :disabled="!!isValid" class="btn btn-success" @click="addproductToCart(product._id, inputQuantity)" data-bs-dismiss="modal">Thêm</button>
                </div>
              </div>
            </div>
          </div>
   </div>
  </div>
</template>

<script>
import cardVue from './cardVue.vue';
import format from '@/utils/format';
import cartService from '@/service/cart.service';
export default {
    components:{
        cardVue
    },
    data(){
        return{
            navs:['Giới thiệu','Thông số kỹ thuật', 'Đánh giá'],
            activeNav:'Giới thiệu',
            star:3,
            activeReply:false, 
            indexReply:null,
            isValid:'',
            inputQuantity:1,
            added:false,
        }
    },
    props:['product','spes', 'products'], 
    methods:{
        formatPrice(price){
            return format.formatCurrency(price)
        },
        async addproductToCart(id, quantityCart){
            const checkInputQuantity = this.checkInputQuantity(this.product, quantityCart)
            const user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
            const cartItem = {
                id:id,
                quantityCart:quantityCart,
                typeProduct:this.product.fits? 'accessory':'product'
            }
            if(checkInputQuantity){
                // chưa đăng nhập
                if(Object.keys(user).length<=0){
                    const cartList=[]
                    if(!this.$cookies.isKey('cart')){
                        cartList.unshift(cartItem)
                        this.$cookies.set('cart', JSON.stringify(cartList))
                    }
    
                    else{
                        let productsInCart = this.$cookies.get('cart')
                        const indexInCart = this.isProductInCart(cartItem,productsInCart)
                        if( indexInCart === -1){
                            productsInCart.unshift(cartItem)
                            this.$cookies.set('cart', JSON.stringify(productsInCart))
                        }
                        else{
                            productsInCart[indexInCart].quantityCart+=cartItem.quantityCart
                            this.$cookies.set('cart', JSON.stringify(productsInCart))
                        }
                    }
                    this.added=true
                    setTimeout(()=>{
                        this.added=false
                    }, 1500)
                }
                // đã đăng nhập
                else{
                    try {
                        const data = {
                            userId:user._id,
                            product:cartItem
                        }
                        const response = await cartService.create(data)
                        if(response.data.status){
                            this.added=true
                            setTimeout(()=>{
                                this.added=false
                            }, 1500)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                
            }
        },
        isProductInCart(newItem, Arrayproduct) {
            let index = -1;
            for (let i = 0; i < Arrayproduct.length; i++) {
                if (Arrayproduct[i].id == newItem.id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        checkInputQuantity(product, inputQuantity){
            this.isValid=''
            if(inputQuantity<=0 || inputQuantity==''){
                this.isValid='Số lượng không hợp lệ'
            }
            else if(inputQuantity> product.inputQuantity){
                this.isValid='Số lượng trong kho không đủ'
            }
            else{
                this.isValid=''
            }

            return this.isValid == '' ? true : false
        },
        
    }
}
</script>

<style scoped>
.product-detail{
    min-height: 350px;
    margin: 20px 0;
}
.detail-img{
    display: flex;
    justify-content: center;
    height: 100%;
}
.detail-img img{
    width: 80%;
    height: 350px;
}
.detail-price{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 18px;
}
.detail-price span{
    color:#f30;
    letter-spacing: 1px;
    font-size: 18px;
}
.intro-info{
    font-size: 15px;
}
.btn-add-cart{
    display: block;
    outline: none;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    color: #fff;
    background: #0e8388;
    border-radius: 4px;
}
.detail-nav{
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #ccc;
}
.detail-nav ul{
    display: flex;
    width: 40%;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;
}
.detail-nav ul li{
    cursor: pointer;
    font-size: 18px;
    margin-left: 10px;
    padding: 10px;
}
.detail-nav ul li:hover{
    color:#f30;
    background: #ccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.active-nav{
    color:#f30;
    background: #ccc;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.detail-content p{
    font-size: 17px;
}
.detail-content h5{
    font-weight: 700;
}
.back-history{
    width: 80px;
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    text-transform: uppercase;
}
.detail-spe{
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
.detail-spe ::-webkit-scrollbar{
    width: 0px;
}
.comment{
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
.comment ::-webkit-scrollbar{
    width: 1px;
}
.comment-item{
    border-bottom: 1px solid #ccc;
}
.comment-item img{
    width: 150px;
    height: 100px;
}
.comment-item span{
    font-size: 18px;
    text-transform: capitalize;
    font-weight: 600;
}
.comment-item span i{
    font-size: 23px;
    margin:10px 5px;
}
.active-star{
    color: yellow;
}
.comment-item p{
    margin-top: 10px;
}
.reply{
    cursor: pointer;
    color: #666;
    min-width: 0;
}
.comment-form{
    margin-top: 20px;
    padding: 20px;
    border: 3px solid rgba(255, 0, 0, 0.49);
    border-radius: 5px;
}
.comment-form textarea{
    outline: none;
    padding: 10px;
    height: 100px;
    border-radius: 5px;
}
.start-select:hover i{
    color:yellow;
    cursor: pointer;
}
.start-select i{
    font-size: 20px;
    margin-left: 2px;
}
.product-detail-brand{
    border-top: 1px solid #ccc;
    margin-top: 10px;
}
.add-cart-quantity{
    display: flex;
    flex-direction: column;
}
.add-cart-quantity input{
    outline: none;
    padding: 5px 10px;
    width: 50%;
}
.position-alert{
    position: fixed;
    top: 20px;
    right: 20px;
    width: 500px;
    z-index: 9999;
    background: rgb(112, 255, 112);
    color:#fff;
}
</style>