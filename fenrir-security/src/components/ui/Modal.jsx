import { X } from 'lucide-react'
import { Button } from './Button'

export function ConfirmModal({ open, title, message, confirmLabel = 'Confirm', onConfirm, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-white dark:bg-dark-bgSecondary border border-gray-200 dark:border-dark-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white dark:hover:text-white">
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={() => { onConfirm(); onClose() }}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
