#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const cli = require('cac')()
const prompts = require('prompts');

async function main() {
  try {
    const response = await getUserPrompts();
    const projectName = response.value;

    // Create new directory for the project
    const targetDir = path.join(process.cwd(), projectName);
    fs.mkdirSync(targetDir);

    // Copy template files
    const templateDir = path.join(__dirname, 'templates');
    copyTemplateFiles(templateDir, targetDir, projectName);

    console.log(`Boilerplate project created successfully in ${targetDir}`);
  } catch (err) {
    console.error('Error creating boilerplate:', err);
  }
}

function copyTemplateFiles(source, destination, projectName) {
  fs.readdirSync(source).forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    let content = fs.readFileSync(sourcePath, 'utf8');
    content = content.replace(/{{ projectName }}/g, projectName);
    fs.writeFileSync(destPath, content, 'utf8');
  });
}

main();


function testCliPrompts() {
  cli.option('--name <name>', 'Provide your name')
  const parsed = cli.parse()
  console.log(JSON.stringify(parsed, null, 2))
}

async function getUserPrompts() {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'What should be your project name?',
  });
  return response
}

