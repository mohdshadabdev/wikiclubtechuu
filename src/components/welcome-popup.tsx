import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit")
    const today = new Date().toDateString()
    
    if (lastVisit !== today) {
      setIsVisible(true)
      localStorage.setItem("lastVisit", today)
      
      // Auto-hide after 7 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 7000)
      
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ 
            type: "spring", 
            duration: 0.6,
            bounce: 0.3
          }}
          className="relative bg-gradient-to-br from-white via-red-50 to-red-100 dark:from-gray-900 dark:via-red-900/20 dark:to-red-800/30 rounded-3xl shadow-2xl border border-red-200/30 dark:border-red-700/30 max-w-lg w-full mx-4 p-10 text-center backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, #f97d7dff 0%, #fd8099ff 20%, #8ae6a1ff 40%, #a2eeccff 60%, #8c78f0ff 80%, #8a59e6ff 100%)',
            boxShadow: '0 25px 50px -12px rgba(190, 18, 60, 0.25), 0 0 0 1px rgba(190, 18, 60, 0.1)'
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
          
          <div className="w-24 h-24 mx-auto mb-6">
             <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Wikimedia_logo_family_complete-2023.svg/250px-Wikimedia_logo_family_complete-2023.svg.png"
              alt="Wikimedia Logo"
              className="w-full h-full object-contain"
            />
          </div>


          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent mb-3 animate-pulse">
              🙏 Namaste
            </h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-700 via-red-600 to-red-500 bg-clip-text text-transparent mb-3 animate-pulse pl-8">
              from
            </h2>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-800 via-red-700 to-red-600 bg-clip-text text-transparent mb-6">
              WikiClubTech United University
            </h2>
            <p className="text-black mb-8 leading-relaxed text-lg font-medium">
              Welcome to our vibrant community of open knowledge and collaborative innovation. 
              Join us in shaping the future of technology and learning together.
            </p>
          </motion.div>

          {/* Animated Elements */}
          <motion.div
            className="flex justify-center space-x-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-red-600 via-red-500 to-red-400 rounded-full shadow-lg"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Auto-hide timer indicator */}
          <motion.div
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 h-2 rounded-full shadow-md"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </motion.div>

          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {/* This popup will disappear automatically */}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}