
import React from "react";
import { Link } from "react-router-dom";
import { Clock, ChevronRight } from "lucide-react";
import { mockNews } from "@/services/newsService";

const NewsCard = ({ news }) => {
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
