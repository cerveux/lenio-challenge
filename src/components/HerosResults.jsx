import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import { useApi } from "../hooks/useApi";

import { useProvider, useHeroDispatch } from "../context/AppContextProvider";

const HerosResults = ({}) => { 
  const [random, setRandom] = useState(null)

  const heroesContext = useProvider();
  const fullHeroesList = heroesContext.heroes;
  const heroes = heroesContext.paginate;



  const { getHeroes } = useApi();

  const dispatch = useHeroDispatch();

  useEffect(() => {
    heroes.length == 0 &&
    getHeroes()
  }, [])

  useEffect(() => {
    setRandom(Math.floor(Math.random() * heroes.length));
  }, [heroes])
  

  return heroesContext.isFirstVisit ? (
    <section>
      {fullHeroesList.length !== 0 ?
      <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
      

        <h2 className=" text-3xl font-bold mt-10 mb-5">Random Hero</h2>
        
        <HeroCard index={random} source={'heroes'} />

        
        <button 
        className=" bg-red-600 t text-white rounded-lg py-2 px-3 hover:bg-white hover:text-red-600 hover:border-2 border-red-600 duration-200 mt-5 font-bold"
        onClick={()=>{dispatch({type: 'watched'})}}
        >
          Show all heroes
        </button>
      </div>:
      'Loading' }
    </section>
  ) : (
    <section className="container mx-auto p-2 flex flex-wrap justify-center max-w-[1200px]">
      {heroes.map((hero, index) => {
        return (
          <div key={index}>
            <HeroCard index={index} source={'paginate'} />
          </div>
        );
      })}
    </section>
  );
};

export default HerosResults;
