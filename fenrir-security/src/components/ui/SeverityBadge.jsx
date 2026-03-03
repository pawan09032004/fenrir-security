export function SeverityBadge({ severity, count }) {
  const colors = {
    critical: 'bg-critical text-white',
    high: 'bg-high text-white',
    medium: 'bg-medium text-white',
    low: 'bg-low text-white',
  }

  if (count === 0 || count === undefined) return null

  return (
    <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded text-xs font-bold ${colors[severity] || 'bg-gray-500 text-white'}`}>
      {count}
    </span>
  )
}
