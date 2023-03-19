import React from "react";
import useStyles from "../../components/style";
import Banner from "./Banner";
import FrontPage from "./Landing";
import { FeaturesSection } from "./FeaturesSection";

const WelcomePage = () => {
  const classes = useStyles();
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
