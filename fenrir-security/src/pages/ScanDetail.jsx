import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Minimize2, X, Search, Map, FlaskConical, CheckSquare, FileText } from 'lucide-react'
import { Sidebar } from '../components/layout/Sidebar'
import { Button } from '../components/ui/Button'
import { showToast } from '../components/ui/Toast'
import { ConfirmModal } from '../components/ui/Modal'
import { mockScans, mockFindings, mockConsoleLogs, mockVerificationLoops } from '../data/mockData'

const steps = [
  { id: 'spidering', label: 'Spidering', icon: Search },
  { id: 'mapping', label: 'Mapping', icon: Map },
  { id: 'testing', label: 'Testing', icon: FlaskConical },
  { id: 'validating', label: 'Validating', icon: CheckSquare },
  { id: 'reporting', label: 'Reporting', icon: FileText },
]

const severityBadgeColors = {
  critical: 'bg-critical text-white',
  high: 'bg-high text-white',
  medium: 'bg-medium text-white',
}

function ConsoleLogPart({ part }) {
  switch (part.type) {
    case 'link':
      return <span className="text-primary underline cursor-pointer hover:text-primary/80">{part.content}</span>
    case 'highlight':
      return <span className="bg-primary/20 text-primary rounded px-0.5">{part.content}</span>
    case 'code':
      return <span className="bg-gray-800 dark:bg-dark-bgTertiary text-primary rounded px-1 font-mono text-xs">{part.content}</span>
    case 'danger':
      return <span className="text-high font-bold">{part.content}</span>
    default:
      return <span>{part.content}</span>
  }
}

// Circular progress SVG
function CircularProgress({ percent = 0, label = 'In Progress' }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (percent / 100) * circ

  return (
    <div className="relative w-[140px] h-[140px] flex-shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" className="stroke-dark-bgTertiary dark:stroke-dark-bgTertiary stroke-gray-200" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="#0CC8A8" strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{percent}%</span>
        <span className="text-xs text-gray-400 mt-0.5">{label}</span>
      </div>
    </div>
  )
}

export default function ScanDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('activity')
  const [stopModal, setStopModal] = useState(false)

  const scan = mockScans.find(s => String(s.id) === String(id)) || mockScans[0]

  const metadata = [
    { label: 'Scan Type', value: 'Grey Box' },
    { label: 'Targets', value: 'google.com' },
    { label: 'Started At', value: 'Nov 22, 09:00AM' },
    { label: 'Credentials', value: '2 Active' },
    { label: 'Files', value: 'Control.pdf' },
    { label: 'Checklists', value: '40/350', highlight: true },
  ]

  return (
    <div className="flex h-screen bg-light-bg dark:bg-dark-bg overflow-hidden">
      <Sidebar activeItem="scans" />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex-shrink-0 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="text-gray-900 dark:text-white font-semibold">Scan</span>
            <span>/</span>
            <span>Private Assets</span>
            <span>/</span>
            <span className="text-primary font-medium">New Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="text-xs py-1.5 px-3" onClick={() => showToast('Report exporting...', 'info')}>
              Export Report
            </Button>
            <Button variant="danger" className="text-xs py-1.5 px-3" onClick={() => setStopModal(true)}>
              Stop Scan
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {/* Progress + Stepper Card */}
          <div className="bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <CircularProgress percent={0} label="In Progress" />

              {/* Stepper */}
              <div className="flex-1 w-full overflow-x-auto">
                <div className="flex items-center min-w-[400px]">
                  {steps.map((step, i) => {
                    const isActive = i === 0
                    const isCompleted = false
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                            ${isActive ? 'border-primary bg-primary/10 text-primary' :
                              isCompleted ? 'border-primary bg-primary text-white' :
                              'border-dark-border dark:border-dark-border border-gray-300 text-gray-500'}`}>
                            <Icon size={16} />
                          </div>
                          <span className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className="flex-1 h-[2px] bg-dark-border dark:bg-dark-border bg-gray-200 mx-2 mb-5" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Metadata row */}
            <div className="mt-5 pt-4 border-t border-light-border dark:border-dark-border grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {metadata.map(({ label, value, highlight }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-400">{label}</span>
                  <span className={`text-sm font-semibold ${highlight ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Console + Findings */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            {/* Live Scan Console */}
            <div className="flex-1 lg:w-[60%] bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border flex flex-col overflow-hidden min-h-[400px]">
              {/* Console Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-light-border dark:border-dark-border flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-low animate-pulse" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Live Scan Console</span>
                  <span className="text-xs text-gray-400 ml-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block animate-pulse" />
                    Running...
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-white dark:hover:text-white rounded-md hover:bg-white/5 dark:hover:bg-white/5">
                    <Minimize2 size={13} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white dark:hover:text-white rounded-md hover:bg-white/5 dark:hover:bg-white/5">
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-light-border dark:border-dark-border flex-shrink-0">
                {[['activity', 'Activity Log'], ['verification', 'Verification Loops']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
                      activeTab === key
                        ? 'text-primary border-primary'
                        : 'text-gray-400 border-transparent hover:text-white dark:hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Console body */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-[#0F1117] dark:bg-[#0F1117]">
                {activeTab === 'activity' ? (
                  <div className="space-y-3">
                    {mockConsoleLogs.map(log => (
                      <div key={log.id} className="flex gap-3">
                        <span className="text-gray-500 flex-shrink-0">[{log.timestamp}]</span>
                        <span className="text-gray-300">
                          {log.parts.map((part, pi) => (
                            <ConsoleLogPart key={pi} part={part} />
                          ))}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockVerificationLoops.map(loop => (
                      <div key={loop.id} className="rounded-lg border border-white/10 overflow-hidden">
                        {/* Loop header */}
                        <div className="flex items-center justify-between px-3 py-2 bg-white/5">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${loop.status === 'confirmed' ? 'bg-critical' : 'bg-yellow-400'}`} />
                            <span className="text-white text-xs font-semibold">{loop.title}</span>
                          </div>
                          <span className="text-gray-500 font-mono text-[10px]">[{loop.timestamp}]</span>
                        </div>
                        {/* Steps */}
                        <div className="px-3 py-2 space-y-1.5">
                          {loop.steps.map((step, si) => (
                            <div key={si} className="flex items-start gap-2 text-[11px]">
                              <span className={`mt-0.5 flex-shrink-0 font-bold ${step.result === 'pass' ? 'text-low' : 'text-critical'}`}>
                                {step.result === 'pass' ? '✓' : '✗'}
                              </span>
                              <span className="text-gray-400">
                                <span className="text-gray-300 font-medium">{step.label}: </span>
                                {step.detail}
                              </span>
                            </div>
                          ))}
                        </div>
                        {/* Conclusion */}
                        <div className="px-3 py-2 border-t border-white/10 bg-white/[0.03]">
                          <span className="text-[10px] text-yellow-400/80 leading-relaxed">{loop.conclusion}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Finding Log */}
            <div className="lg:w-[40%] bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border flex flex-col overflow-hidden min-h-[400px]">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-light-border dark:border-dark-border flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Finding Log</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-gray-400 hover:text-white dark:hover:text-white rounded-md hover:bg-white/5 dark:hover:bg-white/5">
                    <Minimize2 size={13} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-white dark:hover:text-white rounded-md hover:bg-white/5 dark:hover:bg-white/5">
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* Findings */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {mockFindings.map(finding => (
                  <div
                    key={finding.id}
                    className="bg-gray-50 dark:bg-dark-bgTertiary rounded-xl p-4 border border-light-border dark:border-dark-border hover:border-gray-500 dark:hover:border-gray-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md capitalize ${severityBadgeColors[finding.severity]}`}>
                        {finding.severity}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">{finding.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{finding.title}</h4>
                    <p className="text-xs text-primary mb-2 font-mono">{finding.endpoint}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{finding.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="flex-shrink-0 bg-white dark:bg-dark-bgSecondary rounded-xl border border-light-border dark:border-dark-border px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
            {[
              ['Sub-Agents', '0'],
              ['Parallel Executions', '2'],
              ['Operations', '1'],
            ].map(([label, value]) => (
              <span key={label} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block" />
                <span>{label}: <span className="text-gray-700 dark:text-white font-medium">{value}</span></span>
              </span>
            ))}
            <span className="flex items-center gap-2 ml-auto">
              {[['critical', 'Critical', 0], ['high', 'High', 0], ['medium', 'Medium', 0], ['low', 'Low', 0]].map(([sev, label, count]) => (
                <span key={sev} className="flex items-center gap-1">
                  <span className={`font-medium text-${sev}`}>{label}: {count}</span>
                </span>
              ))}
            </span>
          </div>
        </div>
      </main>

      <ConfirmModal
        open={stopModal}
        title="Stop Scan"
        message="Are you sure you want to stop this scan? All progress will be saved."
        confirmLabel="Stop Scan"
        onConfirm={() => { showToast('Scan stopped', 'error'); navigate('/dashboard') }}
        onClose={() => setStopModal(false)}
      />
    </div>
  )
}
