
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Play } from "lucide-react";

interface TrendingItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  category: "song" | "album";
  trending: number; // percentage increase
}

// Mock data for initial display
const mockTrending: TrendingItem[] = [
  {
    id: "1",
    title: "Renaissance",
    artist: "Beyoncé",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774",
    category: "album",
    trending: 85
  },
  {
    id: "2",
    title: "Flowers",
    artist: "Miley Cyrus",
    image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
    category: "song",
    trending: 73
  },
  {
    id: "3",
    title: "Endless Summer Vacation",
    artist: "Miley Cyrus",
    image: "https://images.unsplash.com/photo-1623188313047-78a853bb2cd9?q=80&w=774",
    category: "album",
    trending: 67
  },
  {
    id: "4",
    title: "Kill Bill",
    artist: "SZA",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    category: "song",
    trending: 62
  }
];

const TrendingCard = ({ item }: { item: TrendingItem }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-vitify-900/80 to-transparent z-10"></div>
      
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
          <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
          <span>+{item.trending}%</span>
        </div>
      </div>
      
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-transform duration-300 transform group-hover:scale-110">
          <Play className="h-8 w-8 text-white" />
        </button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="mb-1">
          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white capitalize">
            {item.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-vitify-100 transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-sm text-white/80">
          {item.artist}
        </p>
      </div>
    </div>
  );
};

const TrendingSection = () => {
  return (
    <section className="py-16 bg-vitify-50 dark:bg-vitify-900/20">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white">
              Trending
            </h2>
            <p className="text-vitify-600 dark:text-vitify-400 mt-1">
              What's hot in music right now
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockTrending.map((item) => (
            <TrendingCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
