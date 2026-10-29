import { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/* ───────────────── Dummy image placeholders (swap later) ───────────────── */
const DUMMY = {
  meadow: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
  meadow2: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80',
  avatar1: 'https://i.pravatar.cc/150?img=11',
  avatar2: 'https://i.pravatar.cc/150?img=5',
  avatar3: 'https://i.pravatar.cc/150?img=32',
  wealth: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  trader: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
}

/* ───────────────── Icons ───────────────── */
const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Check = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const XMark = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const Star = () => (
  <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
)

/* ───────────────── Scroll reveal wrapper ───────────────── */
function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ───────────────── Dashboard Mock (exact from frame 1) ───────────────── */
function DashboardMock() {
  return (
    <div className="relative w-full max-w-[1100px] mx-auto">
      {/* Soft shadow / depth */}
      <div className="absolute -inset-4 bg-black/10 blur-2xl rounded-[32px]" />

      <div className="relative bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-white/60 flex"
           style={{ height: 'min(520px, 70vw)' }}>
        {/* Sidebar */}
        <div className="w-[200px] shrink-0 bg-[#0f1117] text-white flex flex-col p-4">
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <LogoIcon />
            </div>
            <span className="font-semibold text-sm">FintechX</span>
          </div>

          <nav className="flex-1 space-y-1 text-[13px]">
            {[
              { label: 'Dashboard', active: true },
              { label: 'Portfolio' },
              { label: 'Investments' },
              { label: 'Market Insights' },
              { label: 'AI Advisor' },
              { label: 'Resource mgnt' },
              { label: 'Users' },
              { label: 'Project template' },
            ].map((item) => (
              <div
                key={item.label}
                className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                  item.active ? 'bg-white text-slate-900 font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-4 h-4 rounded bg-current opacity-40" />
                {item.label}
              </div>
            ))}
          </nav>

          <div className="mt-auto bg-white/5 rounded-xl p-3 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-400/20 flex items-center justify-center text-lg">
              👑
            </div>
            <p className="text-[11px] text-slate-300 leading-tight mb-2">
              Upgrade to PRO to get access to all features!
            </p>
            <button className="w-full text-[11px] font-medium bg-white text-slate-900 rounded-full py-1.5">
              Get Pro Now
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 bg-[#f8f9fb] p-5 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Financial Command</h2>
              <p className="text-xs text-slate-500">Welcome back, Alex. Your portfolio is up 12.4% this quarter.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center bg-white rounded-full px-3 py-1.5 text-xs text-slate-400 border border-slate-200 w-40">
                Search anything…
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-200" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500" />
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Portfolio Value', value: '$58,420.00', change: '12.4%', color: 'bg-violet-50', iconBg: 'bg-violet-500' },
              { label: "Today's Gain/Loss", value: '+$1,240.50', change: '2.1%', color: 'bg-orange-50', iconBg: 'bg-orange-400' },
              { label: 'Active Investments', value: '24 Assets', change: '6 ↑', color: 'bg-sky-50', iconBg: 'bg-sky-400' },
              { label: 'Risk Score', value: '18 / 100', change: 'low', color: 'bg-rose-50', iconBg: 'bg-rose-400' },
            ].map((c) => (
              <div key={c.label} className={`${c.color} rounded-xl p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-7 h-7 rounded-lg ${c.iconBg} flex items-center justify-center text-white text-xs`}>★</div>
                  <span className="text-[10px] font-medium text-slate-500 bg-white/70 px-1.5 py-0.5 rounded-full">{c.change}</span>
                </div>
                <p className="text-[10px] text-slate-500">{c.label}</p>
                <p className="text-sm font-semibold text-slate-900 mt-0.5">{c.value}</p>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-3 h-[220px]">
            {/* Line chart */}
            <div className="col-span-3 bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Investment Performance</p>
                  <p className="text-[10px] text-slate-400">Portfolio value over the last 6 months</p>
                </div>
                <div className="flex gap-1 text-[10px]">
                  {['Daily', 'Weekly', 'Monthly'].map((t, i) => (
                    <span key={t} className={`px-2 py-0.5 rounded-full ${i === 2 ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-400'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* SVG chart */}
              <svg viewBox="0 0 400 120" className="w-full h-[140px]" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 30, 60, 90, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                ))}
                <path d="M0,90 C40,80 80,70 120,55 C160,40 200,30 240,45 C280,60 320,20 360,25 L400,35 L400,120 L0,120 Z" fill="url(#g1)" />
                <path d="M0,90 C40,80 80,70 120,55 C160,40 200,30 240,45 C280,60 320,20 360,25 L400,35" fill="none" stroke="#34d399" strokeWidth="2.5" />
                <path d="M0,100 C50,95 100,85 150,70 C200,55 250,75 300,65 C340,58 370,50 400,55" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 3" />
              </svg>
            </div>

            {/* Donut */}
            <div className="col-span-2 bg-white rounded-xl p-4 border border-slate-100 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-900">Asset Allocation</p>
                <span className="text-[10px] text-slate-400">All ▾</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-28 h-28">
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#38bdf8" strokeWidth="14"
                    strokeDasharray="124 226" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#fb923c" strokeWidth="14"
                    strokeDasharray="45 226" strokeDashoffset="-124" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="36" fill="none" stroke="#a78bfa" strokeWidth="14"
                    strokeDasharray="22 226" strokeDashoffset="-169" transform="rotate(-90 50 50)" />
                  <text x="50" y="52" textAnchor="middle" className="text-[11px] font-bold fill-slate-800">$58.4k</text>
                </svg>
              </div>
              <div className="flex justify-center gap-3 text-[10px] text-slate-500 mt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-400" />55% Stocks</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400" />20% Crypto</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-400" />10% Cash</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────── Main App ───────────────── */
export default function App() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [beforeAfter, setBeforeAfter] = useState<'before' | 'after'>('before')

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3])

  const faqs = [
    { q: 'How secure is my financial data?', a: 'Your data is protected with industry-standard encryption and secure infrastructure. We follow strict security practices to ensure your financial information remains private and safe.' },
    { q: 'Can I connect multiple investment accounts?', a: 'Yes. You can securely link multiple bank, brokerage, and investment accounts so everything appears in one unified dashboard.' },
    { q: 'How do the AI insights work?', a: 'Our AI continuously analyzes market data, your portfolio composition, and risk profile to surface clear buy/hold/sell recommendations and alerts.' },
    { q: 'Is a trial available before subscribing?', a: 'Yes — you can start with a free trial to explore the full platform before choosing a plan.' },
    { q: 'Do you offer plans for financial teams or organizations?', a: 'Absolutely. We have team and enterprise plans with collaboration features, advanced reporting, and dedicated support.' },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* ═══════════════ FIXED NAVBAR ═══════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="flex items-center gap-8 bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/5 rounded-full px-5 py-2.5 max-w-3xl w-full justify-between">
          <div className="flex items-center gap-2 font-semibold text-[15px]">
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <LogoIcon />
            </div>
            FintechX
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {['Products', 'Features', 'Use Cases', 'Pricing'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-slate-900 transition">
                {l}
              </a>
            ))}
          </nav>
          <a href="#pricing" className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-slate-800 transition flex items-center gap-1.5">
            Try it free <span>→</span>
          </a>
        </div>
      </motion.header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] pt-24 pb-16 overflow-hidden">
        {/* Nature background – dummy, replace later */}
        <div className="absolute inset-0">
          <img
            src={DUMMY.meadow}
            alt="Nature meadow background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200/40 via-transparent to-white/90" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-6xl mx-auto px-4 pt-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-center mb-10"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05]">
              Finance{' '}
              <span className="inline-flex align-middle mx-1">
                <span className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-xl shadow-black/30 flex items-center justify-center text-white text-xl md:text-2xl font-bold border border-white/20">
                  AI
                </span>
              </span>{' '}
              Platform
            </h1>
            <p className="mt-5 text-lg md:text-xl text-slate-600 max-w-xl mx-auto">
              Optimize your investments with AI-driven analysis, real-time tracking, and intelligent recommendations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-7 py-3.5 rounded-full shadow-lg shadow-blue-600/30 transition">
                Get started now <span>→</span>
              </a>
              <a href="#features" className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 text-slate-700 font-medium px-7 py-3.5 rounded-full hover:bg-white transition">
                View live demo
              </a>
            </div>
          </motion.div>

          {/* Floating Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardMock />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ TRUSTED BY ═══════════════ */}
      <section className="py-14 border-b border-slate-100">
        <Reveal className="text-center">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-6">Trusted by investors and financial teams</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-50 grayscale">
            {['Seoul', 'Hudson', 'babylon', 'NOME', 'phoenix', 'Nexter', 'theor', 'London'].map((n) => (
              <span key={n} className="text-lg font-semibold text-slate-600 tracking-tight">{n}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════════ BEFORE / AFTER ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
              Smarter decisions<br />start with clear data
            </h2>
          </Reveal>

          {/* Toggle dial */}
          <Reveal delay={0.1}>
            <div className="relative inline-flex items-center justify-center mb-8">
              <button
                onClick={() => setBeforeAfter('before')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${beforeAfter === 'before' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                Before FintechX
              </button>

              <button
                onClick={() => setBeforeAfter(beforeAfter === 'before' ? 'after' : 'before')}
                className="relative mx-2 w-16 h-16 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center z-10"
              >
                <motion.div
                  animate={{ rotate: beforeAfter === 'after' ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                    beforeAfter === 'after' ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  {beforeAfter === 'after' ? '✦' : '●'}
                </motion.div>
              </button>

              <button
                onClick={() => setBeforeAfter('after')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${beforeAfter === 'after' ? 'text-slate-900' : 'text-slate-400'}`}
              >
                After FintechX
              </button>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {beforeAfter === 'before' ? (
              <motion.div
                key="before"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 rounded-2xl p-8 md:p-10 text-left grid md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-5">Challenges of managing investments today</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    {[
                      'Financial data is spread across platforms and is hard to understand',
                      'Lack of clear direction for buy, hold, or sell decisions',
                      'Tracking investments manually takes time and effort',
                      'Decisions based on incomplete or outdated information',
                    ].map((t) => (
                      <li key={t} className="flex gap-2">
                        <XMark className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 justify-center">
                  <div className="bg-rose-50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-rose-600">68%</p>
                    <p className="text-sm text-slate-600">Financial data confusion</p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-4">
                    <p className="text-3xl font-bold text-rose-600">55%</p>
                    <p className="text-sm text-slate-600">Poor data understanding</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="after"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-900 rounded-2xl p-8 md:p-10 text-left text-white grid md:grid-cols-2 gap-8 overflow-hidden relative"
              >
                <div className="absolute inset-0 opacity-30">
                  <img src={DUMMY.meadow2} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-900/70" />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-5">Smarter way to manage your investments</h3>
                  <ul className="space-y-3 text-sm text-slate-200">
                    {[
                      'Get clear recommendations based on real-time data',
                      'Understand risks before making investment decisions',
                      'Monitor your portfolio in real time — no manual effort required',
                      'Make consistent and informed investment choices',
                    ].map((t) => (
                      <li key={t} className="flex gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative flex flex-col gap-3 justify-center">
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-emerald-400">3X Faster</p>
                    <p className="text-sm text-slate-300">Smart decisions</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                    <p className="text-3xl font-bold text-emerald-400">24/7</p>
                    <p className="text-sm text-slate-300">Real-time tracking</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════ CORE FEATURES ═══════════════ */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything you need to invest smarter</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">Powerful AI tools that turn complex market data into clear, actionable insights.</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced risk analysis',
                desc: 'Instantly understand portfolio risk with clear scores and breakdowns so you never invest blindly.',
                icon: '🛡️',
                color: 'from-violet-500 to-indigo-600',
              },
              {
                title: 'Market insights',
                desc: 'Real-time charts and trend detection across stocks, crypto and more — updated every second.',
                icon: '📈',
                color: 'from-sky-500 to-blue-600',
              },
              {
                title: 'AI-powered insights',
                desc: 'Get clear BUY / HOLD / SELL recommendations backed by continuous AI analysis.',
                icon: '🤖',
                color: 'from-emerald-500 to-teal-600',
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}>
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Start investing in minutes</h2>
            <p className="mt-4 text-slate-500">Three simple steps to smarter decisions</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-0.5 bg-slate-100" />
            {[
              { step: '01', title: 'Connect your accounts', desc: 'Securely link banks & brokerages in one click.' },
              { step: '02', title: 'AI analyzes everything', desc: 'Our models process markets with 95% accuracy.' },
              { step: '03', title: 'Act on clear insights', desc: 'Receive actionable BUY / HOLD / SELL signals.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.15} className="text-center relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl font-bold mb-5 shadow-xl">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECURITY ═══════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bank-grade security & compliance</h2>
            <p className="text-slate-500 mb-10">Your data is protected with the highest industry standards.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {['SOC 2', 'ISO 27001', 'GDPR', '256-bit SSL'].map((b, i) => (
                <Reveal key={b} delay={i * 0.08}>
                  <div className="px-6 py-3 bg-white rounded-full border border-slate-200 font-medium text-sm shadow-sm">
                    {b}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ USE CASES ═══════════════ */}
      <section id="use-cases" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for every investor</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Wealth Managers', desc: 'Manage multiple client portfolios from one clean dashboard with AI risk scoring and automated reports.', img: DUMMY.wealth },
              { title: 'Active Traders', desc: 'Get real-time market intelligence, opportunity scanners and instant AI signals for faster decisions.', img: DUMMY.trader },
            ].map((u, i) => (
              <Reveal key={u.title} delay={i * 0.12}>
                <motion.div whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
                  <div className="h-48 overflow-hidden">
                    <img src={u.img} alt={u.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{u.title}</h3>
                    <p className="text-sm text-slate-500">{u.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Active users' },
              { value: '1M+', label: 'Insights generated' },
              { value: '120+', label: 'Markets covered' },
              { value: '99.9%', label: 'Uptime' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="text-sm text-slate-400 mt-1">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Loved by investors</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'David Miller', role: 'Portfolio Manager', text: 'FintechX completely changed how I track client portfolios. The AI insights are incredibly accurate.', img: DUMMY.avatar1 },
              { name: 'Sarah Thompson', role: 'Independent Investor', text: 'I finally understand my risk exposure. The dashboard is clean and the recommendations just make sense.', img: DUMMY.avatar2 },
              { name: 'Michael Chen', role: 'Active Trader', text: 'The opportunity scanner alone is worth it. I catch moves earlier and with more confidence.', img: DUMMY.avatar3 },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <div className="bg-slate-50 rounded-2xl p-6 h-full border border-slate-100">
                  <div className="flex gap-1 mb-4">{[1,2,3,4,5].map((n) => <Star key={n} />)}</div>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="mt-3 text-slate-500">Start free. Upgrade when you’re ready.</p>
          </Reveal>

          {/* Billing toggle */}
          <Reveal delay={0.1} className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
              <button
                onClick={() => setBilling('monthly')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${billing === 'monthly' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling('yearly')}
                className={`px-5 py-2 text-sm font-medium rounded-full transition ${billing === 'yearly' ? 'bg-slate-900 text-white' : 'text-slate-500'}`}
              >
                Yearly <span className="text-emerald-500 text-xs ml-1">Save 20%</span>
              </button>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: billing === 'yearly' ? 15 : 19,
                desc: 'For individual investors getting started.',
                features: ['Portfolio tracking', 'Basic AI insights', 'Email alerts', '1 connected account'],
              },
              {
                name: 'Pro',
                price: billing === 'yearly' ? 31 : 39,
                desc: 'For serious investors who want the full power.',
                features: ['Everything in Starter', 'Advanced risk analysis', 'Unlimited accounts', 'Priority support', 'Opportunity scanner'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: null as number | null,
                desc: 'For teams and wealth managers.',
                features: ['Everything in Pro', 'Team seats', 'Custom reports', 'Dedicated manager', 'SSO & API access'],
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-7 h-full flex flex-col ${
                    p.popular ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border border-slate-200'
                  }`}
                >
                  {p.popular && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500 text-white px-2.5 py-1 rounded-full self-start mb-3">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className={`text-sm mt-1 mb-5 ${p.popular ? 'text-slate-300' : 'text-slate-500'}`}>{p.desc}</p>
                  <div className="mb-6">
                    {p.price !== null ? (
                      <>
                        <span className="text-4xl font-bold">${p.price}</span>
                        <span className={`text-sm ${p.popular ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold">Custom</span>
                    )}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className={`w-4 h-4 ${p.popular ? 'text-emerald-400' : 'text-emerald-500'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className={`text-center text-sm font-medium py-3 rounded-full transition ${
                      p.popular
                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {p.price === null ? 'Contact sales' : 'Start free trial'}
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">Frequently asked questions</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-sm hover:bg-slate-50 transition"
                  >
                    {f.q}
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="text-xl text-slate-400">
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-sm text-slate-500 leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={DUMMY.meadow2} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">Ready to invest smarter?</h2>
            <p className="text-lg text-slate-200 mb-8">Join thousands of investors using AI to make clearer decisions every day.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3.5 rounded-full shadow-lg transition">
                Start free trial
              </a>
              <a href="#" className="bg-white/10 backdrop-blur border border-white/30 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition">
                Try live demo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 text-white font-semibold mb-4">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <LogoIcon />
                </div>
                FintechX
              </div>
              <p className="text-sm leading-relaxed">AI-powered finance platform for clearer investment decisions.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Support', links: ['Help Center', 'API Docs', 'Status', 'Privacy'] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white font-medium text-sm mb-4">{col.title}</p>
                <ul className="space-y-2 text-sm">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="hover:text-white transition">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 FintechX. All rights reserved.</p>
            <p>Designed by Webestica · Powered by Framer · Recreated in React</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA pill (from video) */}
      <a
        href="#pricing"
        className="fixed bottom-6 right-6 z-40 bg-white shadow-xl border border-slate-200 rounded-full px-4 py-2.5 text-sm font-medium flex items-center gap-2 hover:shadow-2xl transition"
      >
        Get it for FREE
        <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">→</span>
      </a>
    </div>
  )
}
