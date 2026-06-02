# levelojs
<a href="https://lab.motionmind.me"><img alt="Made by Motion Mind" src="https://img.shields.io/badge/MADE%20BY%20Motion%20Mind-000000.svg?style=for-the-badge&labelColor=000"></a>
<a href="https://github.com/MotionMind2007/Levelo-Js/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-000000.svg?style=for-the-badge&labelColor=000000"></a>

A core building library for the [Levelo JS](https://github.com/MotionMind2007/Levelo-Js) framework, providing reactive primitives and a Direct Real DOM-based rendering interface for optimized UI construction.

## Features
- **Ultra-Fast:** Built for speed with Direct Real DOM (No Virtual DOM).
- **Lightweight:** Minimal footprint for optimized performance.
- **Reactive:** Efficient state management for modern UI.
- **JSX Support:** Seamless developer experience using standard JSX.

## Installation
```bash
npm install levelojs
```

## Quick Start
```javascript
import { render } from 'levelojs';
import Mind from './Mind.jsx';

//render your jsx file
render(Mind, document.getElementById('app'));
```

## Why levelojs?
Levelo JS core library powers the Levelo ecosystem, focusing on raw performance by bypassing the overhead of Virtual DOM reconciliation.

## License
This project is licensed under the MIT License - see the [License](LICENSE) file for details.