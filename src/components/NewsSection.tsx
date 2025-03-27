
import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

// Mock data for initial display
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Taylor Swift's 'The Tortured Poets Department' Shatters Streaming Records",
    excerpt: "The singer's latest album has broken multiple streaming records within just 24 hours of release.",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    category: "Album Release",
    date: "2 hours ago"
  },
  {
    id: "2",
    title: "Kendrick Lamar and Drake Feud Intensifies with New Diss Tracks",
    excerpt: "The rap battle between two of hip-hop's biggest stars has reached new heights with the release of multiple diss tracks.",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
    category: "Artist News",
    date: "1 day ago"
  },
  {
    id: "3",
    title: "Coachella 2024 Highlights: The Most Memorable Performances",
    excerpt: "From surprise guest appearances to technical innovations, here are the standout moments from this year's festival.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    category: "Festivals",
    date: "3 days ago"
  }
];

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <div className="group glass-card dark:glass-card-dark rounded-2xl overflow-hidden h-full">
      <div className="aspect-video overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-vitify-100 dark:bg-vitify-800/40 text-vitify-700 dark:text-vitify-300">
            {news.category}
          </span>
          <div className="flex items-center text-vitify-500 dark:text-vitify-400 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{news.date}</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg text-vitify-900 dark:text-white mb-2 line-clamp-2 group-hover:text-vitify-700 dark:group-hover:text-vitify-300 transition-colors duration-200">
          {news.title}
        </h3>
        <p className="text-vitify-600 dark:text-vitify-400 text-sm mb-4 line-clamp-3">
          {news.excerpt}
        </p>
        <Link 
          to={`/news/${news.id}`}
          className="inline-flex items-center text-sm font-medium text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
        >
          Read More
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

const NewsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white">
              Latest News
            </h2>
            <p className="text-vitify-600 dark:text-vitify-400 mt-1">
              Stay updated with the latest in music
            </p>
          </div>
          <Link 
            to="/news" 
            className="flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
          >
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
