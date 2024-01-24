const fs = require('fs');

function fileHandler() {

  const readStream = fs.createReadStream('./01-read-file/text.txt', 'utf8');


  readStream.on('error', (err) => {
    console.error(err);
  });


  readStream.on('data', (data) => {
    console.log(data);
  });


  readStream.on('end', () => {
    console.log('File reading completed.');
  });
}

fileHandler();
