// =============================================================================
// shared/UIControls.js
// =============================================================================

export class UIControls {
  constructor(options = {}) {
    this.isDarkMode = false;
    this.isFullscreen = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Fullscreen change events for different browsers
    document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this));
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this));
  }

  toggleFullscreen() {
    if (this.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen();
    }
  }

  enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  handleFullscreenChange() {
    this.isFullscreen = Boolean(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    // Update button text if needed
    const fullscreenButton = document.querySelector('#fullScreen button');
    if (fullscreenButton) {
      fullscreenButton.textContent = this.isFullscreen ? 'Windowed' : 'Fullscreen';
    }
  }

  toggleColorScheme() {
    this.isDarkMode = !this.isDarkMode;
    const wrapper = document.querySelector('.font-viewer-wrapper');

    if (wrapper) {
      if (this.isDarkMode) {
        wrapper.style.setProperty('--fv-white', 'rgb(0, 0, 0)');
        wrapper.style.setProperty('--fv-black', 'rgb(255, 255, 255)');
        wrapper.style.setProperty('--fv-metrics-color', 'rgba(255, 255, 255, 0.4)');
      } else {
        wrapper.style.setProperty('--fv-white', 'rgb(255, 255, 255)');
        wrapper.style.setProperty('--fv-black', 'rgb(0, 0, 0)');
        wrapper.style.setProperty('--fv-metrics-color', 'rgba(0, 0, 0, 0.4)');
      }
    }
  }
}