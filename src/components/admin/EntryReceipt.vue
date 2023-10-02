<template>
    <h3 class="h3" >Bảng Phiếu nhập hàng</h3>
    <div class="input-admin-filter admin-export-entry">
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
                    <option value="createdAt">Ngày Tạo</option>
                    <option value="updatedAt">Ngày cập nhật</option>
                </select>
                <button>Lọc</button>
            </form>
            <div class="admin-export">
                <div class="btn btn-success" @click="exportExcel">
                    <i class="fa-solid fa-file-excel"></i> Excel
                </div>
                <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
            </div>
    </div>
    <table ref="example" class="entry-table">
        <thead class="entry-thead">
            <tr>
                <th class="entry-col1 text-center">STT</th>
                <th class="entry-col2">
                    <div class="admin-table-title">
                            <p>Tên người tạo</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'createBy')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'createBy')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('createBy')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                </th>
                <th class="entry-col4">
                    <div class="admin-table-title">
                            <p>Tổng giá</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'totalAmount')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'totalAmount')">Từ lớn đến nhỏ</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('totalAmount')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                </th>
                <th class="entry-col4">
                    <div class="admin-table-title">
                            <p>Nhà cung cấp</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'supplier')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'supplier')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('supplier')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                </th>
                <th class="entry-col3 text-center">Ngày tạo</th>
                <th class="entry-col5 text-center">Xem chi tiết</th>
                <th class="entry-col5 text-center">In phiếu</th>
            </tr>
        </thead>
        <tbody class="entry-tbody">
            <tr v-for="(entry, index) in entrys" :key="entry._id">
                <td class="entry-col1 text-center">{{ index + 1 }}</td>
                <td class="entry-col2 text-center">
                    {{ entry.createBy.fullName }}

                </td>
                <td class="entry-col4 text-center">{{ formatCurrency(entry.totalAmount) }}</td>
                <td class="entry-col4 text-center">{{ entry.supplier.name }}</td>
                <td class="entry-col3 text-center">{{ entry.createdAt }}</td>
                <td class="entry-col5 text-center"><span @click="openDetaiEntry(entry._id)"  class="btn btn-info">Xem chi tiết</span></td>
                <td class="entry-col5 text-center"><span class="btn btn-warning" @click="printPDF(entry._id)" >In phiếu</span></td>
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
            
            <div class="row">
                <div class="entry-group col-6">
                    <label for="">Nhà Cung cấp <span class="btn btn-info btn-entry" @click="openSupplier">Mới</span></label>
                    <select v-model="Idsupplier" name="" id="" required>
                            <option value="">---Chọn tên nhà cung cấp---</option>
                            <option v-for="item in suppliers" :key="item._id" :value="item._id">
                                {{ item.name }}

                            </option>
                        </select>
                </div>
                <div class="entry-group col-lg-6">
                    <label for="">Ảnh chụp thực tế</label>
                    <input class="entry-file-input" ref="entryInputFile" type="file" @change="handleImage">
                </div>
            </div>
            <div :class="{ 'entry-info': true, 'entry-scroll': products.length > 1 }">
                <div class="row" v-for="(product, index) in products" :key="index">
                    <div class="row">
                        <div class="entry-group col-4">
                            <label for="">Chọn loại hàng </label>
                            <select v-model="product.typeProduct" name="" id="" required>
                                <option value="">---Chọn Loại hàng---</option>
                               <option value="accessory">Phụ kiện</option>
                               <option value="product">Sản phẩm</option>
                            </select>
                        </div>
                    </div>
                    <div class="entry-group col-4" v-if="product.typeProduct == 'product'">
                        <label for="">Chọn sản phẩm </label>
                        <select v-model="product.idProduct" name="" id="" required>
                            <option value="">---Chọn tên sản phẩm---</option>
                            <option v-for="item in productsName" :key="item._id" :value="item._id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="entry-group col-4" v-if="product.typeProduct == 'accessory'">
                        <label for="">Chọn Phụ kiện</label>
                        <select v-model="product.idProduct" name="" id="" required>
                            <option value="">---Chọn phụ kiện---</option>
                            <option v-for="item in accessorys" :key="item._id" :value="item._id">
                                {{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div class="entry-group col-4">
                        <label for="">Giá nhập sản phẩm</label>
                        <input required placeholder="Giá nhập" v-model="product.priceImport" type="number" />
                    </div>
                    <div class="entry-group col-4">
                        <label for="">Số lượng nhập</label>
                        <input required placeholder="Số lượng nhập" v-model="product.inputQuantity" type="number" />
                    </div>
                </div>
            </div>
            <div class="my-3">
                <span class="btn btn-outline-success me-3" @click="addinput">Thêm dòng</span>
                <span class="btn btn-outline-danger" @click="removeinput">Xóa dòng</span>
            </div>
            <button type="submit" class="btn btn-lg btn-info text-white">Tạo phiếu</button>
            <div class="entry-img" v-if="!!imgSrc">
                <img :src="imgSrc" ref="entryImg" alt="" class="entry-img" >
                <i class="fa-solid fa-xmark" @click="deleteEntryImg"></i>
            </div>
        </form>

        <!-- form supplier  -->
        <div class="overlay" v-if="activeSupplier">
                <form action="" class="form-supplier" @submit.prevent.stop="createSupplier">
                    <div class="entry-close" @click="closeSupplier"><i class="fa-solid fa-xmark"></i></div>
                    <h5 class="h5">Thêm nhà cung cấp</h5>
                    <span class="text-success fs-4" v-if="mesSuccess">{{ mesSuccess }}</span>
                    <span class="text-danger fs-4" v-if="mesFail">{{ mesFail }}</span>
                    <div class="row">
                        <div class="entry-group col-lg-12">
                            <label for="">Tên nhà cũng cấp</label>
                            <input v-model="supplier.name" type="text" placeholder="Tên nhà cung cấp">
                        </div>
                        <div class="entry-group col-lg-12">
                            <label for="">Địa chỉ</label>
                            <input v-model="supplier.address" type="text" placeholder="Địa chỉ nhà cung cấp">
                        </div>
                        <div class="entry-group col-lg-12">
                            <label for="">Số điện thoại </label>
                            <input v-model="supplier.phone" type="text" placeholder="Số điện thoại nhà cung cấp">
                        </div>
                    </div>
                    <button class="btn btn-success mt-3">Thêm nhà cung cấp</button>
                </form>
            </div>
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
<detail-entry-receipt v-if="activeDetailEntry" :id="idEntry" @closeEntry="activeDetailEntry=false"></detail-entry-receipt>


</template>

<script>
import print from '@/utils/print'
import exportToExcel from '@/utils/exportToExcel'
import productService from '@/service/product.service';
import entryReceiptService from '@/service/entryReceipt.service';
import supplierService from '@/service/supplier.service'
import format from '@/utils/format';
import detailEntryReceipt from './detailEntryReceipt.vue';
import templatePrint from '@/utils/printTemplateEntry'
import templateEntryPDF from '@/utils/templateEntryPdf'
import accessoryService from '@/service/accessory.service';
export default {
    components:{
        detailEntryReceipt
    },
    data() {
        return {
            products: [{ idProduct: '', typeProduct:'product' }],
            accessorys:[],
            Idsupplier:'',
            supplier:{},
            suppliers:[],
            activeSupplier:false,
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
            entry:{},
            image:'',
            imgSrc:'',
            years:[],
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            idTimeOut:null,
            filterInput:''
            
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
            this.products.push({ idProduct: '', typeProduct:'product' });
        },
        removeinput() {
            if (this.products.length > 1) {
                this.products.pop();
            }
        },
        handleImage(event){
            this.image = event.target.files[0] || '';
            const src = URL.createObjectURL(this.image)
            this.imgSrc= src
        },
        deleteEntryImg(){
            this.image=null,
            this.imgSrc=''
            this.$refs.entryInputFile.value=''
        },
        closeSupplier(){
            this.activeSupplier=false
            this.mesFail='',
            this.mesSuccess=''
        },
        openSupplier(){
            this.activeSupplier=true
            this.mesFail='',
            this.mesSuccess=''
        },
        async createSupplier(){
            try {
                const response = await supplierService.create({data:this.supplier})
                if(response.data.status){
                    this.mesFail=''
                    this.mesSuccess=response.data.mes
                    this.supplier={}
                    this.getSupplier()
                }
                else{
                    this.mesSuccess=''
                    this.mesFail=response.data.mes
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getSupplier(){
            try {
                const response = await supplierService.getAll()
                this.suppliers=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        async addEntryReceipt() {
            let totalAmount = 0;
            this.products.map((product) => {
                totalAmount += Number(product.priceImport) * Number(product.inputQuantity);
            });
            const data = {
                products: [...this.products],
                totalAmount,
                supplier: this.Idsupplier || undefined,
                image:this.image || undefined
            };
            const response = await entryReceiptService.create(data);
            if (response.data.status) {
                this.products = [{ idProduct: '' }];
                this.Idsupplier=''
                this.mesSuccess = response.data.mes;
                this.mesFail = '';
                this.image=null,
                this.imgSrc=''
                this.$refs.entryInputFile.value=''
                this.getAllEntry();
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
        async getAccessory() {
            try {
                const response = await accessoryService.getAll();
                this.accessorys = [...response.data];
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
            const image= this.entry.image ? this.entry.image.data : undefined
            print(printTemplate,'Phiếu in' , image)
       },
    //    async exportToExcel() {
    //         const data=[]
    //         this.entrys.forEach((entry, index) =>{
    //             data.push({
    //                 STT:index+1,
    //                 'Người tạo phiếu':entry.createBy.fullName,
    //                 'Nhà Cung cấp': entry.supplier.name,
    //                 'Tổng giá': this.formatCurrency(entry.totalAmount),
    //                 'Ngày tạo':entry.createdAt
    //             })
    //         })
            
    //         const response = await productService.exportExcel({ data });
    //         const blob = new Blob([response.data], {
    //             type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //         });
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'PhieuKho.xlsx');
    //         document.body.appendChild(link);
    //         link.click();
    //     },

        async exportToPDF(){
            const data= templateEntryPDF(this.entrys)
           
            const response = await productService.exportPDF({ data: data });
            const blob = new Blob([ response.data], {
                type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'TatCaPhieuNhapKho.pdf');
            document.body.appendChild(link);
            link.click();
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
            for (let i = 1; i <=5; i++) {
                this.years.push(yearsTarget + i);
            }
        },
        formatCurrency(price){
            return format.formatCurrency(price)
        },
        async filterDate() {
            const { day, month, year, field } = this.dateFilter;
            const response = await entryReceiptService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            response.data.forEach(entry => {
                entry.createdAt=format.formatDate(entry.createdAt)
            });
            this.entrys = response.data;
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            if (field === 'createBy') {
                this.entrys.sort((a, b) => {
                    if (type == 1) {
                        return a[field].fullName.localeCompare(b[field].fullName);
                    } else if (type == -1) {
                        return b[field].fullName.localeCompare(a[field].fullName);
                    }
                });
            }else if(field === 'supplier'){
                this.entrys.sort((a, b) => {
                    if (type == 1) {
                        return a[field].name.localeCompare(b[field].name);
                    } else if (type == -1) {
                        return b[field].name.localeCompare(a[field].name);
                    }
                });
            }
            else {
                // sắp xếp
                this.entrys.sort((a, b) => {
                    
                    if (type == 1) {
                        return parseFloat(a[field]) - parseFloat(b[field]);
                    } else if (type == -1) {
                        return parseFloat(b[field]) - parseInt(a[field]);
                    }
                });
                // lấy ra bằng 0
                if (type === 0) {
                    const productEqualZero = this.entrys.filter((product) => product[field] === 0);
                    this.entrys = [];
                    this.entrys = [...productEqualZero];
                }
            }
        },
        handleFitter(name) {
            clearTimeout(this.idTimeOut);
            this.getAllEntry()
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 300);
        },
        filter(name) {
            const regex = new RegExp(this.filterInput.trim(), 'i');
            const abc = this.entrys.filter((entry) => {
                if (name === 'createBy') {
                    return regex.test(entry[name].fullName);
                }
                else if(name==='supplier'){
                    return regex.test(entry[name].name);
                }
                 else {
                    return entry[name] >= this.filterInput;
                }
            });
            this.entrys = abc;
        },
        // export client
        exportExcel() {
            const data=[]
            this.entrys.forEach((entry, index) =>{
                data.push({
                    STT:index+1,
                    'Người tạo phiếu':entry.createBy.fullName,
                    'Nhà Cung cấp': entry.supplier.name,
                    'Tổng giá': this.formatCurrency(entry.totalAmount),
                    'Ngày tạo':entry.createdAt
                })
            })
        const filename = 'phieu_nhap_kho';
        exportToExcel(data, filename);
      }

    },
    mounted() {
        this.getProductsName();
        this.getAllEntry();
        this.getSupplier()
        this.getYears()
        this.getAccessory()
    },
};
</script>

<style>
</style>
