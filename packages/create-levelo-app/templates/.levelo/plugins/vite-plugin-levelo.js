import fs from 'fs';
import path from 'path';
import { parseLevelo } from '../compiler.js';

export function leveloPlugin() {
  const compileProject = () => {
    try {
      const sourcePath = path.resolve('src/App.lvl');
      if (!fs.existsSync(sourcePath)) {
        if (!fs.existsSync('src')) fs.mkdirSync('src');
        fs.writeFileSync(sourcePath, `#head {}\n#logic {}\n#design {}\n#layout {}`);
      }

      const sourceCode = fs.readFileSync(sourcePath, 'utf-8');
      parseLevelo(sourceCode);
    } catch (error) {
      const errorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Levelo Compilation Error ❌</title>
          <style>
            body { background: #1a1a1a; color: #ff4a4a; font-family: monospace; padding: 40px; }
            .card { background: #2a2a2a; padding: 20px; border-radius: 8px; border-left: 5px solid #ff4a4a; }
            pre { color: #eee; background: #111; padding: 15px; border-radius: 4px; overflow-x: auto; }
          </style>
        </head>
        <body>
          <h1>Levelo Compiler Error ⚡</h1>
          <div class="card">
            <h3>Something went wrong while parsing App.lvl:</h3>
            <pre>${error.message}</pre>
          </div>
          <script>
            setTimeout(() => { location.reload(); }, 2000);
          </script>
        </body>
        </html>
      `.trim();
      fs.writeFileSync('index.html', errorHtml);
    }
  };

  return {
    name: 'vite-plugin-levelo',

    // 1. Triggers compilation when the dev server starts
    buildStart() {
      if (!fs.existsSync('.levelo')) fs.mkdirSync('.levelo');
      compileProject();
    },

    // 2. Continuous watch mode tracker for the development server
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          compileProject();
          const html = fs.readFileSync('index.html', 'utf-8');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html');
          return res.end(html);
        }
        next();
      });

      server.watcher.on('change', (filePath) => {
        if (filePath.endsWith('App.lvl')) {
          compileProject();
        }
      });
    },

    // 3. Triggers when 'npm run build' executes to bundle production assets into dist/
    closeBundle() {
      console.log('\n📦 Levelo Compiler: Finalizing production assets...');

      const distDir = path.resolve('dist');
      const assetsDir = path.join(distDir, 'assets');

      if (fs.existsSync(assetsDir)) {
        // Read the actual built asset filenames generated dynamically by Vite
        const files = fs.readdirSync(assetsDir);
        const jsFile = files.find(f => f.endsWith('.js'));
        const cssFile = files.find(f => f.endsWith('.css'));

        const distIndexPath = path.join(distDir, 'index.html');

        if (fs.existsSync(distIndexPath)) {
          let htmlContent = fs.readFileSync(distIndexPath, 'utf-8');

          if (cssFile) {
            htmlContent = htmlContent.replace('/.levelo/main.css', `/assets/${cssFile}`);
          }
          if (jsFile) {
            htmlContent = htmlContent.replace('/.levelo/main.js', `/assets/${jsFile}`);
          }

          // Save the production-optimized index.html
          fs.writeFileSync(distIndexPath, htmlContent);
        }
      }
      console.log('✨ Production build successful! All assets compiled into the "dist" directory.\n');
    }
  };
}
