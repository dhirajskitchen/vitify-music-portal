
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
            <h3 className="font-semibold text-vitify-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/artists" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Artists
                </Link>
              </li>
              <li>
                <Link 
                  to="/charts" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Charts
                </Link>
              </li>
              <li>
                <Link 
                  to="/news" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-vitify-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-vitify-600 dark:text-vitify-400 hover:text-vitify-900 dark:hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-vitify-900 dark:text-white mb-4">
              Subscribe
            </h3>
            <p className="text-vitify-600 dark:text-vitify-400 text-sm mb-4">
              Stay up to date with the latest music trends and releases.
            </p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-vitify-800/30 border border-vitify-200 dark:border-vitify-700/50 text-vitify-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vitify-300 dark:focus:ring-vitify-600/50 text-sm"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 rounded-lg bg-vitify-900 dark:bg-vitify-700 text-white hover:bg-vitify-800 dark:hover:bg-vitify-600 transition-colors text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-8 border-t border-vitify-200 dark:border-vitify-800 text-center">
          <p className="text-vitify-600 dark:text-vitify-400 text-sm flex justify-center items-center">
            © {new Date().getFullYear()} Vitify. All rights reserved. Made with 
            <Heart className="h-3 w-3 mx-1 text-red-500" /> 
            for music lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
