<template>
    <div class="admin-staff">
        <h3>Bảng nhân viên</h3>
        <div class="d-flex justify-content-between align-items-center my-3">
            <div class="ms-3 text-white btn btn-info h-50" @click="activeStaff = true">Thêm nhân viên mới</div>
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
                        <option value="dateOfBirth">Ngày sinh</option>
                        <option value="startDate">Ngày vào làm</option>
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
                    <th class="col-1 ps-2 text-center">STT</th>
                    <th class="col-2 ps-2">
                        <div class="admin-table-title">
                            <p>Tên Nhân viên</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'fullName')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'fullName')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhạp từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('fullName')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col ps-2">
                        <div class="admin-table-title">
                            <p>Số điện thoại</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm Số điện thoại"
                                            v-model="filterInput"
                                            @input="handleFitter('phone')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col ps-2">
                        <div class="admin-table-title">
                            <p>Chức vụ</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'position')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'position')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhập từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('position')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col-2 ps-2">
                        <div class="admin-table-title">
                            <p>Phòng ban</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'department')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'department')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Nhập từ khóa..."
                                            v-model="filterInput"
                                            @input="handleFitter('department')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col ps-2">
                        <div class="admin-table-title">
                            <p>Giới tính</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort('Nam', 'gender')">Nam</li>
                                    <li @click="sort('Nữ', 'gender')">Nữ</li>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="col ps-2">Ngày sinh</th>
                    <th class="col ps-2">Ngày vào làm</th>
                    <th class="col ps-2">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr class="row gx-0" v-for="(staff, index) in staffs" :key="staff._id">
                    <td class="col-1 ps-2 text-center">{{ index + 1 }}.</td>
                    <td class="col-2 ps-2"> <img class="staff-avatar" :src="'http://localhost:3000'+staff.avatar" alt=""> {{ staff.fullName }}</td>
                    <td class="col ps-2">{{ staff.phone }}</td>
                    <td class="col ps-2">{{ staff.position }}</td>
                    <td class="col-2 ps-2">{{ staff.department }}</td>
                    <td class="col ps-2">{{ staff.gender }}</td>
                    <td class="col ps-2">{{ staff.dateOfBirth }}</td>
                    <td class="col ps-2">{{ staff.startDate }}</td>
                    <td class="col ps-2">
                        <span class="btn btn-outline-warning me-3" title="Sửa đổi thông tin" @click="editStaff(staff._id)"><i class="fa-solid fa-pen-to-square"></i></span>
                        <span  @click="detailStaff(staff._id)" class="btn btn-outline-info" title="Xem chi tiết"><i class="fa-solid fa-circle-info"></i></span>
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
        <!-- fom add staff -->
        <div class="overlay" v-if="activeStaff">
            <form @click.stop="" action="" class="admin-form-staff" @submit.prevent.stop="addStaff">
                <div class="d-flex justify-content-end">
                    <i class="fa-solid fa-xmark text-danger fs-1" @click="activeStaff = false"></i>
                </div>
                <h3 class="mb-3">Thêm nhân viên</h3>
                <span class="fs-4" :class="{ 'text-danger': mesFaild, 'text-success': mesSuccess }">{{
                    mesSuccess || mesFaild
                }}</span>
                <div class="row">
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Tên nhân viên <span class="text-danger">*</span></label>
                            <input
                                v-model="infoStaff.fullName"
                                required
                                type="text"
                                placeholder="Họ và tên nhân viên"
                            />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Giới tính <span class="text-danger">*</span></label>
                            <select name="" id="" v-model="infoStaff.gender">
                                <option value="">---Chọn giới tính----</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ngày sinh nhật <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.dateOfBirth" required type="date" placeholder="Ngày sinh nhật" />
                            <span v-if="!!valid.dateOfBirth" :class="{ 'text-danger': !!valid.dateOfBirth }">{{
                                valid.dateOfBirth
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Email <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.email" required type="text" placeholder="Tài khoản email" />
                            <span v-if="!!valid.email" :class="{ 'text-danger': !!valid.email }">{{
                                valid.email
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Số điện thoại <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.phone" required type="text" placeholder="Số điện thoại" />
                            <span v-if="!!valid.phone" :class="{ 'text-danger': !!valid.phone }">{{
                                valid.phone
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Địa chỉ <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.address" required type="text" placeholder="Địa chỉ" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ngày bắt đầu <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.startDate" required type="date" placeholder="Ngày được tuyển" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Vị trí <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.position" required type="text" placeholder="Vị trí" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Phòng ban <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.department" required type="text" placeholder="Phòng ban" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Lương <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.salary" required type="number" placeholder="Mức lương" />
                            <span v-if="!!valid.salary" :class="{ 'text-danger': !!valid.salary }">{{
                                valid.salary
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4" v-if="infoStaff.account == 2">
                        <div class="spe-group">
                            <label for="">Mật khẩu cho tài khoản <span class="text-danger">*</span></label>
                            <input v-model="infoStaff.password" required type="password" placeholder="Mật khẩu" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Tài khoản nhân viên<span class="text-danger">*</span></label>
                            <select name="" id="" v-model="infoStaff.account">
                                <option value="">---Chọn----</option>
                                <option value="1">Đã có</option>
                                <option value="2">Chưa có</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ảnh nhân viên</label>
                            <input class="entry-file-input" @change="handleImage" type="file" placeholder="Địa chỉ" />
                        </div>
                    </div>
                </div>
                <div>
                    <button class="mt-3 btn btn-success">Thêm nhân viên</button>
                </div>
            </form>
        </div>
        <!-- form edit -->
        <admin-form-edit-staff v-if="activeStaffEdit"  :idStaff="idStaff" @closeFormEdit="activeStaffEdit=false" @updated="getAll"></admin-form-edit-staff>
        <!-- detail staff -->
        <admin-staff-detail-vue v-if="activeStaffDetail" :idStaff="idStaff" @closeDetail="activeStaffDetail=false"></admin-staff-detail-vue>
    </div>
</template>

<script>
import staffService from '@/service/staff.service';
import productService from '@/service/product.service';
import format from '@/utils/format';
import exportToExcel from '@/utils/exportToExcel';
import adminFormEditStaff from './adminEditStaff.vue';
import adminStaffDetailVue from './adminStaffDetail.vue';
import templateStaff from '@/utils/templateStaff';
export default {
    components:{
        adminFormEditStaff,
        adminStaffDetailVue
    },
    data() {
        return {
            activeStaff: false,
            activeStaffEdit: false,
            activeStaffDetail: false,
            infoStaff: { gender: '', account: '' },
            mesFaild: '',
            mesSuccess: '',
            valid: {},
            staffs: [],
            pageNumber: 1,
            pageSize: 8,
            lengthPage: 1,
            activePage: 1,
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            years: [],
            isSort: false,
            idTimeOut:null,
            filterInput:'',
            idStaff:''
        };
    },
    methods: {
        handleImage(event){
            this.infoStaff.avatar=event.target.files[0] || '';
            console.log(this.infoStaff);
        },
        closeForm() {
            this.activeStaff = false;
            this.infoStaff = { gender: '' };
            this.mesFaild = '';
            this.mesSuccess = '';
        },
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getAll();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAll();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAll();
            }
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await staffService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.staffs = [...response.data];
            this.staffs.map((staff) => {
                staff.dateOfBirth = format.formatDateNoTime(staff.dateOfBirth);
                staff.startDate = format.formatDateNoTime(staff.startDate);
            });
        },
        handleFitter(name) {
            if(this.idTimeOut==null){
                this.isSort=false
            }
            clearTimeout(this.idTimeOut);
            this.getAll();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            if(this.filterInput !=''){
                this.isSort = true;
                const regex = new RegExp(this.filterInput.trim(), 'i');
                const abc = this.staffs.filter((staff) => {
                    return regex.test(staff[name]);
                });
                this.staffs = abc;
            }
            else{
                this.isSort = false;
                this.getAll()
            }
        },
        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if (field === 'fullName' || field === 'position' || field === 'derpartment') {
                this.staffs.sort((a, b) => {
                    if (type == 1) {
                        return a[field].localeCompare(b[field]);
                    } else if (type == -1) {
                        return b[field].localeCompare(a[field]);
                    }
                });
            } else {
                await this.getAll();
                this.staffs = this.staffs.filter((staff) => staff.gender ==type);
            }
        },
        offSort() {
            this.isSort = false;
            this.getAll();
            this.filterInput = '';
        },
        validateForm(infoStaff) {
            const today = new Date();
            const dateOfBirth = new Date(infoStaff.dateOfBirth);
            const age = today.getFullYear() - dateOfBirth.getFullYear();
            const phoneRegex = /^[0-9]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (age <= 18) {
                this.valid.dateOfBirth = 'Chưa đủ 18 tuổi';
            } else {
                this.valid.dateOfBirth = undefined;
            }

            if (!phoneRegex.test(infoStaff.phone) || !infoStaff.phone.length > 10) {
                this.valid.phone = 'Số điện thoại không hợp lệ';
            } else {
                this.valid.phone = undefined;
            }

            if (infoStaff.salary < 0) {
                this.valid.salary = 'Không được là số âm';
            } else {
                this.valid.salary = undefined;
            }

            if (!emailRegex.test(infoStaff.email)) {
                this.valid.email = 'Email không hợp lệ';
            } else {
                this.valid.email = undefined;
            }
            let isValid = false;
            const arrayValid= Object.values(this.valid)
            for(let i=0;i<arrayValid.length;i++){
                if(arrayValid[i]===undefined){
                    isValid = true;
                } else {
                    isValid = false;
                    break
                }
            }
            return isValid;
        },
        async addStaff() {
            try {
                const isValid = this.validateForm(this.infoStaff);
                if (isValid) {
                    const response = await staffService.create(this.infoStaff);
                    if (response.data.status) {
                        this.mesSuccess = response.data.mes;
                        this.mesFaild = false;
                        this.infoStaff = { gender: '', account: ''  };
                        this.getAll()
                    } else {
                        this.mesFaild = response.data.mes;
                        this.mesSuccess = false;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        editStaff(id){
            this.activeStaffEdit=true
            this.idStaff=id
        },
        detailStaff(id){
            this.activeStaffDetail=true
            this.idStaff=id
        },
        async getAll() {
            try {
                const length = await staffService.getAll();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await staffService.getAll(this.pageNumber, this.pageSize);
                this.staffs = [...response.data];
                this.staffs.map((staff) => {
                    staff.dateOfBirth = format.formatDateNoTime(staff.dateOfBirth);
                    staff.startDate = format.formatDateNoTime(staff.startDate);
                });
            } catch (error) {
                console.log(error);
            }
        },
        exportToExcel() {
            const data=[]
            this.staffs.map(staff=>{
                data.push({
                    'Họ và Tên': staff.fullName,
                    'Ngày sinh':staff.dateOfBirth,
                    'Số điện thoại':staff.phone,
                    'Giới tính':staff.gender,
                    'email':staff.email,
                    'Địa chỉ':staff.address,
                    'Chức vụ':staff.position,
                    'Phòng ban':staff.department,
                    'Ngày bắt đầu':staff.startDate,
                    'Lương':format.formatCurrency(staff.salary)
                })
            })
            exportToExcel(data, 'NhanVien');
        },
        async exportToPDF(){
            const data= templateStaff(this.staffs)
            const response = await productService.exportPDF({ data: data });
            const blob = new Blob([ response.data], {
                type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'Nhanvien.pdf');
            document.body.appendChild(link);
            link.click();
        },
    },
    mounted() {
        this.getAll();
        this.getYears();
    },
};
</script>

<style scoped>
.admin-form-staff {
    position: relative;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    width: 900px;
    min-height: 550px;
    background: #fff;
    padding: 20px 30px;
}
label {
    text-align: left;
}
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
}
td {
    display: flex;
    align-items: center;
}
td:nth-child(1) {
    justify-content: center;
}
tr {
    height: 50px;
}
li {
    height: 24px;
}
.entry-file-input{
    display: flex;
    padding: 5px;
}
.staff-avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 5px;
    border: 2px solid #14667b;
    padding: 3px;

}
</style>
