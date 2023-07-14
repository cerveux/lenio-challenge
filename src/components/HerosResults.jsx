import React, { useState, useEffect }  from 'react'
import HeroCard from './HeroCard'
import { useApi } from '../hooks/useApi'

const HerosResults = () => {

  const [heroes, setHeroes] = useState([])


    const {getHeroes} = useApi();

    

    useEffect(() => {
      getHeroes().then((res)=> setHeroes(res))
    
      
    }, [])
    

    

    



  return (
    <div className='container mx-auto p-2 flex flex-wrap justify-center max-w-[1200px]'>
      {heroes.map((heroe)=>{
        const image = (heroe.thumbnail.extension == 'jpg') & (heroe.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available')
        return(
          
          ( image) ?
        <div key={heroe.id}>
          <HeroCard image={heroe.thumbnail.path + '.jpg'} name={heroe.name} />
          </div> :
          <></>)
      })}
       
    </div>
  )
}

export default HerosResults