import React, { useState, useEffect, useRef } from 'react'
import './fonthome.css'
import FontViewerSection from './FontViewerSection.jsx'

const TypefacePost = () => {
  const [weightValue, setWeightValue] = useState(400)
  const [currentGlyphSet, setCurrentGlyphSet] = useState('uppercase')
  const variableTextRef = useRef(null)
  const glyphsGridRef = useRef(null)

  const glyphSets = {
    uppercase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    punctuation: ['.', ',', '!', '?', ';', ':', '"', "'", '-', '—', '(', ')', '[', ']', '{', '}', '&', '@', '#', '$', '%'],
    languages: ['À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø']
  }

  const handleWeightChange = (e) => {
    const weight = e.target.value
    setWeightValue(weight)
    if (variableTextRef.current) {
      variableTextRef.current.style.fontWeight = weight
    }
  }

  const handleGlyphSetChange = (setName) => {
    setCurrentGlyphSet(setName)
  }

  const toggleTheme = () => {
    const body = document.body
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    if (newTheme === 'dark') {
      body.setAttribute('data-theme', 'dark')
    } else {
      body.removeAttribute('data-theme')
    }

    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark')
    }
  }, [])

  return (
    <div>
      <main className="main-content">
        {/* Section 1: Hero */}
         <div class="nav-controls">
            <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
         </div>
        <section className="hero-section">
          <div className="tag">New Release</div>
          <h1 className="hero-title">TG Mairomur</h1>
          <p className="hero-message">An elegant italic typeface with flowing curves and refined character</p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Download Font</a>
            <a href="#" className="btn-secondary">View Specimen</a>
          </div>
          <p className="hero-subtext">Available in multiple weights and styles</p>
        </section>

        {/* Section 2: Image */}
        <section className="image-section">
          <div className="image-placeholder">
            Font showcase image
          </div>
        </section>

        {/* Section 3: Styles Preview */}
        <section className="styles-section">
          <h2 className="section-title">Available Styles</h2>
          <div className="styles-grid">
            <div className="style-container">
              <div className="style-label">Light Italic</div>
              <div className="style-preview" style={{fontWeight: 300}}>Aa</div>
              <div className="style-weight">300</div>
            </div>
            <div className="style-container">
              <div className="style-label">Regular Italic</div>
              <div className="style-preview" style={{fontWeight: 400}}>Aa</div>
              <div className="style-weight">400</div>
            </div>
            <div className="style-container">
              <div className="style-label">Medium Italic</div>
              <div className="style-preview" style={{fontWeight: 500}}>Aa</div>
              <div className="style-weight">500</div>
            </div>
            <div className="style-container">
              <div className="style-label">Bold Italic</div>
              <div className="style-preview" style={{fontWeight: 700}}>Aa</div>
              <div className="style-weight">700</div>
            </div>
          </div>
        </section>

        {/* Section 4: Image */}
        <section className="image-section">
          <div className="image-placeholder">
            Typography in context image
          </div>
        </section>

        {/* Section 5: Font Preview */}
        <section className="preview-section">
          <h2 className="section-title">Type Specimen</h2>
          <div className="preview-container">
            <div className="preview-text preview-large">The quick brown fox</div>
            <div className="preview-text preview-medium">jumps over the lazy dog</div>
            <div className="preview-text preview-small">Pack my box with five dozen</div>
            <div className="preview-text preview-tiny">liquor jugs and premium quality</div>
          </div>
        </section>

        {/* Section 6: Image */}
        <section className="image-section">
          <div className="image-placeholder">
            Design application image
          </div>
        </section>

        {/* Section 7: Variable Font */}
        <section className="variable-section">
          <h2 className="section-title">Variable Font</h2>
          <div className="variable-container">
            <div className="tag">Interactive</div>
            <div className="variable-preview" ref={variableTextRef}>TG Mairomur</div>
            <div className="weight-control">
              <input
                type="range"
                className="weight-slider"
                min="300"
                max="900"
                value={weightValue}
                onChange={handleWeightChange}
              />
              <div className="weight-label">Weight: <span>{weightValue}</span></div>
            </div>
          </div>
        </section>

        {/* Section 8: Glyphs */}
        <section className="glyphs-section">
          <h2 className="section-title">Character Set</h2>
          <div className="glyphs-dropdown">
            <select
              className="dropdown"
              value={currentGlyphSet}
              onChange={(e) => handleGlyphSetChange(e.target.value)}
            >
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="digits">Digits</option>
              <option value="punctuation">Punctuation & Symbols</option>
              <option value="languages">Language Support</option>
            </select>
          </div>
          <div className="glyphs-grid" ref={glyphsGridRef}>
            {glyphSets[currentGlyphSet]?.map((glyph, index) => (
              <div key={index} className="glyph-item">
                {glyph}
              </div>
            ))}
          </div>
          <button className="show-all-btn">Show All Glyphs</button>
        </section>

        {/* Section 8.5: Font Viewer */}
        <FontViewerSection />

        {/* Section 9: Image */}
        <section className="image-section">
          <div className="image-placeholder">
            Usage examples image
          </div>
        </section>

        {/* Section 10: Features */}
        <section className="features-section">
          <h2 className="section-title">OpenType Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3 className="feature-title">Stylistic Alternates</h3>
              <p className="feature-description">Alternative character forms for enhanced typographic expression</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Ligatures</h3>
              <p className="feature-description">Contextual and discretionary ligatures for improved readability</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Kerning Pairs</h3>
              <p className="feature-description">Optimized spacing between character pairs</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Extended Language Support</h3>
              <p className="feature-description">Support for Latin, Cyrillic, and Greek character sets</p>
            </div>
          </div>
        </section>

        {/* Section 11: Image */}
        <section className="image-section">
          <div className="image-placeholder">
            Brand applications image
          </div>
        </section>

        {/* Section 12: Download Info */}
        <section className="download-section">
          <h2 className="section-title">Font Details</h2>
          <div className="download-info">
            <div className="info-item">
              <h3>Designer</h3>
              <p>Tor Grimsson</p>
            </div>
            <div className="info-item">
              <h3>Categories</h3>
              <p>Serif, Italic, Display</p>
            </div>
            <div className="info-item">
              <h3>Styles</h3>
              <p>4 Weights</p>
            </div>
            <div className="info-item">
              <h3>Format</h3>
              <p>OTF, WOFF2</p>
            </div>
          </div>
          <a href="#" className="btn-primary">Download TG Mairomur</a>
        </section>

        {/* Section 13: License */}
        <section className="image-section">
          <h2 className="section-title">Licensing</h2>
          <p style={{maxWidth: '600px', margin: '0 auto', color: 'var(--text-secondary)'}}>
            TG Mairomur is available for both personal and commercial use.
            Please review our licensing terms before use.
          </p>
        </section>

        {/* Section 14: CTA */}
        <section className="hero-section">
          <h2 className="section-title">Questions?</h2>
          <p className="hero-message">Get in touch with our team</p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Contact Us</a>
            <a href="#" className="btn-secondary">FAQ</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Pangram Pangram. All rights reserved.</p>
      </footer>
    </div>
   )
}
   

export default TypefacePost
   