
import axios from 'axios';

// Determine API URL based on environment
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocalhost 
  ? `${window.location.protocol}//${window.location.hostname}:3001/api`
  : `${window.location.protocol}//${window.location.hostname}/api`; // Use same domain in production

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
      // Mock data fallback for production if API is not available
      return [
        {
          id: "kendrick-lamar",
          name: "Kendrick Lamar",
          image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
          genre: "Hip Hop"
        },
        {
          id: "billie-eilish",
          name: "Billie Eilish",
          image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
          genre: "Alternative / Pop"
        }
      ];
    }
  } catch (error) {
    console.error('Error fetching artists:', error);
    // Mock data fallback for production if API is not available
    return [
      {
        id: "kendrick-lamar",
        name: "Kendrick Lamar",
        image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
        genre: "Hip Hop"
      },
      {
        id: "billie-eilish",
        name: "Billie Eilish",
        image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
        genre: "Alternative / Pop"
      }
    ];
  }
};

export const fetchArtistById = async (id: string): Promise<Artist | null> => {
  try {
    const response = await axios.get(`${API_URL}/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching artist with id ${id}:`, error);
    // Mock data fallback for production if API is not available
    if (id === "kendrick-lamar") {
      return {
        id: "kendrick-lamar",
        name: "Kendrick Lamar",
        image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
        coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
        genre: "Hip Hop",
        bio: "Kendrick Lamar Duckworth is an American rapper and songwriter. Known for his progressive musical styles and socially conscious songwriting, he is widely regarded as one of the most influential hip hop artists of his generation.",
        monthlyListeners: "66.8M",
        discography: [
          {
            title: "Mr. Morale & the Big Steppers",
            type: "Album",
            year: "2022",
            description: "Fifth studio album featuring 'N95' and 'Silent Hill'.",
            tracks: 18,
            image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=774"
          },
          {
            title: "DAMN.",
            type: "Album",
            year: "2017",
            description: "Pulitzer Prize-winning album with 'HUMBLE.' and 'LOYALTY.'",
            tracks: 14,
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=774"
          },
          {
            title: "To Pimp a Butterfly",
            type: "Album",
            year: "2015",
            description: "Critically acclaimed album featuring 'Alright' and 'King Kunta'.",
            tracks: 16,
            image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=774"
          }
        ],
        achievements: [
          "17 Grammy Awards",
          "Pulitzer Prize for Music (2018)",
          "Time's 100 most influential people (2016)",
          "Billboard Music Award for Top Rap Artist"
        ],
        topTracks: [
          { title: "HUMBLE.", album: "DAMN.", plays: "1.9B" },
          { title: "Alright", album: "To Pimp a Butterfly", plays: "724M" },
          { title: "N95", album: "Mr. Morale & the Big Steppers", plays: "510M" },
          { title: "DNA.", album: "DAMN.", plays: "830M" },
          { title: "LOYALTY. (feat. Rihanna)", album: "DAMN.", plays: "605M" }
        ]
      };
    } else if (id === "billie-eilish") {
      return {
        id: "billie-eilish",
        name: "Billie Eilish",
        image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
        coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=1000",
        genre: "Alternative / Pop",
        bio: "Billie Eilish Pirate Baird O'Connell is an American singer and songwriter. She first gained public attention in 2015 with her debut single 'Ocean Eyes', which was subsequently released by Darkroom, an imprint of Interscope Records.",
        monthlyListeners: "78.5M",
        discography: [
          {
            title: "HIT ME HARD AND SOFT",
            type: "Album",
            year: "2024",
            description: "Third studio album featuring 'Birds of a Feather' and 'Lunch'.",
            tracks: 10,
            image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774"
          },
          {
            title: "Happier Than Ever",
            type: "Album",
            year: "2021",
            description: "Second studio album featuring the title track and 'NDA'.",
            tracks: 16,
            image: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=774"
          },
          {
            title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
            type: "Album",
            year: "2019",
            description: "Breakthrough debut album with 'Bad Guy' and 'Bury a Friend'.",
            tracks: 14,
            image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774"
          }
        ],
        achievements: [
          "9 Grammy Awards",
          "Two Academy Awards (Oscars)",
          "Three Billboard Music Awards",
          "Golden Globe Award for Best Original Song"
        ],
        topTracks: [
          { title: "bad guy", album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", plays: "2.4B" },
          { title: "Happier Than Ever", album: "Happier Than Ever", plays: "1.2B" },
          { title: "lovely (with Khalid)", album: "Single", plays: "1.8B" },
          { title: "when the party's over", album: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", plays: "1.3B" },
          { title: "Birds of a Feather", album: "HIT ME HARD AND SOFT", plays: "640M" }
        ]
      };
    }
    return null;
  }
};
