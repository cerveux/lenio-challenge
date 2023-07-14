import response from './marvel.json'
import md5 from 'md5';

const baseUrl = 'https://gateway.marvel.com/v1/public';
const ts = '36f1ecebe070175ad956f71b779e635c';
const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const valueToHash = ts + privateKey + publicKey;
/* const hash = md5(valueToHash); */
const hash = '8ff18f36cec2f49104d435d5c2edd039';
const query = `apikey=${publicKey}&ts=${ts}&hash=${hash}`
/* console.log(import.meta.env); */


/* const queryString = `?ts=${timestamp}&apikey=${publickKey}&hash=${hash}`;
const url = baseUrl + queryString;
console.log(hash);
 */
export function useApi(){

    function getHeroes(){

        const charactersUrl = `${baseUrl}/characters?orderBy=-modified&limit=100&${query}`;

        return new Promise((resolve, reject) =>{
            fetch(charactersUrl)
            .then(res => res.json())    
            .then((characters) => { 
                console.log(characters);
                resolve(characters)
        })
        .catch((error) => reject(error));

        }) 




        

        
    }
    


    //async function getHeroes(){
        /* console.log(response.data.results); */
        /* const response = await fetch('https://gateway.marvel.com/v1/public/characters?ts=1689299322305&apikey=9938ec8bccb5d6829f1a12f9fbf09478&hash=36f1ecebe070175ad956f71b779e635c')
        console.log(response);
        return response.data.results */
        /* console.log(`Fetching ${url}`); */
  /* const response = await fetch(url);
  const jsonData = await response.json();
  const data = jsonData.data.results;
  console.log(data);
  return data.data.results */

    //}


    return {getHeroes}

}