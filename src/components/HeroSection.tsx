
import React, { useState, useEffect } from "react";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-vitify-200/30 to-white dark:from-vitify-900/50 dark:to-vitify-950 z-0"></div>
      

      
      <div className="container mx-auto px-6 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-3 py-1 rounded-full bg-vitify-100 dark:bg-vitify-800/40 text-vitify-600 dark:text-vitify-300 text-xs font-medium mb-6 animate-pulse-slow">
              FEATURING TODAY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-vitify-900 dark:text-white">
              Discover Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vitify-700 to-vitify-500 dark:from-vitify-300 dark:to-vitify-500">
                Next Favorite
              </span>
            </h1>
            <p className="text-vitify-600 dark:text-vitify-300 text-lg mb-8 max-w-md">
              Explore the latest trends, news, and charts in the world of music. 
              Find new artists and tracks tailored to your taste.
            </p>
            {/* <div className="flex flex-wrap gap-4">
              <Button className="bg-vitify-900 hover:bg-vitify-800 text-white rounded-full px-6 flex items-center gap-2 transform hover:scale-105 transition-all">
                <Play className="h-5 w-5" />
                Explore Now
              </Button>
              <Button variant="outline" className="rounded-full px-6 border-vitify-300 dark:border-vitify-700 text-vitify-900 dark:text-white hover:bg-vitify-100 dark:hover:bg-vitify-800/40 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Learn More
              </Button>
            </div> */}
          </div>
          
          <div className={`relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="aspect-square rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-vitify-800/40 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000" 
                alt="Music Experience" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2">Weekly Spotlight</h3>
                <p className="text-white/80 text-sm">Discover this week's featured artists and songs</p>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            {/* <div className="absolute -top-6 -right-6 w-32 h-32 rounded-xl glass rotate-12 animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-xl glass-dark -rotate-12 animate-float" style={{animationDelay: "2s"}}></div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
