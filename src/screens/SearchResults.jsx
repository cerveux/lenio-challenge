import React, { useEffect } from 'react'
import { useProvider, useHeroDispatch } from '../context/AppContextProvider';
import { useSearchParams } from "react-router-dom";
import HeroCard from '../components/HeroCard';


const SearchResults = () => {
  const heroesContext = useProvider();
  const fullHeroesList = heroesContext.heroes;
  const queryHeroesList = heroesContext.querySearch;

  const dispatch = useHeroDispatch()

  let [searchParams, setSearchParams] = useSearchParams();
  const queryParams = searchParams.getAll("character")

  

  /* DEUDA TÉCNICA */
  /* const queryParamsComics = searchParams.getAll("comic")
  console.log(queryParamsComics); */
  


  useEffect(()=>{

    dispatch({
      type: "watched"
    })

    const searchResult = fullHeroesList.filter((hero)=>{
      return(
        hero.name.toLowerCase().includes(queryParams)
      )
    })

    dispatch({
      type: 'query param',
      query: searchResult
    })




  },[fullHeroesList, searchParams])

  

  return (
    
    queryHeroesList.length !== 0 &&
    <section className="container mx-auto p-2 flex flex-wrap justify-center max-w-[1200px]">
      {queryHeroesList.map((hero, index) => {
        return (
          <div key={index}>
            <HeroCard index={index} source={'querySearch'} />
          </div>
        );
      })}
    </section>
  )
}

export default SearchResults