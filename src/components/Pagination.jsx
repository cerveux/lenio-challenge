import React, { useEffect, useState } from 'react'
import { useProvider } from '../context/AppContextProvider';

const Pagination = ({ heroePerPage, handleCurrentPage }) => {
    let pages = [];

    const heroesContext = useProvider();
    const heroes = heroesContext.heroes;

    const [buttonIndex, setButtonIndex] = useState(1)

    const handleClick = (page)=>{
        handleCurrentPage(page);
        setButtonIndex(page)

    }

    for(let i = 1; i <= Math.ceil(heroes.length/heroePerPage); i++){
        pages.push(i)
    }


  return (
    <div className='buttons-container container mx-auto flex flex-row justify-center'>
        {pages.map((page, index)=>{
            return <button key={index} className={`border-2 p-2 h-11 w-11 rounded-lg ${page === buttonIndex && "bg-red-500 text-white font-bold"}`}
            onClick={()=> handleClick(page)} >{page}</button>
        })}
    </div>
    )
}

export default Pagination