import React from "react";
import { Link } from "react-router-dom";
import "./styles/Landing.css";

export default function Landing() {
  return (
    <body>
      <div className="contenerr">
      <Link to="/home" class="texto">
        <img src="https://i.imgur.com/avg4dfp.png" alt="img" />
      </Link>
        <div class="content">
          <div class="text">
            Se
            <div class="slider">
            <div class="entrenador">Un Entrenador</div>
              <div class="misty">Misty</div>
              <div class="brock">Brock</div>
              <div class="ash">Ash</div>

            </div>
          </div>
          <p>Aprende todo sobre los pokemon</p>
          <Link to="/home" class="texto">
            <button className="btn"> Atrapalos Ya! </button>
          </Link>
        </div>
      </div>
    </body>
  );
}
