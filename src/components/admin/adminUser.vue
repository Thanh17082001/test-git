<template>
    <div class="admin-user">
        <h3>Bảng Tài khoản người dùng</h3>
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
                    <option value="createdAt">Ngày Tạo</option>
                    <option value="updatedAt">Ngày cập nhật</option>
                </select>
                <button>Lọc</button>
            </form>
            <div class="admin-export">
                <div class="btn btn-success" @click="exportToExcel"><i class="fa-solid fa-file-excel"></i> Excel</div>
                <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div>
            </div>
        </div>
        <div class="isSort" :class="{ 'isSort-active': isSort }">
            <span @click="offSort">Đang lọc</span>
        </div>
        <table class="admin-user-table">
            <thead class="admin-user-thead">
                <tr>
                    <th class="admin-user-col1">STT</th>
                    <th class="admin-user-col2">
                        <div class="admin-table-title">
                            <p>Tên Người dùng</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'fullName')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'fullName')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('fullName')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="admin-user-col3">
                        <div class="admin-table-title text-left">
                            <p>Địa chỉ email</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'email')">Từ A đến Z</li>
                                    <li @click="sort(-1, 'email')">Từ Z về A</li>
                                    <div class="filter-admin-input">
                                        <input
                                            type="text"
                                            placeholder="Tìm sản phẩm theo tên"
                                            v-model="filterInput"
                                            @input="handleFitter('email')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="admin-user-col4">
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
                                            @input="handleFitter('phoneNumber')"
                                        />
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="admin-user-col5">
                        <div class="admin-table-title">
                            <p>Chức danh</p>
                            <div class="admin-sort">
                                <i class="fa-solid fa-sort"></i>
                                <ul class="admin-sort-list">
                                    <li @click="sort(1, 'isStaff')">Nhân viên</li>
                                    <li @click="sort(-1, 'isStaff')">Người dùng</li>
                                </ul>
                            </div>
                        </div>
                    </th>
                    <th class="admin-user-col6">Lịch sử</th>
                    <th class="admin-user-col7">Hành động</th>
                </tr>
            </thead>
            <tbody class="admin-user-tbody">
                <tr v-for="(user, index) in users" :key="user._id" :class="{ isDisable: user.disable }">
                    <td class="admin-user-col1">{{ index + 1 }}.</td>
                    <td class="admin-user-col2">{{ user.fullName }}</td>
                    <td class="admin-user-col3">{{ hideEmail(user.email) }}</td>
                    <td class="admin-user-col4">{{ hidePhoneNumber(user.phoneNumber) }}</td>
                    <td class="admin-user-col5" v-if="user.isStaff">Nhân viên</td>
                    <td class="admin-user-col5" v-else-if="user.isAdmin">Quản trị viên</td>
                    <td class="admin-user-col5" v-else>Người dùng</td>
                    <td class="admin-user-col6">
                        <span><b>Tạo: </b>{{ formatDateNoTime(user.createdAt) }}</span>
                        <br />
                        <span><b>Sửa: </b>{{ formatDateNoTime(user.updatedAt) }}</span>
                    </td>
                    <td class="admin-user-col7">
                        <button
                            @click="upStaff(user._id,'up')"
                            class="btn btn-outline-info me-3"
                            v-if="!user.disable && !user.isStaff"
                            title="Nâng cấp thành tài khoản nhân viên"
                        >
                            <i class="fa-solid fa-turn-up"></i>
                        </button>
                        <button class="btn btn-success me-3" 
                        v-else-if="!user.disable && user.isStaff" 
                        @click="upStaff(user._id,'down')"
                        title="Hạ xuống tài khoản người dùng"
                        >
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button disabled class="btn btn-outline-info me-3" v-else-if="user.disable">
                            <i class="fa-solid fa-turn-up"></i>
                        </button>
                        <button
                            @click="disableUser(user._id, 'unlock')"
                            class="btn btn-outline-danger"
                            v-if="user.disable === true"
                            title="Mở khóa tài khoản"
                        >
                            <i class="fa-solid fa-lock-open"></i>
                        </button>
                        <button @click="disableUser(user._id, 'lock')" class="btn btn-outline-danger  me-3" v-else title="Khóa tài khoản">
                            <i class="fa-solid fa-lock"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

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
    </div>
</template>

<script>
import format from '@/utils/format';
import userService from '@/service/user.service';
import exportToExcel from '@/utils/exportToExcel';
import templateUser from '@/utils/templateUser'
import productService from '@/service/product.service';
export default {
    data() {
        return {
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            years: [],
            pageNumber: 1,
            pageSize: 8,
            users: [],
            idTimeOut: null,
            isSort: false,
            filterInput: '',
            activePage:1,
            lengthPage:0
        };
    },
    methods: {
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
            this.getAllUsers();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getAllUsers();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getAllUsers();
            }
        },
        hidePhoneNumber(phoneNumber) {
            const lastFourDigits = phoneNumber.slice(-4);
            const xString = 'x'.repeat(lastFourDigits.length);
            const hiddenPhoneNumber = phoneNumber.slice(0, -4) + xString;

            return hiddenPhoneNumber;
        },
        hideEmail(email) {
            const lastFourDigits = email.slice(0,8);
            const xString = '*'.repeat(lastFourDigits.length);
            const hidenEmail = xString+email.slice(8);

            return hidenEmail;
        },
        formatCurency(price) {
            return format.formatCurrency(price);
        },
        formatDateNoTime(date) {
            return format.formatDateNoTime(date);
        },

        async getAllUsers() {
            try {
                const length = await userService.getAll();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await userService.getAll(this.pageNumber, this.pageSize);
                this.users = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
        handleFitter(name) {
            clearTimeout(this.idTimeOut);
            this.getAllUsers();
            this.idTimeOut = setTimeout(() => {
                this.filter(name);
            }, 500);
        },
        filter(name) {
            this.isSort = true;
            const regex = new RegExp(this.filterInput.trim(), 'i');
            const abc = this.users.filter((user) => {
                return regex.test(user[name]);
            });
            this.users = abc;
        },

        async sort(type, field) {
            this.type = type;
            this.field = field;
            this.isSort = true;
            if (field === 'fullName' || field === 'email' || field === 'phoneNumber') {
                this.users.sort((a, b) => {
                    if (type == 1) {
                        return a[field].localeCompare(b[field]);
                    } else if (type == -1) {
                        return b[field].localeCompare(a[field]);
                    }
                });
            } else {
                await this.getAllUsers();
                this.users = this.users.filter((user) => {
                    if (type == 1) {
                        return user.isStaff == true;
                    } else {
                        console.log(user.isStaff == false);
                        return user.isStaff == false && !user.isAdmin;
                    }
                });
            }
        },
        offSort() {
            this.isSort = false;
            this.getAllUsers();
            this.filterInput = '';
        },

        async filterDate() {
            this.isSort = true;
            const { day, month, year, field } = this.dateFilter;
            const response = await userService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.users = [...response.data];
        },
        exportToExcel() {
            const data = [];
            this.users.map((user) => {
                return data.push({
                    Tên: user.fullName,
                    'Số điện thoại': user.phoneNumber,
                    email: user.email,
                    'Chức danh': user.isStaff ? 'Nhân viên' : 'Khách hàng',
                });
            });
            exportToExcel(data, 'user');
        },
        async exportToPDF(){
            const data= templateUser(this.users)

            const response = await productService.exportPDF({ data: data }, 'vertical');
            const blob = new Blob([ response.data], {
                type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.setAttribute('download', 'TaiKhoan.pdf');
            document.body.appendChild(link);
            link.click();
        },
        async disableUser(id, action) {
            if (action === 'lock' && confirm('Hành động này sẽ khóa tài khoản')) {
                const response = await userService.updateUser(id, { disable: true, isStaff: false });
                if (response.data.status) {
                    this.getAllUsers();
                }
            } else if (confirm('Mở khóa cho tài khoản này') && action === 'unlock') {
                const response = await userService.updateUser(id, { disable: false });
                if (response.data.status) {
                    this.getAllUsers();
                }
            }
        },
        async upStaff(id,type) {
            if (type=='up' && confirm('Nâng cấp thành tài khoản nhân viên')) {
                const response = await userService.updateUser(id, { isStaff: true });
                if (response.data.status) {
                    this.getAllUsers();
                }
            } else if(type=='down' && confirm('Chuyển thành tài khoản thường')){
                const response = await userService.updateUser(id, { isStaff: false });
                if (response.data.status) {
                    this.getAllUsers();
                }
            }
        },
    },
    mounted() {
        this.getYears();
        this.getAllUsers();
    },
};
</script>

<style></style>
