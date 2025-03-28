import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, User, Play, Newspaper } from "lucide-react";
import { fetchArtists } from "@/services/api";

interface SearchResult {
  id: string;
  type: "artist" | "track" | "album" | "news";
  title: string;
  subtitle?: string;
  image: string;
}

// Enhanced mock search results
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

const getSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) return [];
  
  try {
    const artists = await fetchArtists();
    const artistResults: SearchResult[] = artists.map(artist => ({
      id: artist.id,
      type: "artist",
      title: artist.name,
      subtitle: "Artist",
      image: artist.image
    }));
    
    const mockResults = getMockResults();
    const allResults = [...artistResults, ...mockResults];
    
    return allResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
    );
  } catch (error) {
    console.error("Search failed:", error);
    return getMockResults().filter(item =>  // Fallback to mock data if API fails
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
    );
  }
};

const SearchResultItem = ({ result }: { result: SearchResult }) => {
  const getIcon = () => {
    switch (result.type) {
      case "artist": return <User className="h-4 w-4" />;
      case "track": return <Play className="h-4 w-4" />;
      case "album": return <Music className="h-4 w-4" />;
      case "news": return <Newspaper className="h-4 w-4" />;
      default: return null;
    }
  };

  const getLink = () => {
    switch (result.type) {
      case "artist": return `/artists/${result.id}`;
      case "track": return `/tracks/${result.id}`;
      case "album": return `/albums/${result.id}`;
      case "news": return `/news/${result.id}`;
      default: return "/";
    }
  };

  return (
    <Link 
      to={getLink()} 
      className="flex items-center p-4 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 transition-colors group"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden mr-4">
        <img 
          src={result.image} 
          alt={result.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-vitify-900 dark:text-white truncate">
          {result.title}
        </h3>
        {result.subtitle && (
          <p className="text-sm text-vitify-600 dark:text-vitify-400 truncate">
            {result.subtitle}
          </p>
        )}
      </div>
      <div className="ml-4 text-vitify-500 dark:text-vitify-400">
        {getIcon()}
      </div>
    </Link>
  );
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (searchTerm: string) => {
    setSearchParams(searchTerm ? { q: searchTerm } : {});
  };

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const data = await getSearchResults(query);
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredResults = {
    all: results,
    artists: results.filter(r => r.type === "artist"),
    tracks: results.filter(r => r.type === "track"),
    albums: results.filter(r => r.type === "album"),
    news: results.filter(r => r.type === "news"),
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={query}
            isLoading={isLoading}
          />
        </div>
        
        {query ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white mb-6 text-center">
              {isLoading ? "Searching..." : results.length ? `Results for "${query}"` : `No results for "${query}"`}
            </h1>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-3 w-3 bg-vitify-300 rounded-full"></div>
                  <div className="h-3 w-3 bg-vitify-300 rounded-full"></div>
                  <div className="h-3 w-3 bg-vitify-300 rounded-full"></div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="flex overflow-x-auto py-2 mb-6">
                  {Object.entries(filteredResults)
                    .filter(([_, items]) => items.length > 0)
                    .map(([type]) => (
                      <TabsTrigger 
                        key={type}
                        value={type}
                        className="capitalize px-4 py-2 text-sm"
                      >
                        {type} ({filteredResults[type as keyof typeof filteredResults].length})
                      </TabsTrigger>
                    ))}
                </TabsList>

                {Object.entries(filteredResults)
                  .filter(([_, items]) => items.length > 0)
                  .map(([type, items]) => (
                    <TabsContent key={type} value={type} className="mt-0">
                      <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-xl shadow-sm">
                        <div className="divide-y divide-vitify-200 dark:divide-vitify-800/40">
                          {items.map(result => (
                            <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
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
                  Try different keywords or check your spelling
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
              Find artists, tracks, albums, and news
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;