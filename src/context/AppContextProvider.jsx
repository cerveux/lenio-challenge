import { createContext, useContext, useReducer } from 'react';

const HeroesContext = createContext(null);

const HeroesDispatchContext = createContext(null);

export function AppContextProvider({ children }) {
  const [heroes, dispatch] = useReducer(
    heroesReducer,
    initialHeroes
  );

  return (
    <HeroesContext.Provider value={heroes}>
      <HeroesDispatchContext.Provider value={dispatch}>
        {children}
      </HeroesDispatchContext.Provider>
    </HeroesContext.Provider>
  );
}

export function useProvider() {
  return useContext(HeroesContext);
}

export function useHeroDispatch() {
  return useContext(HeroesDispatchContext);
}

function heroesReducer(heroes, action) {
  switch (action.type) {
    case 'added': 
      return { ...heroes, heroes: action.heroes};

    case 'watched':
      return {...heroes, isFirstVisit: false}

    case 'comics':
      return {...heroes, comics: action.comics}

    case 'new page': 
      return { ...heroes, ...{paginate: action.paginate}};
      
    case 'query param': 
      return { ...heroes, querySearch: action.query};

    case 'favorite': 
    return {...heroes, isFavorite: action.favorite}

    case "favorite list": 
    return {...heroes, favorites: action.favorites}

  case "random": 
    return {...heroes, random: action.random}

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialHeroes = {
  isFirstVisit: true,
  isFavorite: false,
  heroes: [],
  results: [],
  comics: [],
  paginate: [],
  querySearch: [],
  favorites: [],
  random: []
};
