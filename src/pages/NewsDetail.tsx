
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Mock news data - in a real app this would come from an API
const mockNewsDetails = [
  {
    id: "1",
    title: "Taylor Swift's 'The Tortured Poets Department' Shatters Streaming Records",
    content: `
      <p>Taylor Swift's latest album "The Tortured Poets Department" has broken multiple streaming records within just 24 hours of its release, cementing her status as one of the most influential artists in the music industry today.</p>
      
      <p>The album, which features 16 tracks and a surprise "double album" with an additional 15 songs, achieved over 200 million streams on Spotify in its first day, setting a new record for the platform. This surpasses the previous record held by Bad Bunny's "Un Verano Sin Ti."</p>
      
      <p>Industry analysts note that Swift's approach to album releases, which often includes elaborate storytelling and hidden messages for fans, has created a new standard for artist engagement in the streaming era. "What we're seeing is not just about the music, but about creating an event that brings fans together," says music industry expert Lisa Johnson.</p>
      
      <p>The album's success also highlights Swift's continued relevance and ability to evolve her sound while maintaining her dedicated fanbase. With collaborations featuring Post Malone and Florence + The Machine, Swift demonstrates her versatility and willingness to experiment with different styles.</p>
      
      <p>Critics have praised the album for its lyrical depth and production quality. Rolling Stone called it "a masterclass in songwriting," while Pitchfork noted its "remarkable cohesion despite its ambitious length."</p>
    `,
    image: "https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=774",
    coverImage: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=3880",
    category: "Album Release",
    date: "April 28, 2024",
    author: "Music Insights Team",
    tags: ["Taylor Swift", "New Release", "Streaming Records", "Pop Music"]
  },
  {
    id: "2",
    title: "Kendrick Lamar and Drake Feud Intensifies with New Diss Tracks",
    content: `
      <p>The rap battle between two of hip-hop's biggest stars, Kendrick Lamar and Drake, has reached new heights with the release of multiple diss tracks from both artists in recent weeks.</p>
      
      <p>The feud, which has been simmering for years with subtle jabs in various songs, erupted publicly when Lamar released "Not Like Us," directly calling out Drake on several issues. Drake quickly responded with "Push Ups," setting off a series of increasingly personal exchanges.</p>
      
      <p>Hip-hop historians are already calling this one of the most significant rap battles in recent memory, comparable to classic feuds like Nas vs. Jay-Z or 2Pac vs. Notorious B.I.G. "What makes this particularly interesting is the stature of both artists," explains hip-hop journalist Marcus Thompson. "These are two of the most commercially successful and critically acclaimed rappers of their generation."</p>
      
      <p>The impact has extended beyond music, with social media divided into team Kendrick and team Drake, and numerous other artists weighing in on the situation. Streaming numbers for both artists have surged dramatically since the battle began.</p>
      
      <p>Some critics argue that the battle has overshadowed actual musical innovation, while others see it as part of hip-hop's competitive tradition that pushes artists to sharpen their skills and creativity.</p>
    `,
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=1000",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3543",
    category: "Artist News",
    date: "April 27, 2024",
    author: "Hip-Hop Culture Desk",
    tags: ["Kendrick Lamar", "Drake", "Rap Battle", "Hip-Hop"]
  },
  {
    id: "3",
    title: "Coachella 2024 Highlights: The Most Memorable Performances",
    content: `
      <p>Coachella 2024 has wrapped up after two spectacular weekends in the California desert, leaving music fans with countless memorable moments from the world's most influential music festival.</p>
      
      <p>This year's festival featured groundbreaking headline performances from Lana Del Rey, Tyler, The Creator, and Doja Cat, each bringing unique visual productions that pushed the boundaries of live music performance. Tyler, The Creator's set was particularly praised for its theatrical elements and narrative structure.</p>
      
      <p>Beyond the headliners, surprise guest appearances delighted festival-goers throughout both weekends. Billie Eilish joined Lana Del Rey for a haunting duet, while Bad Bunny brought out several Latin music stars during his high-energy set. Perhaps the most talked-about moment was the surprise reunion of an iconic rock band during Doja Cat's set, sending social media into a frenzy.</p>
      
      <p>Technical innovations were also at the forefront this year, with several artists incorporating augmented reality elements that audience members could experience through the festival app. "We're seeing the future of live music performance," noted tech analyst Emma Roberts. "The line between physical and digital experiences is blurring in exciting ways."</p>
      
      <p>Environmental initiatives were stronger than ever, with the festival reporting a significant reduction in waste compared to previous years. The expanded use of renewable energy sources to power stages also marked a step forward in making large-scale music events more sustainable.</p>
    `,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=3570",
    category: "Festivals",
    date: "April 25, 2024",
    author: "Festival Coverage Team",
    tags: ["Coachella", "Music Festival", "Live Music", "Concerts"]
  }
];

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const newsItem = mockNewsDetails.find(item => item.id === id);
  
  if (!newsItem) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-vitify-900 dark:text-white mb-4">
              News article not found
            </h1>
            <p className="text-vitify-600 dark:text-vitify-400 mb-6">
              The news article you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-transparent z-10"></div>
        <div 
          className="w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${newsItem.coverImage})` }}
        ></div>
        <div className="container mx-auto px-6 absolute bottom-8 left-0 right-0 z-20">
          <div className="inline-block bg-vitify-100 dark:bg-vitify-800/40 text-vitify-700 dark:text-vitify-300 text-sm px-4 py-1 rounded-full mb-4">
            {newsItem.category}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
            {newsItem.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-white/80">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{newsItem.date}</span>
            </div>
            <div>By {newsItem.author}</div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <article className="prose dark:prose-invert prose-lg max-w-none mb-12" 
              dangerouslySetInnerHTML={{ __html: newsItem.content }}>
            </article>
            
            <div className="flex flex-wrap gap-2 mb-12">
              {newsItem.tags.map(tag => (
                <div key={tag} className="flex items-center bg-vitify-100 dark:bg-vitify-800/40 text-vitify-700 dark:text-vitify-300 px-3 py-1 rounded-full text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </div>
          
          <div className="lg:col-span-4">
            <h3 className="text-xl font-semibold text-vitify-900 dark:text-white mb-6">
              More News
            </h3>
            <div className="space-y-4">
              {mockNewsDetails
                .filter(item => item.id !== id)
                .map(item => (
                  <Card key={item.id} className="glass-card dark:glass-card-dark overflow-hidden">
                    <Link to={`/news/${item.id}`} className="block group">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-vitify-100 dark:bg-vitify-800/40 text-vitify-700 dark:text-vitify-300">
                            {item.category}
                          </span>
                          <div className="flex items-center text-vitify-500 dark:text-vitify-400 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                        <h4 className="font-medium text-vitify-900 dark:text-white text-base line-clamp-2 group-hover:text-vitify-700 dark:group-hover:text-vitify-300 transition-colors duration-200">
                          {item.title}
                        </h4>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
