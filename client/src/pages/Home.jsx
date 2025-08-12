import React from "react";
import Hero from "../components/ui/Hero";
import AiTools from "../components/ui/AiTools";
import Testimonial from "../components/ui/Testimonial";
import Plan from "../components/ui/Plan";
import Footer from "../components/ui/Footer";
import Navbar from "../components/layout/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </div>
  );
};

export default Home;
