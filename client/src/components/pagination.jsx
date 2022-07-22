import React from "react";
import "./styles/Pagination.css";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers && pageNumbers.map((number) => { return (

              <li className="number" key="num">
                <button className="butn" onClick={() => paginado(number)}>
                  {number}
                </button>
              </li>
              
            );
          })}
      </ul>
    </nav>
  );
}
