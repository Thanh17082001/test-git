import format from "./format";

function templateStaff(staffs = []){
    let templateStaff=''
    staffs.forEach((staff,index) => {
        templateStaff +=`
            <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px;  width: 100%; height: ca;">
                <td  style="width: 3%;  border: 1px solid #111" >${index+1}</td>
                <td style="width: 10%; border: 1px solid #111; overflow: hidden;">${staff.fullName}</td>
                <td style="width: 5%; border: 1px solid #111;">${staff.gender}</td>
                <td style="width: 12%; border: 1px solid #111;">${staff.dateOfBirth}</td>
                <td style="width: 6%; border: 1px solid #111;">${staff.phone}</td>
                <td style="width: 16.66667%; border: 1px solid #111;">${staff.email}</td>
                <td style="width: 16.66667%; border: 1px solid #111;">${staff.address}</td>
                <td style="width: 12%; border: 1px solid #111;">${staff.position}</td>
                <td style="width: 12%; border: 1px solid #111;">${staff.department}</td>
                <td style="width: 12%; border: 1px solid #111;">${format.formatCurrency(staff.salary)}</td>
            </tr>
        `
    })

    const print=`
        <div style="width: 100%; ">
        <div>
            <div style="width: 100%;">
                <h4 style="text-align: center; font-size: 25px; margin: 0px;">Phiếu Thông tin nhân viên</h4>
                <br>
                <h4 style="text-align: center; font-size: 15px; margin: 0px;">Ngày tạo: ${format.formatDate(new Date())}</h4>
            </div>
        </div>

        <h4 style="text-align: center; font-size: 18px;">Bảng tất cả nhân viên</h4>
        <table style=" border-spacing: 0px; border: 1px solid #111">
            <thead style="background-color: #ccc; width:50px">
                <tr style=" font-size: 15px; text-align: center; border: 1px solid #111; height: 50px; line-height: 50px; width: 100%;">
                    <th style="width: 3%;border: 1px solid #111">STT</th>
                    <th  style="width: 10%; border: 1px solid #111">Họ và tên</th>
                    <th style="width: 5%; border: 1px solid #111;">Phái</th>
                    <th style="width: 12%; border: 1px solid #111;">Ngày sinh</th>
                    <th style="width: 6%; border: 1px solid #111;">Số điện thoại</th>
                    <th style="width:16.66667%; border: 1px solid #111;">Email</th>
                    <th style="width: 16.66667%; border: 1px solid #111;">Địa chỉ</th>
                    <th style="width: 16.6667%; border: 1px solid #111;">Chức vụ</th>
                    <th style="width: 12%; border: 1px solid #111;">Phòng Ban</th>
                    <th style="width: 12%; border: 1px solid #111;">Lương</th>
                </tr>
            </thead>
            <tbody style="width: 100%;">
                ${templateStaff}
            </tbody>
        </table>
        <div style="margin-top: 20px; font-size: 20px; display: flex; justify-content: flex-end; width: 100%;">
            <strong>Tổng số nhân viên: </strong><span style="margin-left: 10px;">${staffs.length}</span>
        </div>
            
    `

    return print;
}

export default templateStaff