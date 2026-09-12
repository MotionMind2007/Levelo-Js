#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as p from '@clack/prompts';
import chalk from 'chalk';
import ora from 'ora';

const execPromise = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('');
  p.intro(chalk.bgHex('#a78bfa').bold.white(' Levelo JS Framework '));

  let targetArg = process.argv[2];
  
  if (!targetArg) {
    targetArg = await p.text({
      message: 'Where should we create your Levelo project?',
      placeholder: './my-levelo-app',
      defaultValue: '.',
      validate(value) {
        if (value.trim().length === 0) return 'Directory path cannot be empty!';
      },
    });

    if (p.isCancel(targetArg)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  const projectDir = targetArg === '.' ? process.cwd() : path.resolve(process.cwd(), targetArg);
  const projectName = path.basename(projectDir);

  const templateFolder = await p.select({
    message: 'Select a framework variant:',
    options: [
      { value: 'jsx', label: 'JavaScript (JSX)', hint: 'Standard JavaScript template' },
      { value: 'tsx', label: 'TypeScript (TSX)', hint: 'Type-safe TypeScript setup' },
    ],
  });

  if (p.isCancel(templateFolder)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const templateDir = path.join(__dirname, 'templates', templateFolder);

  if (!fs.existsSync(templateDir)) {
    p.cancel(`Error: Template "${templateFolder}" not found inside CLI package.`);
    process.exit(1);
  }

  const s = ora({
    text: 'Scaffolding Levelo JS project ecosystem...',
    color: 'green'
  }).start();

  try {
    copyFolderSync(templateDir, projectDir);
    const userPackageJsonPath = path.join(projectDir, 'package.json');
    if (fs.existsSync(userPackageJsonPath)) {
      const pkg = JSON.parse(fs.readFileSync(userPackageJsonPath, 'utf-8'));
      pkg.name = projectName;
      fs.writeFileSync(userPackageJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');
    }
    s.text = 'Fetching dependencies via npm...';

    await execPromise('npm install --no-audit --no-fund --legacy-peer-deps', { cwd: projectDir });

    s.succeed('Project structure generated and dependencies installed successfully!');

    const nextSteps = targetArg !== '.' 
      ? `cd ${targetArg}\nnpm run dev` 
      : `npm run dev`;

    p.note(nextSteps, 'Next steps to start dev server');
    p.outro(chalk.green('Happy coding with Levelo JS! 🚀'));

  } catch (error) {
    s.fail('Core generation matrix failed.');
    const detailedError = error.stderr || error.stdout || error.message;
    p.cancel(`Execution error:\n${detailedError}`);
    process.exit(1);
  }
}

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  fs.readdirSync(from).forEach((element) => {
    const sourcePath = path.join(from, element);
    const destPath = path.join(to, element);

    if (['node_modules', 'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', '.git'].includes(element)) return;

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

main();