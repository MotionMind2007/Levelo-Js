#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetArg = process.argv[2];

if (!targetArg) {
  console.error('\x1b[31m%s\x1b[0m', 'Syntax Error: Missing targeted deployment path setup.');
  console.log('Usage syntax matrix:');
  console.log('  npx create-levelo-app <project-directory>');
  console.log('  npx create-levelo-app .');
  process.exit(1);
}

const projectDir = targetArg === '.' ? process.cwd() : path.resolve(process.cwd(), targetArg);
const projectName = path.basename(projectDir);

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  fs.readdirSync(from).forEach((element) => {
    const sourcePath = path.join(from, element);
    const destPath = path.join(to, element);

    if (element === 'node_modules' || element === 'package-lock.json' || element === 'pnpm-lock.yaml' || element === 'yarn.lock' || element === '.git') return;

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

const options = [
  { name: 'JavaScript (JSX)', value: 'jsx' },
  { name: 'TypeScript (TSX)', value: 'tsx' }
];
let selectedIndex = 0;

let isFirstRender = true;

function renderMenu() {
  if (!isFirstRender) {
    readline.moveCursor(process.stdout, 0, -3);
    readline.clearScreenDown(process.stdout);
  } else {
    isFirstRender = false;
  }

  console.log('? \x1b[1m\x1b[36mSelect project template:\x1b[0m');
  
  options.forEach((opt, index) => {
    if (index === selectedIndex) {
      console.log(`  \x1b[35m❯ ${opt.name}\x1b[0m`);
    } else {
      console.log(`    ${opt.name}`);
    }
  });
}

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdout.write('\x1b[?25l'); 
}

renderMenu();

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    if (process.stdin.isTTY) process.stdout.write('\x1b[?25h');
    process.exit();
  }

  if (key.name === 'up') {
    selectedIndex = (selectedIndex - 1 + options.length) % options.length;
    renderMenu();
  } else if (key.name === 'down') {
    selectedIndex = (selectedIndex + 1) % options.length;
    renderMenu();
  } else if (key.name === 'return' || key.name === 'enter') {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdout.write('\x1b[?25h');
    }
    process.stdin.removeAllListeners('keypress');

    console.log(''); 
    runScaffolder(options[selectedIndex].value);
  }
});

function runScaffolder(templateFolder) {
  const templateDir = path.join(__dirname, 'templates', templateFolder);

  if (!fs.existsSync(templateDir)) {
    console.error('\x1b[31m%s\x1b[0m', `\nError: Template "${templateFolder}" not found inside CLI package.`);
    process.exit(1);
  }

  console.log(`🚀 Scaffolding a fresh Levelo JS (${templateFolder.toUpperCase()}) ecosystem inside: ${projectDir}...`);

  try {
    copyFolderSync(templateDir, projectDir);
    
    const userPackageJsonPath = path.join(projectDir, 'package.json');
    if (fs.existsSync(userPackageJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(userPackageJsonPath, 'utf-8'));
      pkg.name = projectName;
      fs.writeFileSync(userPackageJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');
    }

    console.log('\n📦 Dependencies are being fetched via node package manager...');
    execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

    console.log(`🎉 Success! Levelo JS project "${projectName}" is ready.`);
    console.log('\nRun the following sequences to bring the compile matrix online:\n');
    
    if (targetArg !== '.') {
      console.log(`  cd ${targetArg}`);
    }
    console.log('  npm run dev\n');
    process.exit(0);

  } catch (error) {
    console.error('\n\x1b[31m%s\x1b[0m', 'Core generation matrix failure:', error);
    process.exit(1);
  }
}