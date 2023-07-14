import React from 'react'

const HeroCard = ({image, name}) => {

  return (
    <div className=' w-64 h-96 bg-black m-3 relative'>
        <img src={image} alt="" srcSet="" className='w-full h-full absolute' />
        <div className='absolute bottom-6 left-4'>
            <p className=' text-xl text-white font-bold'>{name}</p>
        </div>
        <div className="favorite-container absolute text-4xl text-white right-2 top-2">
           <i className="lar la-star"></i> 
        </div>
        

    </div>
  )
}

export default HeroCard