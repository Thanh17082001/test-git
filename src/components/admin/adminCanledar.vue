<template>
  <div class="row">
    <div class="col-lg-2">
      <h3 class="text-danger mt-1">Danh mục</h3>
      <div class="note-content">
        <h5 class=" mt-2 text-info" >Màu sắc công việc</h5>
        <div>
          <div class="note-color">
            <span style="--color:#7D7C7C"></span>
            <span>: Chưa bắt đầu</span>
          </div>
          <div class="note-color">
            <span style="--color:#7091F5"></span>
            <span>: Đang thực hiện</span>
          </div>
          <div class="note-color">
            <span style="--color:#A2FF86"></span>
            <span>: Hoàn thành</span>
          </div>
          <div class="note-color">
            <span style="--color:#FC4F00"></span>
            <span>: Quá hạn</span>
          </div>
        </div>
        <div class="search-task mt-2">
          <h5 class="text-info">Tìm kiếm</h5>
          <div class="search-content row">
            <div class="col-lg-12 group">
              <label for="" class="text-start mt-0">Tìm theo nhân viên</label>
              <input type="text" placeholder="Nhập tên nhân viên">
            </div>
            <div class="col-lg-12 group">
              <label for="" class="text-start">Tìm theo khách hàng</label>
              <input type="text" placeholder="Nhập tên nhân viên">
            </div>
          </div>
        </div>
      </div>
    </div>
    <FullCalendar class="col-lg-10" ref="fullCalendar" :options="calendarOptions">
        <template v-slot:eventContent='arg'>
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
    </FullCalendar>

  </div>

    <!-- tạo mới việc -->
    <div class="overlay" v-if="activeCreate">
      <form action="" @submit.prevent.stop="submitCreate">
          <div class="d-flex justify-content-end">
              <i @click="closeCreate" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
          </div>
          <h3>Tạo công việc</h3>
          <div class="row">
              <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
              <div class="spe-group col-lg-4">
                  <label for="">Tên khách hàng<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTask.nameCustomer" type="text" placeholder="Tên khách hàng..." required>
              </div>
              <div class="spe-group col-lg-4">
                  <label for="">Địa chỉ<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTask.address" type="text" placeholder="Địa chỉ..." required>
              </div>
              <div class="spe-group col-lg-4">
                  <label for="">Số điện thoại<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTask.phone" type="text" placeholder="Số điện thoại..." required>
              </div>
              <div class="group col-lg-6">
                  <div class="d-flex mb-1">
                      <label for="" class="mt-0">Chọn nhân viên <span class="required">*</span></label>
                  </div>
                  <select v-model="infoTask.staffId"  class="form-select" required>
                      <option value="" class="form-option">--- Chọn ---</option>
                      <option  v-for="staff in staffs" :value="staff._id" :key="staff._id">{{ staff.fullName }}</option>
                  </select>
              </div>
              <div class="group col-lg-6">
                  <div class="d-flex mb-1">
                      <label for="" class="mt-0">Chọn dịch vụ<span class="required">*</span></label>
                  </div>
                  <select v-model="infoTask.serviceId"  class="form-select" required>
                      <option value="" class="form-option">--- Chọn ---</option>
                      <option  v-for="service in services" :value="service._id" :key="service._id">{{ service.name }}</option>
                  </select>
              </div>
          </div>
          <button class="btn btn-success mt-3">Tạo</button>
      </form>
    </div>

    <!-- edit cong việc -->
    <div class="overlay" v-if="activeEdit">
      <form action="" @submit.prevent.stop>
          <div class="d-flex justify-content-end">
              <i @click="activeEdit=false" class="fa-solid fa-xmark fs-1 text-danger me-2"></i>
          </div>
          <h3>Sửa công việc</h3>
          <div class="row">
              <span class="fs-4" :class="{'text-danger':!!mesFail, 'text-success':!!messSuc}">{{!!mesFail ?mesFail:messSuc}}</span>
              <div class="spe-group col-lg-4 mb-4">
                  <label for="">Tên khách hàng<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTaskEdit.nameCustomer" type="text" placeholder="Tên khách hàng..." required>
              </div>
              <div class="spe-group col-lg-4 mb-4">
                  <label for="">Địa chỉ<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTaskEdit.address" type="text" placeholder="Địa chỉ..." required>
              </div>
              <div class="spe-group col-lg-4 mb-4">
                  <label for="">Số điện thoại<span class="text-danger ms-2">*</span></label>
                  <input v-model="infoTaskEdit.phone" type="text" placeholder="Số điện thoại..." required>
              </div>
              <div class="col-lg-12 mb-5">
                <div class="status" v-if="infoTaskEdit.status=='Quá hạn'">
                  <div class="status-progress-color" style="--left:0% ; --colorB:#FC4F00"></div>
                  <div class="status-item" style="--left:2%">
                    <span style="--border-color:#FC4F00">1</span>
                    <span>Chưa bắt đầu</span>
                  </div>
                  <div class="status-item" style="--left:35%">
                    <span style="--border-color:#FC4F00">2</span>
                    <span>Đang tiến hành</span>
                  </div>
                  <div class="status-item" style="--left:70%">
                    <span style="--border-color:#FC4F00">3</span>
                    <span>Hoàn thành</span>
                  </div>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Chưa bắt đầu'" @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')">Cập nhật thành đang tiến hành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Đang tiến hành'" @click="editStatus(infoTaskEdit._id, 'Hoàn thành')">Cập nhật thành hoàn thành</span>
                  <button class="btn btn-danger my-5" v-if="infoTaskEdit.status=='Quá hạn'" disabled>Quá hạn</button>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Hoàn thành'" >Đã hoàn thành</span>
                </div>
                <div class="status" v-if="infoTaskEdit.status=='Chưa bắt đầu'">
                  <div class="status-progress-color" style="--left:80% ; --colorB:#11e911"></div>
                  <div class="status-item" style="--left:2%">
                    <span style="--border-color:#11e911">1</span>
                    <span>Chưa bắt đầu</span>
                  </div>
                  <div class="status-item" style="--left:35%">
                    <span style="--border-color:blue">2</span>
                    <span>Đang tiến hành</span>
                  </div>
                  <div class="status-item" style="--left:70%">
                    <span style="--border-color:blue">3</span>
                    <span>Hoàn thành</span>
                  </div>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Chưa bắt đầu'" @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')">Cập nhật thành đang tiến hành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Đang tiến hành'" @click="editStatus(infoTaskEdit._id, 'Hoàn thành')">Cập nhật thành hoàn thành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Hoàn thành'" >Đã hoàn thành</span>
                </div>

                <div class="status" v-if="infoTaskEdit.status=='Đang tiến hành'">
                  <div class="status-progress-color" style="--left:45% ; --colorB:#11e911"></div>
                  <div class="status-item" style="--left:2%">
                    <span style="--border-color:#11e911">1</span>
                    <span>Chưa bắt đầu</span>
                  </div>
                  <div class="status-item" style="--left:35%">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang tiến hành</span>
                  </div>
                  <div class="status-item" style="--left:70%">
                    <span style="--border-color:blue">3</span>
                    <span>Hoàn thành</span>
                  </div>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Chưa bắt đầu'" @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')">Cập nhật thành đang tiến hành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Đang tiến hành'" @click="editStatus(infoTaskEdit._id, 'Hoàn thành')">Cập nhật thành hoàn thành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Hoàn thành'" >Đã hoàn thành</span>
                </div>

                <div class="status" v-if="infoTaskEdit.status=='Hoàn thành'">
                  <div class="status-progress-color" style="--left:0% ; --colorB:#11e911"></div>
                  <div class="status-item" style="--left:2%">
                    <span style="--border-color:#11e911">1</span>
                    <span>Chưa bắt đầu</span>
                  </div>
                  <div class="status-item" style="--left:35%">
                    <span style="--border-color:#11e911">2</span>
                    <span>Đang tiến hành</span>
                  </div>
                  <div class="status-item" style="--left:70%">
                    <span style="--border-color:#11e911">3</span>
                    <span>Hoàn thành</span>
                  </div>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Chưa bắt đầu'" @click="editStatus(infoTaskEdit._id, 'Đang tiến hành')">Cập nhật thành đang tiến hành</span>
                  <span class="btn btn-info my-5" v-if="infoTaskEdit.status=='Đang tiến hành'" @click="editStatus(infoTaskEdit._id, 'Hoàn thành')">Cập nhật thành hoàn thành</span>
                  <button class="btn btn-info my-5" v-if="infoTaskEdit.status=='Hoàn thành'" disabled>Đã hoàn thành</button>
                </div>
              </div>
              <div class="group col-lg-6 mt-5">
                  <div class="d-flex mb-1">
                      <label for="" class="mt-0">Chọn nhân viên <span class="required">*</span></label>
                  </div>
                  <select v-model="infoTaskEdit.staffId"  class="form-select" required>
                      <option value="" class="form-option">--- Chọn ---</option>
                      <option  v-for="staff in staffs" :value="staff._id" :key="staff._id">{{ staff.fullName }}</option>
                  </select>
              </div>
              <div class="group col-lg-6 mt-5">
                  <div class="d-flex mb-1">
                      <label for="" class="mt-0">Chọn dịch vụ<span class="required">*</span></label>
                  </div>
                  <select v-model="infoTaskEdit.serviceId"  class="form-select" required>
                      <option value="" class="form-option">--- Chọn ---</option>
                      <option  v-for="service in services" :value="service._id" :key="service._id">{{ service.name }}</option>
                  </select>
              </div>
          </div>
          <button class="btn btn-warning me-3 mt-3" @click="editTask(infoTaskEdit._id)">Sửa</button>
          <button class="btn btn-danger mt-3" @click="deleteTask(infoTaskEdit._id)">Xóa</button>
      </form>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import taskService from '@/service/task.service'
import staffService from '@/service/staff.service'
import serviceService from '@/service/service.service'
export default {
    components: {
    FullCalendar,
  },
  data() {
    return {
      mesFail:'',
      messSuc:'',
      infoTask:{staffId:'',serviceId:''},
      infoTaskEdit:{},
      activeCreate:false,
      activeEdit:false,
      isCreate:false,
      staffs:[],
      services:[],
      selectInfo:{},
      currentDate:null,
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        

        themeSystem: 'bootstrap5',
        // headerToolbar: {
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // },
        locale:'vi',
        events: [
        ],
       
        // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends:true,
        eventsSet: this.handleEvents,
        select: this.handleDateSelect,
        eventClick:(arg)=>{
            this.detatilTask(arg)
        },
        eventAdd:(arg) =>{
            const currentDate= this.$refs.fullCalendar.getApi().currentData.currentDate
            const info ={
                serviceId:this.infoTask.serviceId,
                staffId:this.infoTask.staffId,
                nameCustomer:this.infoTask.nameCustomer,
                phone:this.infoTask.phone,
                address:this.infoTask.address,
                startDate:arg.event.start,
                endDate:arg.event.end ? arg.event.end : arg.event.start,
                status: this.selectInfo.status ? this.selectInfo.status : 'Chưa bắt đầu',
                currentDate:currentDate
            }
            this.addTask(info)
            this.getAll()
          
        },
        datesSet:()=>{
          const currentDate2 = this.$refs.fullCalendar.getApi().currentData.currentDate
          this.currentDate=currentDate2
        }
      },
    }
  },
  // watch:{
  //   currentDate(){
  //     this.getAll()
  //   }
  // },
  
  methods: {
    next() {
      this.$refs.calendar.fireMethod('next')
      console.log('a');
    },
    
    handleEvents(events) {
      this.currentEvents = events
    },
    async detatilTask(arg){
     try {
        const id=arg.event._def.publicId
        const createDate= {
          startDate:arg.event.start, 
          endDate:arg.event.end.getDate()-1 !==arg.event.start.getDate() ?arg.event.end : arg.event.start
        }
        const response = await taskService.getById(id)
        this.getAllService()
        await this.getAllStaff(createDate)
        this.staffs.push({...response.data.staffId})
        this.infoTaskEdit=response.data
        this.infoTaskEdit.staffId=response.data.staffId._id
        this.activeEdit=true
        this.mesFail=''
        this.messSuc=''
     } catch (error) {
      console.log(error);
     }
    },

    async getStaffs(){
      try {
        const response = await staffService.getAll()
        this.staffs = response.data
      } catch (error) {
        console.log(error);
      }
    },
    async submitCreate(){
      let calendarApi = this.selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      // this.selectInfo.end.setDate(this.selectInfo.end.getDate()-1)
      if (this.activeCreate) {
        calendarApi.addEvent({
          id: 3,
          title:`${this.infoTask.serviceId}`,
          start: new Date (this.selectInfo.startStr),
          end: new Date(this.selectInfo.endStr),
          allDay: this.selectInfo.allDay,
          
        })
        
      }
    },
    async handleDateSelect(selectInfo) {
      const date = new Date()
      const selecEnd = new Date(selectInfo.endStr)
      if(selecEnd<date){
        if(confirm('Bạn muốn tạo công việc bé hơn ngày hôm nay')){
          this.selectInfo = selectInfo
          this.selectInfo.status = 'Quá hạn'
          this.activeCreate=true
          this.mesFail=''
          this.messSuc=''
          await this.getAllStaff({
              startDate:selectInfo.start, 
              endDate:selectInfo.end.getDate()-1 !==selectInfo.start.getDate() ?selectInfo.end : selectInfo.start  
          })
          await this.getAllService()
        }
      }
      else{
        this.selectInfo = selectInfo
        this.activeCreate=true
        this.mesFail=''
        this.messSuc=''
        await this.getAllStaff({
            startDate:selectInfo.start, 
            endDate:selectInfo.end.getDate()-1 !==selectInfo.start.getDate() ?selectInfo.end : selectInfo.start  
        })
        await this.getAllService()
      }
      
    },

    async addTask(info){
        try {
          const response = await taskService.create(info)
          if(response.data.status){
            this.getAll()
            this.infoTask={staffId:'',serviceId:''}
            this.mesFail=''
            this.messSuc="Thêm công viêc thành công"
          }
          else{
            this.mesFail='Thêm thất bại'
            this.messSuc=""
          }
        } catch (error) {
            console.log(error);
        }
    },
    
    async getAllStaff(dateCreate){
      try {
        const fomatDateCreate = {
          start: dateCreate.startDate.toLocaleDateString('en-US'),
          end: dateCreate.endDate.toLocaleDateString('en-US')
        }
        dateCreate.endDate.setDate(dateCreate.endDate.getDate()-1) 
        this.staffs=[]
          const response = await staffService.getAll()
          const a = this.calendarOptions.events.filter(task =>{
            task.start = new Date(task.start)
            task.end = new Date(task.end)

            const fomatTaskDate={
              start:  task.start.toLocaleDateString('en-US'),
              end: task.end.toLocaleDateString('en-US')
            }
            fomatTaskDate.end = new Date(fomatTaskDate.end)
            fomatTaskDate.end.setDate(fomatTaskDate.end.getDate()-1)
            fomatTaskDate.end = fomatTaskDate.end.toLocaleDateString('en-US')
           if(fomatDateCreate.start <= fomatTaskDate.start && fomatDateCreate.end >= fomatTaskDate.end){
            return true
           }
           else if(fomatDateCreate.start == fomatTaskDate.end){
            return true
           }
          else if(fomatDateCreate.start == fomatDateCreate.end){
            if(fomatDateCreate.start == fomatTaskDate.end || fomatDateCreate.start == fomatTaskDate.start){
              return true
            }
          }
          else{
            return false
          }
          })
          const c= response.data.filter( staff =>{
            return !a.some(item2 => item2.staffId._id === staff._id);
          })
         this.staffs = c.length>0 ? c : response.data
      } catch (error) {
        console.log(error);
      }
    },
    async getAll(){
        try {
          const month = this.currentDate.getMonth()+1
          const year = this.currentDate.getFullYear()
            const response = await taskService.filterByDate(0,month,year,'currentDate')
            console.log(response);
            let data=[]
            const status = ['Hoàn thành', 'Đang tiến hành', 'Chưa bắt đầu', 'Quá hạn']
            const color = ['#A2FF86', '#7091f5', '#7D7C7C', '#FC4F00']
            response.data.forEach((item) =>{
              const index =status.indexOf(item.status)
                data.push({
                id:item._id,
                serviceId: item.serviceId,
                staffId:item.staffId,
                title: `${item.serviceId.name} cho khách: ${item.nameCustomer}`, // a property!
                start: item.startDate, // a property!
                end: item.endDate,
                status:item.status,
                allDay:true,
                backgroundColor: color[index],
                borderColor:'transparent'
            })
            })
            
            this.calendarOptions.events=data
        } catch (error) {
            console.log(error);
        }
    },
    closeCreate(){
      this.activeCreate=false
    },
    async getAllService(){
      try {
        const response = await serviceService.getAll()
        this.services = response.data
      } catch (error) {
        console.log(error);
      }
    },
    async editStatus(id, status){
      try {
        const response = await taskService.updateStatus(id, {status})
        this.infoTaskEdit= response.data.data
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async editTask(id){
      try {
        const response =await taskService.update(id, this.infoTaskEdit)
        if(response.data.status){
              this.getAll()
              this.infoTaskEdit=response.data.data
              this.mesFail=''
              this.messSuc="sửa công viêc thành công"
            }
            else{
              this.mesFail=response.data.mes
              this.messSuc=""
            }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTask(id){
      try {
        if(confirm('Xóa công việc này')){
          const response = await taskService.delete(id)
          if(response.data.status){
                this.getAll()
                this.activeEdit=false
                alert("Xóa tành công")
              }
              else{
                this.mesFail='Thêm thất bại'
                this.messSuc=""
              }

        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    this.getAll()
    // setInterval(()=>{
    //   const currentDate = this.$refs.fullCalendar.getApi().currentData.currentDate
    //   console.log(currentDate);
    // }, 1000); 
    this.$nextTick(() => {
    this.$watch(() => this.$refs.fullCalendar.getApi().currentData.currentDate, (newDate, oldDate) => {
      // Xử lý khi có sự thay đổi về ngày
      console.log('Ngày đã thay đổi từ', oldDate, 'sang', newDate);
      
      // Thực hiện các hành động khác dựa trên sự thay đổi của ngày
      // ...
    });
  });
  },
}
</script>

<style scoped>
    .fc{
        color: red;
        text-decoration: none;
    }
    
    form{
      width: 600px;
      background: #fff;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      padding: 20px;
      border-radius: 5px;
  }
  .form-select{
      width: 100%;
  }
  .status{
    width: 80%;
    height: 10px;
    background: blue;
    margin: auto;
    position: relative;
}
.status-item{
  display: flex;
  flex-direction: column;
  width: 120px;
  align-items: center;
  position: absolute;
  top: -13px;
  left:var(--left);
}
.status-item span:nth-child(1){
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  background: #fff;
}
.status-progress-color{
  position: absolute;
  top:0;
  left: 0;
  right: var(--left);
  bottom: 0;
  background: var(--colorB);

}
.note-content{
  width: 100%;
  height:calc(100% - 64px);
  border: 1px solid #ccc;
  margin-top: 27px;
  padding: 10px;
}
.note-color{
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  margin-top: 10px;
}
.note-color span:nth-child(1){
  width: 40px;
  height: 100%;
  background: var(--color);
  border-radius: 5px;
  margin-right: 10px;
}
.group input{
  width: 100%;
  padding :5px 10px;
  outline: none;
  border-radius: 5px;
}
</style>