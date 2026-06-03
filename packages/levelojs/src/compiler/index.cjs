// index.cjs - Node-Isolated Levelo JS Compiler Plugin (CommonJS format mirroring vite-plugin-solid)
const { createFilter } = require('vite');
const babel = require('@babel/core');

/**
 * Helper utility to isolate file extension identifiers safely.
 */
function getExtension(filename) {
  const index = filename.lastIndexOf('.');
  return index < 0 ? '' : filename.substring(index).replace(/\?.+$/, '');
}

/**
 * Enterprise-Grade Vite Plugin for Levelo JS.
 */
function leveloPlugin(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  let projectRoot = process.cwd();

  return {
    name: 'vite-plugin-levelojs',
    enforce: 'pre', // Process JSX before any other plugin intercepts

    async config(userConfig) {
      projectRoot = userConfig.root || process.cwd();
      return {
        optimizeDeps: {
          include: ['levelojs'],
          rolldownOptions: {
            transform: {
              jsx: 'preserve' // Prevent Rolldown from injecting React runtimes
            }
          }
        }
      };
    },

    async transform(source, id) {
      if (!filter(id)) return null;

      const cleanId = id.replace(/\?.*$/, '');
      if (!/\.[mc]?[tj]sx$/i.test(cleanId)) return null;

      const isTypescript = /\.[mc]?tsx$/i.test(cleanId);
      const babelPlugins = ['@babel/plugin-syntax-jsx'];

      if (isTypescript) {
        babelPlugins.push('@babel/plugin-transform-typescript');
      }

      babelPlugins.push(leveloJsBabelTransformer);

      const babelOpts = {
        root: projectRoot,
        filename: cleanId,
        sourceFileName: cleanId,
        plugins: babelPlugins,
        ast: false,
        sourceMaps: true,
        configFile: false,
        babelrc: false
      };

      try {
        const { code, map } = await babel.transformAsync(source, babelOpts);
        return { code, map };
      } catch (err) {
        this.error(`[Levelo Compiler Error] ${cleanId} processing failed:\n${err.message}`);
        return null;
      }
    }
  };
}

/**
 * Deep AST Transformation Node Visitor.
 */
function leveloJsBabelTransformer({ types: t }) {
  return {
    name: 'levelojs-jsx-transformer',
    visitor: {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = openingElement.name.name;

        const isComponent = tagName[0] === tagName[0].toUpperCase();
        const factoryIdentifier = isComponent ? t.identifier(tagName) : t.stringLiteral(tagName);

        const properties = [];
        openingElement.attributes.forEach(attr => {
          if (t.isJSXAttribute(attr)) {
            const propKey = t.identifier(attr.name.name);

            if (t.isJSXExpressionContainer(attr.value)) {
              const expression = attr.value.expression;
              const getterProperty = t.objectMethod(
                'get',
                propKey,
                [],
                t.blockStatement([t.returnStatement(expression)])
              );
              properties.push(getterProperty);
            } 
            else if (attr.value) {
              properties.push(t.objectProperty(propKey, attr.value));
            } 
            else {
              properties.push(t.objectProperty(propKey, t.booleanLiteral(true)));
            }
          }
        });
        const propsObject = t.objectExpression(properties);

        const children = [];
        path.node.children.forEach(child => {
          if (t.isJSXText(child)) {
            const cleanText = child.value.trim();
            if (cleanText) {
              children.push(t.stringLiteral(cleanText));
            }
          } 
          else if (t.isJSXExpressionContainer(child)) {
            const expression = child.expression;
            if (!t.isJSXEmptyExpression(expression)) {
              const arrowFunctionWrapper = t.arrowFunctionExpression([], expression);
              children.push(arrowFunctionWrapper);
            }
          } 
          else if (t.isJSXElement(child)) {
            children.push(child);
          }
        });

        const callExpression = t.callExpression(t.identifier('h'), [
          factoryIdentifier,
          propsObject,
          ...children
        ]);

        path.replaceWith(callExpression);
      }
    }
  };
}

// Export via CommonJS explicitly to cut off Vite client injections
module.exports = { leveloPlugin };