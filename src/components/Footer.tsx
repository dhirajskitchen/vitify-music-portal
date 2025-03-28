
import React from "react";
import { Link } from "react-router-dom";
import { Music, Instagram, Twitter, Youtube, Facebook, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-vitify-100 dark:bg-vitify-900/40 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Music className="h-6 w-6 text-vitify-900 dark:text-white" />
              <span className="text-lg font-bold text-vitify-900 dark:text-white">
                VITIFY
              </span>
            </Link>
            <p className="text-vitify-600 dark:text-vitify-400 text-sm mb-4">
              Your ultimate music discovery platform. Find new artists, tracks, and stay updated with the latest trends.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href="#" 
                className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a 
                href="#" 
                className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a 
                href="#" 
                className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          
          
                    <div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-vitify-200 dark:border-vitify-800 text-center">
          <p className="text-vitify-600 dark:text-vitify-400 text-sm flex justify-center items-center">
            © {new Date().getFullYear()} Vitify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
