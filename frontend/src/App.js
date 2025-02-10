import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import CallToAction from "./components/CallToAction";
import EVMap from "./components/EvMap";

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <HeroSection />
            <Features />
            <EVMap />
            <CallToAction />
        </AuthProvider>
    );
}

export default App;
