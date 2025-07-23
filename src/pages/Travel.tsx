import React from 'react';
import { Luggage } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const TravelPage: React.FC = () => {
  const domain = {
    title: 'Travel',
    icon: Luggage,
    description: 'Explore destinations aligned with your spirit and interests',
    color: 'from-blue-500 to-cyan-500',
    placeholder: 'Example: "Planning a budget solo trip, I love jazz and old architecture..."',
    exampleInputs: [
      'Amsterdam',
      'New York City',
      'Machu Picchu',
      'Into wellness retreats and natural hot springs',
      'Fascinated by film history and vintage bookstores'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default TravelPage;