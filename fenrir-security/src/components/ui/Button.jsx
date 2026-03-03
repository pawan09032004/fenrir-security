export function Button({ variant = 'primary', children, className = '', ...props }) {
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white font-semibold',
    secondary: 'bg-transparent border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 font-medium',
    danger: 'bg-transparent border border-critical text-critical hover:bg-critical/10 font-semibold',
    ghost: 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
