import React, { useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  
  useEffect(()=>{
  alert('Please Give me star, after checkig it out');
  },[])
  return (
    <div>
      <div className="navbar-container">
        <div className="proj-branding">
          <p className="projname">V2T.</p>
          <p className="tagline">The Voice To Text Editor</p>
        </div>
        <div className="nav-btns">
          <a target="_blank" href="https://github.com/thaywo/Voice2Text">
            <button className="nbtn">
              Source Code <i class="fi fi-brands-github"></i>
            </button>
          </a>
          <a href="https://www.linkedin.com/in/taiwo-hassan-531919175/" target="_blank">
            <button className="nbtn">
              Follow Me <i class="fi fi-brands-linkedin"></i>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
