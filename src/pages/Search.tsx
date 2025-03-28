import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, User, Music, Newspaper, Clock } from "lucide-react";
import { fetchArtists, ArtistListItem } from "@/services/api";

interface SearchResult {
  id: string;
  type: "artist" | "track" | "album" | "news";
  title: string;
  subtitle?: string;
  image: string;
}

// Mock search results for tracks, albums, and news
const getMockResults = (): SearchResult[] => {
  return [
    {
      id: "101",
      type: "track",
      title: "Cruel Summer",
      subtitle: "Taylor Swift • Lover",
      image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774"
    },
    {
      id: "201",
      type: "album",
      title: "The Tortured Poets Department",
      subtitle: "Taylor Swift • 2024",
      image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774"
    },
    {
      id: "106",
      type: "track",
      title: "Blinding Lights",
      subtitle: "The Weeknd • After Hours",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000"
    },
    {
      id: "1",
      type: "news",
      title: "Taylor Swift's 'The Tortured Poets Department' Shatters Streaming Records",
      subtitle: "2 hours ago",
      image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774"
    }
  ];
};

// Get search results function that combines API artists with mock data
const getSearchResults = async (query: string): Promise<SearchResult[]> => {
  try {
    // Fetch real artists from the API
    const artists = await fetchArtists();
    console.log("Artists fetched for search:", artists);
    
    // Convert artists to search results format (ensure artists is always an array)
    const artistResults: SearchResult[] = Array.isArray(artists) 
      ? artists.map(artist => ({
          id: artist.id,
          type: "artist",
          title: artist.name,
          subtitle: "Artist",
          image: artist.image
        }))
      : [];
    
    // Get mock results for other types
    const mockResults = getMockResults();
    
    // Combine real artists with mock data
    const allResults = [...artistResults, ...mockResults];
    
    // Filter results based on query
    return allResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error("Error in getSearchResults:", error);
    // Return mock data in case of an error
    return getMockResults();
  }
};

const SearchResultItem = ({ result }: { result: SearchResult }) => {
  // Get icon based on type
  const getIcon = () => {
    switch (result.type) {
      case "artist":
        return <User className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />;
      case "track":
        return <Play className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />;
      case "album":
        return <Music className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />;
      case "news":
        return <Newspaper className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />;
      default:
        return null;
    }
  };
  
  // Get link based on type
  const getLink = () => {
    switch (result.type) {
      case "artist":
        return `/artists/${result.id}`;
      case "track":
        return `/tracks/${result.id}`;
      case "album":
        return `/albums/${result.id}`;
      case "news":
        return `/news/${result.id}`;
      default:
        return "/";
    }
  };
  
  return (
    <Link 
      to={getLink()}
      className="flex items-center gap-4 p-4 rounded-xl hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 transition-colors duration-200 group"
    >
      <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
        <img 
          src={result.image} 
          alt={result.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {result.type === "track" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Play className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-vitify-900 dark:text-white text-base truncate group-hover:text-vitify-700 dark:group-hover:text-vitify-300 transition-colors duration-200">
          {result.title}
        </h3>
        <div className="flex items-center text-vitify-600 dark:text-vitify-400 text-sm">
          {getIcon()}
          <span className="ml-1 truncate">{result.subtitle}</span>
        </div>
      </div>
      
      {result.type === "news" && (
        <div className="flex-shrink-0 flex items-center text-vitify-500 dark:text-vitify-400 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>{result.subtitle}</span>
        </div>
      )}
    </Link>
  );
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      // Use the async function to get search results
      const fetchResults = async () => {
        try {
          const data = await getSearchResults(query);
          setResults(data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchResults();
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);
  
  // Filter results by type
  const artists = results.filter(result => result.type === "artist");
  const tracks = results.filter(result => result.type === "track");
  const albums = results.filter(result => result.type === "album");
  const news = results.filter(result => result.type === "news");

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>
        
        {query ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white mb-8 text-center">
              {isLoading ? "Searching..." : `Results for "${query}"`}
            </h1>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 bg-vitify-700 dark:bg-vitify-300 rounded-full animate-bounce"></div>
                  <div className="h-3 w-3 bg-vitify-700 dark:bg-vitify-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-3 w-3 bg-vitify-700 dark:bg-vitify-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-center mb-6">
                  <TabsList className="bg-vitify-100/70 dark:bg-vitify-800/30 p-1 rounded-full">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
                    >
                      All
                    </TabsTrigger>
                    {artists.length > 0 && (
                      <TabsTrigger 
                        value="artists" 
                        className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
                      >
                        Artists
                      </TabsTrigger>
                    )}
                    {tracks.length > 0 && (
                      <TabsTrigger 
                        value="tracks" 
                        className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
                      >
                        Tracks
                      </TabsTrigger>
                    )}
                    {albums.length > 0 && (
                      <TabsTrigger 
                        value="albums" 
                        className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
                      >
                        Albums
                      </TabsTrigger>
                    )}
                    {news.length > 0 && (
                      <TabsTrigger 
                        value="news" 
                        className="rounded-full px-6 text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-vitify-700 data-[state=active]:text-vitify-900 dark:data-[state=active]:text-white"
                      >
                        News
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>
                
                <TabsContent value="all" className="mt-0">
                  <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl shadow-sm">
                    <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                      {results.map((result) => (
                        <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="artists" className="mt-0">
                  <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl shadow-sm">
                    <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                      {artists.map((result) => (
                        <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tracks" className="mt-0">
                  <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl shadow-sm">
                    <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                      {tracks.map((result) => (
                        <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="albums" className="mt-0">
                  <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl shadow-sm">
                    <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                      {albums.map((result) => (
                        <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="news" className="mt-0">
                  <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-2xl shadow-sm">
                    <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                      {news.map((result) => (
                        <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vitify-100 dark:bg-vitify-800/30 mb-4">
                  <Music className="h-8 w-8 text-vitify-700 dark:text-vitify-300" />
                </div>
                <h2 className="text-xl font-semibold text-vitify-900 dark:text-white mb-2">
                  No results found
                </h2>
                <p className="text-vitify-600 dark:text-vitify-400 max-w-md mx-auto">
                  We couldn't find anything matching "{query}". Try different keywords or check the spelling.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-vitify-100 dark:bg-vitify-800/30 mb-4">
              <Music className="h-8 w-8 text-vitify-700 dark:text-vitify-300" />
            </div>
            <h2 className="text-xl font-semibold text-vitify-900 dark:text-white mb-2">
              Search for music
            </h2>
            <p className="text-vitify-600 dark:text-vitify-400 max-w-md mx-auto">
              Find your favorite artists, tracks, albums, and news by entering a search term above.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
