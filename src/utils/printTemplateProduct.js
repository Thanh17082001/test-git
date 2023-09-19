import format from './format';
function print(products = []) {
    let productTemplate = '';
    products.forEach((product, index) => {
        productTemplate += 
            ` 
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #666; height: 50px;  width: 100%;">
                    <td  style="width: 4%;  border: 1px solid #666" >${index+1.}</td>
                    <td style="width: 16.6667%; border: 1px solid #666;">${product.name}</td>
                    <td style="width: 12%; border: 1px solid #666;">${product.inputQuantity}</td>
                    <td style="width: 12%; border: 1px solid #666;">${format.formatCurrency(product.priceImport)}</td>
                    <td style="width: 12%; border: 1px solid #666;">${product.soldQuantity}</td>
                    <td style="width: 12%; border: 1px solid #666;">${format.formatCurrency(product.priceSale)}</td>
                    <td style="width: 12%; border: 1px solid #666;">${product.retalQuantity}</td>
                    <td style="width: 12%; border: 1px solid #666;">${format.formatCurrency(product.priceRental)}</td>
                </tr>
            `;
    });
    const print = `
   <div style="width: 100%;">
        <div>
            <div style="width: 100%;">
                <h4 style="text-align: center; font-size: 20px; margin: 0px;">Phiếu Sản phẩm</h4>
                <br>
                <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày tạo: 22 thg5 2019</h4>
            </div>
        </div>
        <h4 style="text-align: center; font-size: 18px;">Bảng sản phẩm</h4>
        <table style="width: 100%;  border-spacing: 0px; border: 1px solid #666">
            <thead style="background-color: #ccc;">
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #666; height: 50px; line-height: 50px; width: 100%;">
                    <th style="width: 5%;border: 1px solid #666">STT</th>
                    <th  style="width: 16.6667%; border: 1px solid #666">Tên</th>
                    <th style="width: 12%; border: 1px solid #666;">SL nhập</th>
                    <th style="width: 12%; border: 1px solid #666;">Giá nhập</th>
                    <th style="width: 12%; border: 1px solid #666;">SL bán</th>
                    <th style="width: 12%; border: 1px solid #666;">Giá bán</th>
                    <th style="width: 12%; border: 1px solid #666;">SL thuê</th>
                    <th style="width: 12%; border: 1px solid #666;">Giá thuê</th>
                </tr>
            </thead>
            <tbody style="width: 100%;">
                ${productTemplate}
            </tbody>
        </table>
    </div>
   `;

    return print;
}

export default print;
