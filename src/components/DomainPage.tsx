import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { generateRecommendations } from '../utils/api';

interface DomainPageProps {
  domain: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    color: string;
    placeholder: string;
    exampleInputs: string[];
  };
}

const DomainPage: React.FC<DomainPageProps> = ({ domain }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const recommendations = await generateRecommendations(input, domain.title.toLowerCase());
      setResult(recommendations);
      console.log("Recommendations set in state:", recommendations);
    } catch (err) {
      setError('Failed to generate recommendations. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = domain.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${domain.color} flex items-center justify-center mx-auto mb-6`}>
          <IconComponent className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          {domain.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {domain.description}
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tell us what you love or how you feel
            </label>
            <textarea
              id="user-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={domain.placeholder}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 resize-none h-32"
              disabled={loading}
            />
          </div>

          {/* Example Inputs */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">Try:</span>
            {domain.exampleInputs.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(example)}
                className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                disabled={loading}
              >
                "{example}"
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              loading || !input.trim()
                ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
                : `bg-gradient-to-r ${domain.color} text-white hover:shadow-lg transform hover:scale-105`
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating recommendations...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Get Recommendations</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-violet-500" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your Personalized {domain.title} Recommendations
            </h2>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
              {result}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Explore Another Domain</span>
        </Link>
      </div>
    </div>
  );
};

export default DomainPage;