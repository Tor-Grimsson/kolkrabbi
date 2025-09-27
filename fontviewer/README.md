# FontViewer

Independent FontViewer module for variable font display and interaction.

## Structure

```
fontviewer/
├── components/
│   └── FontViewerComponent.js     # Main FontViewer class
├── styles/
│   └── FontViewerStyles.css       # Component styles
├── assets/
│   └── TGMalromurItalicVF.ttf    # Default font file
└── utils/
    ├── FontInfo.js               # Font information utilities
    ├── FontLoader.js             # Font loading logic
    ├── GlyphAnimator.js          # Animation logic
    ├── MetricsOverlay.js         # Font metrics display
    ├── Types.js                  # Type definitions
    ├── UIControls.js             # UI control logic
    └── VariationAxes.js          # Variable font controls
```

## Usage

```javascript
import { FontViewer } from './fontviewer/components/FontViewerComponent.js';
import './fontviewer/styles/FontViewerStyles.css';

const fontViewer = new FontViewer({
  container: document.getElementById('font-container'),
  fontUrl: './fontviewer/assets/TGMalromurItalicVF.ttf',
  showControls: true,
  showMetrics: true,
  initialFontSize: 600,
  autoStart: true,
  animationDelay: 1000
});

await fontViewer.init();
```

## Dependencies

- opentype.js - For font parsing and manipulation

## Features

- Variable font support
- Interactive controls (font size, metrics, animation)
- Font metrics overlay
- Glyph animation
- Customizable UI controls
- Self-contained styling