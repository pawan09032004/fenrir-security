import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Check } from 'lucide-react'

/* ─── Reusable SVGs ─────────────────────────────────────── */
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
)

const MetaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 16 16" className="w-5 h-5">
    <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-0.986 3.725-2.757 3.725-1.543 0-2.395-0.866-3.924-3.424l-0.667-1.123-0.118-0.197a55 55 0 0 0-0.53-0.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q0.477-0.001 0.924 0.122c0.31 0.086 0.611 0.22 0.913 0.407 0.577 0.359 1.154 0.915 1.782 1.714m1.516 2.224q-0.378-0.614-0.727-1.133L9 6.326c0.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-0.39 1.877-1.195 1.877-0.773 0-1.142-0.51-2.61-2.87zM4.846 4.756c0.725 0.1 1.385 0.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-0.777 0-1.24-0.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q0.136 0 0.27 0.018Z" strokeWidth="1" />
  </svg>
)

const TrustpilotStar = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#00B67A]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
)

/* ─── Main Component ────────────────────────────────────── */
export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', agree: false })
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'First name is required'
    if (!form.lastName.trim()) e.lastName = 'Last name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!form.agree) e.agree = 'You must accept the terms'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    navigate('/dashboard')
  }

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  const toggleAgree = () => {
    setForm(p => ({ ...p, agree: !p.agree }))
    if (errors.agree) setErrors(p => { const n = { ...p }; delete n.agree; return n })
  }

  const inputCls = (field) =>
    `w-full px-4 py-3.5 rounded-xl border bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all duration-200
     focus:bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/20
     ${errors[field] ? 'border-red-400 bg-red-50/30 focus:border-red-400 focus:ring-red-400/20' : 'border-gray-200 hover:border-gray-300'}`

  const features = [
    'Effortlessly spider and map targets to uncover hidden security flaws',
    'Deliver high-quality, validated findings in hours, not weeks.',
    'Generate professional, enterprise-grade security reports automatically.',
  ]

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f3d2e 0%, #0c2a35 30%, #0a1f2e 55%, #1a1008 80%, #2d0f00 100%)' }}>

      {/* ══════════════ FULL-PAGE BACKGROUND (shared) ══════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #0CC8A8 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
        <div className="absolute -bottom-24 -right-24 w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      </div>

      {/* ══════════════ LEFT CONTENT (58%) ══════════════ */}
      <div className="relative lg:w-[58%] flex flex-col justify-between overflow-hidden min-h-[340px] lg:min-h-screen">

        {/* Ambient blobs */}
        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5 p-8 lg:p-12">
          <div className="w-10 h-10 rounded-full bg-[#0CC8A8] flex items-center justify-center shadow-lg shadow-[#0CC8A8]/40 flex-shrink-0">
            <span className="text-white font-black text-base tracking-tighter">aps</span>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-12 py-6 lg:py-0">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
            Expert level<br />Cybersecurity<br />
            in&nbsp;<span className="text-[#0CC8A8]">hours</span><br />
            not weeks.
          </h1>

          <div className="space-y-1 mb-2">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">What's included</p>
            {features.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-1">
                <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border border-[#0CC8A8]/60 bg-[#0CC8A8]/10 flex items-center justify-center">
                  <Check size={10} className="text-[#0CC8A8]" strokeWidth={3} />
                </div>
                <span className="text-[15px] text-white/75 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trustpilot badge */}
        <div className="relative z-10 p-8 lg:p-12">
          <div className="inline-flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <TrustpilotStar key={i} />)}
              </div>
              <span className="text-[#00B67A] text-sm font-bold tracking-tight">Trustpilot</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white font-extrabold text-sm">Rated 4.5/5.0</span>
              <span className="text-white/40 text-xs">(100k+ reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════ FLOATING CARD (42%) ══════════════ */}
      <div className="relative z-10 flex-1 lg:w-[42%] flex items-center justify-center p-6 lg:p-10">
        <div className="bg-white rounded-3xl shadow-2xl shadow-black/30 p-10 lg:p-12 w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-gray-900 tracking-tight mb-2">Sign up</h2>
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <button
                className="text-[#0CC8A8] font-semibold hover:text-[#0ab090] transition-colors"
                onClick={() => navigate('/dashboard')}
              >
                Log in
              </button>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <input
                  type="text" placeholder="First name*"
                  value={form.firstName} onChange={handleChange('firstName')}
                  className={inputCls('firstName')}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-red-500 font-medium px-1">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  type="text" placeholder="Last name*"
                  value={form.lastName} onChange={handleChange('lastName')}
                  className={inputCls('lastName')}
                />
                {errors.lastName && (
                  <p className="text-[11px] text-red-500 font-medium px-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <input
                type="email" placeholder="Email address*"
                value={form.email} onChange={handleChange('email')}
                className={inputCls('email')}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium px-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password (8+ characters)*"
                  value={form.password} onChange={handleChange('password')}
                  className={`${inputCls('password')} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass
                    ? <EyeOff size={17} strokeWidth={1.75} />
                    : <Eye size={17} strokeWidth={1.75} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium px-1">{errors.password}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input type="checkbox" className="sr-only" checked={form.agree} onChange={toggleAgree} />
                <div className={`mt-0.5 w-[18px] h-[18px] rounded-[5px] flex-shrink-0 flex items-center justify-center border-2 transition-all duration-150
                  ${form.agree
                    ? 'bg-[#0CC8A8] border-[#0CC8A8]'
                    : errors.agree ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-[#0CC8A8]'}`}>
                  {form.agree && <Check size={10} className="text-white" strokeWidth={3.5} />}
                </div>
                <span className="text-[13px] text-gray-500 leading-snug">
                  I agree to Aps's{' '}
                  <a href="#" onClick={e => e.stopPropagation()} className="text-[#0CC8A8] hover:underline font-medium">Terms & Conditions</a>
                  {' '}and acknowledge the{' '}
                  <a href="#" onClick={e => e.stopPropagation()} className="text-[#0CC8A8] hover:underline font-medium">Privacy Policy</a>
                </span>
              </label>
              {errors.agree && (
                <p className="text-[11px] text-red-500 font-medium px-1">{errors.agree}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 bg-[#0CC8A8] hover:bg-[#0ab494] active:scale-[0.99] text-white font-bold rounded-xl transition-all duration-200 text-[15px] tracking-wide shadow-lg shadow-[#0CC8A8]/25 mt-1"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center my-6">
            <div className="flex-1 border-t border-gray-100" />
            <span className="mx-4 text-xs font-medium text-gray-400 bg-white px-1">OR</span>
            <div className="flex-1 border-t border-gray-100" />
          </div>

          {/* Social login buttons */}
          <div className="flex gap-4">
            {/* Apple */}
            <button className="flex-1 h-12 flex items-center justify-center rounded-2xl bg-black hover:bg-gray-900 active:scale-[0.98] transition-all duration-150 shadow-sm">
              <AppleIcon />
            </button>

            {/* Google */}
            <button className="flex-1 h-12 flex items-center justify-center rounded-2xl bg-white hover:bg-gray-50 active:scale-[0.98] border-2 border-gray-100 hover:border-gray-200 transition-all duration-150 shadow-sm">
              <GoogleIcon />
            </button>

            {/* Meta */}
            <button className="flex-1 h-12 flex items-center justify-center rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] active:scale-[0.98] transition-all duration-150 shadow-sm">
              <MetaIcon />
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}
