import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FloatingAssistantTwo: React.FC = () => {
  const location = useLocation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // Context-aware rotating text based on current page
  const getContextualTexts = () => {
    const path = location.pathname;
    
    const contextTexts = {
      '/': [
        "👋 Welcome to CultureSphere AI",
        "🎵 Click Music to explore your vibe",
        "🧳 Ready for a soulful trip?",
        "📚 Ask what to read next",
        "🧠 Discover smarter insights",
        "🍽️ Find your taste profile",
        "✨ Let AI guide your journey"
      ],
      '/music': [
        "🎵 What sounds move your soul?",
        "🎧 Let's find your musical DNA",
        "🎶 Discover sounds that resonate",
        "🎤 Music is the universal language"
      ],
      '/dining': [
        "🍽️ Taste follows your cultural heart",
        "🥘 Food is culture on a plate",
        "🍜 What flavors call to you?",
        "🍷 Dining is an art form"
      ],
      '/travel': [
        "🧳 Where does your spirit want to go?",
        "✈️ Adventure awaits your taste",
        "🗺️ Explore through cultural lens",
        "🌍 The world is your cultural canvas"
      ],
      '/fashion': [
        "🧥 Style is your cultural signature",
        "👗 Express your inner aesthetic",
        "✨ Fashion reflects your soul",
        "🎨 Wear your cultural identity"
      ],
      '/learning': [
        "📚 Knowledge shapes your taste",
        "🧠 Expand your cultural mind",
        "📖 What should you explore next?",
        "🎓 Learning is a cultural journey"
      ],
      '/wellness': [
        "🧘‍♀️ Find peace through your taste",
        "💆‍♀️ Wellness is deeply personal",
        "🌱 Nurture your cultural well-being",
        "☯️ Balance through understanding"
      ]
    };

    return contextTexts[path as keyof typeof contextTexts] || contextTexts['/'];
  };

  const contextualTexts = getContextualTexts();

  // Rotate text every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % contextualTexts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [contextualTexts.length, location.pathname]);

  // Reset text index when page changes
  useEffect(() => {
    setCurrentTextIndex(0);
  }, [location.pathname]);

  // Gentle movement animation
  useEffect(() => {
    const moveAssistant = () => {
      const maxX = window.innerWidth - 120; // Account for assistant width
      const maxY = window.innerHeight - 120; // Account for assistant height
      const minX = 20;
      const minY = 20;

      const newX = Math.random() * (maxX - minX) + minX;
      const newY = Math.random() * (maxY - minY) + minY;

      setPosition({ x: newX, y: newY });
    };

    // Move every 8-12 seconds
    const interval = setInterval(moveAssistant, 10000);
    
    // Initial position
    moveAssistant();

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed z-[999] pointer-events-none transition-all duration-[8000ms] ease-in-out"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Text Bubble Above Avatar */}
      <div className="relative mb-2 pointer-events-none">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap animate-fade-in-out">
          {contextualTexts[currentTextIndex]}
          {/* Speech bubble tail */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-500"></div>
        </div>
      </div>

      {/* Avatar */}
      <div 
        className="relative pointer-events-auto"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Hover Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap animate-fade-in">
            Ask Gemini AI
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
          </div>
        )}

        {/* Main Avatar Button */}
        <button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
          aria-label="Ask Gemini AI"
          title="Ask Gemini AI"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Avatar Content */}
          <div className="relative z-10 text-xl animate-pulse-gentle">
            🤖
          </div>

          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-ping opacity-20"></div>
        </button>
      </div>
    </div>
  );
};

export default FloatingAssistantTwo;