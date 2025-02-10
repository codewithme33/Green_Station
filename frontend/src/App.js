import React from "react";
/* import { BrowserRouter as Router } from "react-router-dom"; */
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import EVMap from "./components/EvMap";
/* import './styles/styles.css'; */

function App() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <EVMap />
      <CallToAction />
    </>
  );
}

export default App;
