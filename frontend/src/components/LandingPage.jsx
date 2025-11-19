import React from "react";
import { Link } from "react-router-dom";
import HeroCanvas from "./HeroCanvas";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <nav>
        <div className="nav-links">
          <a href="#">Overview</a>
          <a href="#">Solution</a>
          <a href="#">Resources</a>
        </div>
        <div className="logo">
          <a href="#">
            <img src="/assets/logo.png" alt="Logo" />
          </a>
        </div>
        <div className="nav-buttons">
          <Link to="/auth?mode=login" className="btn primary">
            Login
          </Link>
          <Link to="/auth?mode=signup" className="btn secondary">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero">
        <HeroCanvas />


{/* //////////////////////////////////////////////// */}

        <div className="hero-content">
          <div className="header">
            <h1>One unified workspace to build, test and ship</h1>
            <p>Trusted by</p>
            <div className="client-logos">
              <div className="client-logo">
                <img src="/assets/expensify-logo.png" alt="Expensify" />
              </div>
              <div className="client-logo">
                <img src="/assets/expensify-logo.png" alt="Expensify" />
              </div>
              <div className="client-logo">
                <img src="/assets/expensify-logo.png" alt="Expensify" />
              </div>
              <div className="client-logo">
                <img src="/assets/expensify-logo.png" alt="Expensify" />
              </div>
            </div>
          </div>
        </div>

{/* //////////////////////////////////////////////// */}


        <div className="hero-img-container">
          <div className="hero-img">
            {/* <img src="/assets/img.png" alt="Hero" /> */}
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Join the building faster with Byewind.</h1>
      </section>
    </>
  );
}

export default LandingPage;
