import React, { useEffect } from 'react'
import { useProvider, useHeroDispatch } from '../context/AppContextProvider';
import { useSearchParams } from "react-router-dom";
import HeroCard from '../components/HeroCard';
import Loading from '../components/Loading';


const SearchResults = () => {
  const heroesContext = useProvider();
  const {heroes, querySearch} = heroesContext;


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

    const searchResult = heroes.filter((hero)=>{
      return(
        hero.name.toLowerCase().includes(queryParams)
      )
    })

    dispatch({
      type: 'query param',
      query: searchResult
    })




  },[heroes, searchParams])

  

  return (
    heroes.length == 0 ?
    <div className="hero-container mx-auto flex content-center justify-center items-center flex-col">
    <Loading />
  
</div>:
    
    querySearch.length !== 0 &&
    <section className="container mx-auto p-2 flex flex-wrap justify-center max-w-[1200px]">
      {querySearch.map((hero, index) => {
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