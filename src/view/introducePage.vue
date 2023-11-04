<template>
  <div class="introduce">
    <p class="fs-5">Xinh kính chào và cảm ơn quý khách đã truy cập vào website của chúng tôi</p>
    <div class="intro-banner">
        <img class="intro-logo" src="http://localhost:3000/logo/logo.jpg" alt="">
        <p>THIEN THANH COMPANY</p>
    </div>
    <div class="text-start">
        <h4 class="text-start">Giới thiệu</h4>
        <p>
            Do nắm bắt được thị trường tiềm năng về in ấn và sao chụp của Việt Nam thời mở cửa những năm 1990s, <strong>Thien Thanh Office</strong> đã ra đời với định hướng kinh doanh đầu tiên là phân phối máy photocopy đã qua sử dụng cho toàn miền bắc. Và từ đó, công ty chúng tôi đã dần dần phát triền, mở rộng quy mô và bắt đầu kinh doanh thêm các loại linh kiện vật tư của rất nhiều dòng máy photocopy thời bấy giờ. Cho đến những năm 2000s, khi nhu cầu khách hàng dần chuyển qua những dòng máy in văn phòng có kích thước nhỏ gọn hơn, những chủng loại máy in đầu tiên, 
            công nghệ hiện đại đã được <strong>Thien Thanh Office</strong> nhập khẩu về và cung cấp tới tay người tiêu dùng cùng với các đại lý lớn nhỏ trên toàn quốc.
        </p>
        <p>
            Với bề dày kinh nghiệm hơn 20 năm hoạt động trong lĩnh vực thiết bị máy văn phòng, <strong>Thien Thanh Office</strong> tự hào có một chỗ đứng vững chắc trên thị trường cũng như là sự tín nhiệm của khách hàng trên toàn quốc. Khi đến với chúng tôi, các bạn sẽ được trải nhiệm những dịch vụ mua sắm và chăm sóc khách hàng đắc lực nhất.
        </p>
        <p>
            Bên cạnh đó, <strong>Thien Thanh Office</strong> cũng muốn gửi lời cảm ơn trân trọng đến những khách hàng đã hỗ trợ và hợp tác cùng công ty chúng tôi từ những ngày đầu thành lập. Nếu không có sự hỗ trợ và tin tưởng ấy, có thể chúng tôi đã không có được sự thành công rực rỡ như ngày hôm nay. Và <strong>Thien Thanh Office</strong> cũng hy vọng sẽ được tiếp tục đồng hành và hợp tác cùng quý khách hàng trong những năm tháng tiếp theo.
        </p>
    </div>
    <div class="text-start">
        <h4 class="text-start">Những mặt hàng và dịch vụ tiêu biểu</h4>
        <p>
            <strong>Công ty TNHH máy văn phòng Thien Thanh</strong> được phép của sở kế hoạch và đầu tư thành phố Cần Thơ, chuyên nhập khẩu và phân phối nguyên vật tư linh kiện máy in, máy photo, máy fax, các loại mực in, mực photo và là một trong số những doanh nghiệp uy tín hàng đầu trong lĩnh vực máy văn phòng tại thị trường Việt Nam. Những thương hiệu tiêu biểu của Thien Thanh Office gồm có: Ricoh, Toshiba, Canon, Sharp, Fuji-Xerox, HP, Epson, v.v. Các loại máy photocopy, máy in hoặc linh kiện vật tư đến từ những thương hiệu kể trên đều có nhiều tính năng ưu việt và được khách hàng trên toàn quốc tín nhiệm cũng như sử dụng rộng rãi. Ngoài ra, Hoàng Minh Office còn cung cấp các loại hình dịch vụ đổ mực, 
            bảo trì, bảo dưỡng và sửa chữa máy in, máy photocopy chất lượng cao, giá cả cạnh trạnh nhất trong khu vực Cần thơ
        </p>
    </div>
    <div class="text-start">
        <h4 class="text-start">Đinh hướng kinh doanh</h4>
        <p>
            Với phương châm luôn đặt lợi ích của khách hàng lên hàng đầu, <strong>Thien Thanh Office</strong> luôn luôn đổi mới để có thể nắm bắt tốt hơn thị trường cũng như thị hiếu của người tiêu dùng qua từng ngày. Sứ mệnh của chúng tôi là trở thành một doanh nghiệp kinh 
            doanh thiết bị máy văn phòng chuyên nghiệp nhất và tầm cỡ nhất tại Việt Nam, mang lại nhiều lợi ích quý giá mà khách hàng mong muốn.
        </p>
    </div>
    <div>
        <h4 class="text-start">Thông tin liên hệ</h4>
        <h5 class="fw-700 text-uppercase">{{ company.name }} </h5>
        <div class="mt-3"><strong>Địa chỉ:</strong> {{ company.address }} </div>
        <div class="mt-3"><strong>Số điện thoại:</strong> {{ company.phone }} </div>
        <div class="mt-3"><strong>Email:</strong> {{ company.email }} </div>
    </div>
  </div>
</template>

<script>
import companyService from '@/service/company.service';
export default {
    data(){
        return {
            company:{}
        }
    }, methods:{
        async getCompany(){
            try {
                const response = await companyService.get()
                this.company=response.data[0]
            } catch (error) {
                console.log(error);
            }
        }
    }, 
    mounted(){
        this.getCompany()
    }
}
</script>

<style scoped>
.introduce{
    margin: 20px 30px;
    font-size: 18.5px;
}
.intro-banner{
    height: 200px;
    width: 100%;
}
.intro-logo{
    width: 20%;
    aspect-ratio: 4/2;
}
.intro-banner p{
    font-size: 30px;
    font-weight: 700;
    color:#0e8388;
}
h4{
    font-weight: bold;
    margin-bottom: 20px;
}
</style>