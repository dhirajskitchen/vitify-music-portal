import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Taylor Swift Breaks Spotify Record with New Album",
    excerpt: "The pop superstar's latest release has become the most streamed album in a single day on Spotify.",
    date: "May 15, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    category: "Artist News"
  },
  {
    id: "2",
    title: "Grammy Awards Announce Major Category Changes",
    excerpt: "The Recording Academy introduces new rules and categories for the upcoming awards season.",
    date: "May 10, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000",
    category: "Industry News"
  },
  {
    id: "3",
    title: "Vinyl Sales Continue to Grow in Digital Age",
    excerpt: "Physical music formats see resurgence as vinyl records outsell CDs for the 16th consecutive year.",
    date: "May 5, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=774",
    category: "Trends"
  }
];

const NewsCard = ({ news }: { news: NewsItem }) => {
  return (
    <div className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-vitify-100 dark:bg-vitify-800 text-vitify-700 dark:text-vitify-300 mb-3">
          {news.category}
        </span>
        <h3 className="text-xl font-bold text-vitify-900 dark:text-white mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-vitify-600 dark:text-vitify-400 mb-4 line-clamp-2">
          {news.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-vitify-500 dark:text-vitify-400">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{news.readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-vitify-900 dark:text-white">
              Music News
            </h1>
            <p className="text-vitify-600 dark:text-vitify-400 mt-2">
              The latest updates from the music world
            </p>
          </div>
          <Link 
            to="/news/archive" 
            className="flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
          >
            View all news
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((news) => (
            <Link to={`/news/${news.id}`} key={news.id}>
              <NewsCard news={news} />
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-vitify-900 dark:text-white mb-6">
            Trending Stories
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockNews.slice(0, 2).map(news => (
              <div key={`trending-${news.id}`} className="bg-white/70 dark:bg-vitify-900/40 backdrop-blur-sm border border-vitify-200 dark:border-vitify-700/30 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col lg:flex-row">
                <div className="lg:w-1/3 aspect-square lg:aspect-auto overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="lg:w-2/3 p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-vitify-100 dark:bg-vitify-800 text-vitify-700 dark:text-vitify-300 mb-3">
                    {news.category}
                  </span>
                  <h3 className="text-xl font-bold text-vitify-900 dark:text-white mb-2">
                    {news.title}
                  </h3>
                  <p className="text-vitify-600 dark:text-vitify-400 mb-4">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-vitify-500 dark:text-vitify-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{news.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{news.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;