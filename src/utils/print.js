function printPDF(content, title='Phiếu in', image=undefined) {
  const src= '127.0.0.1'+image
  console.log(src);
    let mywindow = window.open('', 'PRINT', 'height=1123,width=900,top=100,left=150');
    mywindow.document.write(`
    <html><title>${title}</title>
    <style>
    @media print {
        head > title {
          display: none;
        }
        .page-break {
          page-break-before: always;
      }
        
      }
  </style><head>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(`${content}`);
    mywindow.document.write(`<div class="page-break"></div>`);
    image ? mywindow.document.write(`<div ><img src="${src}"  alt=""></div>`): '';
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();
}



export default printPDF