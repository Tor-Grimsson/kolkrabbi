import FontViewer from '../Hooks/FontViewer.jsx'

const Foundry = () => {
  return (
    <main className="min-h-screen w-screen overflow-x-hidden flex flex-col">
      <div className="bg-white flex-1 relative" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
        <FontViewer
          showControls={true}
          showMetrics={true}
          initialFontSize={600}
          autoStart={true}
          animationDelay={800}
        />
      </div>
    </main>
  )
}

export default Foundry