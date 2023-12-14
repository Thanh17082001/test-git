<template>
  <h3 class="text-uppercase text-primary mt-2">Các đơn hàng đã mua</h3>
  <div class="order-history container" >
      <div class="search-order">
        <input v-model="phone" type="text" placeholder="Nhập số điện thoại để tra cứu" required>
        <button @click="search">Tìm kiếm</button>
      </div>
      <div class="row status-order mt-2" v-if="typeOrder=='Buy'">
        <div class="col" v-for="item in statusOrder" :key="item" :class="{'status-order-active':statusActive ==item}">
            <span  class="quantity-status" @click="filter(item)">{{ item }} <span class=" btn btn-outline-danger">{{item == 'Tất cả'? orders.length : orders.filter(item2=> item2.status == item).length}}</span></span>
        </div>
      </div>
      <div class="row status-order mt-2" v-if="typeOrder=='Rental'">
        <div class="col" v-for="item in statusRental" :key="item" :class="{'status-order-active':statusActive ==item}">
            <span  class="quantity-status" @click="filter(item)">{{ item }} <span class=" btn btn-outline-danger">{{item == 'Tất cả'? rentals.length : rentals.filter(item2=> item2.status == item).length}}</span></span>
        </div>
      </div>
      <div class="d-flex">
        <button @click="typeOrder = 'Buy'" class="btn btn-secondary me-3" :class="{'btn-danger': typeOrder=='Buy'}">Mua máy</button>
        <button @click="typeOrder = 'Rental'" type="button" class="btn btn-secondary" :class="{'btn-danger': typeOrder=='Rental'}">Thuê máy</button>
    </div>
     <table class="table">
        <thead>
            <tr class="row"> 
                <th class="col-1">STT</th>
                <th class="col">Mã đơn hàng</th>
                <th class="col">Trạng thái</th>
                <th class="col">Thanh toán</th>
                <th class="col">Ngày mua</th>
                <th class="col">Xem chi tiết</th>
            </tr>
        </thead>
        <tbody v-if="typeOrder=='Buy'">
            <tr class="row" v-for="(order, index) in orders" :key="order._id" >
                <td class="col-1">{{index+1}}</td>
                <td class="col">{{ order._id }}</td>
                <td class="col">{{order.status}}</td>
                <td class="col">{{order.isPayment ? 'Đã thanh toán': 'Chưa thanh toán'}}</td>
                <td class="col">{{formatDate(order.createdAt)}}</td>
                <td class="col"><router-link :to="{name: 'order.detail', params:{id: order._id}, query:{typeOrder: typeOrder}}" class="btn btn-outline-info" ><i class="fa-solid fa-circle-info"></i></router-link>
                </td>
            </tr>
        </tbody>
        <tbody  v-if="typeOrder=='Rental'">
            <tr class="row" v-for="(order, index) in rentals" :key="order._id">
                <td class="col-1">{{index+1}}</td>
                <td class="col">{{ order._id }}</td>
                <td class="col">{{order.status}}</td>
                <td class="col">{{order.isPayment ? 'Đã thanh toán': 'Chưa thanh toán'}}</td>
                <td class="col">{{formatDate(order.createdAt)}}</td>
                <td class="col"><router-link :to="{name: 'order.detail', params:{id: order._id}, query:{typeOrder: typeOrder}}" class="btn btn-outline-info" ><i class="fa-solid fa-circle-info"></i></router-link>
                </td>
            </tr>
        </tbody>
     </table>
  </div>
</template>

<script>
import orderService from '@/service/order.service'
import format from '@/utils/format'
import rentalService from '@/service/rental.service'
export default {
    data(){
        return {
            user:{},
            phone:'',
            statusOrder: ['Tất cả','Đang xử lý', 'Đang vận chuyển', 'Đã giao hàng','Hủy đơn'],
            statusRental:['Tất cả','Đang xử lý', 'Đang vận chuyển', 'Đã giao hàng', 'Đang sử dụng','Dừng thuê','Hủy đơn'],
            statusActive:'Tất cả',
            orders:[],
            rentals:[],
            typeOrder:'Buy'
        }
    },
    methods:{
        async search(){
            try {
                if(Object.keys(this.user)<=0){
                    const response = await orderService.search({phone: this.phone})
                    const response2 = await rentalService.search({phone: this.phone})
                    this.orders=response.data
                    this.rentals=response2.data
                }
                else{
                    const response = await orderService.search({createBy: this.user._id})
                    const response2 = await rentalService.search({createBy: this.user._id})
                    this.orders=response.data
                    this.rentals=response2.data
                }
            } catch (error) {
                console.log(error);
            }
        },
        formatDate(date){
            return format.formatDate(date)
        },
        async filter(status){
            await this.search()
            if(status !== 'Tất cả'){
                if(this.typeOrder=='Buy'){
                   this.orders = this.orders.filter(item => item.status == status)
                }
                else{
                   this.rentals = this.rentals.filter(item => item.status == status)
                }
            }
            this.statusActive=status
        }
    },
    mounted(){
         this.user = JSON.parse(sessionStorage.getItem('user'))?.user ||{}
         this.search()
    }
}
</script>

<style scoped>
.order-history{
    min-height: 400px;
}
.search-order{
    height: 40px;
}

.search-order input{
    width: 300px;
    height: 100%;
    outline: none;
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding-left: 10px;
}
.search-order button{
    height: 101%;
    outline: none;
    border: 1px solid#ccc;
    background: #0e8388;
    color:#fff;
}
.status-order{
    height: 60px;
    background: #f5f5f5;
    align-items: center;
}
.status-order span{
    cursor: pointer;
    text-transform: capitalize;
}
.status-order-active .quantity-status{
    color:red;
    font-size: 20px;
}
.order-history-item{
    background: #f5f5f5;
    margin-top: 20px;
}
.status-item{
    display: block;
    color:#26aa99;
    margin-right: 40px;
    font-size: 18px;
}
.img{
    width: 100%;
    aspect-ratio: 3/2;
}
.quantity-status{
    position: relative;
}
.quantity-status span{
    position: absolute;
    top:-8px;
    right: -27px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
}
</style>