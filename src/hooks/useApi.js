import response from "./marvel.json";
import md5 from "md5";
import { useProvider, useHeroDispatch } from "../context/AppContextProvider";

const baseUrl = "https://gateway.marvel.com/v1/public";
const ts = "36f1ecebe070175ad956f71b779e635c";
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const valueToHash = ts + privateKey + publicKey;
/* const hash = md5(valueToHash); */
const hash = "8ff18f36cec2f49104d435d5c2edd039";
const query = `apikey=${publicKey}&ts=${ts}&hash=${hash}`;
/* console.log(import.meta.env); */

/* const queryString = `?ts=${timestamp}&apikey=${publickKey}&hash=${hash}`;
const url = baseUrl + queryString;
console.log(hash);
 */
export function useApi() {

  const dispatch = useHeroDispatch();

  async function getHeroes() {
    const randomIndex = Math.floor(Math.random() * 1461);
    const charactersUrl = `${baseUrl}/characters?offset=${randomIndex}&limit=100&${query}`;
    await fetch(charactersUrl)
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
      .catch((error) => console.log(error));
    

    console.log("una llamada");

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

  async function prueba(params) {
    
  }

  return { getHeroes, getComics, prueba };
}
