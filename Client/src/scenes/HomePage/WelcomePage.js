import React from "react";
import Banner from "./Banner";
import FrontPage from "./Landing";
import FeaturesSection from "./FeaturesSection";



const WelcomePage = () => {
  return (
    <main>
      <div>
        <FrontPage />
        <Banner />
        <FeaturesSection />
      </div>
    </main>
  );
};

export default WelcomePage;
