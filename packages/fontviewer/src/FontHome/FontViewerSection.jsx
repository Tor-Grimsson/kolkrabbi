import React, { useEffect, useRef } from 'react'
import { FontViewer } from '../components/FontViewerComponent.js'

const FontViewerSection = () => {
  const containerRef = useRef(null)
  const fontViewerRef = useRef(null)

  useEffect(() => {
    const initFontViewer = async () => {
      if (containerRef.current && !fontViewerRef.current) {
        fontViewerRef.current = new FontViewer({
          container: containerRef.current,
          fontUrl: '../react-vite-kolkrabbi/public/fonts/TGMalromurItalicVF.ttf',
          showControls: true,
          showMetrics: false,
          initialFontSize: 400,
          autoStart: true,
          animationDelay: 1000
        })

        try {
          await fontViewerRef.current.init()
        } catch (error) {
          console.error('Failed to initialize FontViewer:', error)
        }
      }
    }

    initFontViewer()

    return () => {
      if (fontViewerRef.current) {
        fontViewerRef.current.destroy()
        fontViewerRef.current = null
      }
    }
  }, [])

  return (
    <section className="fontviewer-section">
      <h2 className="section-title">Font Analysis</h2>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '600px',
          position: 'relative',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </section>
  )
}

export default FontViewerSection