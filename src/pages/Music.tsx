import React from 'react';
import { Music } from 'lucide-react';
import DomainPage from '../components/DomainPage';

const MusicPage: React.FC = () => {
  const domain = {
    title: 'Music',
    icon: Music,
    description: 'Discover sounds that resonate with your soul and cultural DNA',
    color: 'from-purple-500 to-pink-500',
    placeholder: 'Example: "I like Sampha and FKA twigs, want chill songs for late-night creative sessions..."',
    exampleInputs: [
      'I love Solange and jazz, looking for creative inspiration',
      'Into indie rock and minimalism, planning a road trip',
      'Beyoncé',
      'Ed Sheeran',
      'Kirk Franklin',
      'Feeling nostalgic, I grew up with 90s R&B'
    ]
  };

  return <DomainPage domain={domain} />;
};

export default MusicPage;