import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

let toastFn = null

export function showToast(message, type = 'info') {
  if (toastFn) toastFn({ message, type, id: Date.now() })
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    toastFn = (toast) => {
      setToasts(prev => [...prev, toast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id))
      }, 3500)
    }
    return () => { toastFn = null }
  }, [])

  const icons = { success: <CheckCircle size={16} className="text-low" />, error: <AlertCircle size={16} className="text-critical" />, info: <Info size={16} className="text-primary" /> }

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 bg-white dark:bg-dark-bgSecondary border border-gray-200 dark:border-dark-border rounded-xl shadow-xl px-4 py-3 min-w-[280px] animate-slide-in">
          {icons[t.type] || icons.info}
          <span className="text-sm text-gray-800 dark:text-white flex-1">{t.message}</span>
          <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="text-gray-400 hover:text-white dark:hover:text-white">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}
