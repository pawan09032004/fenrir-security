export function StatusChip({ status }) {
  const configs = {
    completed: 'bg-low/20 text-low border border-low/40',
    scheduled: 'bg-gray-500/20 text-gray-400 border border-gray-500/40',
    failed: 'bg-critical/20 text-critical border border-critical/40',
  }

  const labels = {
    completed: 'Completed',
    scheduled: 'Scheduled',
    failed: 'Failed',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${configs[status] || configs.scheduled}`}>
      {labels[status] || status}
    </span>
  )
}
