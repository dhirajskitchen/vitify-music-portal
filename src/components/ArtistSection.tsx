
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  filePath?: string;
}

// Mock data for initial display
const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Taylor Swift",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    genre: "Pop"
  },
  {
    id: "2",
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    genre: "R&B"
  },
  {
    id: "3",
    name: "Kendrick Lamar",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
    genre: "Hip Hop",
    filePath: "/artist-files/kendrick-lamar"
  },
  {
    id: "4",
    name: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
    genre: "Alternative",
    filePath: "/artist-files/billie-eilish"
  }
];

const ArtistCard = ({ artist }: { artist: Artist }) => {
  return (
    <div className="group">
      <Link to={artist.filePath || `/artists/${artist.id}`} className="block">
        <div className="rounded-2xl overflow-hidden relative aspect-square mb-3 group-hover:shadow-lg transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-vitify-900/70 via-transparent to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white mb-2">
              {artist.genre}
            </span>
          </div>
        </div>
        <h3 className="font-semibold text-lg text-vitify-900 dark:text-white mb-1 group-hover:text-vitify-700 dark:group-hover:text-vitify-300 transition-colors duration-200">
          {artist.name}
        </h3>
        <p className="text-sm text-vitify-600 dark:text-vitify-400">
          Artist
        </p>
      </Link>
    </div>
  );
};

const ArtistSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white">
              Popular Artists
            </h2>
            <p className="text-vitify-600 dark:text-vitify-400 mt-1">
              Discover top artists from various genres
            </p>
          </div>
          <Link 
            to="/artists" 
            className="flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
          >View More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;
