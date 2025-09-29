import React, { useRef, useEffect, useState } from 'react'
import { FontViewerComponent as FontViewerClass } from "@kolkrabbi/fontviewer";

const FontViewer = ({
  fontUrl = '/fonts/TGMalromurItalicVF.ttf',
  showControls = true,
  showMetrics = true,
  initialFontSize = 600,
  autoStart = true,
  animationDelay = 1000,
  ...config
}) => {
  const containerRef = useRef(null)
  const fontViewerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return

    const initFontViewer = async () => {
      try {
        setIsLoading(true)
        setError(null)

        console.log('FontViewer: Loading font from URL:', fontUrl)

        // Clean up previous instance
        if (fontViewerRef.current) {
          fontViewerRef.current.destroy()
        }

        // Create new FontViewer instance
        fontViewerRef.current = new FontViewerClass({
          container: containerRef.current,
          fontUrl,
          showControls,
          showMetrics,
          initialFontSize,
          autoStart,
          animationDelay,
          config
        })

        await fontViewerRef.current.init()
        console.log('FontViewer: Initialization complete')
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        console.error('FontViewer initialization error:', err)
      }
    }

    initFontViewer()

    // Cleanup on unmount
    return () => {
      if (fontViewerRef.current) {
        fontViewerRef.current.destroy()
      }
    }
  }, [fontUrl, showControls, showMetrics, initialFontSize, autoStart, animationDelay, config])

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        Error loading FontViewer: {error}
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100
        }}>
          Loading...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />
    </div>
  )
}

export default FontViewer
