<template>
    <h3 class="h3" >Bảng Phiếu nhập hàng</h3>
    <table ref="example" class="entry-table">
        <thead class="entry-thead">
            <tr>
                <th class="entry-col1">STT</th>
                <th class="entry-col2">Tên người tạo</th>
                <th class="entry-col4">Tổng giá</th>
                <th class="entry-col4">Nhà cung cấp</th>
                <th class="entry-col3">Ngày tạo</th>
                <th class="entry-col5">Xem chi tiết</th>
                <th class="entry-col5">In phiếu</th>
            </tr>
        </thead>
        <tbody class="entry-tbody">
            <tr v-for="(entry, index) in entrys" :key="entry._id">
                <td class="entry-col1">{{ index + 1 }}</td>
                <td class="entry-col2">{{ entry.createBy.fullName }}</td>
                <td class="entry-col4">{{ entry.totalAmount }}</td>
                <td class="entry-col4">{{ entry.supplier }}</td>
                <td class="entry-col3">{{ entry.createdAt }}</td>
                <td class="entry-col5"><span @click="openDetaiEntry(entry._id)"  class="btn btn-info">Xem chi tiết</span></td>
                <td class="entry-col5"><span class="btn btn-warning" @click="printPDF(entry._id)" >In phiếu</span></td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-info text-left mt-3" @click="activeEntry = true">Tạo phiếu nhập kho</button>
    <!-- From entry -->
    <div class="overlay" v-if="activeEntry">
        <form class="entry-form" action="" @submit.prevent.stop="addEntryReceipt">
            <div class="entry-close" @click="activeEntry = false"><i class="fa-solid fa-xmark"></i></div>
            <h3 class="h3">Tạo phiếu nhập hàng</h3>
            <span class="text-success fs-4" v-if="mesSuccess">{{ mesSuccess }}</span>
            <span class="text-danger fs-4" v-if="mesFail">{{ mesFail }}</span>
            <div class="entry-group col-4">
                <label for="">Giá nhập sản phẩm</label>
                <input required placeholder="Nhà cung cấp" v-model="supplier"/>
            </div>
            <div :class="{ 'entry-info': true, 'entry-scroll': products.length > 2 }">
                <div class="row" v-for="(product, index) in products" :key="index">
                    <div class="entry-group col-4">
                        <label for="">Chọn sản phẩm</label>
                        <select v-model="product.idProduct" name="" id="" required>
                            <option value="">---Chọn tên sản phẩm---</option>
                            <option v-for="item in productsName" :key="item._id" :value="item._id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="entry-group col-4">
                        <label for="">Giá nhập sản phẩm</label>
                        <input required placeholder="Giá nhập" v-model="product.priceImport" />
                    </div>
                    <div class="entry-group col-4">
                        <label for="">Số lượng nhập</label>
                        <input required placeholder="Số lượng nhập" v-model="product.inputQuantity" />
                    </div>
                </div>
            </div>
            <div class="my-3">
                <button class="btn btn-outline-success me-3" @click="addinput">Thêm dòng</button>
                <button class="btn btn-outline-danger" @click="removeinput">Xóa dòng</button>
            </div>
            <button type="submit" class="btn btn-lg btn-info text-white">Tạo phiếu</button>
        </form>
    </div>
    <!-- pagination -->
    <div class="product-pagination">
        <ul class="pagination">
            <li>
                <span @click="previousPage"><i class="fa-solid fa-angles-left"></i></span>
            </li>
            <li><span>...</span></li>
            <li v-for="index in lengthPage" :key="index">
                <span :class="{ active_page: activePage === index }" @click="handlePage(index)">{{ index }}</span>
            </li>

            <li><span>...</span></li>
            <li>
                <span @click="nextPage"><i class="fa-solid fa-angles-right"></i></span>
            </li>
        </ul>
    </div>
<detail-entry-receipt v-if="activeDetailEntry && idEntry !=''" :id="idEntry" @closeEntry="activeDetailEntry=false"></detail-entry-receipt>


</template>

<script>
import print from '@/utils/print'
import productService from '@/service/product.service';
import entryReceiptService from '@/service/entryReceipt.service';
import format from '@/utils/format';
import detailEntryReceipt from './detailEntryReceipt.vue';
import templatePrint from '@/utils/printTemplateEntry'
export default {
    components:{
        detailEntryReceipt
    },
    data() {
        return {
            products: [{ idProduct: '' }],
            supplier:'',
            productsName: [],
            activeEntry: false,
            entrys: [],
            pageNumber: 1,
            pageSize: 5,
            mesSuccess: '',
            mesFail: '',
            lengthPage: 1,
            activePage: 1,
            activeDetailEntry:false,
            idEntry:'',
            entry:{}
        };
    },
    methods: {
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAllEntry();
        },
        openDetaiEntry(idEntry){
            this.activeDetailEntry=true
            this.idEntry=idEntry
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAllEntry();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAllEntry();
            }
        },
        addinput() {
            this.products.push({ idProduct: '' });
        },
        removeinput() {
            if (this.products.length > 1) {
                this.products.pop();
            }
        },
        async addEntryReceipt() {
            console.log(this.products);
            let totalAmount = 0;
            this.products.map((product) => {
                totalAmount += Number(product.priceImport) * Number(product.inputQuantity);
            });
            const data = {
                products: [...this.products],
                totalAmount,
                supplier: this.supplier
            };
            const response = await entryReceiptService.create(data);
            if (response.data.status) {
                this.products = [{ idProduct: '' }];
                this.getAllEntry();
                this.mesSuccess = response.data.mes;
                this.mesFail = '';
            } else {
                this.mesSuccess = '';
                this.mesFail = response.data.mes;
            }
        },
        async getProductsName() {
            try {
                const response = await productService.getProducts();
                this.productsName = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
        async getAllEntry() {
            try {
                const length = await entryReceiptService.getAll();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await entryReceiptService.getAll(this.pageNumber, this.pageSize);
                response.data.forEach(entry => {
                    entry.totalAmount=format.formatCurrency(entry.totalAmount)
                    entry.createdAt=format.formatDate(entry.createdAt)
                });
                this.entrys = response.data;
            } catch (error) {
                console.log(error);
            }
        },
       async printPDF(id){
            const response = await entryReceiptService.getById(id)
            this.entry=response.data
               this.entry.createdAt= format.formatDate(this.entry.createdAt)
               this.entry.totalAmount= format.formatCurrency(this.entry.totalAmount)
               this.entry.products.forEach((product, index) => {
                   this.entry.products[index].total=product.priceImport * product.inputQuantity
                    product.priceImport= format.formatCurrency(product.priceImport)
                    this.entry.products[index].total= format.formatCurrency(this.entry.products[index].total)
                
               });
            const printTemplate= templatePrint( this.entry)
            print(printTemplate)
       }

    },
    mounted() {
        this.getProductsName();
        this.getAllEntry();
    },
};
</script>

<style>
</style>
