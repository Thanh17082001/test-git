<template>
    <div class="admin-accessory">
        <h3>Bảng phụ kiện</h3>
        <div class="d-flex justify-content-between align-items-center my-3">
            <span class="btn btn-info" @click="openFormAdd">Thêm Phụ kiện</span>
            <div class="input-admin-filter">
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
                        <option value="0">Tất cả</option>
                        <option value="createdAt">Ngày tạo</option>
                        <option value="updatedAt">Ngày sửa</option>
                    </select>
                    <button>Lọc</button>
                </form>
                <div class="admin-export">
                    <div class="btn btn-success" @click="exportToExcel">
                        <i class="fa-solid fa-file-excel"></i> Excel
                    </div>
                    <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
                </div>
            </div>
        </div>
        <div class="isSort" :class="{ 'isSort-active': isSort }">
            <span @click="offSort">Đang lọc</span>
        </div>
        <table class="w-100">
            <thead>
                <tr class="row gx-0">
                    <th class="col-1 text-center">STT</th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Tên phụ kiện</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'name')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'name')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('name')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Giá nhập</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'priceImport')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'priceImport')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'priceImport')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('priceImport')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Số lượng nhập</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'inputQuantity')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'inputQuantity')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'inputQuantity')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('inputQuantity')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Giá bán</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'priceSale')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'priceSale')">Từ lớn đến nhỏ</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('priceSale')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">
                        <div class="admin-table-title">
                            <p>Số lượng bán</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'soldQuantity')">Từ nhỏ đến lớn</li>
                                    <li @click="sort(-1, 'soldQuantity')">Từ lớn đến nhỏ</li>
                                    <li @click="sort(0, 'soldQuantity')">Bằng 0</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('soldQuantity')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col">Lịch sử</th>
                    <th class="col text-center">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row gx-0" v-for="(acc, index) in accessorys" :key="acc._id">
                    <td class="col-1 text-center">{{ index + 1 }}</td>
                    <td class="col">{{ acc.name }}</td>
                    <td class="col">{{ fomatCurency(acc.priceImport) }}</td>
                    <td class="col">{{ acc.inputQuantity }}</td>
                    <td class="col">{{ fomatCurency(acc.priceSale) }}</td>
                    <td class="col">{{ acc.soldQuantity }}</td>
                    <td class="col">
                        <span class="d-block h-50 w-100">Tạo:{{ fomatDate(acc.createdAt) }}</span>
                        <span class="d-block h-50 w-100">Sửa:{{ fomatDate(acc.updatedAt) }}</span>
                    </td>
                    <td class="col">
                        <div>
                            <button class="btn btn-outline-warning mx-3" @click="openEditAcc(acc._id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button class="btn btn-outline-info" @click="openDetail(acc._id)">
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- pagination -->
        <div class="product-pagination mt-5">
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

        <!-- add accessory -->
        <div class="overlay" v-if="acctiveAccessory">
            <form action="" class="form-add-accessory" @submit.prevent.stop="addAccessory">
                <div class="d-flex justify-content-end">
                    <i class="fa-solid fa-xmark text-danger fs-1" @click="acctiveAccessory = false"></i>
                </div>
                <h3 class="mb-3">Thêm phụ kiện</h3>
                <span class="fs-4" :class="{ 'text-danger': mesFaild, 'text-success': mesSuccess }">{{
                    mesSuccess || mesFaild
                }}</span>

                <div class="row">
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Tên phụ kiện<span class="text-danger ms-2">*</span></label>
                            <input v-model="infoAccessory.name" required type="text" placeholder="Nhập tên phụ kiện" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ảnh phụ kiện<span class="text-danger ms-2">*</span></label>
                            <input class="entry-file-input" required ref="inputImg" @change="handleImage" type="file" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Giá bán<span class="text-danger ms-2">*</span></label>
                            <input
                                v-model="infoAccessory.priceSale"
                                required
                                type="Number"
                                placeholder="Nhập Giá bán"
                            />
                            <span v-if="!!valid.priceSale" :class="{ 'text-danger': !!valid.priceSale }">{{
                                valid.priceSale
                            }}</span>
                        </div>
                    </div>
                    <!-- loại -->
                    <div class="group d-flex col-lg-4">
                        <div class="d-flex mb-1">
                            <label for="">Loại phụ kiện <span class="required">*</span></label>
                            <span class="btn btn-info btn-brand" @click="activeFormType = true">Mới</span>
                        </div>
                        <!-- Them loại mơi -->
                        <div class="brand">
                            <div class="overlay" v-if="activeFormType">
                                <form action="" class="brand-form" @submit.prevent.stop="addType">
                                    <div class="close-form" @click="closeFormType">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                    <div class="form-head me-5 ms-3">
                                        <h2 class="title">Thêm loại phụ kiện</h2>
                                        <span class="mes-success" v-if="!!mesSuccessType">{{ mesSuccessType }}</span>
                                        <span class="mes-failed" v-if="!!mesFaildType">{{ mesFaildType }}</span>
                                        <div class="lds-dual-ring" v-if="loading"></div>
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Tên loại <span class="required">*</span></label>
                                        <input
                                            v-model="infoType.name"
                                            type="text"
                                            required
                                            placeholder="Nhập tên thương hiệu"
                                        />
                                    </div>
                                    <div>
                                        <button class="btn btn-brand-submit">Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <select name="" id="" class="form-select" v-model="infoAccessory.idType"> 
                            <option value="" class="form-option">--- Chọn loại ---</option>
                            <option v-for="(type, index) in types" :key="index" class="form-option" :value="type._id">
                                {{ type.name }}
                            </option>
                        </select>
                    </div>
                    <!-- thương hiệu -->
                    <div class="group d-flex col-lg-5">
                        <div class="d-flex mb-1">
                            <label for="">Thương hiệu sản phẩm <span class="required">*</span></label>
                            <span class="btn btn-info btn-brand" @click="activeFormbrand = true">Mới</span>
                        </div>
                        <!-- Them thuong hieu mơi -->
                        <div class="brand">
                            <div class="overlay" v-if="activeFormbrand">
                                <form action="" class="brand-form" @submit.prevent.stop="addBrand">
                                    <div class="close-form" @click="closeFormBrand">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                    <div class="form-head me-5 ms-3">
                                        <h2 class="title">Thêm thương hiệu</h2>
                                        <span class="mes-success" v-if="!!mesSuccessType">{{ mesSuccessType }}</span>
                                        <span class="mes-failed" v-if="!!mesFaildType">{{ mesFaildType }}</span>
                                        <div class="lds-dual-ring" v-if="loading"></div>
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Ảnh thương hiệu <span class="required">*</span></label>
                                        <input class="pt-1" @change="handleBrand" ref="fileBrand" type="file" />
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Tên thương hiệu <span class="required">*</span></label>
                                        <input
                                            v-model="infoBrand.name"
                                            type="text"
                                            required
                                            placeholder="Nhập tên thương hiệu"
                                        />
                                    </div>
                                    <div>
                                        <button class="btn btn-brand-submit">Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <select name="" id="" class="form-select" v-model="infoAccessory.idBrand">
                            <option value="" class="form-option">--- Chọn thương hiệu ---</option>
                            <option v-for="brand in brands" :key="brand._id" class="form-option" :value="brand._id">
                                {{ brand.name }}
                            </option>
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="fits-group">
                                <h2 for="">Phù hợp với các sản phẩm<span class="text-danger ms-2">*</span></h2>
                                <ul class="fits">
                                    <li v-if="products.length>0">
                                        <input :checked="infoAccessory.fits.length == products.length" type="checkbox" @change="checkAll">
                                        <label for="">Chọn tất cả</label>
                                    </li>
                                    <li v-for="product in products" :key="product._id">
                                        <input
                                            @change="(event) => handleCheckBox(event, product._id)"
                                            ref="checboxProduct"
                                            type="checkbox"
                                            :value="product._id"
                                            :id="product._id"
                                        />
                                        <label :for="product._id">{{ product.name }}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="spe-group">
                            <label for="">Mô tả<span class="text-danger ms-2">*</span></label>
                            <textarea
                                v-model="infoAccessory.description"
                                required
                                placeholder="Mô tả về phụ kiện"
                                class="col-lg-12 form-description"
                                name=""
                                id=""
                                cols="30"
                                rows="4"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="mt-3 btn btn-success">Thêm phụ kiện</button>
                </div>
            </form>
        </div>
        <!-- edit accessory -->
        <div class="overlay" v-if="acctiveAccessoryEdit">
            <form action="" class="form-add-accessory" @submit.prevent.stop="editAccessory">
                <div class="d-flex justify-content-end">
                    <i class="fa-solid fa-xmark text-danger fs-1" @click="acctiveAccessoryEdit = false"></i>
                </div>
                <h3 class="mb-3">Sửa phụ kiện</h3>
                <span class="fs-4" :class="{ 'text-danger': !!mesFaild, 'text-success': !!mesSuccess }">{{
                    mesSuccess || mesFaild
                }}</span>
                <div class="avatar">
                    <span>
                        <img v-if="!!!imgSrc" :src="'http://localhost:3000' + accessory.image" alt="" />
                        <img v-else :src="imgSrc" alt="" />
                        <label for="avatar"><i class="fa-solid fa-file-pen"></i></label>
                        <input type="file" class="d-none" id="avatar" @change="handleImageEdit" />
                    </span>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="spe-group">
                            <label for="">Tên phụ kiện<span class="text-danger ms-2">*</span></label>
                            <input v-model="accessory.name" required type="text" placeholder="Nhập tên phụ kiện" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="spe-group">
                            <label for="">Giá bán<span class="text-danger ms-2">*</span></label>
                            <input v-model="accessory.priceSale" required type="Number" placeholder="Nhập Giá bán" />
                            <span v-if="!!valid.priceSale" :class="{ 'text-danger': !!valid.priceSale }">{{
                                valid.priceSale
                            }}</span>
                        </div>
                    </div>
                    <!-- loại phụ kiện -->
                    <div class="group d-flex col-lg-4">
                        <div class="d-flex mb-1">
                            <label for="">Loại phụ kiện <span class="required">*</span></label>
                            <span class="btn btn-info btn-brand" @click="activeFormType = true">Mới</span>
                        </div>
                        <!-- Them loại mơi -->
                        <div class="brand">
                            <div class="overlay" v-if="activeFormType">
                                <form action="" class="brand-form" @submit.prevent.stop="addType">
                                    <div class="close-form" @click="closeFormType">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                    <div class="form-head me-5 ms-3">
                                        <h2 class="title">Thêm loại phụ kiện</h2>
                                        <span class="mes-success" v-if="!!mesSuccessType">{{ mesSuccessType }}</span>
                                        <span class="mes-failed" v-if="!!mesFaildType">{{ mesFaildType }}</span>
                                        <div class="lds-dual-ring" v-if="loading"></div>
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Tên loại <span class="required">*</span></label>
                                        <input
                                            v-model="infoType.name"
                                            type="text"
                                            required
                                            placeholder="Nhập tên thương hiệu"
                                        />
                                    </div>
                                    <div>
                                        <button class="btn btn-brand-submit">Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <select name="" id="" class="form-select" v-model="accessory.idType"> 
                            <option value="" class="form-option">--- Chọn loại ---</option>
                            <option v-for="(type, index) in types" :key="index" class="form-option" :value="type._id">
                                {{ type.name }}
                            </option>
                        </select>
                    </div>
                    <!-- thương hiệu -->
                    <div class="group d-flex col-lg-5">
                        <div class="d-flex mb-1">
                            <label for="">Thương hiệu sản phẩm <span class="required">*</span></label>
                            <span class="btn btn-info btn-brand" @click="activeFormbrand = true">Mới</span>
                        </div>
                        <!-- Them thuong hieu mơi -->
                        <div class="brand">
                            <div class="overlay" v-if="activeFormbrand">
                                <form action="" class="brand-form" @submit.prevent.stop="addBrand">
                                    <div class="close-form" @click="closeFormBrand">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                    <div class="form-head me-5 ms-3">
                                        <h2 class="title">Thêm thương hiệu</h2>
                                        <span class="mes-success" v-if="!!mesSuccessType">{{ mesSuccessType }}</span>
                                        <span class="mes-failed" v-if="!!mesFaildType">{{ mesFaildType }}</span>
                                        <div class="lds-dual-ring" v-if="loading"></div>
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Ảnh thương hiệu <span class="required">*</span></label>
                                        <input class="pt-1" @change="handleBrand" ref="fileBrand" type="file" />
                                    </div>
                                    <div class="spe-group me-3">
                                        <label for="">Tên thương hiệu <span class="required">*</span></label>
                                        <input
                                            v-model="infoBrand.name"
                                            type="text"
                                            required
                                            placeholder="Nhập tên thương hiệu"
                                        />
                                    </div>
                                    <div>
                                        <button class="btn btn-brand-submit">Thêm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <select name="" id="" class="form-select" v-model="accessory.idBrand">
                            <option value="" class="form-option">--- Chọn thương hiệu ---</option>
                            <option v-for="brand in brands" :key="brand._id" class="form-option" :value="brand._id">
                                {{ brand.name }}
                            </option>
                        </select>
                    </div>
                    <div class="col-lg-6">
                        <div class="fits-group">
                            <h2 for="">Phù hợp với các sản phẩm<span class="text-danger ms-2">*</span></h2>
                            <ul class="fits" v-if="!!accessory.fits">
                                <li v-if="products.length>0">
                                    <input :checked="accessory.fits.length == products.length" type="checkbox" @change="checkAllEdit">
                                    <label for="">Chọn tất cả</label>
                                </li>
                                <li v-for="product in products" :key="product._id">
                                    <input
                                        @change="(event) => handleCheckBoxEdit(event, product._id)"
                                        :checked="accessory.fits.some((fit) => fit.product == product._id)"
                                        type="checkbox"
                                        :value="product._id"
                                        :id="product._id"
                                        ref="checboxProduct"
                                    />
                                    <label :for="product._id">{{ product.name }}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="spe-group">
                            <label for="">Mô tả<span class="text-danger ms-2">*</span></label>
                            <textarea
                                v-model="accessory.description"
                                required
                                placeholder="Mô tả về phụ kiện"
                                class="col-lg-12 form-description"
                                name=""
                                id=""
                                cols="30"
                                rows="4"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="mt-3 btn btn-success">Sửa phụ kiện</button>
                </div>
            </form>
        </div>

        <!-- chi tiết -->
        <admin-accessory-detail
            v-if="activeDetail"
            :idAcc="id"
            @closeDetail="activeDetail = false"
        ></admin-accessory-detail>
    </div>
</template>

<script>
import productService from '@/service/product.service';
import accessoryService from '@/service/accessory.service';
import format from '@/utils/format';
import exportToExcel from '@/utils/exportToExcel';
import adminAccessoryDetail from './adminAccessoryDetail.vue';
import typeAccService from '@/service/typeAcc.service'
import brandService from '@/service/brand.service';
export default {
    components: {
        adminAccessoryDetail,
    },
    data() {
        return {
            products: [],
            accessorys: [],
            pageNumber: 1,
            pageSize: 8,
            lengthPage: 1,
            activePage: 1,
            infoAccessory: {
                idType:'',
                idBrand:'',
                fits: [],
            },
            valid: {},
            mesFaild: '',
            mesSuccess: '',
            acctiveAccessory: false,
            acctiveAccessoryEdit: false,
            activeDetail: false,
            activeFormType:false,
            activeFormbrand:false,
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            years: [],
            isSort: false,
            filterInput: '',
            idTimeOut: '',
            accessory: {},
            idAcc: '',
            imgSrc: '',
            id: '',
            infoType: {},
            loading:false,
            mesSuccessType:'',
            mesFaildType:'',
            types:[],
            brands:[],
            infoBrand:{}
        };
    },
    methods: {
        closeFormType(){
            this.activeFormType=false
            this.mesFaildType=''
            this.mesSuccessType=''
            this.infoType={}
        },
        async addType(){
            try {
                this.loading=true
                const response = await typeAccService.create(this.infoType)
                this.loading=false
                if(response.data.status){
                    this.mesSuccessType=response.data.mes
                    this.mesFaildType=''
                    this.infoType={}
                }
                else{
                    this.mesFaildType=response.data.mes
                    this.mesSuccessType=''
                }
                this.getType()
            } catch (error) {
                console.log(error);
            }
        },
        async getType(){
            try {
                const response = await typeAccService.getAll()
                this.types=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        async getBrands(){
            try {
                const response = await brandService.getAll()
                this.brands=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        handleBrand(event){
            this.infoBrand.image = event.target.files[0] || '';
        },
        async addBrand(){
            try {
                this.loading=true
                const response = await brandService.create(this.infoBrand)
                this.loading=false
                if(response.data.status){
                    this.mesSuccessType=response.data.mes
                    this.mesFaildType=''
                    this.infoBrand={}
                    this.$refs.fileBrand.value=''
                }
                else{
                    this.mesFaildType=response.data.mes
                    this.mesSuccessType=''
                }
                this.getBrands()
            } catch (error) {
                console.log(error);
            }
        },
        closeFormBrand(){
            this.activeFormbrand=false
            this.mesFaildType=''
            this.mesSuccessType=''
            this.infoBrand={}
        },
        openDetail(id) {
            this.activeDetail = true;
            this.id = id;
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAllAccesory();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAllAccesory();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAllAccesory();
            }
        },
        openFormAdd() {
            this.acctiveAccessory = true;
            (this.infoAccessory = {
                fits: [],
                idType:'',
                idBrand:''
            }),
                (this.mesFaild = ''),
                (this.mesSuccess = ''),
                (this.valid = {});
        },
        fomatDate(date) {
            return format.formatDateNoTime(date);
        },
        fomatCurency(price) {
            return format.formatCurrency(price);
        },
        async getAllProduct() {
            try {
                const response = await productService.getProducts();
                this.products = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
        async getAllProducts(){
            try {
                const response = await productService.getProducts()
                this.products=[...response.data]
            } catch (error) {
                console.log(error);
            }
        },
        async getAllAccesory() {
            try {
                const length = await accessoryService.getAll();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await accessoryService.getAll(this.pageNumber, this.pageSize);
                this.accessorys = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
        handleImage(event) {
            this.infoAccessory.image = event.target.files[0] || '';
        },
        handleCheckBox(e, idProduct) {
            console.log(this.infoAccessory);
            if (e.target.checked) {
                if(this.infoAccessory.fits.length==0){
                    this.infoAccessory.fits.push({ product: idProduct });
                }
                else{
                    const exit = this.infoAccessory.fits.some(fit => fit.product === idProduct)
                    if(!exit){
                        this.infoAccessory.fits.push({ product: idProduct });
                    }
                }
            } else {
                const indexDelValue = this.infoAccessory.fits.findIndex((fit) => fit.product == idProduct);
                this.infoAccessory.fits.splice(indexDelValue, 1);
            }
            
        },
        checkAll(e){
            this.infoAccessory.fits=[]
            if(e.target.checked){
                this.products.forEach(product =>{
                    this.infoAccessory.fits.push({ product: product._id });
                })
                this.$refs.checboxProduct.map((check) => {
                     check.checked = true;
                });
            }
            else{
                this.$refs.checboxProduct.map((check) => {
                     check.checked = false;
                });
            }
        },
        checkAllEdit(e){
            this.accessory.fits=[]
            if(e.target.checked){
                this.products.forEach(product =>{
                    this.accessory.fits.push({ product: product._id });
                })
                this.$refs.checboxProduct.map((check) => {
                     check.checked = true;
                });
            }
            else{
                this.$refs.checboxProduct.map((check) => {
                    this.accessory.fits=[]
                     check.checked = false;
                });
            }
            console.log(this.accessory);
        },
        validateForm(infoAccessory) {
            if (infoAccessory.priceSale < 0) {
                this.valid.priceSale = 'Giá không được là số âm';
            } else {
                this.valid.priceSale = undefined;
            }
            let isValid = false;

            const arrayValid = Object.values(this.valid);
            for (let i = 0; i < arrayValid.length; i++) {
                if (arrayValid[i] === undefined) {
                    isValid = true;
                } else {
                    isValid = false;
                    break;
                }
            }
            return isValid;
        },
        async addAccessory() {
            const isValid = this.validateForm(this.infoAccessory);
            if (isValid) {
                const response = await accessoryService.create(this.infoAccessory);
                if (response.data.status) {
                    this.mesSuccess = response.data.mes;
                    this.mesFaild = false;
                    this.infoAccessory = { fits: [],idType:'',idBrand:'' };
                    this.getAllAccesory();
                    if(this.$refs.checboxProduct){
                        this.$refs.checboxProduct.map((check) => {
                            check.checked = false;
                        });
                    }
                    this.$refs.inputImg.value = '';
                } else {
                    this.mesFaild = response.data.mes;
                    this.mesSuccess = false;
                }
            }
        },
        offSort() {
            this.isSort = false;
            this.getAllAccesory();
            this.filterInput = '';
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await accessoryService.filterByDate(
                day,
                month,
                year,
                field,
                this.pageNumber,
                this.pageSize,
            );
            this.accessorys = [...response.data];
            console.log(response);
        },
        exportToExcel() {
            const data = [];
            this.accessorys.map((acc) => {
                data.push({
                    'Tên phụ kiện': acc.name,
                    'Giá nhập': format.formatCurrency(acc.priceImport),
                    'Số lượng nhập': acc.inputQuantity,
                    'Giá bán': format.formatCurrency(acc.priceSale),
                    'Số lượng bán': acc.soldQuantity,
                    'Ngày tạo': format.formatDate(acc.createdAt),
                    'Ngày sửa': format.formatDate(acc.updatedAt),
                });
            });
            exportToExcel(data, 'PhuKien');
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if (field === 'name') {
                this.accessorys.sort((a, b) => {
                    if (type == 1) {
                        return a[field].localeCompare(b[field]);
                    } else if (type == -1) {
                        return b[field].localeCompare(a[field]);
                    }
                });
            } else {
                // sắp xếp
                this.accessorys.sort((a, b) => {
                    if (type == 1) {
                        return parseFloat(a[field]) - parseFloat(b[field]);
                    } else if (type == -1) {
                        return parseFloat(b[field]) - parseInt(a[field]);
                    }
                });
                // lấy ra bằng 0
                if (type === 0) {
                    const accessoryEqualZero = this.accessorys.filter((acc) => acc[field] === 0);
                    this.accessorys = [];
                    this.accessorys = [...accessoryEqualZero];
                }
            }
        },
        handleFitter(name) {
            if (this.idTimeOut == null) {
                this.isSort = false;
            }
            clearTimeout(this.idTimeOut);
            this.getAllAccesory();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            if (this.filterInput != '') {
                this.isSort = true;
                const regex = new RegExp(this.filterInput.trim(), 'i');
                const abc = this.accessorys.filter((acc) => {
                    return regex.test(acc[name]);
                });
                this.accessorys = abc;
            } else {
                this.isSort = false;
                this.getAllAccesory();
            }
        },
        async getAccessoryByid(id) {
            try {
                const response = await accessoryService.getById(id);
                this.accessory = { ...response.data };
                this.accessory.idType= this.accessory.idType._id
                this.accessory.idBrand= this.accessory.idBrand._id
                const covertFits = this.accessory.fits.map((fit) => ({ product: fit.product._id }));
                this.accessory.fits = [];
                this.accessory.fits = [...covertFits];
            } catch (error) {
                console.log(error);
            }
        },
        openEditAcc(id) {
            this.getAccessoryByid(id);
            this.acctiveAccessoryEdit = true;
        },
        handleImageEdit(event) {
            const image = event.target.files[0] || '';
            const src = URL.createObjectURL(image);
            this.imgSrc = src;
            this.accessory.image = image;
        },
        handleCheckBoxEdit(e, idProduct) {
            console.log(this.accessory.fits.length);
            if (e.target.checked) {
                if(this.accessory.fits.length==0){
                    this.accessory.fits.push({ product: idProduct });
                }
                else{
                   const exit=this.accessory.fits.some(fit => fit.product==idProduct)
                   if(!exit){
                        this.accessory.fits.push({ product: idProduct });
                   }
                }
            } else {
                const indexDelValue = this.accessory.fits.findIndex((fit) => fit.product == idProduct);
                this.accessory.fits.splice(indexDelValue, 1);
            }
            console.log(this.accessory);
        },
        async editAccessory() {
            try {
                console.log(this.accessory);
                const valid = this.validateForm(this.accessory);
                if (valid) {
                    console.log(this.accessory.fits);
                    const response = await accessoryService.update(this.accessory._id, this.accessory);
                    if (response.data.status) {
                        this.mesSuccess = response.data.mes;
                        this.mesFaild = '';
                        this.getAccessoryByid(this.accessory._id);
                        setTimeout(() => {
                            this.mesSuccess = '';
                        }, 2000);
                    } else {
                        this.mesFaild = response.data.mes;
                        this.mesSuccess = '';
                        setTimeout(() => {
                            this.mesFaild = '';
                        }, 2000);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getAllAccesory();
        this.getYears();
        this.getType();
        this.getBrands()
        this.getAllProducts()
    },
};
</script>

<style scoped>
thead {
    height: 50px;
    background: #0e8388;
    line-height: 50px;
    color: #fff;
}
th,
td {
    border: 1px solid #ccc;
    height: 100%;
    padding-left: 10px;
}
td {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
td:nth-child(1) {
    justify-content: center;
}
tr {
    height: 50px;
}

.form-add-accessory {
    position: relative;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 900px;
    min-height: 550px;
    background: #fff;
    padding: 20px 30px;
    border-radius: 5px;
}
.fits-group {
    margin: 10px 0;
}
.fits {
    border: 1px solid #2c2e33;
    display: flex;
    flex-direction: column;
    height: 100px;
    padding: 10px 0px 10px 20px;
    margin: 0;
    list-style: none;
    overflow-y: scroll;
    scroll-behavior: smooth;
    border-radius: 5px;
}
.fits::-webkit-scrollbar {
    width: 0px;
}
.fits li {
    width: 100%;
    text-align: left;
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.fits li input {
    width: 18px;
    height: 18px;
    margin-right: 5px;
    cursor: pointer;
}
.fits li label {
    height: 20px;
    line-height: 20px;
}
.fits-group h2 {
    font-size: 18px;
    margin-bottom: 5px;
    display: flex;
}
textarea {
    border-color: #2c2e33;
}
.admin-sort-list li {
    height: 24px;
}
select {
    border: 1px solid #2c2e33;
}

</style>
