import React, { useEffect, useState }  from 'react'
import HerosResults from '../components/HerosResults'
import { useProvider, useHeroDispatch } from "../context/AppContextProvider";
import Pagination from '../components/Pagination';

const Home = () => {

  const dispatch = useHeroDispatch();

  const heroesContext = useProvider();
  const heroes = heroesContext.heroes;
  const heroesPage = heroesContext.paginate;

  const heroesPerPage = 100;



  const arraySlicer = (page = 1)=>{
    const lastHeroIndex = page * heroesPerPage;
    const firstHeroIndex = lastHeroIndex - heroesPerPage;
    const currentHeroes = heroes.slice(firstHeroIndex, lastHeroIndex);
    return currentHeroes;

  }

  useEffect(()=>{
    const currentHeroes = arraySlicer()
    dispatch({
      type: "new page",
      paginate: currentHeroes,
    });

  },[heroes] );

  const handleCurrentPage = (page)=>{
    const currentHeroes = arraySlicer(page)
    dispatch({
      type: "new page",
      paginate: currentHeroes,
    });
  }

  return (
    
    <section className='bg-[#f7f8fa] h-screen'>
      <HerosResults hereosResults={heroesPage} />
      {!heroesContext.isFirstVisit && <Pagination heroePerPage={heroesPerPage} handleCurrentPage={handleCurrentPage}/>}
      
    </section>

  )
}

export default Home