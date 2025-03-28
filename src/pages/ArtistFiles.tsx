
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Share2, Heart, BarChart3, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { fetchArtistById, Artist } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const ArtistFiles = () => {
  const { artist } = useParams<{ artist: string }>();
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const getArtistData = async () => {
      if (!artist) return;
      
      try {
        setLoading(true);
        const data = await fetchArtistById(artist);
        setArtistData(data);
        
        if (!data) {
          toast({
            title: "Artist not found",
            description: "The requested artist could not be found.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
        toast({
          title: "Error",
          description: "Failed to load artist data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    getArtistData();
  }, [artist, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-32">
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="w-60 h-10 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-8"></div>
            <div className="w-full max-w-3xl h-80 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </Layout>
    );
  }

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
                  {artistData.discography.length > 0 && (
                    <>
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
                    </>
                  )}
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
