import React, { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import { useProvider, useHeroDispatch } from "../context/AppContextProvider";
import Loading from "./Loading";

const HerosResults = ({}) => { 

  const heroesContext = useProvider();
  const { heroes, paginate, isFirstVisit, favorites, isFavorite, random } = heroesContext;

  const dispatch = useHeroDispatch();

  const handleFavorites = ()=>{
    if(isFavorite){
      return favorites
    }else{
      return paginate
    }
  }

  return isFirstVisit ? (
    <section>
      {random.length !== 0 ?
      <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
      

        <h2 className=" text-3xl font-bold mt-10 mb-5">Random Hero</h2>
        
        <HeroCard index={0} source={'random'} />

        
        <button 
        className=" bg-red-600 t text-white rounded-lg py-2 px-3 hover:bg-white hover:text-red-600 hover:border-2 border-red-600 duration-200 mt-5 font-bold"
        onClick={()=>{dispatch({type: 'watched'})}}
        >
          Show all heroes
        </button>
      </div>:
      <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
        <Loading /> 
      
    </div>
        }
    </section>
  ) : (
    heroes.length !== 0?
    <section className="container mx-auto p-2 flex flex-wrap justify-center max-w-[1200px]">


      {handleFavorites().map((hero, index) => {
        return (
          <div key={index}>
            <HeroCard index={index} source={isFavorite? 'favorites':'paginate'} />
          </div>
        );
      })}
    </section>:
    <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
    <Loading /> 
  
</div>
  );
};

export default HerosResults;