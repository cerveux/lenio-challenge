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

    async function getHeroes(){

        const heroesList =  new Promise((resolve, reject)=>{
            const randomIndex = Math.floor(Math.random()*(1461))
            const charactersUrl = `${baseUrl}/characters?offset=${randomIndex}&limit=100&${query}`;
            fetch(charactersUrl)
            .then(res => res.json())    
            .then((response) => (response.data.results))
            .then((characters)=> characters.filter((character)=>{
                //erase unaviable images
                return character.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && character.thumbnail.path !=='http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'

            }))

            .then(characters => resolve(characters))
            .catch((error) => reject(error));
            })
        
        

        console.log('una llamada');

        return heroesList


        

        /* return new Promise((resolve, reject) =>{
            fetch(charactersUrl)
            .then(res => res.json())    
            .then((characters) => { 
                console.log(characters);
                resolve(characters)
        })
        .catch((error) => reject(error));

        })  */





        

        
    }
    

    return {getHeroes}

}