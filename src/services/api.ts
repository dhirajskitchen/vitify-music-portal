
import axios from 'axios';

// Use the same domain but without specifying port for production
// In development, we would use port 3001
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocalhost 
  ? `${window.location.protocol}//${window.location.hostname}:3001/api`
  : '/api'; // In production, use a relative path that will be handled by the same domain

export interface ArtistListItem {
  id: string;
  name: string;
  image: string;
  genre: string;
  filePath?: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  genre: string;
  bio: string;
  monthlyListeners: string;
  discography: Discography[];
  achievements: string[];
  topTracks: Track[];
}

export interface Discography {
  title: string;
  type: string;
  year: string;
  description: string;
  tracks: number;
  image: string;
}

export interface Track {
  title: string;
  album: string;
  plays: string;
}

export const fetchArtists = async (): Promise<ArtistListItem[]> => {
  try {
    console.log("Fetching artists from:", API_URL);
    const response = await axios.get(`${API_URL}/artists`);
    console.log("Artists API response:", response.data);
    
    // Ensure we're returning an array, even if the API returns something unexpected
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API response is not an array:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
};

export const fetchArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const response = await axios.get(`${API_URL}/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching artist with id ${id}:`, error);
    return null;
  }
};
