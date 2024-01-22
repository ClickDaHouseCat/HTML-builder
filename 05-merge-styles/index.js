const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const distDir = path.join(__dirname, 'project-dist');
  const outputFile = path.join(distDir, 'bundle.css');

  try {
    // Create the destination directory if it doesn't exist
    await fs.mkdir(distDir, { recursive: true });

    // Read the files in the styles directory
    const files = await fs.readdir(stylesDir);

    // Filter out files with extensions other than css and directories
    const cssFiles = files.filter(file => file.endsWith('.css'));

    // Read the content of each CSS file and concatenate them
    const combinedContent = await Promise.all(cssFiles.map(async (file) => {
      const filePath = path.join(stylesDir, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      return fileContent;
    }));

    // Combine the content and write it to the bundle.css file
    await fs.writeFile(outputFile, combinedContent.join('\n'));

    console.log('Styles merged successfully.');
  } catch (err) {
    console.error('Error merging styles:', err);
  }
}

// Call the mergeStyles function
mergeStyles();
