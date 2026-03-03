export function ProgressBar({ progress, status }) {
  const barColor =
    status === 'failed' ? 'bg-critical' :
    status === 'completed' ? 'bg-primary' :
    'bg-primary'

  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-1.5 bg-dark-border dark:bg-dark-border bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 dark:text-gray-400 font-medium w-10 text-right">
        {progress}%
      </span>
    </div>
  )
}
