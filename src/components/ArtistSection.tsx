
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { fetchArtists, ArtistListItem } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const ArtistCard = ({ artist }: { artist: ArtistListItem }) => {
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
  const [artists, setArtists] = useState<ArtistListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getArtists = async () => {
      try {
        setLoading(true);
        const data = await fetchArtists();
        setArtists(data);
      } catch (error) {
        console.error('Failed to fetch artists:', error);
        toast({
          title: "Error",
          description: "Failed to load artists. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, [toast]);

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
          {/* <Link 
            to="/artists" 
            className="flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
          >
            View More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link> */}
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl aspect-square mb-3"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistSection;
