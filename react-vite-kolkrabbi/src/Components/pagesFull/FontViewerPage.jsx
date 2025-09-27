import React from 'react'
import FontViewer from '../Hooks/FontViewer.jsx'

const FontViewerPage = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#fff',
      zIndex: 1000
    }}>
      <FontViewer
        showControls={true}
        showMetrics={true}
        initialFontSize={600}
        autoStart={true}
        animationDelay={1000}
      />

      {/* Close button */}
      <button
        onClick={() => window.history.back()}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          zIndex: 1001
        }}
      >
        ← Back
      </button>
    </div>
  )
}

export default FontViewerPage