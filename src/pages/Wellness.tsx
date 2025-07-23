import React from 'react';
import { Heart } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const WellnessPage: React.FC = () => {
  const domain = {
    title: 'Wellness',
    icon: Heart,
    description: 'Nurture your well-being with personalized guidance for mind, body, and soul',
    color: 'from-teal-500 to-cyan-500',
    placeholder: 'Example: "Feeling anxious lately. I listen to lo-fi and love nature walks..."',
    exampleInputs: [
      'Stressed with work, love meditation and indie music',
      'Want to build better habits, inspired by minimalism',
      'Seeking balance between creativity and productivity'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default WellnessPage;