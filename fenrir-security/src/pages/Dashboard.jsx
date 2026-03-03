import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Filter, Columns, Plus, RefreshCw,
  AlertOctagon, AlertTriangle, AlertCircle, SearchIcon,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { SeverityBadge } from '../components/ui/SeverityBadge'
import { StatusChip } from '../components/ui/StatusChip'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'
import { showToast } from '../components/ui/Toast'
import { mockScans, projectInfo, stats } from '../data/mockData'

const PAGE_SIZE = 10

const severityIconMap = {
  critical: <AlertOctagon size={18} />,
  high: <AlertTriangle size={18} />,
  medium: <AlertCircle size={18} />,
  low: <SearchIcon size={18} />,
}

const severityColorMap = {
  critical: { icon: 'bg-critical/10 text-critical', value: 'text-critical', change: 'text-critical' },
  high: { icon: 'bg-high/10 text-high', value: 'text-high', change: 'text-high' },
  medium: { icon: 'bg-medium/10 text-medium', value: 'text-medium', change: 'text-medium' },
  low: { icon: 'bg-low/10 text-low', value: 'text-low', change: 'text-low' },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)

  // Filter state
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState([])
  const [filterType, setFilterType] = useState([])
  const filterRef = useRef(null)

  // Column visibility state
  const [colOpen, setColOpen] = useState(false)
  const [visibleCols, setVisibleCols] = useState({ type: true, status: true, progress: true, vulnerability: true, lastScan: true })
  const colRef = useRef(null)

  // Debounce search input 300ms
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1) }, 300)
    return () => clearTimeout(t)
  }, [search])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
      if (colRef.current && !colRef.current.contains(e.target)) setColOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleFilter = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
    setPage(1)
  }

  const toggleCol = (key) => setVisibleCols(prev => ({ ...prev, [key]: !prev[key] }))

  const filtered = mockScans.filter(s => {
    const matchSearch =
      s.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      s.type.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchStatus = filterStatus.length === 0 || filterStatus.includes(s.status)
    const matchType = filterType.length === 0 || filterType.includes(s.type)
    return matchSearch && matchStatus && matchType
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg overflow-hidden">
      <Sidebar activeItem="dashboard" />

      <main className="flex-1 overflow-y-auto">
        {/* Top breadcrumb bar */}
        <div className="sticky top-0 z-20 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-gray-900 dark:text-white font-semibold">Scan</span>
            <span>/</span>
            <span>Private Assets</span>
            <span>/</span>
            <span className="text-primary font-medium">New Scan</span>
          </div>
          <div className="flex items-center gap-2 ml-8 lg:ml-0">
            <Button variant="secondary" className="text-xs py-1.5 px-3" onClick={() => showToast('Report exporting...', 'info')}>
              Export Report
            </Button>
            <Button variant="danger" className="text-xs py-1.5 px-3" onClick={() => showToast('Scan stopped', 'error')}>
              Stop Scan
            </Button>
          </div>
        </div>

        <div className="p-4 lg:p-6 space-y-4 lg:space-y-5">
          {/* Project Info Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
            {[
              ['Org', projectInfo.org],
              ['Owner', projectInfo.owner],
              ['Total Scans', projectInfo.totalScans],
              ['Scheduled', projectInfo.scheduled],
              ['Rescans', projectInfo.rescans],
              ['Failed Scans', projectInfo.failedScans],
            ].map(([label, value]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span>{label}:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{value}</span>
                <span className="text-gray-600 hidden sm:inline">|</span>
              </span>
            ))}
            <span className="flex items-center gap-1">
              <RefreshCw size={12} className="text-primary animate-spin" style={{ animationDuration: '3s' }} />
              <span className="text-primary text-xs">{projectInfo.lastUpdated}</span>
            </span>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {stats.map((stat) => {
              const colors = severityColorMap[stat.severity]
              return (
                <div key={stat.severity} className="bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">{stat.label}</span>
                    <div className={`p-1.5 rounded-lg ${colors.icon}`}>
                      {severityIconMap[stat.severity]}
                    </div>
                  </div>
                  <div>
                    <span className={`text-3xl font-bold ${colors.value}`}>{stat.value}</span>
                  </div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-critical' : 'text-low'} flex items-center gap-1`}>
                    <span>{stat.trend === 'up' ? '↑' : '↓'}</span>
                    <span>{stat.change}</span>
                  </p>
                </div>
              )
            })}
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search scans by name or type..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bgSecondary text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              {/* Filter */}
              <div className="relative" ref={filterRef}>
                <Button variant="secondary" className={`text-xs py-2.5 ${filterOpen ? 'border-primary text-primary' : ''}`} onClick={() => { setFilterOpen(p => !p); setColOpen(false) }}>
                  <Filter size={13} /> Filter {(filterStatus.length + filterType.length) > 0 && <span className="ml-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{filterStatus.length + filterType.length}</span>}
                </Button>
                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 z-30 bg-white dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl shadow-xl p-4 w-56">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Status</p>
                    <div className="space-y-1 mb-3">
                      {['completed', 'scheduled', 'failed'].map(s => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={filterStatus.includes(s)} onChange={() => toggleFilter(filterStatus, setFilterStatus, s)}
                            className="accent-primary w-3.5 h-3.5" />
                          <span className="text-xs capitalize text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{s}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Type</p>
                    <div className="space-y-1 mb-3">
                      {['Greybox', 'Blackbox'].map(t => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={filterType.includes(t)} onChange={() => toggleFilter(filterType, setFilterType, t)}
                            className="accent-primary w-3.5 h-3.5" />
                          <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{t}</span>
                        </label>
                      ))}
                    </div>
                    {(filterStatus.length + filterType.length) > 0 && (
                      <button onClick={() => { setFilterStatus([]); setFilterType([]) }} className="text-[11px] text-critical hover:underline">Clear all filters</button>
                    )}
                  </div>
                )}
              </div>

              {/* Columns */}
              <div className="relative" ref={colRef}>
                <Button variant="secondary" className={`text-xs py-2.5 ${colOpen ? 'border-primary text-primary' : ''}`} onClick={() => { setColOpen(p => !p); setFilterOpen(false) }}>
                  <Columns size={13} /> Column
                </Button>
                {colOpen && (
                  <div className="absolute right-0 top-full mt-2 z-30 bg-white dark:bg-dark-bgSecondary border border-light-border dark:border-dark-border rounded-xl shadow-xl p-4 w-48">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Visible Columns</p>
                    <div className="space-y-1">
                      {[['type','Type'],['status','Status'],['progress','Progress'],['vulnerability','Vulnerability'],['lastScan','Last Scan']].map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer group">
                          <input type="checkbox" checked={visibleCols[key]} onChange={() => toggleCol(key)}
                            className="accent-primary w-3.5 h-3.5" />
                          <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="primary" className="text-xs py-2.5 whitespace-nowrap" onClick={() => showToast('Scan creation initiated', 'success')}>
                <Plus size={13} /> New scan
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light-border dark:border-dark-border">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Scan Name</th>
                    {visibleCols.type && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>}
                    {visibleCols.status && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>}
                    {visibleCols.progress && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Progress</th>}
                    {visibleCols.vulnerability && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Vulnerability</th>}
                    {visibleCols.lastScan && <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Scan</th>}
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={1 + Object.values(visibleCols).filter(Boolean).length} className="text-center py-12 text-sm">
                        <span className="text-gray-400">No scans found</span>
                        {(filterStatus.length + filterType.length) > 0 && (
                          <button onClick={() => { setFilterStatus([]); setFilterType([]) }} className="ml-2 text-primary hover:underline text-sm">Clear filters</button>
                        )}
                      </td>
                    </tr>
                  ) : paginated.map((scan, idx) => (
                    <tr
                      key={scan.id}
                      onClick={() => navigate(`/scan/${scan.id}`)}
                      className={`cursor-pointer transition-colors border-b border-gray-100 dark:border-dark-border last:border-0
                        ${idx % 2 === 0
                          ? 'bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-white/[0.06]'
                          : 'bg-gray-50/60 dark:bg-white/[0.03] hover:bg-gray-100/80 dark:hover:bg-white/[0.06]'
                        }`}
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{scan.name}</td>
                      {visibleCols.type && <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{scan.type}</td>}
                      {visibleCols.status && <td className="px-4 py-3"><StatusChip status={scan.status} /></td>}
                      {visibleCols.progress && <td className="px-4 py-3"><ProgressBar progress={scan.progress} status={scan.status} /></td>}
                      {visibleCols.vulnerability && (
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <SeverityBadge severity="critical" count={scan.vulnerabilities.critical} />
                            <SeverityBadge severity="high" count={scan.vulnerabilities.high} />
                            <SeverityBadge severity="medium" count={scan.vulnerabilities.medium} />
                            <SeverityBadge severity="low" count={scan.vulnerabilities.low} />
                          </div>
                        </td>
                      )}
                      {visibleCols.lastScan && <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{scan.lastScan}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-light-border dark:border-dark-border">
              <span className="text-xs text-gray-400">
                Showing {Math.min((page - 1) * PAGE_SIZE + paginated.length, filtered.length)} of {filtered.length} Scans
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs text-gray-400 px-2">{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
