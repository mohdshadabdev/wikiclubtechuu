import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Quote {
  text: string;
  author: string;
  image: string;
}

const quotes: Quote[] = [
  {
    text: "Open source is a development methodology; free software is a social movement.",
    author: "Richard Stallman",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwyoIEg8uOZyR5-5--I40HmUtKPkIuylxITA&s"
  },
  {
    text: "The best way to predict the future is to implement it.",
    author: "Alan Kay",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS--uZ8kTDfZuXvG7gez5tirvltJonPPKwDhA&s"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGIuaH9X322KLftwigUz-r-lQ4CP62Yltlaw&s"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    image: "https://cdn.cloudinary.com/stichting-frontend-amsterdam/image/upload/v1687198080/Cory_House_q1y6m9.jpg"
  },
  {
    text: "Open source is about sharing knowledge and building together.",
    author: "Linus Torvalds",
    image: "https://media.newyorker.com/photos/5ba177da9eb2f7420aadeb98/16:9/w_2560,h_1440,c_limit/Cohen-Linus-Torvalds.jpg"
  },
  {
    text: "The power of open source is the power of the people.",
    author: "Philippe Kahn",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Philippe_Kahn.JPG"
  }
];

export const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setCurrentQuote(randomQuote);

    // Show after 3s (assuming welcome popup ends at 3s)
    const showTimer = setTimeout(() => {
      setIsVisible(true);

      // Hide after 7s
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 7000);

      return () => clearTimeout(hideTimer);
    }, 9000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!currentQuote) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-24 w-96 z-30"
        >
          <Card className="glass border border-white/20 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              {/* Image (taller for better visibility) */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={currentQuote.image} 
                  alt="Speaker" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-30" />

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                  <motion.div
                    className="h-full bg-gradient-to-r from-white to-white/80"
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Quote Content */}
              <div className="p-4">
                <blockquote className="text-sm font-medium text-foreground mb-2 leading-relaxed">
                  "{currentQuote.text}"
                </blockquote>
                <cite className="text-xs text-muted-foreground font-semibold">
                  — {currentQuote.author}
                </cite>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs text-primary font-medium">Open Source Inspiration</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
