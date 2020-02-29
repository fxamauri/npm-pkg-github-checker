const inquirer = require('inquirer');
const fs = require('fs');

var questions = [
  {
    type: 'input',
    name: 'githubPersonalToken',
    message: "Acesse https://github.com/settings/tokens/new e crie seu token com os seguintes scopes: write:packages, read:packages, delete:packages"
  },
];

const npmrcFilePath = `${process.env.PWD}/.npmrc`

function ask() {
  inquirer.prompt(questions).then(answers => {
    console.log(answers)
    fs.writeFileSync(npmrcFilePath, `//npm.pkg.github.com/:_authToken=${answers.githubPersonalToken}`)
  });
}



function checkNpmFileExists() {
  return fs.existsSync(npmrcFilePath);
}

function npmFileHasTheContent() {
  const fileContent = fs.readFileSync(npmrcFilePath, 'utf8');
  
  return /^\/\/npm.pkg.github.com\/:_authToken=.*$/
    .test(fileContent);
}
if(!checkNpmFileExists() || npmFileHasTheContent()) {
  ask();
}