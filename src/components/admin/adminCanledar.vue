<template>
    <div class="row">
        <h3>Công việc</h3>
        <div class="d-flex justify-content-end align-items-center mb-1">
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
                        <option value="startDate">Ngày bắt đầu</option>
                        <option value="endDate">Ngày kết thúc</option>
                        <option value="updatedAt">Ngày sửa</option>
                        <option value="currentDate">Công việc trong tháng</option>
                    </select>
                    <button>Lọc</button>
                </form>
                <div class="admin-export">
                    <div class="btn btn-success" @click="exportToExcel">
                        <i class="fa-solid fa-file-excel"></i> Excel
                    </div>
                    <!-- <div class="btn btn-warning" @click="exportToPDF"><i class="fa-solid fa-file-pdf"></i> Pdf</div> -->
                </div>
            </div>
        </div>
       
        <div class="col-lg-2">
            <h3 class="text-danger mt-1">Danh mục</h3>
            <div class="note-content">
              <span v-if="isSort" @click="offSort" class=" fs-2 sort">Đang lọc...</span>
                <h5 class="mt-2 text-info">Màu sắc công việc</h5>
                <div>
                    <div class="note-color" @click="fillter('Chưa bắt đầu')">
                        <span style="--color: #7d7c7c"></span>
                        <span>: Chưa bắt đầu</span>
                    </div>
                    <div class="note-color" @click="fillter('Đang tiến hành')">
                        <span style="--color: #7091f5"></span>
                        <span>: Đang tiến hành</span>
                    </div>
                    <div class="note-color" @click="fillter('Hoàn thành')">
                        <span style="--color: #a2ff86"></span>
                        <span>: Hoàn thành</span>
                    </div>
                    <div class="note-color" @click="fillter('Đã báo cáo')">
                        <span style="--color: #fc4f00"></span>
                        <span>: Đã báo cáo</span>
                    </div>
                </div>
                <div class="search-task mt-2">
                    <h5 class="text-info">Tìm kiếm</h5>
                    <div class="search-content row">
                        <div class="col-lg-12 group">
                            <label for="" class="text-start mt-0">Tìm theo nhân viên</label>
                            <input v-model="inputSearch2" @input="handleFitter('nameStaff')" type="text" placeholder="Nhập tên nhân viên" />
                        </div>
                        <div class="col-lg-12 group">
                            <label for="" class="text-start">Tìm theo khách hàng</label>
                            <input v-model="inputSearch" @input="handleFitter('nameCustomer')" type="text" placeholder="Nhập tên khách hàng" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FullCalendar class="col-lg-10" ref="fullCalendar" :options="calendarOptions">
            <template v-slot:eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
            </template>
        </FullCalendar>
    </div>
    <!-- tạo mới cv -->
    <div class="overlay" v-if="activeCreate">
        <form class="form-task2" @submit.prevent.stop="submitCreate">
            <div class="d-flex justify-content-end">
                <i @click="closeCreate" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h3>Tạo công việc</h3>
            <span class="fs-4" :class="{ 'text-danger': !!mesFail, 'text-success': !!messSuc }">{{
                !!mesFail ? mesFail : messSuc
            }}</span>
            <br>
            <span class="btn btn-warning" v-if="!!printTaskId" @click="printPDF(printTaskId)">In Phiếu việc</span>
            
            <div class="row">
                <div class="group col-lg-4">
                    <div class="d-flex mb-1">
                        <label for="" class="mt-0">Tên Khách hàng <span class="required">*</span></label>
                        <span class="btn btn-info btn-brand mt-0" @click="activeCustomer = true">Mới</span>
                    </div>
                    <!-- Them khách hàng mơi -->
                    <div class="overlay" v-if="activeCustomer">
                        <form action="" class="customer-form" @submit.prevent.stop="addCustomer">
                            <div class="d-flex justify-content-end text-danger fs-2" @click="closeFormCustomer">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <div class="form-head">
                                <h2 class="title">Thêm khách hàng</h2>
                                <span class="mes-success" v-if="!!mesSucCus">{{ mesSucCus }}</span>
                                <span class="mes-failed" v-if="!!mesFaiCus">{{ mesFaiCus }}</span>
                            </div>
                            <div class="row">
                                <div class="spe-group col-lg-6">
                                    <label for="">Tên khách hàng <span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập tên khách hàng"
                                        v-model="customer.fullName"
                                    />
                                </div>
                                <div class="spe-group col-lg-6">
                                    <label for="">Số điện thoại<span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập Số điện thoại"
                                        v-model="customer.phone"
                                    />
                                    <span v-if="!!valid.phone" :class="{ 'text-danger': !!valid.phone }">{{
                                        valid.phone
                                    }}</span>
                                </div>
                                <div class="spe-group col-lg-6">
                                    <label for="">Email<span class="required">*</span></label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Nhập email của bạn"
                                        v-model="customer.email"
                                    />
                                    <span v-if="!!valid.email" :class="{ 'text-danger': !!valid.email }">{{
                                        valid.email
                                    }}</span>
                                </div>
                                <div class="spe-group col-lg-6">
                                    <label for="">Địa chỉ<span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập tên đường, hẻm, số nhà"
                                        v-model="customer.address"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Tỉnh/Thành phố <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.city"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="getDistricts(VmodelAddress.city)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in city" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Quận/huyện <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.district"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="getWards(VmodelAddress.district)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in districts" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Phường/Xã <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.ward"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="saveAddress(VmodelAddress.ward)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in wards" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-brand-submit mt-5">Thêm</button>
                            </div>
                        </form>
                    </div>
                    <!-- chọn khách hàng -->
                    <select v-model="customerId" class="form-select" required @change="getCustomerById(customerId)">
                        <option value="" class="form-option">--- Chọn khách hàng ---</option>
                        <option
                            v-for="(customer, index) in customers"
                            :key="index"
                            class="form-option"
                            :value="customer._id"
                        >
                            {{ customer.fullName }} <i class="fa-solid fa-pen"></i>
                        </option>
                    </select>
                    <!-- edit khách hàng -->
                    <div class="overlay" v-if="activeEditCustomer">
                        <form action="" class="customer-form" @submit.prevent.stop="editCustomer">
                            <div class="d-flex justify-content-end fs-2 text-danger" @click="closeFormCustomerEdit">
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                            <div class="form-head">
                                <h2 class="title">Xem và thay đổi thông tin</h2>
                                <span class="mes-success" v-if="!!mesSucCus">{{ mesSucCus }}</span>
                                <span class="mes-failed" v-if="!!mesFaiCus">{{ mesFaiCus }}</span>
                            </div>
                            <div class="row">
                                <div class="spe-group col-lg-4">
                                    <label for="">Tên khách hàng <span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập tên khách hàng"
                                        v-model="customerInfo.fullName"
                                    />
                                </div>
                                <div class="spe-group col-lg-4">
                                    <label for="">Số điện thoại<span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập Số điện thoại"
                                        v-model="customerInfo.phone"
                                    />
                                    <span v-if="!!valid.phone" :class="{ 'text-danger': !!valid.phone }">{{
                                        valid.phone
                                    }}</span>
                                </div>
                                <div class="spe-group col-lg-4">
                                    <label for="">Email<span class="required">*</span></label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Nhập email của bạn"
                                        v-model="customerInfo.email"
                                    />
                                    <span v-if="!!valid.email" :class="{ 'text-danger': !!valid.email }">{{
                                        valid.email
                                    }}</span>
                                </div>
                                <div class="spe-group col-lg-12" v-if="!activeEditAddress">
                                    <label for="">Địa chỉ<span class="required">*</span> </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập tên đường, hẻm, số nhà"
                                        v-model="customerInfo.address"
                                        disabled
                                    />
                                </div>
                                <div class="row"><span class="col-lg-3 ms-2 btn btn-warning" @click="activeEditAddress=!activeEditAddress">{{activeEditAddress ? 'Giữ địa chỉ cũ' : 'Tạo địa chỉ mới'}}</span></div>
                                <div class="spe-group col-lg-12" v-if="activeEditAddress">
                                    <label for="">Địa chỉ<span class="required">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nhập tên đường, hẻm, số nhà"
                                        v-model="customerInfo.address2"
                                    />
                                </div>
                            </div>
                            <div class="row" v-if="activeEditAddress">
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Tỉnh/Thành phố <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.city"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="getDistricts(VmodelAddress.city)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in city" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Quận/huyện <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.district"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="getWards(VmodelAddress.district)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in districts" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="">Phường/Xã <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="VmodelAddress.ward"
                                        name=""
                                        id=""
                                        class="form-select w-100"
                                        @change="saveAddress(VmodelAddress.ward)"
                                        required
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="item in wards" :key="item.code" :value="item">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-brand-submit mt-5">Sửa</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="group col-lg-4">
                    <div class="d-flex mb-1">
                        <label for="" class="mt-0">Chọn nhân viên <span class="required">*</span></label>
                    </div>
                    <select v-model="infoTask.staffId" class="form-select mt-1" required>
                        <option value="" class="form-option">--- Chọn ---</option>
                        <option v-for="staff in staffs" :value="staff._id" :key="staff._id">
                            {{ staff.fullName }}
                        </option>
                    </select>
                </div>
                <div class="group col-lg-4">
                    <div class="d-flex mb-1">
                        <label for="" class="mt-0">Chọn dịch vụ<span class="required">*</span></label>
                        <span class="btn btn-info btn-brand mt-0" @click="activeServiceCreate = true">Mới</span>
                    </div>
                    <select v-model="infoTask.serviceId" class="form-select" required @change="getServiceById(infoTask.serviceId)">
                        <option value="" class="form-option">--- Chọn ---</option>
                        <option v-for="service in services" :value="service._id" :key="service._id">
                            {{ service.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="group col-lg-12">
                    <div class="w-100">
                        <div class="d-flex">
                            <label for="" class="mt-0"><strong>Ghi chú</strong></label>
                        </div>
                        <textarea class="note" v-model="note" placeholder="Ghi chú..."></textarea>
                    </div>
                </div>
            </div>
            <button class="btn btn-success px-5 mt-3">Tạo</button>
        </form>
    </div>
    

    <!-- edit cong việc -->
    <div class="overlay" v-if="activeEdit">
        <form class="form-task" action="" @submit.prevent.stop>
            <div class="d-flex justify-content-end">
                <i @click="closeEdit" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h3>Sửa công việc</h3>
            <div class="row">
                <span class="fs-4" :class="{ 'text-danger': !!mesFail, 'text-success': !!messSuc }">{{
                    !!mesFail ? mesFail : messSuc
                }}</span>
                <div v-if="infoTaskEdit.allDay">
                    <span><strong>Ngày thực hiện</strong>:{{formatDateNoTime(infoTaskEdit.startDate)}}</span>
                    <span class="ms-4"><strong>Thời gian</strong>:Cả ngày</span>
                </div>
                <div v-if="!infoTaskEdit.allDay">
                    <span><strong>Ngày thực hiện</strong>:{{formatDateNoTime(infoTaskEdit.startDate)}}</span>
                    <span class="ms-4"><strong>Giờ bắt đầu</strong>:{{formatHour(infoTaskEdit.startDate)}}</span>
                    <span class="ms-4"><strong>Giờ kết thúc</strong>:{{formatHour(infoTaskEdit.endDate)}}</span>
                </div>
                <div class="spe-group col-lg-4 mb-4">
                    <label for="">Tên khách hàng<span class="text-danger ms-2">*</span></label>
                    <input v-model="infoTaskEdit.nameCustomer" type="text" placeholder="Tên khách hàng..." required />
                </div>
                
                <div class="spe-group col-lg-4 mb-4">
                    <label for="">email<span class="text-danger ms-2">*</span></label>
                    <input v-model="infoTaskEdit.phone" type="text" placeholder="Số điện thoại..." required />
                </div>
                <div class="spe-group col-lg-4 mb-4">
                    <label for="">Số điện thoại<span class="text-danger ms-2">*</span></label>
                    <input v-model="infoTaskEdit.email" type="text" placeholder="Số điện thoại..." required />
                </div>
                <div class="spe-group col-lg-6 mb-4">
                    <label for="">Địa chỉ khách hàng<span class="text-danger ms-2">*</span></label>
                    <input v-model="infoTaskEdit.address" type="text" placeholder="Địa chỉ..." required />
                </div>
                <div class="col-lg-12 mb-5">
                    <div class="status" v-if="infoTaskEdit.status == 'Quá hạn'">
                        <div class="status-progress-color" style="--left: 0%; --colorB: #fc4f00"></div>
                        <div class="status-item" style="--left: 10%">
                            <span style="--border-color: #fc4f00">1</span>
                            <span>Chưa bắt đầu</span>
                        </div>
                        <div class="status-item" style="--left: 43%">
                            <span style="--border-color: #fc4f00">2</span>
                            <span>Đang tiến hành</span>
                        </div>
                        <div class="status-item" style="--left: 75%">
                            <span style="--border-color: #fc4f00">3</span>
                            <span>Hoàn thành</span>
                        </div>
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Chưa bắt đầu'"
                            @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')"
                            >Cập nhật thành đang tiến hành</span
                        >
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Đang tiến hành'"
                            @click="editStatus(infoTaskEdit._id, 'Hoàn thành')"
                            >Cập nhật thành hoàn thành</span
                        >
                        <button class="btn btn-danger my-5" v-if="infoTaskEdit.status == 'Quá hạn'" disabled>
                            Quá hạn
                        </button>
                        <span class="btn btn-info my-5" v-if="infoTaskEdit.status == 'Hoàn thành'">Đã hoàn thành</span>
                    </div>
                    <div class="status" v-if="infoTaskEdit.status == 'Chưa bắt đầu'">
                        <div class="status-progress-color" style="--left: 80%; --colorB: #11e911"></div>
                        <div class="status-item" style="--left: 10%">
                            <span style="--border-color: #11e911">1</span>
                            <span>Chưa bắt đầu</span>
                        </div>
                        <div class="status-item" style="--left: 43%">
                            <span style="--border-color: blue">2</span>
                            <span>Đang tiến hành</span>
                        </div>
                        <div class="status-item" style="--left: 75%">
                            <span style="--border-color: blue">3</span>
                            <span>Hoàn thành</span>
                        </div>
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Chưa bắt đầu'"
                            @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')"
                            >Cập nhật thành đang tiến hành</span
                        >
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Đang tiến hành'"
                            @click="editStatus(infoTaskEdit._id, 'Hoàn thành')"
                            >Cập nhật thành hoàn thành</span
                        >
                        <span class="btn btn-info my-5" v-if="infoTaskEdit.status == 'Hoàn thành'">Đã hoàn thành</span>
                    </div>

                    <div class="status" v-if="infoTaskEdit.status == 'Đang tiến hành'">
                        <div class="status-progress-color" style="--left: 45%; --colorB: #11e911"></div>
                        <div class="status-item" style="--left: 10%">
                            <span style="--border-color: #11e911">1</span>
                            <span>Chưa bắt đầu</span>
                        </div>
                        <div class="status-item" style="--left: 43%">
                            <span style="--border-color: #11e911">2</span>
                            <span>Đang tiến hành</span>
                        </div>
                        <div class="status-item" style="--left: 75%">
                            <span style="--border-color: blue">3</span>
                            <span>Hoàn thành</span>
                        </div>
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Chưa bắt đầu'"
                            @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')"
                            >Cập nhật thành đang tiến hành</span
                        >
                        <span
                            class="btn btn-info my-5"
                            v-if="infoTaskEdit.status == 'Đang tiến hành'"
                            @click="editStatus(infoTaskEdit._id, 'Hoàn thành')"
                            >Cập nhật thành hoàn thành</span
                        >
                        <span class="btn btn-info my-5" v-if="infoTaskEdit.status == 'Hoàn thành'">Đã hoàn thành</span>
                    </div>

                    <div class="status" v-if="infoTaskEdit.status == 'Hoàn thành'">
                        <div class="status-progress-color" style="--left: 0%; --colorB: #11e911"></div>
                        <div class="status-item" style="--left: 10%">
                            <span style="--border-color: #11e911">1</span>
                            <span>Chưa bắt đầu</span>
                        </div>
                        <div class="status-item" style="--left: 43%">
                            <span style="--border-color: #11e911">2</span>
                            <span>Đang tiến hành</span>
                        </div>
                        <div class="status-item" style="--left: 75%">
                            <span style="--border-color: #11e911">3</span>
                            <span>Hoàn thành</span>
                        </div>
                        <button class="btn btn-info my-5" v-if="!infoTaskEdit.isReport" @click="activeOrderTask=true">
                            Báo cáo
                        </button>
                        <button class="btn btn-info my-5" v-else @click="activeReportDetail=true">
                            Xem Báo cáo
                        </button>
                    </div>
                    <div class="status" v-if="infoTaskEdit.status == 'Đã báo cáo'">
                        <div class="status-progress-color" style="--left: 0%; --colorB: #FC4F00"></div>
                        <div class="status-item" style="--left: 10%">
                            <span style="--border-color: #11e911">1</span>
                            <span>Chưa bắt đầu</span>
                        </div>
                        <div class="status-item" style="--left: 43%">
                            <span style="--border-color: #11e911">2</span>
                            <span>Đang tiến hành</span>
                        </div>
                        <div class="status-item" style="--left: 75%">
                            <span style="--border-color: #11e911">3</span>
                            <span>Hoàn thành</span>
                        </div>
                        <button class="btn btn-info my-5" v-if="!infoTaskEdit.isReport" @click="activeOrderTask=true">
                            Báo cáo
                        </button>
                        <button class="btn btn-info my-5" v-else @click="activeReportDetail=true">
                            Xem Báo cáo
                        </button>
                    </div>
                </div>
                <div class="group col-lg-4 mt-5">
                    <div class="d-flex mb-1">
                        <label for="" class="mt-0">Chọn nhân viên <span class="required">*</span></label>
                    </div>
                    <select v-model="infoTaskEdit.staffId" class="form-select" required>
                        <option value="" class="form-option">--- Chọn ---</option>
                        <option v-for="staff in staffs" :value="staff._id" :key="staff._id">
                            {{ staff.fullName }}
                        </option>
                    </select>
                </div>
                <div class="group col-lg-4 mt-5">
                    <div class="d-flex mb-1">
                        <label for="" class="mt-0">Chọn dịch vụ<span class="required">*</span></label>
                    </div>
                    <select v-model="infoTaskEdit.serviceId" class="form-select" required @change="ChangePriceTaskEdit(infoTaskEdit.serviceId)">
                        <option value="" class="form-option">--- Chọn ---</option>
                        <option v-for="service in services" :value="service._id" :key="service._id">
                            {{ service.name }}
                        </option>
                    </select>
                </div>
                <div class="col-lg-4 mt-5">
                  <div class="group">
                    <label for="" class="mt-0">Ghi chú</label>
                    <input type="text" v-model="infoTaskEdit.note" class="input-price">
                  </div>
                </div>
            </div>
            <button class="btn btn-success me-3 mt-3" @click="editTask(infoTaskEdit._id)">Sửa</button>
            <button class="btn btn-danger me-3 mt-3" @click="deleteTask(infoTaskEdit._id)">Xóa</button>
            <button v-if="!infoTaskEdit.isReport" class="btn btn-warning mt-3" @click="printPDF(infoTaskEdit._id)">In phiếu</button>
        </form>
    </div>
    <!-- bao cao cv -->
    <div class="overlay" v-if="activeOrderTask">
        <form class="form-task" action="" @submit.prevent.stop="submitReport">
            <div class="d-flex justify-content-end">
                <i @click="closeReportCreate" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h3>Báo cáo công việc</h3>
            <div class="row">
                <span class="fs-4" :class="{ 'text-danger': !!mesReportF, 'text-success': !!mesReportS }">{{
                    !!mesReportF ? mesReportF : mesReportS
                }}</span>
                <!-- thông tin về công việc -->
                <div class="d-flex justify-content-center ms-5">
                    <div class="row w-75">
                        <div class="col-lg-6">
                            <div class="row mb-1 text-start">
                                <span class="col-6"><strong>Tên Khách hàng:</strong></span>
                                <span class="col-6">{{infoTaskEdit.nameCustomer}}</span>
                                <span class="col-6"><strong>Địa chỉ</strong></span>
                                <span class="col-6">{{infoTaskEdit.address  }}</span>
                                <span class="col-6"><strong>SĐT:</strong></span>
                                <span class="col-6">{{infoTaskEdit.phone  }}</span>
                                
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="row mb-1 text-start">
                                <span class="col-6"><strong>Tên nhân viên:</strong></span>
                                <span class="col-6">{{staffs[staffs.findIndex(item => item._id == infoTaskEdit.staffId)].fullName  }}</span>
                                <span class="col-6"><strong>Tên dịch vụ:</strong></span>
                                <span class="col-6">{{services[services.findIndex(item => item._id == infoTaskEdit.serviceId)].name  }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- danh sách phụ kiện -->
                
                <div class="row gx-0 mt-3">
                    <div class="scroll2 col-lg-8" >
                        <h6 class="text-uppercase">Danh sách sản phẩm</h6>
                        <div class="scroll">
                            <div class="row" v-for="(item, index) in infoAccessorys" :key="index">
                                <div class="group col-lg-4">
                                    <div class="d-flex mb-1">
                                        <label for="" class="mt-0">Danh sách phụ kiện <span class="required">*</span></label>
                                    </div>
                                    <select
                                        v-model="item.accessoryId"
                                        class="form-select"
                                        @change="getproductById(item.accessoryId, index)"
                                        
                                    >
                                        <option value="" class="form-option">--- Chọn ---</option>
                                        <option v-for="product in accessorys" :value="product._id" :key="product._id">
                                            {{ product.name}}
                                        </option>
                                    </select>
                                </div>
                                <div class="spe-group col-lg-4">
                                    <label for="" class="mt-0 mb-0">Giá bán</label>
                                    <span class="price">Giá: {{ item.priceSale }}</span>
                                </div>
                                <div class="spe-group col-lg-4">
                                    <label for="" class="mt-0 mb-0">Số lượng<span class="text-danger ms-2">*</span></label>
                                    <input
                                        v-model="item.quantity"
                                        @keyup="(event) => checkQuantity(event, item)"
                                        type="number"
                                        placeholder="Nhập số lượng hàng"
                                    />
                                    <span v-if="!!mesValid && idValid==item.accessoryId" class="text-danger">{{ mesValid }}</span>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row control">
                            <div class="d-flex justify-content-center align-items-center mt-1">
                                <div class="group me-3">
                                    <span class="btn btn-outline-success" @click="pushRow">Thêm dòng</span>
                                </div>
                                <div class="group">
                                    <span class="btn btn-outline-danger" @click="popRow">Bớt dòng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 scroll2">
                        <div class="entry-group col-lg-12">
                            <label for="">Ảnh chụp thực tế</label>
                            <input class="entry-file-input" ref="entryInputFile" type="file" @change="handleImage" required>
                        </div>
                        <div class="spe-group col-lg-12">
                            <label for="" class="mt-0 mb-0">Tiền công<span class="text-danger ms-2">*</span></label>
                            <input
                                class="input-price"
                                v-model="infoTask.wage"
                                min="0"
                                @keyup="(event)=>checkWage(event)"
                                @focus="infoTask.wage=''"
                                @blur="infoTask.wage!='' ? infoTask.wage =infoTask.wage : infoTask.wage =0"
                                type="number"
                                placeholder="Tiền công của dịch vụ"
                            />
                            <span v-if="!!mesValidWage" class="text-danger">{{ mesValidWage }}</span>
                        </div>
                       
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Tiền công:</strong></span>
                            <span class="col-6">{{infoTask.wage? formatCurrency(infoTask.wage) : formatCurrency(0)}}</span>
                        </div>
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Số tiền của phụ kiện:</strong></span>
                            <span class="col-6">{{formatCurrency(totalOfAccessory)  }}</span>
                        </div>
                        <div class="row mb-1 text-start mt-2">
                            <span class="col-6"><strong>Tổng tiền:</strong></span>
                            <span class="col-6">{{formatCurrency(totalAmount)  }}</span>
                        </div>
                        
                    </div>
                </div>
                
                 <!-- hình thức thanh toán -->
                 <!-- <div class="row mt-4">
                     <div class="col-lg-4">
                         <label
                             for="payment"
                             :class="{ 'payment-active': isClassCod, 'payment-error': choosePayent }"
                             class="payment"
                             @click="paymentMeThod('COD')"
                         >
                             <img
                                 src="https://s3-ap-southeast-1.amazonaws.com/pharmacity-ecm-asm-dev/payment-method/cash.webp"
                                 alt=""
                             />
                             <div class="payment-content">
                                 <span>Tiền mặt</span>
                                 <span>Thanh toán khi nhận hàng</span>
                             </div>
                             <div class="payment-checkbox">
                                 <span></span>
                             </div>
                         </label>
                     </div>
                     <div class="col-lg-4">
                         <label
                             for="payment"
                             :class="{ 'payment-active': isClassOnlVNPAY, 'payment-error': choosePayent }"
                             class="payment"
                             @click="paymentMeThod('VNPAY')"
                         >
                             <img
                                 src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png"
                                 alt=""
                             />
                             <div class="payment-content">
                                 <span>VNPay</span>
                                 <span>Thanh toán qua ví VNPay</span>
                             </div>
                             <div class="payment-checkbox">
                                 <span></span>
                             </div>
                         </label>
                     </div>
                     <div class="col-lg-4">
                         <label
                             for="payment"
                             :class="{ 'payment-active': isClassOnlMOMO, 'payment-error': choosePayent }"
                             class="payment"
                             @click="paymentMeThod('MOMO')"
                         >
                             <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                             <div class="payment-content">
                                 <span>MOMO</span>
                                 <span>Quét mã QR momo</span>
                             </div>
                             <div class="payment-checkbox">
                                 <span></span>
                             </div>
                         </label>
                     </div>
                 </div> -->
            </div>
            <div class="image" v-if="!!imgSrc">
                <img :src="imgSrc" alt="">
                <i class="fa-solid fa-xmark" @click="deleteEntryImg"></i>
            </div>
            <button class="btn btn-success mt-3 px-5">Cập nhật</button>
        </form>
    </div>

    <!-- chi tiet bao cao -->
    <div class="overlay" v-if="activeReportDetail">
        <div class="form-task" action="" @submit.prevent.stop="submitReport">
            <div class="d-flex justify-content-end">
                <i @click="activeReportDetail=false" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
            </div>
            <h3>Chi tiết công việc</h3>
            <div class="row">
                <!-- thông tin về công việc -->
                <div class="row">
                    <div class="col-lg-4">
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Tên Khách hàng:</strong></span>
                            <span class="col-6">{{infoTaskEdit.nameCustomer}}</span>
                            <span class="col-6"><strong>Địa chỉ</strong></span>
                            <span class="col-6">{{infoTaskEdit.address  }}</span>
                            <span class="col-6"><strong>SĐT:</strong></span>
                            <span class="col-6">{{infoTaskEdit.phone  }}</span>
                            
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Tên nhân viên:</strong></span>
                            <span class="col-6">{{staffs[staffs.findIndex(item => item._id == infoTaskEdit.staffId)].fullName  }}</span>
                            <span class="col-6"><strong>Tên dịch vụ:</strong></span>
                            <span class="col-6">{{services[services.findIndex(item => item._id == infoTaskEdit.serviceId)].name  }}</span>
                        </div>
                    </div>
                    <div class="col-lg-4 img-detail-report">
                        <img class="" :src="'http://localhost:3000/'+infoTaskEdit.image" alt="">
                    </div>
                </div>
                <!-- danh sách phụ kiện -->
                
                <div class="row gx-0 mt-3">
                    <div class="scroll2 col-lg-8" >
                        <h6 class="text-uppercase">Danh sách sản phẩm</h6>
                        <div class="scroll">
                           <table class="table">
                                <thead>
                                   <tr class="row">
                                        <th class="col-1 text-center">
                                            STT
                                        </th>
                                        <th class="col">
                                            Tên phụ kiện
                                        </th>
                                        <th class="col">
                                            Giá phụ kiện
                                        </th>
                                        <th class="col">
                                            Số lượng
                                        </th>
                                   </tr>
                                </thead>
                                <tbody>
                                    <tr class="row" v-for="(accessory, index) in infoTaskEdit.accessorys" :key="index">
                                        <td class="col-1 text-center">
                                            {{ index+1 }}
                                        </td>
                                        <td class="col">
                                            {{ accessory.nameProduct }}
                                        </td>
                                        <td class="col">
                                            {{ formatCurrency(accessory.priceSale) }}
                                        </td>
                                        <td class="col">
                                            {{ accessory.quantity }}
                                        </td>
                                    </tr>
                                </tbody>
                           </table>
                        </div>
                    </div>
                    <div class="col-lg-4 scroll2">
                       
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Tiền công:</strong></span>
                            <span class="col-6">{{ formatCurrency(infoTaskEdit.wage)}}</span>
                        </div>
                        <div class="row mb-1 text-start">
                            <span class="col-6"><strong>Số tiền của phụ kiện:</strong></span>
                            <span class="col-6">{{formatCurrency(infoTaskEdit.totalOfAccessory)  }}</span>
                        </div>
                        <div class="row mb-1 text-start mt-2">
                            <span class="col-6"><strong>Tổng tiền:</strong></span>
                            <span class="col-6">{{formatCurrency(infoTaskEdit.totalAmount)  }}</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <button class="btn btn-warning mt-3 px-5" @click="printPDFReporyt(infoTaskEdit._id)">In phiếu báo cáo</button>
        </div>
    </div>
    <adminServiceCreate v-if="activeServiceCreate" @closeCreate="closeServiceCreate"></adminServiceCreate>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import taskService from '@/service/task.service';
import staffService from '@/service/staff.service';
import serviceService from '@/service/service.service';
import customerService from '@/service/customer.service';
import accessoryService from '@/service/accessory.service';
import axios from 'axios';
import print from '@/utils/print'
import printTemlateTask from '@/utils/printTemplateTask'
import exportToExcel from '@/utils/exportToExcel';
import format from '@/utils/format';
import adminServiceCreate from './adminServiceCreate.vue';
import printTemplateTaskReport from '@/utils/printTemplateTaskReport'
export default {
    components: {
        FullCalendar,
        adminServiceCreate
    },
    data() {
        return {
            resultReport:{},
            activeReportDetail:false,
            printTaskId:'',
            mesReportS:'',
            mesReportF:'',
            imgSrc:'',
            activeOrderTask:false,
            activeServiceCreate:false,
            mesValidWage:'',
            infoAccessorys: [{ accessoryId: '' }],
            idValid:'',
            mesValid:'',
            isSubmit:false,
            totalAmount:0,
            pricePayed:0,
            totalOfAccessory:0,
            accessorys:[],
            isClassCod:false,
            isClassOnlVNPAY:false,
            isClassOnlMOMO:false,
            tasks:[],
            years:[],
            dateFilter: {
                day: '0',
                month: '0',
                year: '0',
                field: '',
            },
            inputSearch:'',
            inputSearch2:'',
            idTimeOut:null,
            serviceInfo:{},
            isSort:false,
            mesSucCus: '',
            mesFaiCus: '',
            districts: [],
            wards: [],
            valid: {},
            customers: [],
            customer: {},
            customerInfo: {},
            VmodelAddress: { city: '', district: '', ward: '' },
            activeCustomer: false,
            activeEditCustomer: false,
            activeEditAddress: false,
            customerId: '',
            mesFail: '',
            messSuc: '',
            infoTask: { staffId: '', serviceId: '', wage:0 },
            infoTaskEdit: {},
            activeCreate: false,
            activeEdit: false,
            isCreate: false,
            staffs: [],
            services: [],
            selectInfo: {},
            currentDate: null,
            address:'',
            note:'',
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'timeGridWeek',
                headerToolbar:{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay'
                },
                themeSystem: 'bootstrap5',
                locale: 'vi',
                businessHours:{
                    startTime: "07:00", 
                    endTime: "22:00",
                },
                slotMinTime: "07:00", // Giờ bắt đầu của khoảng thời gian hiển thị
                slotMaxTime: "22:00",
                events: [],
                // alternatively, use the `events` setting to fetch from a feed
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                eventsSet: this.handleEvents,
                select: this.handleDateSelect,
                eventClick: (arg) => {
                    this.detatilTask(arg);
                },
                eventAdd: (arg) => {
                    const currentDate = this.$refs.fullCalendar.getApi().currentData.currentDate;
                    const info = {
                        serviceId: this.infoTask.serviceId,
                        staffId: this.infoTask.staffId,
                        nameCustomer: this.customerInfo.fullName,
                        phone: this.customerInfo.phone,
                        email: this.customerInfo.email,
                        address: this.customerInfo.address,
                        startDate: arg.event.start,
                        endDate: arg.event.end ? arg.event.end : arg.event.start,
                        status: this.selectInfo.status ? this.selectInfo.status : 'Chưa bắt đầu',
                        currentDate: currentDate,
                        totalAmount: this.totalAmount,
                        totalOfAccessory:this.totalOfAccessory,
                        pricePayed:0,
                        priceService:this.serviceInfo.price,
                        accessorys:this.infoAccessorys[0].accessoryId!='' ? this.infoAccessorys : [],
                        note:this.note,
                        wage:0,
                        allDay:arg.event._def.allDay
                    };
                    this.addTask(info);
                    this.getAll();
                },
                datesSet: () => {
                    const currentDate2 = this.$refs.fullCalendar.getApi().currentData.currentDate;
                    this.currentDate = currentDate2;
                },
                eventDrop:(info)=>{
                    const data={
                        startDate:info.event.startStr,
                        endDate:info.event.endStr
                    }
                    this.changeTime(info.event._def.publicId,data)
                },
                eventResize:(info)=>{
                    const data={
                        startDate:info.event.startStr,
                        endDate:info.event.endStr
                    }
                    this.changeTime(info.event._def.publicId,data)
                },
            },
        };
    },

    methods: {
        
        async detatilTask(arg) {
            try {
                const id = arg.event._def.publicId;
                const createDate = {
                    startDate: arg.event.start,
                    endDate:
                        arg.event.end.getDate() - 1 !== arg.event.start.getDate() ? arg.event.end : arg.event.start,
                };
                const response = await taskService.getById(id);
                this.getAllService();
                await this.getAllStaff(createDate);
                this.staffs.push({ ...response.data.staffId });
                this.infoTaskEdit = response.data;
                this.infoTaskEdit.staffId = response.data.staffId._id;
                this.infoTaskEdit.serviceId = response.data.serviceId._id;
                this.activeEdit = true;
                this.mesFail = '';
                this.messSuc = '';
            } catch (error) {
                console.log(error);
            }
        },

        async getStaffs() {
            try {
                const response = await staffService.getAll();
                this.staffs = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async submitCreate() {
            let calendarApi = this.selectInfo.view.calendar;
            calendarApi.unselect(); // clear date selection
            if (this.activeCreate) {
                calendarApi.addEvent({
                    id: 3,
                    title: `${this.infoTask.serviceId}`,
                    start: new Date(this.selectInfo.startStr).toISOString(),
                    end: new Date(this.selectInfo.endStr).toISOString(),
                    allDay: this.selectInfo.allDay,
                });
            }
        },
        async handleDateSelect(selectInfo) {
            const date = new Date();
            const selecEnd = new Date(selectInfo.endStr);
            if (selecEnd < date) {
                if (confirm('Bạn muốn tạo công việc bé hơn ngày hôm nay')) {
                    this.selectInfo = selectInfo;
                    this.activeCreate = true;
                    this.mesFail = '';
                    this.messSuc = '';
                    await this.getAllStaff({
                        startDate: selectInfo.start,
                        endDate:
                            selectInfo.end.getDate() - 1 !== selectInfo.start.getDate()
                                ? selectInfo.end
                                : selectInfo.start,
                    });
                    await this.getAllService();
                }
            } else {
                this.selectInfo = selectInfo;
                this.activeCreate = true;
                this.mesFail = '';
                this.messSuc = '';
                await this.getAllStaff({
                    allDay:selectInfo.allDay,
                    startDate: selectInfo.start,
                    endDate:
                        selectInfo.end.getDate() - 1 !== selectInfo.start.getDate() ? selectInfo.end : selectInfo.start,
                });
                await this.getAllService();
            }
        },

        async addTask(info) {
            try {
                const response = await taskService.create(info);
                if (response.data.status) {
                    this.getAll();
                    this.infoTask = { staffId: '', serviceId: '' };
                    this.mesFail = '';
                    this.messSuc = 'Thêm công viêc thành công';
                    this.customerId=''
                    this.serviceInfo={}
                    this.totalAmount=0
                    this.totalOfAccessory=0
                    this.infoAccessorys= [{ accessoryId: '' }]
                    this.note=''
                    this.printTaskId=response.data.result._id
                } else {
                    this.mesFail = 'Thêm thất bại';
                    this.messSuc = '';
                }
            } catch (error) {
                console.log(error);
            }
        },

        async getAllStaff(dateCreate) {
            try {
                const allDay=dateCreate.allDay
                
                const fomatDateCreate = {
                    start: dateCreate.startDate.getTime(),
                    end: dateCreate.endDate.getTime()
                };
                dateCreate.endDate.setDate(dateCreate.endDate.getDate() - 1);
                this.staffs = [];
                const response = await staffService.getAll();
                const events = this.calendarOptions.events.filter(task => task.status!='Hoàn thành')
                const a = events.filter((task) => {
                    task.start = new Date(task.start);
                    task.end = new Date(task.end);
                    const fomatTaskDate = {
                        start: task.start.getTime(),
                        end: task.end.getTime()
                    };
                    if(!allDay){
                         if (fomatDateCreate.start >= fomatTaskDate.start && fomatDateCreate.start < fomatTaskDate.end) {
                            return true;
                        }
                        else if (fomatDateCreate.end > fomatTaskDate.start && fomatDateCreate.end < fomatTaskDate.end) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    else{
                        fomatDateCreate.start= new Date(fomatDateCreate.start)
                        fomatDateCreate.end= new Date(fomatDateCreate.end)
                        fomatTaskDate.start= new Date(fomatTaskDate.start)
                        fomatTaskDate.end= new Date(fomatTaskDate.end)
                        fomatTaskDate.start = fomatTaskDate.start.toLocaleDateString('en-US');
                        fomatTaskDate.end = fomatTaskDate.end.toLocaleDateString('en-US');
                        fomatDateCreate.start = fomatDateCreate.start.toLocaleDateString('en-US');
                        fomatTaskDate.end = new Date(fomatTaskDate.end);
                        fomatTaskDate.end.setDate(fomatTaskDate.end.getDate() - 1);
                        fomatTaskDate.end = fomatTaskDate.end.toLocaleDateString('en-US');
                         if (fomatDateCreate.start >= fomatTaskDate.start && fomatDateCreate.start < fomatTaskDate.end) {
                                return true;
                        } 
                        else if (fomatDateCreate.end >= fomatTaskDate.start && fomatDateCreate.end < fomatTaskDate.end) {
                                return true;
                        }
                        else if (fomatDateCreate.start == fomatTaskDate.end) {

                            return true;
                        } 
                        else if (fomatDateCreate.start == fomatTaskDate.start) {
                           return true
                        } 
                        else {
                            return false;
                        }
                    }
                });
                const c = response.data.filter((staff) => {
                    return !a.some((item2) => item2.staffId._id === staff._id);
                });
                this.staffs = c.length > 0 ? c : response.data;
            } catch (error) {
                console.log(error);
            }
        },
        
        async getAll() {
            try {
                const response = await taskService.getAll();
                this.tasks=response.data
                let data = [];
                const status = ['Hoàn thành', 'Đang tiến hành', 'Chưa bắt đầu', 'Đã báo cáo'];
                const color = ['#A2FF86', '#7091f5', '#7D7C7C', '#FC4F00'];
                this.tasks.forEach((item) => {
                    const index = status.indexOf(item.status);
                    data.push({
                        id: item._id,
                        serviceId: item.serviceId,
                        staffId: item.staffId,
                        title: `${item.serviceId.name}`, // a property!
                        start: item.startDate, // a property!
                        end: item.endDate,
                        status: item.status,
                        allDay: item.allDay,
                        backgroundColor: color[index],
                        borderColor: 'transparent',
                        nameCustomer:item.nameCustomer,
                        nameStaff:item.staffId.fullName,
                        totalAmount:item.totalAmount,
                        isReport:item.isReport

                    });
                });
                this.calendarOptions.events = data;
            } catch (error) {
                console.log(error);
            }
        },
        async filterDate() {
            this.isSort = true;
            let { day, month, year, field } = this.dateFilter;
            // const typeDate = ['startDate','endDate','currentDate']
            // const check = typeDate.includes(field)
            // if(check){
            //     day-=1
            // }
            const response = await taskService.filterByDate(day, month, year, field, this.pageNumber, this.pageSize);
            this.tasks=response.data
            let data = [];
            const status = ['Hoàn thành', 'Đang tiến hành', 'Chưa bắt đầu', 'Quá hạn'];
            const color = ['#A2FF86', '#7091f5', '#7D7C7C', '#FC4F00'];
            this.tasks.forEach((item) => {
                    const index = status.indexOf(item.status);
                    data.push({
                        id: item._id,
                        serviceId: item.serviceId,
                        staffId: item.staffId,
                        title: `${item.serviceId.name}`, // a property!
                        start: item.startDate, // a property!
                        end: item.endDate,
                        status: item.status,
                        allDay: item.allDay,
                        backgroundColor: color[index],
                        borderColor: 'transparent',
                        nameCustomer:item.nameCustomer,
                        nameStaff:item.staffId.fullName,
                        totalAmount:item.totalAmount,
                        isReport:item.isReport
                    });
                });
                this.calendarOptions.events = data;
        },
        fillter(name){
          let status = []
          const events = this.calendarOptions.events
          status = events.filter(event => event.status === name)
          this.calendarOptions.events=status
          this.isSort=true
        },
        offSort(){
          this.isSort=false
          this.inputSearch=''
          this.inputSearch2=''
          this.dateFilter={
                day: '0',
                month: '0',
                year: '0',
                field: '',
            }
          this.getAll()
        },
        closeCreate() {
            this.activeCreate = false;
            this.printTaskId=''
        },
        async getAllService() {
            try {
                const response = await serviceService.getAll();
                this.services = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async editStatus(id, status) {
            try {
                const response = await taskService.updateStatus(id, { status });
                this.infoTaskEdit = response.data.data;
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        },
        async editTask(id) {
            try {
                console.log(this.infoTaskEdit)
                const response = await taskService.update(id, this.infoTaskEdit);
                if (response.data.status) {
                    this.getAll();
                    this.infoTaskEdit = response.data.data;
                    this.mesFail = '';
                    this.messSuc = 'sửa công viêc thành công';
                } else {
                    this.mesFail = response.data.mes;
                    this.messSuc = '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        async changeTime(id,data){
            try {
                const response = await taskService.changeTime(id, data)
                if(response.data.status){
                    alert('Thay đổi thời gian thành công')
                    this.getAll()
                }
                else{
                    alert('Thay đổi thời gian không  thành công')
                    this.getAll()
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTask(id) {
            try {
                if (confirm('Xóa công việc này')) {
                    const response = await taskService.delete(id);
                    if (response.data.status) {
                        this.getAll();
                        this.activeEdit = false;
                        alert('Xóa tành công');
                    } else {
                        this.mesFail = 'Thêm thất bại';
                        this.messSuc = '';
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getCustomerById(id) {
            try {
                const response = await customerService.getById(id);
                this.customerInfo = response.data;
                this.activeEditCustomer = true;
                this.mesSucCus=''
                this.mesFaiCus=''

            } catch (error) {
                console.log(error);
            }
        },
        async getServiceById(id) {
            try {
                const response = await serviceService.getById(id);
                this.serviceInfo = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async ChangePriceTaskEdit(id){
          try {
                const response = await serviceService.getById(id);
                this.infoTaskEdit.totalAmount = response.data.price;
            } catch (error) {
                console.log(error);
            }
        },
        async editCustomer() {
            try {
                const isValid = this.validateForm(this.customerInfo);
                const data = {
                    ...this.customerInfo,
                };
                data.address = this.activeEditAddress
                    ? this.customerInfo.address2 +
                      ', ' +
                      this.address.ward +
                      ', ' +
                      this.address.district +
                      ', ' +
                      this.address.city
                    : this.customerInfo.address;
                if (isValid) {
                    const response = await customerService.update(this.customerInfo._id, data);
                    if (response.data.status) {
                        await this.getCustomerById(this.customerInfo._id);
                        this.mesSucCus = response.data.mes;
                        this.mesFaiCus = '';
                        this.VmodelAddress = { city: '', district: '', ward: '' };
                        this.activeEditAddress = false;
                        this.getAllCustomers();
                    } else {
                        this.mesFaiCus = response.data.mes;
                        this.mesSucCus = '';
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        validateForm(infoCustomer) {
            const phoneRegex = /^[0-9]+$/;
            if (!phoneRegex.test(infoCustomer.phone) || infoCustomer.phone.length < 10) {
                this.valid.phone = 'Số điện thoại không hợp lệ';
            } else {
                this.valid.phone = undefined;
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
        async addCustomer() {
            try {
                const isValid = this.validateForm(this.customer);
                const data = {
                    ...this.customer,
                };
                data.address =
                    this.customer.address +
                    ', ' +
                    this.address.ward +
                    ', ' +
                    this.address.district +
                    ', ' +
                    this.address.city;
                this.address = data.address
                if (isValid) {
                    const response = await customerService.create(data);
                    if (response.data.status) {
                        this.mesSucCus = response.data.mes;
                        this.mesFaiCus = '';
                        this.VmodelAddress = { city: '', district: '', ward: '' };
                        this.customer = {};
                        this.getAllCustomers();
                    } else {
                        this.mesFaiCus = response.data.mes;
                        this.mesSucCus = '';
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getCity() {
            const res = await axios.get('https://provinces.open-api.vn/api/');
            this.city = [...res.data];
        },
        async getDistricts(info) {
            const code = info.code;
            const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}/?depth=2`);
            (this.districts = [...res.data.districts]), (this.address.city = info.name);
        },
        async getWards(info) {
            const code = info.code;
            this.address.district = info.name;
            const res = await axios.get(`https://provinces.open-api.vn/api/d/${code}/?depth=2`);
            this.wards = [...res.data.wards];
        },
        saveAddress(info) {
            this.address.ward = info.name;
        },
        closeFormCustomer() {
            this.activeCustomer = false;
            this.city = [];
            this.districts = [];
            (this.wards = []), (this.VmodelAddress = { city: '', district: '', ward: '' });
        },
        closeFormCustomerEdit() {
            this.activeEditCustomer = false;
            this.activeEditAddress = false;
            this.city = [];
            this.districts = [];
            (this.wards = []), (this.VmodelAddress = { city: '', district: '', ward: '' });
            this.getAllCustomers();
        },
        async getAllCustomers() {
            try {
                const response = await customerService.getAll();
                this.customers = [...response.data];
            } catch (error) {
                console.log(error);
            }
        },
        handleFitter(name, value) {
            if(this.idTimeOut==null){
                this.isSort=false
            }
            clearTimeout(this.idTimeOut);
            this.getAll();
            this.idTimeOut = setTimeout(() => {
                this.filter(name,value);
            }, 500);
        },
        filter(name) {
            if(this.inputSearch !='' || this.inputSearch2 !=''){
                this.isSort = true;
                const regex = new RegExp(this.inputSearch.trim(), 'i');
                const regex2 = new RegExp(this.inputSearch2.trim(), 'i');
                let abc=[]
                if(name === 'nameCustomer'){
                     abc = this.calendarOptions.events.filter((event) => {
                        return regex.test(event[name]);
                    });
                }
                else{
                    abc = this.calendarOptions.events.filter((event) => {
                        return regex2.test(event[name]);
                    });
                }
                this.calendarOptions.events = abc;
            }
            else{
                this.isSort = false;
                this.getAll()
            }
        },
        async printPDF(id){
            const task = await taskService.getById(id)
            const printTemplate= printTemlateTask(task.data)
            print(printTemplate,'Phiếu đơn hàng' )
        },
        async printPDFReporyt(id){
            const task = await taskService.getById(id)
            const printTemplate= printTemplateTaskReport(task.data)
            print(printTemplate,'Phiếu đơn hàng' )
        },
        getYears() {
            const yearsTarget = new Date().getFullYear();
            for (let i = 5; i >= 1; i--) {
                this.years.push(yearsTarget - i);
            }
            this.years.push(yearsTarget);
        },
        exportToExcel() {
            const data=[]
            this.tasks.forEach(event=>{
                event.startDate = new Date(event.startDate)
                event.startDate.setDate(event.startDate.getDate()+1)
                data.push({
                    'Mã': event._id,
                    'Tên khách hàng':event.nameCustomer,
                    'Số điện thoại':event.phone,
                    'Địa chỉ':event.address,
                    'Nhân viên thực hiện':event.staffId.fullName,
                    'Dịch vụ':event.serviceId.name,
                    'Báo cáo': event.isReport ? 'Đã báo cáo' : 'Chưa báo cáo',
                    'Tổng số tiền phụ kiện':format.formatCurrency(event.totalOfAccessory),
                    'Tổng giá':format.formatCurrency(event.totalAmount),
                    'Ngày bắt đầu công việc': format.formatDateNoTime(event.startDate),
                    'Ngày kết thúc công việc': format.formatDateNoTime(event.endDate),
                    'Trạng thái':event.status
                })
            })
            exportToExcel(data, 'Congviec');
        },
        formatDate(date){
            return format.formatDate(date)
        },
        formatDateNoTime(date){
            return format.formatDateNoTime(date)
        },
        formatHour(date){
            return format.formatHour(date)
        },
        pushRow() {
            this.infoAccessorys.push({
                accessoryId: '',
                priceSale: 0,
            });
        },
        popRow() {
            if (this.infoAccessorys.length <= 1) {
                alert('Dòng cuối');
            } else {
                this.infoAccessorys.pop();
                this.total()
            }
        },
        async getAllAccessory() {
            try {
                const response = await accessoryService.getAll();
                this.accessorys = response.data;
                this.accessorys= this.accessorys.filter(item=>item.inputQuantity>0)
            } catch (error) {
                console.log(error);
            }
        },
        getproductById(id, index) {
            this.accessorys.map((product) => {
                if (product._id === id) {
                    this.infoAccessorys[index].priceSale = product.priceSale;
                    this.infoAccessorys[index].nameProduct = product.name;
                    this.infoAccessorys[index].inputQuantity=product.inputQuantity
                } else {
                    return;
                }
            });
        },
        checkQuantity(e, product) {
            this.total()
            if (e.target.value <= 0) {
                e.target.style.borderColor = 'red';
                this.isSubmit = false;
                this.mesValid='Số lượng phải lớn hơn 0'
                this.idValid=product.accessoryId
            }
            else if(e.target.value > product.inputQuantity){
                e.target.style.borderColor = 'red';
                this.isSubmit = false;
                this.totalAmount = 0;
                this.pricePayed=0
                this.mesValid='Số lượng trong kho không đủ'
                this.idValid=product.accessoryId
            }
            else {
                e.target.style.borderColor = '#0E8388';
                this.isSubmit = true;
                this.mesValid=''
                this.idValid=''
            }
        },
        checkWage(e){
            this.total()
            if(e.target.value < 0){
                e.target.style.borderColor = 'red';
                this.isSubmit = false;
                this.mesValidWage='Không được nhập số bé hơn 0'
            }
            else if(e.target.value ==''){
                this.wage=0
                e.target.style.borderColor = '#0E8388';
                this.isSubmit = true;
                this.mesValidWage=''
            }
            else{
                e.target.style.borderColor = '#0E8388';
                this.isSubmit = true;
                this.mesValidWage=''
            }
        },
        formatCurrency(price) {
            return format.formatCurrency(price);
        },
        total() {
            this.totalAmount=0
            this.totalOfAccessory=0
            this.infoAccessorys.forEach(item =>{
                this.totalOfAccessory+=item.priceSale*item.quantity || 0
            })
            this.totalAmount=this.totalOfAccessory+ this.infoTask.wage
            if(this.totalAmount>0){
                this.isSubmit=true
            }
        },
        async paymentMeThod(type) {
            this.choosePayent = false;
            if (type == 'COD') {
                this.isClassCod = !this.isClassCod;
                if (this.isClassCod) {
                    this.paymentMethod = 'COD';
                    this.isClassOnlVNPAY = false;
                    this.isClassOnlMOMO = false;
                } else {
                    this.paymentMethod = '';
                }
            } else if (type == 'VNPAY') {
                this.isClassOnlVNPAY = !this.isClassOnlVNPAY;
                if (this.isClassOnlVNPAY) {
                    this.paymentMethod = 'VNPAY';
                    this.isClassCod = false;
                    this.isClassOnlMOMO = false;
                } else {
                    this.paymentMethod = '';
                }
            } else if (type == 'MOMO') {
                this.isClassOnlMOMO = !this.isClassOnlMOMO;
                if (this.isClassOnlMOMO) {
                    this.paymentMethod = 'MOMO';
                    this.isClassCod = false;
                    this.isClassOnlVNPAY = false;
                } else {
                    this.paymentMethod = '';
                }
            }
        },
        closeServiceCreate(){
            this.activeServiceCreate=false
            this.getAllService()
        },
        handleImage(event){
            this.infoTask.image = event.target.files[0] || '';
            const src = URL.createObjectURL(this.infoTask.image)
            this.imgSrc= src
        },
        deleteEntryImg(){
            this.infoTask.image=null,
            this.imgSrc=''
            this.$refs.entryInputFile.value=''
        },
        async submitReport(){
            try{
                const id= this.infoTaskEdit._id
                const data={
                    accessorys:this.infoAccessorys,
                    wage:this.infoTask.wage,
                    image:this.infoTask.image,
                    totalOfAccessory:this.totalOfAccessory,
                    totalAmount:this.totalAmount,
                    isReport:true,
                    status:'Đã báo cáo'
                }
                const response = await taskService.report(id, data)
                if(response.data.status){
                    this.resultReport=response.data.result
                    this.mesReportS=response.data.mes
                    this.mesReportF=''
                    this.infoAccessorys=[{ accessoryId: '' }]
                    this.imgSrc=''
                    this.infoTask.wage=0
                    this.totalAmount=0
                    this.totalOfAccessory=0
                    this.$refs.entryInputFile.value=''
                   
                }
                else{
                    this.mesReportF=response.data.mes
                    this.mesReportS=''
                }
            }
            catch(error){
                console.log(error);
            }
        },
        closeReportCreate(){
            this.activeOrderTask=false
            if(Object.keys(this.resultReport).length>0){
                this.infoTaskEdit = this.resultReport;
                this.infoTaskEdit.staffId = this.resultReport.staffId;
                this.infoTaskEdit.serviceId = this.resultReport.serviceId;
            }
        },
        closeEdit(){
            this.activeEdit = false
            this.getAll()
        }
    },
    mounted() {
        this.getAll();
        this.getCity();
        this.getAllCustomers();
        this.getYears()
        this.getAllAccessory()
        this.getAllService()
    },
};
</script>

<style scoped>
.fc {
    color: red;
    text-decoration: none;
    z-index:1;
}

.form-task {
    width: 1200px;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    padding: 20px;
    border-radius: 5px;
    z-index: 1000;
}
.form-task2 {
    width: 1000px;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    padding: 20px;
    border-radius: 5px;
}
.form-select {
    width: 100%;
}
.status {
    width: 80%;
    height: 10px;
    background: blue;
    margin: auto;
    position: relative;
}
.status-item {
    display: flex;
    flex-direction: column;
    width: 120px;
    align-items: center;
    position: absolute;
    top: -13px;
    left: var(--left);
}
.status-item span:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border: 3px solid var(--border-color);
    border-radius: 50%;
    background: #fff;
}
.status-progress-color {
    position: absolute;
    top: 0;
    left: 0;
    right: var(--left);
    bottom: 0;
    background: var(--colorB);
}
.note-content {
    width: 100%;
    height: calc(100% - 64px);
    border: 1px solid #ccc;
    margin-top: 27px;
    padding: 10px;
}
.note-color {
    display: flex;
    align-items: center;
    width: 100%;
    height: 20px;
    margin-top: 10px;
    cursor: pointer;
}
.note-color span:nth-child(1) {
    width: 40px;
    height: 100%;
    background: var(--color);
    border-radius: 5px;
    margin-right: 10px;
}
.group input {
    width: 100%;
    padding: 5px 10px;
    outline: none;
    border-radius: 5px;
}
.sort{
  cursor: pointer;
  color: rgb(255, 21, 21);
}
.input-price{
  height: 45px;
  margin-top: 6px;
  padding: 0 5px;
  border-color: #0e8388;
}
.customer-form{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 650px;
    min-height: 0px;
    background: #fff;
    padding: 10px 20px;
}
.payment {
    width: 100%;
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}
.payment-active {
    background: #f2f6fe;
    border-color: #0072bc;
}
.payment img {
    width: 40px;
    height: 40px;
}
.payment-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 70%;
}
.payment-content span:nth-child(1) {
    font-weight: 600;
    font-size: 18px;
}
.payment-checkbox span {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    display: block;
    border-radius: 50%;
    position: relative;
    background: #ccc;
}
.payment-checkbox span::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
}
.payment-active .payment-checkbox span {
    background: #0072bc;
}
.payment-error {
    border-color: red;
}
.scroll {
    height: 130px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    overflow-x: hidden;
}
.height-scroll{
    height: 160px;
}
.scroll::-webkit-scrollbar {
    width: 0;
}
.control {
    height: 40px;
}
.scroll2 {
    min-height: 230px;
    border: 1px solid #ccc;
    margin: 10px 0px;
    padding: 20px;
}
.note {
    background-color: #fff;
    margin: 0;
    width: 100%;
    outline: none;
    padding: 10px;
    border-radius: 5px;
    height: 70px;
}
.spe-group .price {
    display: flex;
    height: 45px;
    align-items: center;
    width: 100%;
    border: 1px solid #0e8388;
    border-radius: 5px;
    padding-left: 10px;
    background: #ccc;
}
.image img{
    width:100px;
    height:100px;
}

.image{
    position: relative;
    display:flex;
    justify-content: flex-end;
}
.image i{
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 25px;
    color: red;
    cursor: pointer;
}
.img-detail-report{
    height: 170px;
}
.img-detail-report img{
    width: 100%;
    height: 100%;
}

</style>
