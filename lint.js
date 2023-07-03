const { exec } = require('child_process');

// Define the folders you want to lint
const foldersToLint = ['components', 'network'];

// Create the command to run ESLint on the specified folders
const eslintCommand = `eslint ${foldersToLint.join(' ')}`;

// Execute the ESLint command
exec(eslintCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`ESLint failed: ${error}`);
  } else {
    console.log('SUCESS!');
  }
});
