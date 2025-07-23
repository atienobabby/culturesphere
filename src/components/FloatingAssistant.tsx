import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { generateRecommendations } from '../utils/api';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FloatingAssistant: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your CultureSphere AI guide. I can help you navigate our cultural domains and find what resonates with your soul. What would you like to explore?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Context-aware rotating text based on current page
  const getContextualTexts = () => {
    const path = location.pathname;
    
    const contextTexts = {
      '/': [
        "👋 Welcome to CultureSphere AI",
        "🎵 Click Music to explore your vibe",
        "🧳 Ready for a soulful trip?",
        "🧥 Discover fashion by feeling",
        "🧘‍♀️ Find your calm through taste",
        "📚 What would Kendrick recommend?",
        "🍽️ Taste the world through culture"
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const currentPage = location.pathname.replace('/', '') || 'home';
      const assistantPrompt = `You are a helpful AI guide for CultureSphere AI, a cultural intelligence platform. 
      
      Current page: ${currentPage}
      CultureSphere AI helps users discover personalized recommendations across 6 domains: Music, Dining, Travel, Fashion, Learning, and Wellness. Users input their preferences and get AI-powered lifestyle insights based on their cultural DNA.
      
      User question: "${inputValue}"
      
      Provide a helpful, friendly response about CultureSphere AI, its features, or guidance on how to use the platform. Keep responses concise (2-3 sentences) and encouraging. If asked about specific domains, guide them toward exploring that section. Be warm and culturally aware.`;

      const response = await generateRecommendations(assistantPrompt, 'assistant');
      
      setIsTyping(false);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setIsTyping(false);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Try exploring one of our cultural domains directly to discover your personalized recommendations!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-sm">AI is thinking...</span>
    </div>
  );

  return (
    <>
      {/* Floating Assistant Avatar */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        {/* Moving Container */}
        <div className="relative">
          {/* Text Bubble Above Avatar */}
          <div className="relative mb-2 pointer-events-none">
            <div className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg shadow-lg text-sm font-medium border border-slate-200 dark:border-slate-600 whitespace-nowrap animate-fade-in-out">
              {contextualTexts[currentTextIndex]}
              {/* Speech bubble tail */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-slate-800"></div>
            </div>
          </div>

          {/* Avatar */}
          <div 
            className="relative pointer-events-auto"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {/* Hover Tooltip */}
            {showTooltip && !isOpen && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap animate-fade-in">
                Ask AI
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
              </div>
            )}

            {/* Main Avatar Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                isOpen ? 'scale-110' : ''
              }`}
              aria-label="Toggle AI Assistant"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Avatar Content */}
              <div className="relative z-10 text-2xl animate-pulse-gentle">
                🤖
              </div>

              {/* Pulse Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 animate-ping opacity-20"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-[60] flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">CultureSphere Guide</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your cultural intelligence assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              <X className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <TypingIndicator />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about CultureSphere AI..."
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isLoading || !inputValue.trim()
                    ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;