import * as XLSX from 'xlsx';

function exportToExcel(data=[], filename='Example') {
    const ws = XLSX.utils.json_to_sheet(data);
    // Thiết lập chiều rộng tương thích
    const columnWidths = data.reduce((acc, row) => {
        Object.keys(row).forEach(key => {
          const cellLength = String(row[key]).length;
          acc[key] = Math.max(acc[key] || 20, cellLength);
        });
        return acc;
      }, {});
    
      // Cài đặt kích thước cột
      const columns = Object.keys(columnWidths).map(key => ({
        wch: columnWidths[key]
      }));
      ws['!cols'] = columns;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
}

export default exportToExcel