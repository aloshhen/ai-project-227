import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import SafeIcon from './components/SafeIcon'

// Animated Counter Hook
const useAnimatedCounter = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    hasStarted.current = true

    let startTime = null
    const startValue = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Stat Card Component
const StatCard = ({ value, suffix, label, icon, delay = 0 }) => {
  const { count, ref } = useAnimatedCounter(value, 2500)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <SafeIcon name={icon} className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-slate-400 text-sm font-medium">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {count.toLocaleString()}
          </span>
          <span className="text-2xl font-bold text-cyan-400">{suffix}</span>
        </div>
      </div>
    </motion.div>
  )
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-500 group overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
    
    <div className="relative">
      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
        <SafeIcon name={icon} className="w-7 h-7 text-cyan-400" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  </motion.div>
)

// Chart Component (Visual representation)
const TVLChart = () => {
  const bars = [
    { height: 40, month: 'Jan' },
    { height: 55, month: 'Feb' },
    { height: 45, month: 'Mar' },
    { height: 70, month: 'Apr' },
    { height: 60, month: 'May' },
    { height: 85, month: 'Jun' },
    { height: 75, month: 'Jul' },
    { height: 95, month: 'Aug' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Total Value Locked</h3>
          <p className="text-slate-400 text-sm">Protocol growth over time</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full">
          <SafeIcon name="trending-up" className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm font-medium">+127.5%</span>
        </div>
      </div>
      
      <div className="relative h-48 flex items-end justify-between gap-2 md:gap-4">
        {bars.map((bar, index) => (
          <motion.div
            key={bar.month}
            initial={{ height: 0 }}
            whileInView={{ height: `${bar.height}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
            className="flex-1 relative group"
          >
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-lg opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/30" 
                 style={{ height: '100%' }} />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 font-medium">
              {bar.month}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
        <div>
          <p className="text-slate-500 text-xs mb-1">TVL</p>
          <p className="text-white font-bold">$47.2M</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs mb-1">Volume (24h)</p>
          <p className="text-white font-bold">$8.4M</p>
        </div>
        <div>
          <p className="text-slate-500 text-xs mb-1">Users</p>
          <p className="text-white font-bold">12.5K</p>
        </div>
      </div>
    </motion.div>
  )
}

// Connect Wallet Button
const ConnectButton = ({ onConnect, isConnected }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onConnect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 overflow-hidden ${
        isConnected 
          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
          : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
      }`}
    >
      <div className="relative flex items-center gap-2">
        <SafeIcon name={isConnected ? 'check-circle' : 'wallet'} className="w-4 h-4" />
        <span>{isConnected ? '0x7a...3f9' : 'Connect Wallet'}</span>
      </div>
      {!isConnected && isHovered && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.button>
  )
}

// Main App Component
function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleConnect = () => {
    if (!isConnected) {
      setIsConnected(true)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 bg-green-500/90 backdrop-blur-xl text-white rounded-xl shadow-lg flex items-center gap-2"
          >
            <SafeIcon name="check-circle" className="w-5 h-5" />
            <span className="font-medium">Wallet connected successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <SafeIcon name="hexagon" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Nexus<span className="text-cyan-400">Fi</span>
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-8"
            >
              {['Features', 'Stats', 'Docs'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ConnectButton onConnect={handleConnect} isConnected={isConnected} />
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-sm font-medium">Live on Mainnet</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter"
            >
              The Future of{' '}
              <span className="gradient-text">DeFi</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Earn competitive yields, trade with minimal slippage, and secure your assets 
              with institutional-grade security. All in one decentralized protocol.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={handleConnect}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <span>Launch App</span>
                <SafeIcon name="arrow-right" className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2">
                <SafeIcon name="book-open" className="w-5 h-5" />
                <span>Read Docs</span>
              </button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <StatCard value={47} suffix="M+" label="Total Value Locked" icon="lock" delay={0} />
            <StatCard value={125} suffix="K+" label="Active Users" icon="users" delay={0.1} />
            <StatCard value={142} suffix="%" label="Highest APY" icon="trending-up" delay={0.2} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Why Choose <span className="gradient-text">NexusFi</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Built for performance, security, and maximum returns
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="zap"
              title="Low Fees"
              description="Industry-leading low transaction fees starting at 0.1%. Maximize your returns with minimal cost on every trade and yield harvest."
              delay={0}
            />
            <FeatureCard
              icon="shield-check"
              title="Security First"
              description="Multi-sig governance, audited smart contracts, and real-time monitoring. Your assets are protected by institutional-grade security."
              delay={0.1}
            />
            <FeatureCard
              icon="percent"
              title="Competitive APY"
              description="Earn up to 142% APY on staked assets with auto-compounding yield strategies. Real yields, no inflationary gimmicks."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Stats/Chart Section */}
      <section id="stats" className="py-20 md:py-32 bg-slate-900/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Protocol <span className="gradient-text">Metrics</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Track real-time protocol performance. Our transparent dashboard shows 
                exactly where your yields come from and how the protocol grows over time.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: 'check-circle', text: 'Real-time yield tracking' },
                  { icon: 'check-circle', text: 'Transparent fee structure' },
                  { icon: 'check-circle', text: 'On-chain verifiable reserves' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <SafeIcon name={item.icon} className="w-5 h-5 text-cyan-400" />
                    <span className="text-slate-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <button className="mt-8 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold rounded-xl transition-all duration-300 flex items-center gap-2">
                <span>View Full Analytics</span>
                <SafeIcon name="external-link" className="w-4 h-4" />
              </button>
            </motion.div>

            <TVLChart />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-16 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to Start Earning?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users already earning yield on NexusFi. 
                No minimum deposit, withdraw anytime.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleConnect}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <SafeIcon name="rocket" className="w-5 h-5" />
                  <span>Launch App</span>
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700 flex items-center justify-center gap-2">
                  <SafeIcon name="twitter" className="w-5 h-5" />
                  <span>Follow Updates</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <SafeIcon name="hexagon" className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Nexus<span className="text-cyan-400">Fi</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              {[
                { name: 'twitter', href: '#' },
                { name: 'github', href: '#' },
                { name: 'message-circle', href: '#' },
                { name: 'book-open', href: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <SafeIcon name={social.name} className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>

            <div className="text-slate-500 text-sm">
              © 2024 NexusFi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App