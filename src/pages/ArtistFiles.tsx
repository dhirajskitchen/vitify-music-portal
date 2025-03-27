
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Share2, Heart, BarChart3, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for artists' files
const artistFiles = {
  "kendrick-lamar": {
    id: "3",
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
  },
  "billie-eilish": {
    id: "4",
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
  }
};

const ArtistFiles = () => {
  const { artist } = useParams<{ artist: string }>();
  const artistData = artist ? artistFiles[artist as keyof typeof artistFiles] : null;
  
  if (!artistData) {
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
            src={artistData.coverImage} 
            alt={artistData.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Artist info section */}
        <div className="container mx-auto px-6 relative z-20 -mt-40">
          <div className="flex flex-col md:flex-row items-end md:items-center gap-8">
            <div className="w-40 h-40 rounded-xl overflow-hidden shadow-xl">
              <img 
                src={artistData.image} 
                alt={artistData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-2">
                {artistData.genre}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {artistData.name}
              </h1>
              <div className="flex items-center text-white/80 text-sm">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>{artistData.monthlyListeners} monthly listeners</span>
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
        <Tabs defaultValue="biography" className="w-full">
          <TabsList className="bg-vitify-100/70 dark:bg-vitify-800/30 p-1 rounded-full mb-8">
            <TabsTrigger 
              value="biography" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Biography
            </TabsTrigger>
            <TabsTrigger 
              value="discography" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Discography
            </TabsTrigger>
            <TabsTrigger 
              value="top-tracks" 
              className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
            >
              Top Tracks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="biography" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-4">
                  About
                </h2>
                <p className="text-vitify-600 dark:text-vitify-400 mb-8 text-lg">
                  {artistData.bio}
                </p>
                
                <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-4">
                  Achievements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {artistData.achievements.map((achievement, index) => (
                    <Card key={index} className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30">
                      <CardContent className="p-4">
                        <p className="text-vitify-800 dark:text-vitify-200">{achievement}</p>
                      </CardContent>
                    </Card>
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
                      src={artistData.discography[0].image} 
                      alt={artistData.discography[0].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-vitify-900 dark:text-white">
                    {artistData.discography[0].title}
                  </h3>
                  <p className="text-sm text-vitify-600 dark:text-vitify-400 mb-2">
                    {artistData.discography[0].type} • {artistData.discography[0].year}
                  </p>
                  <p className="text-sm text-vitify-600 dark:text-vitify-400 mb-4">
                    {artistData.discography[0].description}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="discography" className="mt-0">
            <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-6">
              Discography
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artistData.discography.map((release, index) => (
                <div key={index} className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={release.image} 
                      alt={release.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-vitify-900 dark:text-white text-lg mb-1">
                      {release.title}
                    </h3>
                    <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-sm mb-2">
                      <span>{release.type}</span>
                      <span className="mx-2">•</span>
                      <span>{release.year}</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Music className="h-3 w-3 mr-1" />
                        <span>{release.tracks} tracks</span>
                      </div>
                    </div>
                    <p className="text-sm text-vitify-600 dark:text-vitify-400">
                      {release.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="top-tracks" className="mt-0">
            <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-6">
              Top Tracks
            </h2>
            <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl p-4 shadow-sm">
              <div className="space-y-1">
                {artistData.topTracks.map((track, index) => (
                  <div 
                    key={index}
                    className="group rounded-xl p-3 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 flex items-center gap-4 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 text-center">
                      <span className="font-medium text-vitify-500 dark:text-vitify-400">
                        {index + 1}
                      </span>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ArtistFiles;
