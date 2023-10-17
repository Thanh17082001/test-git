import format from "./format";

function templateOrder(orders = []){
    let templateOrder=''
    orders.forEach((order,index) => {
        templateOrder +=`
            <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px;  width: 100%; height: ca;">
                <td  style="width: 3%;  border: 1px solid #111" >${index+1}</td>
                <td style="width: 12%; border: 1px solid #111; overflow: hidden;">${order._id}</td>
                <td style="width: 12%; border: 1px solid #111;">${order.productId.name}</td>
                <td style="width: 12%; border: 1px solid #111;">${order.nameCustomer}</td>
                <td style="width: 6%; border: 1px solid #111;">${order.phone}</td>
                <td style="width: 10%; border: 1px solid #111;">${order.address}</td>
                <td style="width: 10%; border: 1px solid #111;">${order.warrantyExpires ? 'Hết hạn' : 'Còn hạn'}</td>
                <td style="width: 10%; border: 1px solid #111;">${order.status}</td>
                <td style="width: 10%; border: 1px solid #111;">${format.formatCurrency(order.totalAmount)}</td>
                <td style="width: 10%; border: 1px solid #111;">${order.createdAt}</td>
            </tr>
        `
    })

    const print=`
        <div style="width: 100%; ">
        <div>
            <div style="width: 100%;">
                <h4 style="text-align: center; font-size: 25px; margin: 0px;">Phiếu Thông tin bảo hành</h4>
                <br>
                <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày tạo: ${format.formatDate(new Date())}</h4>
            </div>
        </div>

        <h4 style="text-align: center; font-size: 18px;">Bảng tất cả đơn hàng</h4>
        <table style=" border-spacing: 0px; border: 1px solid #111">
            <thead style="background-color: #ccc; width:50px">
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px; width: 100%;">
                    <th style="width: 3%;border: 1px solid #111">STT</th>
                    <th  style="width: 12%; border: 1px solid #111">Mã đơn</th>
                    <th style="width: 12%; border: 1px solid #111;">Tên sản phẩm</th>
                    <th style="width: 12%; border: 1px solid #111;">Tên khách hàng</th>
                    <th style="width: 6%; border: 1px solid #111;">Số điện thoại</th>
                    <th style="width: 10%; border: 1px solid #111;">Địa chỉ</th>
                    <th style="width: 10%; border: 1px solid #111;">Bảo hành</th>
                    <th style="width: 10%; border: 1px solid #111;">Trạng thái</th>
                    <th style="width: 10%; border: 1px solid #111;">Tổng giá</th>
                    <th style="width: 10%; border: 1px solid #111;">Ngày tạo</th>
                </tr>
            </thead>
            <tbody style="width: 100%;">
                ${templateOrder}
            </tbody>
        </table>
        <div style="margin-top: 20px; font-size: 20px; display: flex; justify-content: flex-end; width: 100%;">
            <strong>Tổng số đơn hàng: </strong><span style="margin-left: 10px;">${orders.length}</span>
        </div>
            
    `

    return print;
}

export default templateOrder