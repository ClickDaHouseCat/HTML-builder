const fs = require('fs');
const readline = require('readline');

const mainFilePath = './02-write-file/Text.txt';

function fileHandler() {
  // Приглашение для ввода текста в консоли
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function handleUserInput() {
    rl.question('Введите текст для записи в файл: ', (userInput) => {
      // Добавление текста к существующему файлу
      fs.appendFile(mainFilePath, userInput + '\n', 'utf8', (err) => {
        if (err) {
          console.error(err);
          rl.close();
          return;
        }
        console.log(`Текст был успешно добавлен к файлу: ${mainFilePath}`);
        // Повторный вызов для ожидания нового ввода
        handleUserInput();
      });
    });
  }

  // Начало процесса ввода текста
  handleUserInput();
}

fileHandler();
