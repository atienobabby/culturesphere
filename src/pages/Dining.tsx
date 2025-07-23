import React from 'react';
import { Utensils } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const DiningPage: React.FC = () => {
  const domain = {
    title: 'Dining',
    icon: Utensils,
    description: 'Find flavors that match your cultural palate and lifestyle',
    color: 'from-orange-500 to-red-500',
    placeholder: 'Example: "I\'m into indie rock and minimalism. Where should I eat in Brooklyn?"',
    exampleInputs: [
      'Love Ethiopian food and jazz culture, visiting Portland',
      'Vegetarian who enjoys art galleries and poetry',
      'The French Laundry',
      'Eleven Madison Park',
      'Blue Hill at Stone Barns',
      'Into Korean culture and late-night creative work'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default DiningPage;