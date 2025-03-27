import React, { useState } from "react";
import { Play, Pause, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  rank: number;
  listens: string;
}

// Mock data for initial display
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    rank: 1,
    listens: "1.2B"
  },
  {
    id: "2",
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774",
    rank: 2,
    listens: "980M"
  },
  {
    id: "3",
    title: "Save Your Tears",
    artist: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=774",
    rank: 3,
    listens: "850M"
  },
  {
    id: "4",
    title: "Montero",
    artist: "Lil Nas X",
    cover: "https://images.unsplash.com/photo-1598387900879-a5e77d39c676?q=80&w=774",
    rank: 4,
    listens: "820M"
  },
  {
    id: "5",
    title: "Stay",
    artist: "Kid Laroi & Justin Bieber",
    cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    rank: 5,
    listens: "790M"
  }
];

const ChartItem = ({ track }: { track: Track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="relative group rounded-xl p-3 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 flex items-center gap-4 transition-all duration-300">
      <div className="flex-shrink-0 w-12 text-center flex flex-col justify-center">
        <span className="font-medium text-vitify-500 dark:text-vitify-400 group-hover:opacity-0 transition-opacity duration-200">
          {track.rank}
        </span>
      </div>
      
      <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
        <img 
          src={track.cover} 
          alt={track.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-vitify-900 dark:text-white text-sm truncate">
          {track.title}
        </h3>
        <p className="text-xs text-vitify-600 dark:text-vitify-400 truncate">
          {track.artist}
        </p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-xs">
          <BarChart3 className="h-3 w-3 mr-1" />
          <span>{track.listens}</span>
        </div>
      </div>
    </div>
  );
};

const ChartSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-vitify-50 to-white dark:from-vitify-900/30 dark:to-vitify-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white">
              Charts
            </h2>
            <p className="text-vitify-600 dark:text-vitify-400 mt-1">
              This week's top tracks across genres
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="global" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-vitify-100/70 dark:bg-vitify-800/30 p-1 rounded-full">
              <TabsTrigger 
                value="global" 
                className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
              >
                Global
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
              >
                New Releases
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="global" className="mt-0">
            <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {mockTracks.map((track) => (
                  <ChartItem key={track.id} track={track} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="mt-0">
            <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {mockTracks.slice().reverse().map((track, idx) => (
                  <ChartItem 
                    key={track.id} 
                    track={{...track, rank: idx + 1}} 
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-0">
            <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {mockTracks.slice().sort(() => Math.random() - 0.5).map((track, idx) => (
                  <ChartItem 
                    key={track.id} 
                    track={{...track, rank: idx + 1}} 
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ChartSection;
