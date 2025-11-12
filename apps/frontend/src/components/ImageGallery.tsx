import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setZoom(1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setZoom(1)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 1))
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <div
          className="w-full h-full flex items-center justify-center cursor-zoom-in overflow-hidden"
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={images[currentIndex]}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex gap-2 bg-black/50 rounded-lg p-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="text-white hover:bg-black/50 p-2 rounded disabled:opacity-50"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-white px-2 py-2 text-sm">{Math.round(zoom * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="text-white hover:bg-black/50 p-2 rounded disabled:opacity-50"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setZoom(1)
              }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                index === currentIndex ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <img src={image} alt={`${alt} ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-full transition"
          >
            <X size={32} />
          </button>

          <div className="w-full h-full flex items-center justify-center relative">
            <img
              src={images[currentIndex]}
              alt={alt}
              className="max-w-full max-h-full object-contain"
              style={{ transform: `scale(${zoom})` }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 text-white hover:bg-white/10 p-2 rounded-full transition"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 text-white hover:bg-white/10 p-2 rounded-full transition"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
