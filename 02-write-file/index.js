const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/newText.txt';

function fileHandler() {
  // Приглашение для ввода текста в консоли
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введите текст для записи в файл: ', (userInput) => {
    // Запись в файл
    fs.writeFile(filePath, userInput, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Текст был успешно записан в файл: ${filePath}`);
      rl.close();
    });
  });
}

fileHandler();