
import React from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import ArtistSection from "@/components/ArtistSection";
import ChartSection from "@/components/ChartSection";
import NewsSection from "@/components/NewsSection";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ArtistSection />
      <ChartSection />
      <NewsSection />
      <ChatBot />
    </Layout>
  );
};

export default Index;
