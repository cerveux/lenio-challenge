import React, { useState, useEffect } from "react";
import '../styles/HeroCard.css'
import Modal from "./Modal";
import { useBool } from "../hooks/useBool";
import { useApi } from "../hooks/useApi";

import { useProvider, useHeroDispatch } from "../context/AppContextProvider";


const HeroCard = ({ index, source }) => {
  const { getComics } = useApi()

  const dispatch = useHeroDispatch();


  const [isOpen, switchModal ] = useBool()
  const [star, setStar] = useState(false)

  const heroesContext = useProvider();
  const heroesToShow = heroesContext[source];
  const {comics, heroes} = heroesContext


  
  const imageSrc = heroesToShow[index].thumbnail.path + "." + heroesToShow[index].thumbnail.extension
  const heroName = heroesToShow[index].name
  const id = heroesToShow[index].id
  
  const handleFavorite = ()=>{
    setStar(!star)
 
    const retString = localStorage.getItem('lenio');
    const retArray = JSON.parse(retString)

    if(retArray.includes(id)){
      const newFavoriteArray = retArray.filter((value)=>{
        return value !== id
      })
      const string = JSON.stringify(newFavoriteArray)
      localStorage.setItem('lenio', string)
      const favoriteCharacters = heroes.filter((character)=>{
        return newFavoriteArray.includes(character.id)

      })
      dispatch({
        type: "favorite list",
        favorites: favoriteCharacters
      })

    }else{
      retArray.push(id)
      const string = JSON.stringify(retArray)
      localStorage.setItem('lenio', string)
      const favoriteCharacters = heroes.filter((character)=>{
        return retArray.includes(character.id)
  
      })
      dispatch({
        type: "favorite list",
        favorites: favoriteCharacters
      })
      
    }

  }






  useEffect(()=>{
    const retString = localStorage.getItem('lenio');
    const retArray = JSON.parse(retString)
    setStar(retArray.includes(id))

  },[id])

  const checkFavorite = ()=>{
    const retString = localStorage.getItem('lenio');
    const retArray = JSON.parse(retString)

    return retArray.includes(id)
  }

  const handleOpenModal = ()=>{
    switchModal()
    getComics(heroesToShow[index].id)
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
          <button onClick={handleFavorite}>
            {star?
          <i className="las la-star text-amber-400"></i>:
          <i className="lar la-star"></i>
            }
          </button>
        </div>
        
      </div>
      <Modal isOpen={isOpen} closeModal={switchModal} >
          <div className=" bg-neutral-900  rounded-2xl p-10">
            <h3 className=" text-slate-200 text-center text-2xl font-semibold">{heroName}</h3>
            <h4 className="text-lg font-semibold text-slate-200 text-center">First {comics.length} comics</h4>
            <ul>
            {comics.map((comic, index)=> {
              return (
                
                  <a href={comic.urls[0].url} target="_blank" key={index}>
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
