import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// For the specific domain pages (e.g., /music, /travel)
export const generateRecommendations = async (userInput: string, domain: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommendations`, {
      userInput,
      domain
    });
    // --- CRITICAL FIX HERE ---
    return response.data.recommendations; // Changed from 'recommendation' (singular) to 'recommendations' (plural)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
        throw new Error('Unable to connect to server. Please ensure the backend is running on port 3001.');
      }
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        throw new Error(`Server error: ${error.response.data?.error || error.response.statusText || 'Unknown server error'}`);
      }
    }
    console.error('API Error:', error);
    throw new Error('Failed to generate recommendations. Please try again.');
  }
};

// For the Home page (general recommendations)
export const generateGeneralRecommendation = async (userInput: string): Promise<string> => {
  return generateRecommendations(userInput, 'general'); // Pass 'general' as the domain
};