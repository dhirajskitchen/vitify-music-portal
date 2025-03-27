
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative transition-all duration-300 ${
        isFocused ? "scale-105" : "scale-100"
      }`}
    >
      <div className="relative">
        <Search 
          className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
            isFocused 
              ? "text-vitify-900 dark:text-white" 
              : "text-vitify-500 dark:text-vitify-400"
          }`} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search artists, songs, or news..."
          className="w-full pl-12 pr-12 py-3 rounded-full bg-vitify-100/70 dark:bg-vitify-800/30 
                    border border-vitify-200 dark:border-vitify-700/50 backdrop-blur-sm
                    placeholder:text-vitify-500 dark:placeholder:text-vitify-500
                    focus:outline-none focus:ring-2 focus:ring-vitify-300 dark:focus:ring-vitify-600/50
                    text-vitify-900 dark:text-white transition-all duration-300"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-vitify-500 dark:text-vitify-400 
                      hover:text-vitify-900 dark:hover:text-white transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
