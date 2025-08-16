import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={onClose}
        style={{ zIndex: 40 }}
      />
      
      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 50 }}>
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4">
            {title && (
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {title}
              </h3>
            )}
            <div className="relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
