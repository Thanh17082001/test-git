<template>
    <div class="alert alert-success admin-alert" role="alert" v-if="alert">Thay đổi quyền thành công</div>
    <h3>Phân quyền cho tài khoản nhân viên</h3>
    <div class="d-flex justify-content-start my-3">
        <button class="btn btn-info" @click="activeAddRole = true">Thêm Quyền</button>
    </div>
    <table class="w-100">
        <thead>
            <tr class="row">
                <th class="col-1">STT</th>
                <th class="col">
                    <span class="admin-role-name1">Email</span>
                    <span class="admin-wall"></span>
                    <span class="admin-role-name2">Tên quyền</span>
                </th>
                <th class="col" v-for="role in roles" :key="role._id">
                    {{ role.roleName }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr class="row" v-for="(user, index) in users" :key="user._id">
                <td class="col-1">
                    {{ index + 1 }}
                </td>
                <td class="col">
                    {{ user.email }}
                </td>
                <td class="col" v-for="role in roles" :key="role._id">
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        :checked="user.roles.some((roleUser) => roleUser.roleId == role._id)"
                        :value="role._id"
                        @change="(event) => updateRole(event, user._id)"
                    />
                </td>
            </tr>
        </tbody>
    </table>
    <!-- quyen moi -->
    <div class="overlay" v-if="activeAddRole" @click="activeAddRole = false">
        <form @click.stop="" action="" @submit.prevent.stop="addRole">
            <h3>Thêm quyền mới</h3>
            <div>
                <label for="">Tên quyền <span>*</span></label>
                <input type="text" placeholder="Tên quyền..." v-model="inFoRole.roleName" />
            </div>
            <button>Thêm quyền</button>
        </form>
    </div>
    <!-- loading -->
    <div class="overlay" v-if="isLoading">
        <div class="center-laoding">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <!-- phan trang -->
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
</template>

<script>
import userService from '@/service/user.service';
import roleService from '@/service/role.service';
export default {
    data() {
        return {
            ischeck: false,
            users: [],
            roles: [],
            inFoRole: { roleName: '' },
            isLoading: false,
            alert: false,
            activeAddRole: false,
            pageNumber: 1,
            pageSize: 8,
            lengthPage: 1,
            activePage:1
        };
    },
    methods: {
        handlePage(index) {
            this.activePage = index;
            this.pageNumber = index;
            this.getUsers();
            this.isSort = false;
        },
        nextPage() {
            if (this.pageNumber >= this.lengthPage) {
                alert('Trang cuối');
            } else {
                this.pageNumber += 1;
                this.activePage += 1;
                this.getUsers();
            }
        },
        previousPage() {
            if (this.pageNumber <= 1) {
                alert('Trang đầu');
            } else {
                this.pageNumber -= 1;
                this.activePage -= 1;
                this.getUsers();
            }
        },
        async updateRole(event, userId) {
            try {
                if (event.target.checked) {
                    this.isLoading = true;
                    await userService.updateRole(userId, { roleId: event.target.value, type: 'add' });
                    this.isLoading = false;
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 1000);
                    this.getUsers();
                } else {
                    this.isLoading = true;
                    await userService.updateRole(userId, { roleId: event.target.value, type: 'remove' });
                    this.isLoading = false;
                    this.alert = true;
                    setTimeout(() => {
                        this.alert = false;
                    }, 1500);
                    this.getUsers();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getUsers() {
            try {
                const length = await userService.getAll();
                this.lengthPage = Math.ceil(length.data.length / this.pageSize);
                const response = await userService.getAll(this.pageNumber, this.pageSize);

                this.users = response.data.filter((user) => {
                    return user.isStaff === true;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async addRole() {
            try {
                console.log(this.inFoRole);
                if (this.inFoRole.roleName == '') {
                    alert('Nhập tên quyền');
                    return;
                }
                const response = await roleService.create(this.inFoRole);
                if (response.data.status) {
                    this.getRoles();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getRoles() {
            try {
                const response = await roleService.getAll();
                this.roles = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.getUsers();
        this.getRoles();
    },
};
</script>

<style scoped>
th,
td {
    border: 1px solid #ccc;
    text-align: center;
    height: 50px;
    line-height: 50px;
    padding: 0;
    position: relative;
    overflow: hidden;
}
input[type='checkbox'] {
    width: 20px;
    height: 20px;
}

form {
    width: 300px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
}
form div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

form label {
    margin: 5px 0;
    color: #666;
}

form label span {
    color: red;
    display: inline-block;
    font-size: 18px;
}
form input {
    width: 100%;
    outline: none;
    height: 40px;
    padding: 10px;
    border: 1px solid #666;
}

form button {
    outline: none;
    width: 100px;
    height: 40px;
    border: none;
    background: #12ec12;
    border-radius: 5px;
    margin-top: 10px;
}

/* .admin-wall {
    position: absolute;
    top: 10%;
    left: -50%;
    display: block;
    height: 1px;
    width: 172%;
    border: 1px solid #ccc;
    transform: rotate(11deg);
} */

.admin-role-name1 {
    display: block;
    position: absolute;
    bottom: -10px;
    left: 12px;
}
.admin-role-name2 {
    display: block;
    position: absolute;
    top: -10px;
    right: 12px;
}
</style>
