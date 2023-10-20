function printPDF(content, title='Phiếu in') {
    let mywindow = window.open('', 'PRINT', 'height=1123,width=900,top=100,left=150');
    mywindow.document.write(`
    <html><title>${title}</title>
    <style>
    @media print {
        .page-break {
          page-break-before: always;
        }
        img{
          margin-top:20px;
          width:100%;
          height:auto;
        }
        
      }
  </style><head>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(`${content}`);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    // mywindow.close();
}



export default printPDF