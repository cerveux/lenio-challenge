import React from "react";
import '../styles/HeroCard.css'
import Modal from "./Modal";
import { useBool } from "../hooks/useBool";
import { useApi } from "../hooks/useApi";

import { useProvider, useHeroDispatch } from "../context/AppContextProvider";


const HeroCard = ({ index, source }) => {
  const { getComics } = useApi()

  const dispatch = useHeroDispatch();


  const [isOpen, switchModal ] = useBool()

  const heroesContext = useProvider();
  const heroes = heroesContext[source];
  const comics = heroesContext.comics

  const imageSrc = heroes[index].thumbnail.path + "." + heroes[index].thumbnail.extension
  const heroName = heroes[index].name

  const handleOpenModal = ()=>{
    switchModal()
    getComics(heroes[index].id)
    .then(res=>{dispatch({
      type: 'comics',
      comics: (res)
    })})
  }

  return (
    <>
    <div className=" w-64 h-96 bg-black m-3 relative"
    >
        <img src={imageSrc} alt="" srcSet="" className="w-full h-full absolute cursor-pointer" onClick={handleOpenModal}/>
        <div className="absolute bottom-6 left-4 cursor-pointer"
        onClick={switchModal}>
          <p className=" text-xl text-white font-bold hero-name">{heroName}</p>
        </div>
        <div className="favorite-container absolute text-4xl text-white right-2 top-2">
          <i className="lar la-star"></i>
        </div>
        
      </div>
      <Modal isOpen={isOpen} closeModal={switchModal} >
          <div className=" bg-neutral-900  rounded-2xl p-10">
            <h3 className=" text-slate-200 text-center text-2xl font-semibold">{heroName}</h3>
            <h4 className="text-lg font-semibold text-slate-200 text-center">First {comics.length} comics</h4>
            <ul>
            {comics.map((comic, index)=> {
              return (
                
                  <a href={comic.urls[0].url} target="_blank">
                 <li className="list-disc text-slate-200"><p className="">{comic.title}</p> 
                </li></a>
                
                
              
              )

            })}
            </ul>



          </div>
        </Modal>
    </>
      
  );
};

export default HeroCard;
