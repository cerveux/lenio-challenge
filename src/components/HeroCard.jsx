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


  
  let imageSrc = heroesToShow[index].thumbnail.path + "." + heroesToShow[index].thumbnail.extension
  imageSrc = imageSrc.substring(0, 4) + "s" + imageSrc.substring(4, imageSrc.length)
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
    .then((comics) =>
    comics.filter((comic) => {
          //erase unaviable images
          return (
            comic.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
              comic.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
          );
        })
      )
    .then(res=>{
      console.log(res);
      dispatch({
      type: 'comics',
      comics: (res)
    })})
  }

  const handleCloseModal = ()=>{
    switchModal()
    dispatch({
      type: 'comics',
      comics: []
    })
  }

  return (
    <>
    <div className=" w-64 h-96 bg-black m-3 relative"
    >
        <img src={imageSrc} alt="" srcSet="" className="w-full h-full absolute cursor-pointer" onClick={handleOpenModal}/>
        <div className="absolute bottom-6 left-4 cursor-pointer"
        onClick={handleOpenModal}>
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
      <Modal isOpen={isOpen} closeModal={handleCloseModal} >
          <div className=" bg-neutral-900  rounded-2xl py-10 px-2 max-h-[90vh] flex flex-col relative  ">
            <h3 className=" text-slate-200 text-center text-2xl font-semibold">{heroName}</h3>
            <h4 className="text-lg font-semibold text-slate-200 text-center">First {comics.length} comics</h4>
            <div className=" h-full flex flex-wrap sm:w-[650px]  overflow-y-auto flex-grow-1">
            {comics.map((comic, index)=> {
              let src = (comic.thumbnail.path+comic.thumbnail.extension);
              src = src.substring(0, 4) + "s" + src.substring(4, imageSrc.length)
              return (
                <li className="comic-container my-3 w-full flex " key={index}>

                  <img src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt="" className=" h-40 w-15 " />
                  <p className=" ml-3 text-slate-200 ">{comic.title}</p>
                </li>
                
                
                
              
              )

            })}
            </div>

            <button className=" absolute right-5 top-5 text-slate-200 text-3xl" onClick={handleCloseModal}> <i className="las la-times-circle"></i> </button>





          </div>
        </Modal>
    </>
      
  );
};

export default HeroCard;
