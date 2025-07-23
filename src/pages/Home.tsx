import React, { useState, FormEvent } from 'react'; // <-- ADDED useState and FormEvent here
import { Link } from 'react-router-dom';
import { Music, Utensils, Luggage, Shirt, BookOpen, Heart } from 'lucide-react';
import { generateGeneralRecommendation } from '../utils/api';

const domains = [
  {
    id: 'music',
    title: 'Music',
    icon: Music,
    description: 'Discover sounds that resonate with your soul',
    color: 'from-purple-500 to-pink-500',
    path: '/music'
  },
  {
    id: 'dining',
    title: 'Dining',
    icon: Utensils,
    description: 'Find flavors that match your cultural palate',
    color: 'from-orange-500 to-red-500',
    path: '/dining'
  },
  {
    id: 'travel',
    title: 'Travel',
    icon: Luggage,
    description: 'Explore destinations aligned with your spirit',
    color: 'from-blue-500 to-cyan-500',
    path: '/travel'
  },
  {
    id: 'fashion',
    title: 'Fashion',
    icon: Shirt,
    description: 'Express your identity through style',
    color: 'from-pink-500 to-rose-500',
    path: '/fashion'
  },
  {
    id: 'learning',
    title: 'Learning',
    icon: BookOpen,
    description: 'Expand your mind with curated knowledge',
    color: 'from-green-500 to-emerald-500',
    path: '/learning'
  },
  {
    id: 'wellness',
    title: 'Wellness',
    icon: Heart,
    description: 'Nurture your well-being with personalized guidance',
    color: 'from-teal-500 to-cyan-500',
    path: '/wellness'
  }
];

const Home: React.FC = () => {
    // <-- ADDED AI-RELATED STATE & FUNCTIONALITY HERE
    const [userInput, setUserInput] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault(); 
        
        setRecommendation('');
        setError(null);
        setLoading(true);

         try {
        // This is the line to update
        const result = await generateGeneralRecommendation(userInput); 
        setRecommendation(result);

        } catch (err: any) { 
            console.error('API call failed in Home component:', err);
            setError(err.message);

        } finally {
            setLoading(false);
        }
    };
    // <-- END OF ADDED AI-RELATED FUNCTIONALITY

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Your Taste-Powered
            <br />
            Life Navigator
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover what fits your soul – explore music, travel, fashion, wellness, dining, and learning based on your cultural DNA.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => {
            const IconComponent = domain.icon;
            return (
              <Link
                key={domain.id}
                to={domain.path}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${domain.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-8">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${domain.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-violet-600 group-hover:to-purple-600 transition-all duration-300">
                    {domain.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                    {domain.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors duration-300">
                    Explore
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* <-- ADDED NEW AI INPUT SECTION HERE */}
        <div className="mt-20 max-w-2xl mx-auto px-4 py-8 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">What Are You Into?</h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-6">
            Enter your interests below and let CultureSphere AI find your cultural matches.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g., 'I love classical music and impressionist art'"
              className="flex-1 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button type="submit" disabled={loading || !userInput} className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Thinking...' : 'Get My Match'}
            </button>
          </form>

          {/* Display loading, error, or recommendation state */}
          <div className="mt-8">
            {loading && <p className="text-center text-slate-600 dark:text-slate-400 animate-pulse">Searching the cultural web for you...</p>}
            {error && <p className="text-center text-red-500 dark:text-red-400">Error: {error}</p>}
            {recommendation && (
              <div className="recommendation-box p-6 bg-white dark:bg-slate-900 rounded-xl shadow-inner">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Your Recommendation:</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{recommendation}</p>
              </div>
            )}
          </div>
        </div>
        {/* <-- END OF ADDED SECTION */}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Cultural Identity?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Choose any domain above to begin your personalized journey through culture, taste, and lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {domains.slice(0, 3).map((domain) => (
                <Link
                  key={domain.id}
                  to={domain.path}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 font-medium"
                >
                  Start with {domain.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;