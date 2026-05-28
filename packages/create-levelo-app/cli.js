#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Grab target project destination identifier from environment arguments
const targetArg = process.argv[2];

if (!targetArg) {
  console.error('\x1b[31m%s\x1b[0m', 'Syntax Error: Missing targeted deployment path setup.');
  console.log('Usage syntax matrix:');
  console.log('  npx create-levelo-app <project-directory>');
  console.log('  npx create-levelo-app .');
  process.exit(1);
}

const projectDir = targetArg === '.' ? process.cwd() : path.resolve(process.cwd(), targetArg);
const projectName = targetArg === '.' ? path.basename(projectDir) : targetArg;

// Map path directly to inner localized template ecosystem
const templateDir = path.join(__dirname, 'templates');

// Recursive file mirroring system engine to duplicate workspace structural state
function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  fs.readdirSync(from).forEach((element) => {
    const sourcePath = path.join(from, element);
    const destPath = path.join(to, element);
    
    // Safety guardrail to ignore bloating storage caches and runtime artifacts
    if (element === 'node_modules' || element === 'package-lock.json') return;

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderSync(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

console.log(`\n🚀 Scaffolding a fresh Levelo JS ecosystem inside: ${projectDir}...`);

try {
  // Execute direct structural copy-paste operation
  copyFolderSync(templateDir, projectDir);
  
  // Hot-patch the targeted template scheme configurations dynamically
  const userPackageJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(userPackageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(userPackageJsonPath, 'utf-8'));
    
    pkg.name = projectName;
    pkg.version = "1.0.0";
    pkg.type = "module";
    pkg.description = "A premium reactive single-file application powered by Levelo JS";
    
    fs.writeFileSync(userPackageJsonPath, JSON.stringify(pkg, null, 2), 'utf-8');
  }

  // Trigger non-blocking child processor execution sequence for dependencies matching
  console.log('\n📦 Dependencies are being fetched via node package manager...');
  execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

  console.log('\n======================================================');
  console.log(`🎉 Success! Levelo JS project "${projectName}" is ready.`);
  console.log('======================================================');
  console.log('\nRun the following sequences to bring the compile matrix online:\n');
  
  if (targetArg !== '.') {
    console.log(`  cd ${targetArg}`);
  }
  console.log('  npm run dev\n');

} catch (error) {
  console.error('\n\x1b[31m%s\x1b[0m', 'Core generation matrix failure:', error);
}
