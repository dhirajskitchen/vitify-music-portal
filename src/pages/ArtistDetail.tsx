import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Share2, Heart, BarChart3, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for artist detail
const mockArtists = {
  "1": {
    id: "1",
    name: "Taylor Swift",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000",
    genre: "Pop",
    bio: "Taylor Alison Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise and media coverage.",
    monthlyListeners: "85.4M",
    topTracks: [
      { id: "101", title: "Cruel Summer", album: "Lover", plays: "1.2B", duration: "2:58" },
      { id: "102", title: "Anti-Hero", album: "Midnights", plays: "950M", duration: "3:21" },
      { id: "103", title: "Blank Space", album: "1989", plays: "2.1B", duration: "3:51" },
      { id: "104", title: "Shake It Off", album: "1989", plays: "1.8B", duration: "3:39" },
      { id: "105", title: "Love Story", album: "Fearless", plays: "1.5B", duration: "3:55" }
    ],
    albums: [
      { id: "201", title: "The Tortured Poets Department", year: "2024", tracks: 16, image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774" },
      { id: "202", title: "Midnights", year: "2022", tracks: 13, image: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=774" },
      { id: "203", title: "Red (Taylor's Version)", year: "2021", tracks: 30, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774" },
      { id: "204", title: "evermore", year: "2020", tracks: 15, image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774" }
    ]
  },
  "2": {
    id: "2",
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    coverImage: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?q=80&w=1000",
    genre: "R&B",
    bio: "Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism.",
    monthlyListeners: "92.7M",
    topTracks: [
      { id: "106", title: "Blinding Lights", album: "After Hours", plays: "3.5B", duration: "3:20" },
      { id: "107", title: "Save Your Tears", album: "After Hours", plays: "1.8B", duration: "3:35" },
      { id: "108", title: "Starboy", album: "Starboy", plays: "2.2B", duration: "3:50" },
      { id: "109", title: "Die For You", album: "Starboy", plays: "1.6B", duration: "4:20" },
      { id: "110", title: "The Hills", album: "Beauty Behind the Madness", plays: "1.9B", duration: "4:02" }
    ],
    albums: [
      { id: "205", title: "After Hours", year: "2020", tracks: 14, image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000" },
      { id: "206", title: "Starboy", year: "2016", tracks: 18, image: "https://images.unsplash.com/photo-1614613535308-eb5fbd552e8a?q=80&w=774" },
      { id: "207", title: "Beauty Behind the Madness", year: "2015", tracks: 14, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=774" },
      { id: "208", title: "Kiss Land", year: "2013", tracks: 10, image: "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?q=80&w=774" }
    ]
  }
};

const ArtistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const artist = mockArtists[id as keyof typeof mockArtists];
  
  if (!artist) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">Artist not found</h2>
          <p className="mt-4">The artist you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/"
            className="inline-block mt-6 px-6 py-3 bg-vitify-900 dark:bg-vitify-700 text-white rounded-lg hover:bg-vitify-800 dark:hover:bg-vitify-600 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative">
        {/* Hero section with cover image */}
        <div className="h-[40vh] min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-vitify-900/90 z-10"></div>
          <img 
            src={artist.coverImage} 
            alt={artist.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Artist info section */}
        <div className="container mx-auto px-6 relative z-20 -mt-40">
          <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
            <div className="w-40 h-40 rounded-xl overflow-hidden shadow-xl">
              <img 
                src={artist.image} 
                alt={artist.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-2">
                {artist.genre}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {artist.name}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>{artist.monthlyListeners} monthly listeners</span>
              </div>
            </div>
            
            <div className="flex gap-2 md:ml-auto mt-4 md:mt-0">
              <Button variant="outline" className="rounded-full px-6 border-white/30 text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-full px-6 border-white/30 text-white hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-vitify-100/70 dark:bg-vitify-800/30 p-1 rounded-full mb-8">
            <TabsTrigger 
              value="overview" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="tracks" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Top Tracks
            </TabsTrigger>
            <TabsTrigger 
              value="albums" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Albums
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-4">
                  About
                </h2>
                <p className="text-vitify-600 dark:text-vitify-400 mb-6">
                  {artist.bio}
                </p>
                
                <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-4">
                  Popular
                </h2>
                <div className="space-y-2">
                  {artist.topTracks.slice(0, 3).map((track, index) => (
                    <div 
                      key={track.id}
                      className="group rounded-xl p-3 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 flex items-center gap-4 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-8 text-center">
                        <span className="font-medium text-vitify-500 dark:text-vitify-400 group-hover:opacity-0 transition-opacity duration-200">
                          {index + 1}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Play className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />
                        </Button>
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium text-vitify-900 dark:text-white text-sm truncate">
                          {track.title}
                        </h3>
                        <p className="text-xs text-vitify-600 dark:text-vitify-400 truncate">
                          {track.album}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 text-right">
                        <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-xs">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          <span>{track.plays}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-4">
                  Latest Release
                </h2>
                <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img 
                      src={artist.albums[0].image} 
                      alt={artist.albums[0].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-vitify-900 dark:text-white">
                    {artist.albums[0].title}
                  </h3>
                  <p className="text-sm text-vitify-600 dark:text-vitify-400 mb-4">
                    Album • {artist.albums[0].year}
                  </p>
                  <Button className="w-full rounded-full bg-vitify-900 dark:bg-vitify-700 text-white hover:bg-vitify-800 dark:hover:bg-vitify-600 flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Play
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tracks" className="mt-0">
            <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-6">
              Popular Tracks
            </h2>
            <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {artist.topTracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className="group rounded-xl p-3 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 flex items-center gap-4 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 text-center flex flex-col justify-center">
                      <span className="font-medium text-vitify-500 dark:text-vitify-400 group-hover:opacity-0 transition-opacity duration-200">
                        {index + 1}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <Play className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />
                      </Button>
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-vitify-900 dark:text-white text-sm truncate">
                        {track.title}
                      </h3>
                      <p className="text-xs text-vitify-600 dark:text-vitify-400 truncate">
                        {track.album}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-xs">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        <span>{track.plays}</span>
                      </div>
                      
                      <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{track.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="albums" className="mt-0">
            <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-6">
              Albums
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {artist.albums.map((album) => (
                <div key={album.id} className="group">
                  <div className="rounded-2xl overflow-hidden relative aspect-square mb-3 group-hover:shadow-lg transition-all duration-300">
                    <img 
                      src={album.image} 
                      alt={album.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-vitify-900/70 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-4 transition-transform duration-300 transform group-hover:scale-110">
                        <Play className="h-8 w-8 text-white" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-vitify-900 dark:text-white text-base group-hover:text-vitify-700 dark:group-hover:text-vitify-300 transition-colors duration-200">
                    {album.title}
                  </h3>
                  <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-sm">
                    <span>{album.year}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Music className="h-3 w-3 mr-1" />
                      <span>{album.tracks} tracks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ArtistDetail;
