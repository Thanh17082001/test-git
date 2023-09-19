function printPDF(content, title='Phiếu in') {
  // const src= image ? 'data:image/jpg;base64,'+ image :''
  // // const src= 'http://localhost:3000/logo/logo.jpg'
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
    // image ? mywindow.document.write(`<div class="page-break"></div>`):'';
    // image ? mywindow.document.write(`<div ><img src="${src}"  alt=""></div>`): '';
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();
}



export default printPDF