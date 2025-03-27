
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Music, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-vitify-950/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <Music className="h-8 w-8 text-vitify-900 dark:text-white transition-transform duration-700 ease-out group-hover:rotate-12" />
            <span className="text-xl font-bold tracking-tight text-vitify-900 dark:text-white">
              VITIFY
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/artists" 
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white transition-colors duration-200"
            >
              Artists
            </Link>
            <Link 
              to="/charts" 
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white transition-colors duration-200"
            >
              Charts
            </Link>
            <Link 
              to="/news" 
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white transition-colors duration-200"
            >
              News
            </Link>
            <Link 
              to="/trends" 
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white transition-colors duration-200"
            >
              Trending
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white hover:bg-vitify-100 dark:hover:bg-vitify-800/30"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-vitify-700 dark:text-vitify-200 hover:text-vitify-900 dark:hover:text-white hover:bg-vitify-100 dark:hover:bg-vitify-800/30"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {showSearch && (
          <div className="mt-4 animate-fade-in">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
