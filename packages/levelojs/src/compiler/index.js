// index.cjs - Node-Isolated Levelo JS Compiler Plugin (CommonJS format mirroring vite-plugin-solid)
import { createFilter } from 'vite';
import babel from '@babel/core';

/**
 * Helper utility to isolate file extension identifiers safely.
 */
function getExtension(filename) {
  const index = filename.lastIndexOf('.');
  return index < 0 ? '' : filename.substring(index).replace(/\?.+$/, '');
}

/**
 * Enterprise-Grade Vite Plugin for Levelo JS.
 * @param { { include?: any, exclude?: any } } options - Levelo Compiler Options
 * @returns { import('vite').Plugin } - Official Vite Plugin Type
 */
export function leveloPlugin(options = {}) {
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
 * Shared Top-Down Recursive JSX Transformer.
 * Recursively injects namespaces into children elements.
 */

function transformJSX(path, t, parentNameSpace = null) {
  const openingElement = path.node.openingElement;
  const tagName = openingElement.name.name;

  const isSvg = tagName === 'svg';
  const isMath = tagName === 'math';

  const namespace = 
    parentNameSpace || 
    (isSvg ? 'svg' : isMath ? 'math' : null);

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

  // Inject __namespace property into attributes if an active namespace is detected
  if (namespace) {
    properties.push(t.objectProperty(
      t.identifier("__namespace"),
      t.stringLiteral(
        namespace === "svg" ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1998/Math/MathML"
      )
    ));
  }

  const propsObject = t.objectExpression(properties);
  const children = [];
  const childPaths = path.get('children');

  path.node.children.forEach((child, index) => {
    if (t.isJSXText(child)) {
      const cleanText = child.value.trim();
      if (cleanText) {
        children.push(t.stringLiteral(cleanText));
      }
    }
    else if (t.isJSXExpressionContainer(child)) {
      const expression = child.expression;
      if (!t.isJSXEmptyExpression(expression)) {
        if (t.isArrowFunctionExpression(expression)) {
          children.push(expression);
        } else {
          children.push(t.arrowFunctionExpression([], expression));
        }
      }
    }
    // Recursively transform nested JSX elements while passing types (t) and the active namespace context
    else if (t.isJSXElement(child)) {
      const transformedChild = transformJSX(childPaths[index], t, namespace);
      children.push(transformedChild);
    }
  });

  const callExpression = t.callExpression(t.identifier('h'), [
    factoryIdentifier,
    propsObject,
    ...children
  ]);

  path.replaceWith(callExpression);
  path.skip();

  return callExpression;
}

/**
 * Deep AST Transformation Node Visitor.
 */
function leveloJsBabelTransformer({ types: t }) {
  return {
    name: 'levelojs-jsx-transformer',
    visitor: {
      JSXElement(path) {
        // Root elements start with a null parent namespace context, passing down babel types (t)
        transformJSX(path, t, null);
      }
    }
  };
}
