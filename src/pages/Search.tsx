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
  // Fetch real artists from the API
  const artists = await fetchArtists();
  
  // Convert artists to search results format
  const artistResults: SearchResult[] = artists.map(artist => ({
    id: artist.id,
    type: "artist",
    title: artist.name,
    subtitle: "Artist",
    image: artist.image
  }));
  
  // Get mock results for other types
  const mockResults = getMockResults();
  
  // Combine real artists with mock data
  const allResults = [...artistResults, ...mockResults];
  
  // Filter results based on query
  return allResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase()))
  );
};

const SearchResultItem = ({ result }: { result: SearchResult }) => {
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
    <Link to={getLink()} className="flex items-center p-4 hover:bg-vitify-100/50 dark:hover:bg-vitify-800/20 transition-colors">
      <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden mr-4">
        <img 
          src={result.image} 
          alt={result.title}
          className="w-full h-full object-cover"
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
      <div className="ml-4">
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
    setSearchParams({ q: searchTerm });
  };

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
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
      
      const debounceTimer = setTimeout(() => {
        fetchResults();
      }, 300);

      return () => clearTimeout(debounceTimer);
    } else {
      setResults([]);
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
          <SearchBar onSearch={handleSearch} initialValue={query} />
        </div>
        
        {/* Rest of your component remains the same */}
        {query ? (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white mb-8 text-center">
              {isLoading ? "Searching..." : `Results for "${query}"`}
            </h1>
            
            {/* Loading state, results display, and no results state */}
            {/* ... (keep your existing tabbed results display) ... */}
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