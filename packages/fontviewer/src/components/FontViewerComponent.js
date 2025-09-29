// =============================================================================
// FontViewerComponent.js - Reusable Font Viewer Component
// =============================================================================

import { FontLoader } from '../utils/FontLoader.js';
import { GlyphAnimator } from '../utils/GlyphAnimator.js';
import { MetricsOverlay } from '../utils/MetricsOverlay.js';
import { VariationAxes } from '../utils/VariationAxes.js';
import { UIControls } from '../utils/UIControls.js';
import { FontInfoRenderer } from '../utils/FontInfo.js';

export class FontViewer {
  constructor(options = {}) {
    this.container = options.container;
    this.fontUrl = options.fontUrl;
    this.config = {
      showControls: options.showControls !== false,
      showMetrics: options.showMetrics === true,
      initialFontSize: options.initialFontSize || 600,
      autoStart: options.autoStart !== false,
      animationDelay: options.animationDelay || 1000,
      ...options.config
    };

    this.components = {};
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;

    this.createHTML();
    this.createCSS();
    this.initializeComponents();

    if (this.fontUrl) {
      await this.loadFont(this.fontUrl);
    }

    this.isInitialized = true;
  }

  createHTML() {
    this.container.innerHTML = `
      <div class="font-viewer-wrapper">
        <div class="font-viewer-display-container">
          <div class="font-viewer-glyph-buffer"></div>
          <div class="font-viewer-metrics-overlay"></div>
        </div>

        ${this.config.showControls ? `
        <div class="font-viewer-controls">
          <div class="font-viewer-buttons">
            <button class="font-viewer-btn" data-action="font-info">Font Info</button>
            <button class="font-viewer-btn" data-action="glyph-info">Glyph Info</button>
            <button class="font-viewer-btn" data-action="metrics-toggle" data-text="Hide metrics">Show metrics</button>
            <button class="font-viewer-btn" data-action="background-toggle">Swap colors</button>
            <button class="font-viewer-btn" data-action="randomize">Randomize</button>
          </div>

          <div class="font-viewer-sliders">
            <div class="font-viewer-slider-group">
              <label>Font size</label>
              <input type="range" data-control="font-size" min="100" max="1200" value="${this.config.initialFontSize}">
              <span>${this.config.initialFontSize}px</span>
            </div>
            <div class="font-viewer-slider-group">
              <label>Vertical position</label>
              <input type="range" data-control="vertical-position" min="0" max="100" value="50">
              <span>50%</span>
            </div>
            <div class="font-viewer-slider-group">
              <label>Animation delay</label>
              <input type="range" data-control="animation-delay" min="10" max="1000" value="${this.config.animationDelay}">
              <span>${this.config.animationDelay === 1000 ? 'Off' : this.config.animationDelay + 'ms'}</span>
            </div>
          </div>

          <div class="font-viewer-variable-axes"></div>
        </div>
        ` : ''}

        <div class="font-viewer-info-panel font-viewer-font-info" style="display: none;">
          <div class="font-viewer-info-content"></div>
        </div>

        <div class="font-viewer-info-panel font-viewer-glyph-info" style="display: none;">
          <div class="font-viewer-info-content"></div>
        </div>
      </div>
    `;
  }

  createCSS() {
    if (document.querySelector('#font-viewer-styles')) return;

    const style = document.createElement('style');
    style.id = 'font-viewer-styles';
    style.textContent = `
      .font-viewer-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        font-family: system-ui, "Segoe UI", Roboto, sans-serif;
        font-size: 0.7rem;
        --fv-white: rgb(255, 255, 255);
        --fv-black: rgb(0, 0, 0);
        --fv-metrics-color: rgba(0, 0, 0, 0.4);
      }

      .font-viewer-display-container {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--fv-white);
      }

      .font-viewer-glyph-buffer {
        color: var(--fv-black);
        font-size: ${this.config.initialFontSize}px;
        text-align: center;
        position: relative;
      }

      .font-viewer-metrics-overlay {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }

      .font-viewer-controls {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(5px);
        padding: 14px;
        border-top: 2px solid rgba(0, 0, 0, 0.2);
        z-index: 99999;
        pointer-events: auto !important;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      }

      .font-viewer-buttons {
        margin-bottom: 10px;
        pointer-events: auto !important;
        position: relative;
        z-index: 100000;
      }

      .font-viewer-btn {
        font-size: 0.7rem;
        cursor: pointer;
        height: 23px;
        padding: 0 8px;
        margin-right: 5px;
        margin-bottom: 7px;
        background: transparent;
        color: var(--fv-black);
        border: 1px solid var(--fv-black);
        border-radius: 5px;
        transition: 0.2s;
        pointer-events: auto !important;
        position: relative;
        z-index: 100000;
      }

      .font-viewer-btn.active {
        background-color: var(--fv-black);
        color: var(--fv-white);
      }

      .font-viewer-slider-group {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 7px;
      }

      .font-viewer-slider-group label {
        min-width: 120px;
      }

      .font-viewer-slider-group span {
        min-width: 60px;
        text-align: right;
      }

      .font-viewer-slider-group input[type="range"] {
        flex: 1;
        height: 15px;
        pointer-events: auto !important;
        position: relative;
        z-index: 100000;
        cursor: pointer;
      }

      .font-viewer-info-panel {
        position: absolute;
        z-index: 10001;
        padding: 14px;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(2px);
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }

      .font-viewer-font-info {
        width: 300px;
        top: 8px;
        left: 8px;
      }

      .font-viewer-glyph-info {
        width: 150px;
        top: 8px;
        right: 8px;
      }

      .font-viewer-metrics-overlay .metric-line {
        position: absolute;
        width: 100%;
        height: 1px;
        background: var(--fv-metrics-color);
      }

      .font-viewer-metrics-overlay .side-bearing-line {
        position: absolute;
        width: 1px;
        height: 100%;
        background: var(--fv-metrics-color);
        top: 0;
      }

      .font-viewer-metrics-overlay .legend {
        position: absolute;
        padding-left: 14px;
        color: var(--fv-black);
      }
    `;
    document.head.appendChild(style);
  }

  initializeComponents() {
    const displayElement = this.container.querySelector('.font-viewer-glyph-buffer');
    const metricsOverlay = this.container.querySelector('.font-viewer-metrics-overlay');
    const variableAxesContainer = this.container.querySelector('.font-viewer-variable-axes');

    this.components.uiControls = new UIControls();
    this.components.metricsOverlay = new MetricsOverlay(metricsOverlay);
    this.components.variationAxes = new VariationAxes({
      container: variableAxesContainer,
      onChange: (settings) => {
        displayElement.style.fontVariationSettings = settings;
      }
    });

    this.components.fontLoader = new FontLoader({
      onFontLoaded: this.onFontLoaded.bind(this),
      onError: this.onError.bind(this)
    });

    if (this.config.showControls) {
      this.setupEventListeners();
    }
  }

  onFontLoaded({ font, fontInfo, fontFamily }) {
    const displayElement = this.container.querySelector('.font-viewer-glyph-buffer');

    this.components.glyphAnimator = new GlyphAnimator({
      displayElement,
      onGlyphChange: (glyph) => {
        const glyphInfoContent = this.container.querySelector('.font-viewer-glyph-info .font-viewer-info-content');
        FontInfoRenderer.renderGlyphInfo(glyphInfoContent, font, glyph);

        if (this.components.metricsOverlay.isVisible) {
          this.components.metricsOverlay.render(font, displayElement);
        }
      }
    });

    displayElement.style.fontFamily = `"${fontFamily}"`;

    this.components.glyphAnimator.setGlyphsFromFont(font).then(() => {
      if (this.config.autoStart) {
        this.components.glyphAnimator.start(this.config.animationDelay);
      }
    });

    if (this.config.showMetrics) {
      this.components.metricsOverlay.isVisible = true;
      this.components.metricsOverlay.render(font, displayElement);

      // Update the metrics button to show correct state
      const metricsButton = this.container.querySelector('[data-action="metrics-toggle"]');
      if (metricsButton) {
        metricsButton.classList.add('active');
      }
    }

    const fontInfoContent = this.container.querySelector('.font-viewer-font-info .font-viewer-info-content');
    FontInfoRenderer.renderFontInfo(fontInfoContent, fontInfo);

    if (fontInfo.axes?.length > 0) {
      this.components.variationAxes.createAxesControls(fontInfo.axes);
    }

    this.font = font;
    this.fontInfo = fontInfo;
  }

  onError(error) {
    console.error('FontViewer error:', error);
  }

  setupEventListeners() {
    // Button events
    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('.font-viewer-btn');
      if (!btn) return;

      const action = btn.dataset.action;
      switch (action) {
        case 'font-info':
          this.togglePanel('.font-viewer-font-info', btn);
          break;
        case 'glyph-info':
          this.togglePanel('.font-viewer-glyph-info', btn);
          break;
        case 'metrics-toggle':
          this.toggleMetrics(btn);
          break;
        case 'background-toggle':
          this.components.uiControls?.toggleColorScheme();
          break;
        case 'randomize':
          if (this.components.glyphAnimator) {
            this.components.glyphAnimator.toggleOrder();
          } else {
            console.warn('GlyphAnimator not available yet');
          }
          break;
      }
    });

    // Slider events
    this.container.addEventListener('input', (e) => {
      const control = e.target.dataset.control;
      if (!control) return;

      const value = e.target.value;
      const display = e.target.nextElementSibling;

      switch (control) {
        case 'font-size':
          this.setFontSize(value);
          display.textContent = `${value}px`;
          break;
        case 'vertical-position':
          this.setVerticalPosition(value);
          display.textContent = `${value}%`;
          break;
        case 'animation-delay':
          this.setAnimationDelay(value, display);
          break;
      }
    });
  }

  togglePanel(selector, button) {
    const panel = this.container.querySelector(selector);
    const isVisible = panel.style.display !== 'none';
    panel.style.display = isVisible ? 'none' : 'block';
    button.classList.toggle('active', !isVisible);
  }

  toggleMetrics(button) {
    this.components.metricsOverlay.toggle();

    // Update button state and text
    button.classList.toggle('active', this.components.metricsOverlay.isVisible);

    // Swap button text
    const currentText = button.textContent;
    button.textContent = button.dataset.text;
    button.dataset.text = currentText;

    // Render metrics if now visible
    if (this.components.metricsOverlay.isVisible && this.font) {
      const displayElement = this.container.querySelector('.font-viewer-glyph-buffer');
      this.components.metricsOverlay.render(this.font, displayElement);
    }
  }

  setFontSize(size) {
    const displayElement = this.container.querySelector('.font-viewer-glyph-buffer');
    displayElement.style.fontSize = `${size}px`;
    if (this.components.metricsOverlay.isVisible && this.font) {
      this.components.metricsOverlay.render(this.font, displayElement);
    }
  }

  setVerticalPosition(position) {
    const displayElement = this.container.querySelector('.font-viewer-glyph-buffer');
    displayElement.style.top = `${position - 50}%`;
    if (this.components.metricsOverlay.isVisible && this.font) {
      this.components.metricsOverlay.render(this.font, displayElement);
    }
  }

  setAnimationDelay(delay, display) {
    const delayInt = parseInt(delay);
    if (delayInt >= 1000) {
      this.components.glyphAnimator?.stop();
      display.textContent = 'Off';
    } else {
      display.textContent = `${delayInt}ms`;
      this.components.glyphAnimator?.start(delayInt);
    }
  }

  async loadFont(fontUrl) {
    try {
      const response = await fetch(fontUrl);
      const buffer = await response.arrayBuffer();
      const filename = fontUrl.split('/').pop();
      await this.components.fontLoader.loadFont(buffer, filename);
    } catch (error) {
      console.error('Error loading font:', error);
    }
  }

  destroy() {
    this.components.fontLoader?.cleanup();
    this.components.glyphAnimator?.stop();

    const styleEl = document.querySelector('#font-viewer-styles');
    if (styleEl && document.querySelectorAll('.font-viewer-wrapper').length <= 1) {
      styleEl.remove();
    }

    this.container.innerHTML = '';
    this.isInitialized = false;
  }
}