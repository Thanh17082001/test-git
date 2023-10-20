import format from "./format";
function print(info = {}) {
  const src= info.image ? 'http://localhost:3000/'+info.image :''
  info.startDate= new Date(info.startDate)
    info.startDate.setDate(info.startDate.getDate()+1)
    let productTemplate=''
    info?.accessorys.forEach((product, index) => {
        productTemplate+=` 
        <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; padding-bottom: 10px;">
        <div style="width: 8.333333%; margin-top: 10px;">
        ${index+1}. 
     </div>
     <div style="width: 20%; margin-top: 10px;">
         ${product.nameProduct}
     </div>
     <div style="width: 20%; margin-top: 10px;">
         ${product.priceSale}
     </div>
     <div style="width: 20%; margin-top: 10px;">
         ${product.quantity}
     </div>
     <div style="width: 20%; margin-top: 10px;">
        
    </div>
        </div>
     `
    });

   const print= 
   `
   <div style="height:100%">
        <h4 style=" margin: 20px; font-size: 18px;">Số: ${info._id}</h4>
        <div style="width: 100%;">
            <h4 style="text-align: center; font-size: 30px; margin: 0px;">Hóa đơn</h4>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Ngày thực hiện: ${format.formatDateNoTime(info.startDate)}</h4>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Dịch vụ: ${info.serviceId?.name}</h4>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 50%; text-align:center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Nhân viên</h4>
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
        <h5 style="text-align: center; font-size: 16px;margin-top:10px;">Danh sách phụ kiện</h5>
        <div style="margin: 20px 0; ">
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px;">
                <div style="width: 8.333333%;">
                    STT
                </div>
                <div style="width: 20%;">
                    Tên Sản phẩm
                </div>
                <div style="width: 20%;">
                    Giá
                </div>
                <div style="width: 20%;">
                    Số lượng
                </div>
                <div style="width: 20%;">
                    Ghi chú
                </div>
            </div>
            ${productTemplate}
        </div>
        <div style="width: 100%;">
            <div style="font-size: 20px; margin-right: 10px; display: flex; justify-content: flex-end; ">
                <div>
                    <b>Tiền công</b>: ${format.formatCurrency(info.wage)}
                    <br>
                    <b>Tổng cộng</b>: ${format.formatCurrency(info.totalOfAccessory)}
                    <br>
                    <b>Tổng cộng</b>: ${format.formatCurrency(info.totalAmount)}
                    <br>
                </div>
            </div>
        </div>
    </div>
    <div style="height:90% ">
        <h5 style="text-align:center; font-size:20px;">Ảnh báo cáo thực tế</h5>
        <img style="height:auto; width:100%;" src="${src}">
    </div>
`

    return print;
}

export default print;
