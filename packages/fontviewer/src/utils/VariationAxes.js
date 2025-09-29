// =============================================================================
// hyperflip/VariationAxes.js
// =============================================================================

export class VariationAxes {
  constructor(options) {
    this.container = options.container;
    this.onChange = options.onChange;
    this.currentSettings = {};
    // Create a specific container for axis controls
    this.axisContainer = document.createElement('div');
    this.axisContainer.className = 'axis-controls';
    this.container.appendChild(this.axisContainer);
  }

  /**
   * Creates sliders for variable font axes
   * @param {Array<AxisDefinition>} axes - Array of axis definitions
   */
  createAxesControls(axes) {
    this.axisContainer.innerHTML = '';
    this.currentSettings = {};

    axes.forEach(axis => {
      // 1. CREATE THE WRAPPER DIV
      const sliderGroup = document.createElement('div');
      sliderGroup.className = 'font-viewer-slider-group';

      const label = document.createElement('label');
      label.textContent = `${axis.name} (${axis.tag})`;

      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = axis.min;
      slider.max = axis.max;
      slider.value = axis.default;
      slider.step = 0.1;

      const valueSpan = document.createElement('span');
      valueSpan.textContent = parseFloat(axis.default).toFixed(1);

      slider.addEventListener('input', (e) => {
        this.updateAxisValue(axis.tag, e.target.value);
        valueSpan.textContent = parseFloat(e.target.value).toFixed(1);
      });

      // 2. APPEND THE ELEMENTS TO THE NEW WRAPPER
      sliderGroup.appendChild(label);
      sliderGroup.appendChild(slider);
      sliderGroup.appendChild(valueSpan);

      // 3. APPEND THE WRAPPER TO THE MAIN CONTAINER
      this.axisContainer.appendChild(sliderGroup);
    });

  }

  /**
   * Updates a single axis value
   * @private
   */
  updateAxisValue(tag, value) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      delete this.currentSettings[tag];
    } else {
      this.currentSettings[tag] = numValue;
    }
    this.updateVariationSettings();
  }

  /**
   * Updates variation settings and triggers callback
   * @private
   */
  updateVariationSettings() {
    const settings = Object.entries(this.currentSettings)
      .filter(([_, val]) => !isNaN(val))
      .map(([tag, val]) => `"${tag}" ${val.toFixed(1)}`)  // Format value in settings string
      .join(', ');
    this.onChange?.(settings || 'normal');
  }
}