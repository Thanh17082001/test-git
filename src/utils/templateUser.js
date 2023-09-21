import format from "./format"

function templateUser(users=[]){
    let templateUser=''

    users.forEach((user, index) =>{
        templateUser+=`
            <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px;  width: 100%; height: ca;">
                <td  style="width: 3%;  border: 1px solid #111" >${index+1}.</td>
                <td style="width: 16.6667%; border: 1px solid #111; overflow: hidden;">${user.fullName}</td>
                <td style="width: 12%; border: 1px solid #111;">${user.phoneNumber}</td>
                <td style="width: 16.66667%; border: 1px solid #111;">${user.email}</td>
                <td style="width: 16.6667%; border: 1px solid #111;">${user.isStaff ? 'Nhân viên' : 'Người dùng'}</td>
                <td style="width: 16.66667%; border: 1px solid #111;">${format.formatDateNoTime(user.createdAt)}</td>
                <td style="width: 16.66667%; border: 1px solid #111;"></td>
            </tr>
        `
    })
    
    
    const print =`
        <div style="width: 100%; ">
            <div>
                <div style="width: 100%;">
                    <h4 style="text-align: center; font-size: 25px; margin: 0px;">Phiếu tất cả tài khoản</h4>
                    <br>
                    <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày tạo: ${format.formatDate(new Date())}</h4>
                </div>
            </div>

        <h4 style="text-align: center; font-size: 18px;">Bảng tất cả tài khoản</h4>
        <table style=" border-spacing: 0px; border: 1px solid #111; width: 100%; margin: auto;">
            <thead style="background-color: #ccc;">
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px; width: 100%;">
                    <th style="width: 3%;border: 1px solid #111">STT</th>
                    <th  style="width: 16.6667%; border: 1px solid #111">Họ và tên</th>
                    <th style="width: 12%; border: 1px solid #111;">Số điện thoại</th>
                    <th style="width:16.66667%; border: 1px solid #111;">Email</th>
                    <th style="width: 16.6667%; border: 1px solid #111;">Chức vụ</th>
                    <th style="width: 16.6667%; border: 1px solid #111;">Lịch sử</th>
                    <th style="width: 16.6667%; border: 1px solid #111;">Ghi chú</th>
                </tr>
            </thead>
            <tbody style="width: 100%;">
                ${templateUser}
            </tbody>
        </table>
        <div style="margin-top: 20px; font-size: 20px; display: flex; justify-content: flex-end; width: 100%;">
            <strong>Tổng số tài khoản: </strong><span style="margin-left: 10px;">${users.length}</span>
        </div>
        </div>
    `
    return print;
}

export default templateUser