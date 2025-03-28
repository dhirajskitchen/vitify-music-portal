
import axios from 'axios';

// Update the API URL to use the current domain (rather than localhost)
const API_URL = `${window.location.protocol}//${window.location.hostname}:3001/api`;

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
    const response = await axios.get(`${API_URL}/artists`);
    return response.data;
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
