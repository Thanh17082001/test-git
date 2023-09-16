import format from './format';
function print(entrys = []) {
    let entrysTemplate = '';
    entrys.forEach((entry, index) => {
        entrysTemplate += 
            ` 
            <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px;  width: 100%;">
                <td  style="width: 5%;  border: 1px solid #111" >${index+1}.</td>
                <td style="width: 16.6667%; border: 1px solid #111; overflow: hidden;">${entry.createBy.fullName}</td>
                <td style="width: 12%; border: 1px solid #111;">${format.formatCurrency(entry.totalAmount)}</td>
                <td style="width: 12%; border: 1px solid #111;">${entry.supplier.name}</td>
                <td style="width: 16.6667%; border: 1px solid #111;">${entry.createdAt}</td>
                <td style="width: 12%; border: 1px solid #111;"></td>
            </tr>
            `;
        }
    );
    const print = `
    <div style="width: 100%; ">
    <div>
        <div style="width: 100%;">
            <h4 style="text-align: center; font-size: 25px; margin: 0px;">Phiếu Nhập kho</h4>
            <br>
            <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày xuất file: ${format.formatDate(new Date())}</h4>
        </div>
    </div>
    <h4 style="text-align: center; font-size: 18px;">Bảng sản phẩm</h4>
    <table style=" border-spacing: 0px; border: 1px solid #111">
        <thead style="background-color: #ccc;">
            <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px; width: 100%;">
                <th style="width: 5%;border: 1px solid #111">STT</th>
                <th  style="width: 16.6667%; border: 1px solid #111">Tên người lập</th>
                <th style="width: 12%; border: 1px solid #111;">Tổng giá</th>
                <th style="width: 16.6667%; border: 1px solid #111;">Tên nhà cung cấp</th>
                <th style="width: 12%; border: 1px solid #111;">Ngày tạo</th>
                <th style="width: 12%; border: 1px solid #111;">Ghi chú</th>
            </tr>
        </thead>
        <tbody style="width: 100%;">
            ${entrysTemplate}
        </tbody>
    </table>
</div>
   `;

    return print;
}

export default print;