const fs = require('fs').promises;
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

async function listFilesInFolder() {
  try {
    // Чтение содержимого папки
    const files = await fs.readdir(folderPath);

    // Обработка каждого файла в папке
    const fileStatsPromises = files.map(async (file) => {
      const filePath = path.join(folderPath, file);

      // Получение информации о файле
      const stats = await fs.stat(filePath);

      // Проверка, является ли текущий элемент файлом
      if (stats.isFile()) {
        // Вывод информации в нужном формате
        const fileNameWithoutExtension = path.basename(file, path.extname(file));
        console.log(`${fileNameWithoutExtension}-${path.extname(file).slice(1)}-${stats.size} bytes`);
      }
    });

    // Дождитесь завершения всех операций fs.stat
    await Promise.all(fileStatsPromises);

  } catch (err) {
    console.error(err);
  }
}

listFilesInFolder();
