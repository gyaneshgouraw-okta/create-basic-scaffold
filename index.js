#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

async function main() {
  try {
    const projectName = "scaffold"

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
