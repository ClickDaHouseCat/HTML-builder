const fs = require('fs');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

function listFilesInFolder() {
  // Чтение содержимого папки
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Обработка каждого файла в папке
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      // Получение информации о файле
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        // Вывод информации в нужном формате
        const fileNameWithoutExtension = path.basename(file, path.extname(file));
        console.log(`${fileNameWithoutExtension}-${path.extname(file).slice(1)}-${stats.size} bytes`);
      });
    });
  });
}

listFilesInFolder();
