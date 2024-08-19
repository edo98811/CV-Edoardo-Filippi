// pdfToImage.js

function loadAndConvertPDF(pdfUrl, canvasId, imageId) {
    var canvas = document.getElementById(canvasId);
    var image = document.getElementById(imageId);

    var loadingTask = pdfjsLib.getDocument(pdfUrl);

    loadingTask.promise.then(function(pdf) {
        
        pdf.getPage(1).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale });

            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            page.render(renderContext).promise.then(function() {
                var imgDataUrl = canvas.toDataURL(); // Convert canvas to image data URL
                image.src = imgDataUrl; // Set the image source to the data URL
            });
        });
    }).catch(function(error) {
        console.error("Error loading PDF: " + error);
    });
}

//
    // Asynchronous download PDF as an ArrayBuffer
    //
    dat = [];
    

    var pdf = document.getElementById('pdf');
    pdf.onchange = function(ev) {
      if (file = document.getElementById('pdf').files[0]) {
        fileReader = new FileReader();
        fileReader.onload = function(ev) {
          //console.log(ev);
          PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
            //
            // Fetch the first page
            //
            number_of_pages = pdf.numPages;

            for(i = 1; i < number_of_pages+1; ++i) {
              pdf.getPage(i).then(function getPageHelloWorld(page) {

              var scale = 1;
              var viewport = page.getViewport(scale);

              //
              // Prepare canvas using PDF page dimensions
              //
              var canvas = document.getElementById('the-canvas');
              var context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;

              //
              // Render PDF page into canvas context
              //
              var renderContext = {
                canvasContext: context,
                viewport: viewport};
              page.render(renderContext).then(function() {
                dat.push(canvas.toDataURL('image/png'));
              });
              });
            }
            //console.log(pdf.numPages);
            //console.log(pdf)

          }, function(error){
            console.log(error);
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    }