
function print(info = {}) {
  const src= info.image ? 'data:image/jpg;base64,'+info.image.data :''
    let productTemplate=''
    info.products.forEach((product, index) => {
        productTemplate+=` 
        <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; padding-bottom: 10px;">
        <div style="width: 8.333333%; margin-top: 10px;">
        ${index+1}. 
     </div>
     <div style="width: 16.6666667%; margin-top: 10px;">
         ${product.idProduct.name}
     </div>
     <div style="width: 16.6666666667%; margin-top: 10px;">
         ${product.priceImport}
     </div>
     <div style="width: 16.6666666667%; margin-top: 10px;">
         ${product.inputQuantity}
     </div>
     <div style="width: 25%; margin-top: 10px;">
         ${product.total}
     </div>
     <div style="width: 16.6666666667%; margin-top: 10px;">
         
     </div>
        </div>
     `
    });

   const print= 
   `
   <div style="height:100%">
        <h4 style=" margin: 20px; font-size: 18px;">Số: ${info._id}</h4>
        <div style="width: 100%;">
            <h4 style="text-align: center; font-size: 30px; margin: 0px;">Phiếu nhập kho</h4>
            <br>
            <h4 style="text-align: center; font-size: 20px; margin: 0px;">Ngày tạo phiếu: ${info.createdAt}</h4>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
            <div style="width: 50%; text-align:center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Người lập phiếu</h4>
                <div  style="margin-bottom:0; margin-left:20px;">
                        <span><b>Họ và tên: </b>${info.createBy.fullName}</span>
                        <br>
                        <span><b>Số điện thoại: </b>${info.createBy.phoneNumber}</span>
                </div>
            </div>

            <div style="width: 50%; text-align: center;">
                <h4 style="margin-bottom:10px; margin-left:10px; font-size: 20px">Nhà cung cấp</h4>
                <div  style="margin-bottom:0; margin-left:20px;">
                        <span><b>Tên: </b>${info.supplier.name}</span>
                        <br>
                        <span><b>Địa chỉ: </b>${info.supplier.address}</span>
                        <br>
                        <span><b>Số điện thoại: </b>${info.supplier.phone}</span>
                </div>
            </div>
        </div>
        <h5 style="text-align: center; font-size: 16px;">Danh sách sản phẩm</h5>
        <div style="margin: 20px 0; ">
            <div style="display: flex; font-size: 20px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px;">
                <div style="width: 8.333333%;">
                    STT
                </div>
                <div style="width: 16.66666667%;">
                    Tên Sản phẩm
                </div>
                <div style="width: 16.6666666667%;">
                    Giá nhập
                </div>
                <div style="width: 16.6666666667%;">
                    Số lượng
                </div>
                <div style="width: 25%;">
                    Tổng tiền
                </div>
                <div style="width: 16.6666666667%;">
                    Ghi chú
                </div>
            </div>
            ${productTemplate}
        </div>
        <div style="width: 100%;">
            <div style="font-size: 20px; margin-right: 10px; display: flex; justify-content: flex-end;">
                <b>Tổng cộng</b>: ${info.totalAmount}
            </div>
        </div>
        <div style="margin-top: 40px; height: 150px;">
            <div style="width: 25%; float: left; text-align:center;">
                <b>Người giao</b></br>
                (Ký, họ tên)
            </div>
            <div style="width: 25%; float: left; text-align:center;">
                <b>Thủ kho</b></br>
                (Ký, họ tên)
            </div>
            <div style="width: 25%; float: left; text-align:center;">
                <b>Người nhận</b></br>
                (Ký, họ tên)
            </div>
            <div style="width: 25%; float: left; text-align:center;">
                <b>Kế toán</b></br>
                (Ký, họ tên)
            </div>
        </div>
    </div>

    <div style="height:90% ">
        <img style="height:auto;" src="${src}">
    </div>
`

    return print;
}

export default print;
