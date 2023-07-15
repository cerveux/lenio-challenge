import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import { useApi } from "../hooks/useApi";

import { useProvider, useTasksDispatch } from "../context/AppContextProvider";

const HerosResults = () => {
  const [random, setRandom] = useState(null)

  const heroesContext = useProvider();

  const heroes = heroesContext.heroes;


  const { getHeroes } = useApi();

  const dispatch = useTasksDispatch();

  useEffect(() => {
    getHeroes().then((res)=> {dispatch({
      type: 'added',
      heroes: (res)
    })
    setRandom(Math.floor(Math.random() * res.length))}
    )


    

  }, [])

  return heroesContext.isFirstVisit ? (
    <section>
      {random !== null ?
      <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
      

        <h2 className=" text-3xl font-bold mt-10 mb-5">Random Hero</h2>
        
        <HeroCard
        image={heroes[random].thumbnail.path + "." + heroes[random].thumbnail.extension}
        name={heroes[random].name}
      />

        
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
      {heroes.map((heroe, index) => {
        return (
          <div key={index}>
            <HeroCard
              image={heroe.thumbnail.path + "." + heroe.thumbnail.extension}
              name={heroe.name}
            />
          </div>
        );
      })}
    </section>
  );
};

export default HerosResults;
