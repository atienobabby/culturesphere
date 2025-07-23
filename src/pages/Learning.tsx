import React from 'react';
import { BookOpen } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const LearningPage: React.FC = () => {
  const domain = {
    title: 'Learning',
    icon: BookOpen,
    description: 'Expand your mind with curated knowledge paths tailored to your interests',
    color: 'from-green-500 to-emerald-500',
    placeholder: 'Example: "I love Dune and Kendrick Lamar. What should I explore intellectually?"',
    exampleInputs: [
      'Fascinated by Afrofuturism and space exploration',
      'Love philosophy and experimental music',
      'Dune',
      'The Great Gatsby',
      'Pride and Prejudice',
      'Into psychology and human behavior patterns'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default LearningPage;