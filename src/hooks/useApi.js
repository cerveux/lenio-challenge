import md5 from "md5";
import { useProvider, useHeroDispatch } from "../context/AppContextProvider";
import heroesJson from "./marvel.json"

const baseUrl = "https://gateway.marvel.com/v1/public";
const ts = Date().now;
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const valueToHash = ts + privateKey + publicKey;
const hash = md5(valueToHash);

const query = `apikey=${publicKey}&ts=${ts}&hash=${hash}`;

export function useApi() {

  const dispatch = useHeroDispatch();

  async function get100Heroes(index) {

    
    const charactersUrl = `${baseUrl}/characters?offset=${index}&limit=100&${query}`;
    const heroesCluster = await fetch(charactersUrl)
      .then((res) => res.json())
      .then((response) => response.data.results)
      .then((characters) =>
        characters.filter((character) => {
          //erase unaviable images
          return (
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
          );
        })
      )

    return heroesCluster


  }
  
  function getHeroes(params) {

    const promises = []


    for(let i=0 ; i <= 1550; i += 100){
        promises.push(get100Heroes(i))
    }

    Promise.all(promises)
    .then(results => results.flat())
    .then((characters) =>
        characters.filter((character) => {
          //erase unaviable images
          return (
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
          );
        })
      )
      .then((res) => {
        dispatch({
          type: "added",
          heroes: res,
        });
    })
    .catch((error) => console.log(error));
    
  }

  async function prueba() {
    
    dispatch({
        type: "added",
        heroes: heroesJson.data.results
    })

    /* await fetch(heroesJson)
    .then(res => console.log(res.data.results)) */
    /* await fetch(heroesJson)
      .then((res) => res.json())
      .then((response) => response.data.results)
      .then((characters) =>
        characters.filter((character) => {
          //erase unaviable images
          return (
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" &&
            character.thumbnail.path !==
              "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708"
          );
        })
      )
      .then((res) => {
        dispatch({
          type: "added",
          heroes: res,
        });
      })
      .catch((error) => console.log(error)); */

    return
  }


  
  async function getComics(hero) {
    const comicList = new Promise((resolve, reject) => {
      const comicsUrl = `${baseUrl}/comics?characters=${hero}&orderBy=onsaleDate&${query}`;
      fetch(comicsUrl)
        .then((res) => res.json())
        .then((response) => response.data.results)
        .then((comics) => resolve(comics))
        .catch((error) => reject(error));
    });

    return comicList;
  }


  return { getHeroes, getComics, prueba };
}
