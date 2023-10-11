import format from "./format";
function print(info = {}) {
    const user = JSON.parse(sessionStorage.getItem('user'))
   const print= 
   `
   <div style="height:100%">
        <h4 style=" margin: 20px; font-size: 18px;">Số: ${info._id}</h4>
        <div style="width: 100%;">
            <h4 style="text-align: center; font-size: 30px; margin: 0px;">Hóa đơn</h4>
            <br>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Ngày tạo phiếu: ${info.createdAt}</h4>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 50%; text-align:center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Nhân viên in phiếu</h4>
                <div  style="margin-bottom:0; margin-left:20px;">
                        <span><b>Họ và tên: </b>${user.user?.fullName}</span>
                        <br>
                        <span><b>Số điện thoại: </b>${user.user?.phoneNumber}</span>
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
        <h5 style="text-align: center; font-size: 16px;">Thông tin dịch vụ</h5>
        <div style="margin: 20px 0; ">
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px;">
                <div style="width: 25%;">
                    Tên dịch vụ
                </div>
                <div style="width: 25%;">
                    Giá
                </div>
                <div style="width: 25%;">
                    Nhân viên thực hiện
                </div>
                <div style="width: 25%;">
                    Ghi chú
                </div>
            </div>
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; padding-bottom: 10px;">
                <div style="width: 25%;">
                    ${info.serviceId.name}
                </div>
                <div style="width: 25%;">
                    ${info.serviceId.name}
                </div>
                <div style="width: 25%;">
                    ${info.staffId.fullName}
                </div>
                <div style="width: 25%;">
                </div>
            </div>
        </div>
        <div style="width: 100%;">
            <div style="font-size: 20px; margin-right: 10px; display: flex; justify-content: flex-end;">
                <b>Tổng cộng</b>: ${format.formatCurrency(info.totalAmount)}
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
