<template>
  <div class="overlay">
            <form @click.stop="" action="" class="admin-form-staff" @submit.prevent.stop="editStaff" v-if="!!staffInfo">
                <div class="d-flex justify-content-end">
                    <i class="fa-solid fa-xmark text-danger fs-1" @click="closeFormEdit"></i>
                </div>
                <h3 class="mb-3">Chỉnh sửa thông tin nhân viên</h3>
                <span class="fs-4" :class="{ 'text-danger': mesFaild, 'text-success': mesSuccess }">{{
                    mesSuccess || mesFaild
                }}</span>
                <div class="row">
                    <div class="avatar">
                        <span>
                            <img v-if="!!!imgSrc" :src="'http://localhost:3000'+staffInfo.avatar" alt="">
                            <img v-else :src="imgSrc" alt="">
                            <label for="avatar"><i class="fa-solid fa-file-pen"></i></label>
                            <input type="file" class="d-none" id="avatar" @change="handleImage">
                        </span>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Tên nhân viên <span class="text-danger">*</span></label>
                            <input
                                v-model="staffInfo.fullName"
                                required
                                type="text"
                                placeholder="Họ và tên nhân viên"
                            />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Giới tính <span class="text-danger">*</span></label>
                            <select name="" id="" v-model="staffInfo.gender">
                                <option value="">---Chọn giới tính----</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ngày sinh nhật <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.dateOfBirth" required type="date" placeholder="Ngày sinh nhật" />
                            <span v-if="!!valid.dateOfBirth" :class="{ 'text-danger': !!valid.dateOfBirth }">{{
                                valid.dateOfBirth
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Email <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.email" required type="text" placeholder="Tài khoản email" />
                            <span v-if="!!valid.email" :class="{ 'text-danger': !!valid.email }">{{
                                valid.email
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Số điện thoại <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.phone" required type="text" placeholder="Số điện thoại" />
                            <span v-if="!!valid.phone" :class="{ 'text-danger': !!valid.phone }">{{
                                valid.phone
                            }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Địa chỉ <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.address" required type="text" placeholder="Địa chỉ" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Ngày bắt đầu <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.startDate" required type="date" placeholder="Ngày được tuyển" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Vị trí <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.position" required type="text" placeholder="Vị trí" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Phòng ban <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.department" required type="text" placeholder="Phòng ban" />
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="spe-group">
                            <label for="">Lương <span class="text-danger">*</span></label>
                            <input v-model="staffInfo.salary" required type="number" placeholder="Mức lương" />
                            <span v-if="!!valid.salary" :class="{ 'text-danger': !!valid.salary }">{{
                                valid.salary
                            }}</span>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <button class="mt-3 btn btn-success">Sửa đổi thông tin</button>
                </div>
            </form>
        </div>
</template>

<script>
import staffService from '@/service/staff.service';
export default {
    props:['idStaff'],
    data(){
        return{
            staffInfo:{},
            valid: {},
            mesFaild: '',
            mesSuccess: '',
            imgSrc:''
        }
    },
    emits:['closeFormEdit','updated'],
    methods: {
        closeFormEdit(){
            this.$emit('closeFormEdit')
        },
        handleImage(event){
            this.image = event.target.files[0] || '';
            const src = URL.createObjectURL(this.image)
            this.imgSrc= src
            this.staffInfo.avatar=this.image
        },
        formattedDate(date) {
            // Chuyển đổi kiểu Date thành chuỗi 'yyyy-MM-dd'
            const dateConvert= new Date(date)
            const year = dateConvert.getFullYear();
            const month = ('0' + (dateConvert.getMonth() + 1)).slice(-2);
            const day = ('0' + dateConvert.getDate()).slice(-2);
            return `${year}-${month}-${day}`;
        },
        async getById(){
            const response = await staffService.findById(this.idStaff)
            this.staffInfo={...response.data}
            this.staffInfo.dateOfBirth=this.formattedDate(this.staffInfo.dateOfBirth)
            this.staffInfo.startDate=this.formattedDate(this.staffInfo.startDate)
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
        async editStaff(){
            try {
                const valid=this.validateForm(this.staffInfo)
                if (valid) {
                    console.log(this.staffInfo);
                    const response = await staffService.update(this.idStaff,this.staffInfo);
                    if (response.data.status) {
                        this.mesSuccess = response.data.mes;
                        this.mesFaild = false;
                        this.getById()
                        this.$emit('updated')
                    } else {
                        this.mesFaild = response.data.mes;
                        this.mesSuccess = false;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted(){
        this.getById()
    }
    
}
</script>

<style>
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
.entry-file-input{
    display: flex;
    padding: 5px;
}

.avatar{
    display: flex;
    justify-content: center;
}
.avatar img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #14667b;
    padding: 5px;
}
.avatar span{
    position: relative;
}
.avatar label{
    transform: translateY(50%);
    position: absolute;
    bottom: 11px;
    right: 0px;
    cursor: pointer;
}
.avatar label i{
    font-size: 26px;
}
</style>