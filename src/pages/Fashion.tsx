import React from 'react';
import { Shirt } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const FashionPage: React.FC = () => {
  const domain = {
    title: 'Fashion',
    icon: Shirt,
    description: 'Express your identity through style that reflects your essence',
    color: 'from-pink-500 to-rose-500',
    placeholder: 'Example: "I dress like Solange and love sci-fi films, looking for sustainable brands..."',
    exampleInputs: [
      'Inspired by 90s hip-hop and minimal Japanese design',
      'Love vintage finds and indie music aesthetics',
      'Chanel',
      'Nike',
      'Zara',
      'Into sustainable fashion and earthy tones'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default FashionPage;