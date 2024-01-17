const fs = require('fs');

function fileHandler() {
  fs.readFile('./01-read-file/text.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

fileHandler();