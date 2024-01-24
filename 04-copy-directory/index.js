const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const destinationDir = path.join(__dirname, 'files-copy');

  try {
    // Create destination directory if it doesn't exist
    await fs.mkdir(destinationDir, { recursive: true });

    // Read the files in the source directory
    const files = await fs.readdir(sourceDir);

    // Copy each file to the destination directory
    await Promise.all(files.map(async (file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      // Check if the file is a directory
      const stats = await fs.stat(sourcePath);

      if (stats.isDirectory()) {
        // Recursively copy subdirectories
        await copyDirRecursive(sourcePath, destinationPath);
      } else {
        // Copy individual files
        await copyFile(sourcePath, destinationPath);

        // Remove the source file after successful copy
        await fs.unlink(sourcePath);
      }
    }));

    console.log('Directory copied successfully.');
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}

async function copyDirRecursive(source, destination) {
  // Create destination directory if it doesn't exist
  await fs.mkdir(destination, { recursive: true });

  // Read the files in the source directory
  const files = await fs.readdir(source);

  // Copy each file to the destination directory
  await Promise.all(files.map(async (file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    // Check if the file is a directory
    const stats = await fs.stat(sourcePath);

    if (stats.isDirectory()) {
      // Recursively copy subdirectories
      await copyDirRecursive(sourcePath, destinationPath);
    } else {
      // Copy individual files
      await copyFile(sourcePath, destinationPath);

      // Remove the source file after successful copy
      await fs.unlink(sourcePath);
    }
  }));
}

async function copyFile(source, destination) {
  const content = await fs.readFile(source);
  await fs.writeFile(destination, content);
}

// Call the copyDir function
copyDir();
