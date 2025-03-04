import React from "react";

import FormComponent from "../../components/FormComponent/FormComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
const HomePage = () => {
  return (
    <div className="App">
      <HeaderComponent>
        <>
          <h1 className="hero-main-text">
            Your Journey to Coding Conf 2025 Starts Here!
          </h1>
          <p className="hero-sub-text">
            Secure your spot at next year's biggest coding conference.
          </p>
        </>
      </HeaderComponent>
      <FormComponent />
    </div>
  );
};

export default HomePage;
