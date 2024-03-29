import format from "./format";
function print(info = {}) {
    info.startDate= new Date(info.startDate)
    info.startDate.setDate(info.startDate.getDate()+1)
   const print= 
   `
   <div style="height:90%">
        <h4 style=" margin: 20px; font-size: 18px;">Số: ${info._id}</h4>
        <div style="width: 100%;">
            <h4 style="text-align: center; font-size: 30px; margin: 0px;">Phiếu báo cáo</h4>
            <br>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Ngày thực hiện: ${format.formatDateNoTime(info.startDate)}</h4>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Dịch vụ: ${info.serviceId.name}</h4>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 50%; text-align:center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Nhân viên </h4>
                <div  style="margin-bottom:0; margin-left:20px;">
                        <span><b>Họ và tên: </b>${info.staffId?.fullName}</span>
                        <br>
                        <span><b>Số điện thoại: </b>${info.staffId?.phone}</span>
                </div>
            </div>

            <div style="width: 50%; text-align: center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Thông tin khách hàng</h4>
                <div  style="margin-bottom:0; margin-left:20px;">
                        <span><b>Tên: </b>${info.nameCustomer}</span>
                        <br>
                        <span><b>Địa chỉ: </b>${info.address}</span>
                        <br>
                        <span><b>Số điện thoại: </b>${info.phone}</span>
                </div>
            </div>
        </div>
        <h5 style="text-align: center; font-size: 16px;">Danh sách phụ kiện</h5>
        <div style="margin: 20px 0; ">
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px;">
                <div style="width: 25%;">
                    Tên phụ kiện
                </div>
                <div style="width: 25%;">
                    Giá
                </div>
                <div style="width: 25%;">
                    Số lượng
                </div>
                <div style="width: 25%;">
                    Ghi chú
                </div>
            </div>
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; padding-bottom: 10px; height:330px">
                <div style="width: 25%;">
                    
                </div>
                <div style="width: 25%;">
                    
                </div>
                <div style="width: 25%;">
                    
                </div>
                <div style="width: 25%;">
                </div>
            </div>
        </div>
        <div style="width: 100%;">
            <div style="font-size: 20px; margin-bottom: 10px; display: flex; justify-content: flex-end;">
                <div  style="width:300px; display: flex; justify-content: flex-start;">
                    <b>Tiền công:</b>
                </div> 
            </div>
            <div style="font-size: 20px; margin-top: 10px; display: flex; justify-content: flex-end;">
                <div  style="width:300px; display: flex; justify-content: flex-start;">
                    <b>Tổng cộng:</b>
                </div> 
            </div>
        </div>
        <div style="margin-top: 40px; height: 150px;">
            <div style="width: 50%; float: left; text-align:center;">
                <b>Nhân viên</b></br>
                (Ký, họ tên)
            </div>
            <div style="width: 50%; float: left; text-align:center;">
                <b>Khách hàng</b></br>
                (Ký, họ tên)
            </div>
        </div>
    </div>
`

    return print;
}

export default print;
