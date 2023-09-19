import format from './format';
function print(entrys = []) {
    let entrysTemplate = '';
    let tables=''
    entrys.forEach((entry, index) => {
            entry.products.forEach((product, index) =>{
                tables += 
                ` 
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #ccc; height: 50px;  width: 100%;">
                    <td  style="width: 5%;  border: 1px solid #ccc" >${index+1}.</td>
                    <td style="width: 16.6667%; border: 1px solid #ccc; overflow: hidden;">${product.idProduct.name}</td>
                    <td style="width: 16.6667%; border: 1px solid #ccc;">${product.inputQuantity}</td>
                    <td style="width: 16.6667%; border: 1px solid #ccc;">${format.formatCurrency(product.priceImport)}</td>
                    <td style="width: 16.6667%; border: 1px solid #ccc;">${format.formatCurrency(product.priceImport*product.inputQuantity)}</td>
                    <td style="width: 16.6667%; border: 1px solid #ccc;"></td>
                </tr>
                `;
            })
            

            entrysTemplate+=`
            <div style="height:100%; box-sizing:border-box">
                <span style="padding-top:20px; display:block;"><strong>Phiếu thứ</strong>: ${index+1}</span>
                <div>
                    <div style="width: 100%;">
                        <h4 style="text-align: center; font-size: 22px; margin: 0px;">Phiếu Nhập kho</h4>
                        <br>
                        <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày xuất file: ${format.formatDate(new Date())}</h4>
                    </div>
                </div>                
                <hr>
                    <div style="display: flex; width: 100%;">
                        <div style="width: 60%; font-size: 17px; margin-left:10px;">
                            <span style="margin-top: 20px; display: block;"> <strong>Nhà cung cấp: </strong> ${entry.supplier.name}</span>
                            <span style="margin-top: 10px; display: block;"> <strong>Số điện thoại: </strong>${entry.supplier.phone}</span>
                            <span style="margin-top: 10px; display: block;"> <strong>Địa chỉ: </strong>${entry.supplier.address}</span>
                        </div>
                        <div style="width: 40%; font-size: 17px;">
                            <span style="margin-top: 10px; display: block;"> <strong>Người lập phiếu: </strong> ${entry.createBy.fullName}</span>
                            <span style="margin-top: 10px; display: block;"> <strong>Số điện thoại: </strong>${entry.createBy.phoneNumber}</span>
                        </div>
                    </div>
                    <h4 style="text-align: center; font-size: 18px;">Bảng sản phẩm</h4>
                    <table style=" border-spacing: 0px; border: 1px solid #ccc">
                        <thead style="background-color: #999;">
                            <tr style=" font-size: 15px; text-align: center; border: 1px solid #ccc; height: 50px; line-height: 50px; width: 100%;">
                                <th style="width: 5%;border: 1px solid #ccc">STT</th>
                                <th  style="width: 16.6667%; border: 1px solid #ccc">Tên Sản phẩm</th>
                                <th style="width: 16.66667%; border: 1px solid #ccc;">Số lượng nhập</th>
                                <th style="width: 16.6667%; border: 1px solid #ccc;">Giá nhập</th>
                                <th style="width:16.6667%; border: 1px solid #ccc;">Tổng giá</th>
                                <th style="width: 16.66667%; border: 1px solid #ccc;">Ghi chú</th>
                            </tr>
                        </thead>
                        <tbody style="width: 100%;">
                            ${tables}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; font-size: 20px; display: flex; justify-content: flex-end; width: 100%;">
                        <strong>Tổng tiền: </strong><span style="margin-left: 10px;">${format.formatCurrency(entry.totalAmount)}</span>
                    </div>
            </div>
            ` 
            tables=''
        }
    );
    const print = `
<div style="width: 100%; ">
        ${entrysTemplate} 
</div>
   `;

    return print;
}

export default print;