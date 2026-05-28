import fs from 'fs';

export function parseLevelo(sourceCode) {
  // Normalize newline characters and trim whitespace
  const cleanSource = sourceCode.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  const allowedZones = ['#head', '#logic', '#design', '#layout'];
  const extractedData = { '#head': '', '#logic': '', '#design': '', '#layout': '' };
  
  let index = 0;
  while (index < cleanSource.length) {
    if (cleanSource[index] === '#') {
      let word = '';
      let startPos = index;
      
      // Extract the block identifier (e.g., #logic)
      while (index < cleanSource.length && !/\s|\{/.test(cleanSource[index])) {
        word += cleanSource[index];
        index++;
      }
      
      // Validate if the zone identifier is officially allowed
      if (!allowedZones.includes(word)) {
        throw new Error(`Invalid Syntax: Unknown block identifier "${word}" found at position ${startPos}. Allowed blocks are #head, #logic, #design, #layout.`);
      }
      
      // Skip whitespace characters until we reach the opening curly brace '{'
      while (index < cleanSource.length && cleanSource[index] !== '{') {
        index++;
      }
      
      // Parse the core block content using a perfect brace-matching tracker
      if (cleanSource[index] === '{') {
        index++; // CRITICAL FIX: Step inside the block to avoid parsing the opening brace itself
        let braceCount = 1;
        let content = '';
        
        while (index < cleanSource.length && braceCount > 0) {
          if (cleanSource[index] === '{') braceCount++;
          if (cleanSource[index] === '}') braceCount--;

          // Append to content only if it's not the final closing brace of the main block
          if (braceCount > 0) {
            content += cleanSource[index];
          }
          index++;
        }

        // Validate if all opened braces were properly closed
        if (braceCount > 0) {
          throw new Error(`Syntax Error: Missing closing brace "}" for block "${word}".`);
        }

        extractedData[word] = content.trim();
      }
    } else {
      // Advance to the next character if no block is detected
      index++;
    }
  }
  
  // Generate the template schema for index.html
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/.levelo/main.css">
  ${extractedData['#head']}
</head>
<body>
  <div id="levelo-app"></div>
  <script type="module" src="/.levelo/main.js"></script>
</body>
</html>
  `.trim();
  
  // Persist files directly onto the disk storage system
  fs.writeFileSync('index.html', htmlTemplate);
  fs.writeFileSync('.levelo/main.css', extractedData['#design']);
  
  // Replace custom layout expressions with standard vanilla template interpolation
  let layoutContent = extractedData['#layout']
    .replace(/\[name\]/g, '${window.leveloName}')
    .replace(/\[count\]/g, '${window.leveloCount}')
    .replace(/lvl-click="([\s\S]*?)"/g, 'onclick="$1"')
     .replace(/\[frameworkStatus\]/g, '${window.frameworkStatus}');
    
  // Compile the final clean vanilla JavaScript ecosystem string
  const jsOutput = `
window.leveloName = "Motion Mind";
window.leveloCount = 0;

${extractedData['#logic']}

window.updateUI = function() {
  const appDiv = document.getElementById('levelo-app');
  if (appDiv) appDiv.innerHTML = render();
}

function render() {
  return \`${layoutContent}\`;
}

window.updateUI();
  `.trim();
  
  fs.writeFileSync('.levelo/main.js', jsOutput);
  return jsOutput;
}
