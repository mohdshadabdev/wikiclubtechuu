import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const slideImages = [
  "https://media.licdn.com/dms/image/v2/D5622AQEQBfoXqECrrg/feedshare-shrink_800/B56ZWQcYyqHsAg-/0/1741885140543?e=1756944000&v=beta&t=xB8K2OsHxuwICl7sRxlCkOUZ-kyGKvSeTZvRaryvHhg",
  "https://media.licdn.com/dms/image/v2/D5622AQFiOO-zPNsJ9g/feedshare-shrink_2048_1536/B56ZWQcYl.HoA8-/0/1741885117694?e=1756944000&v=beta&t=aqT9QrfevMXm1K6SwJswQL8MNsABu9NZJ_EsUNFTC8k",
  "https://media.licdn.com/dms/image/v2/D5622AQGi-8wl3-c3Zg/feedshare-shrink_1280/B56ZV_1jEcGoAk-/0/1741606500420?e=1756944000&v=beta&t=sLdl2ThoPJB8zTaHvvQ8tAR7fMAamF67ZIlEcvZWDzI",
  "https://media.licdn.com/dms/image/v2/D5622AQF4htQnts-6wQ/feedshare-shrink_1280/B56ZV_1jEpHoAk-/0/1741606501092?e=1756944000&v=beta&t=B-hQquqFUAWIS6ycfejNLK1VII96i9Bpn1ptNQT8N1o",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Graduation_cermony_road_to_wiki.png/500px-Graduation_cermony_road_to_wiki.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Graduation_road_to_wiki.jpg/500px-Graduation_road_to_wiki.jpg"
]

export function ImageSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slideImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl glass">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slideImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="glass hover-glow"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="glass hover-glow"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          className="glass hover-glow"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  )
}