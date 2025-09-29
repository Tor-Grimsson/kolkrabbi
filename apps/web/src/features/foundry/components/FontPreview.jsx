import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const defaultFontUrl = "/fonts/TGMalromurItalicVF.ttf";

const FontPreview = () => {
  const [currentGlyph, setCurrentGlyph] = useState('A')
  const [font, setFont] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadFont = async () => {
      try {
        const response = await fetch(defaultFontUrl)
        const buffer = await response.arrayBuffer()
        const fontFace = new FontFace('TGMalromurItalic', buffer)
        await fontFace.load()
        document.fonts.add(fontFace)
        setFont('TGMalromurItalic')
      } catch (error) {
        console.error('Error loading font:', error)
      }
    }

    loadFont()

    // Cycle through letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let index = 0
    const interval = setInterval(() => {
      setCurrentGlyph(letters[index])
      index = (index + 1) % letters.length
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    navigate('/fontviewer')
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: '#fff',
        border: '1px solid #eee',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'}
      onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
    >
      <span style={{
        fontFamily: font || 'serif',
        fontSize: '200px',
        color: '#000',
        lineHeight: 1,
        userSelect: 'none'
      }}>
        {currentGlyph}
      </span>
    </div>
  )
}

export default FontPreview