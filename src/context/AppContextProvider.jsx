import { createContext, useContext, useReducer } from 'react';

const HeroesContext = createContext(null);

const HeroesDispatchContext = createContext(null);

export function AppContextProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  return (
    <HeroesContext.Provider value={tasks}>
      <HeroesDispatchContext.Provider value={dispatch}>
        {children}
      </HeroesDispatchContext.Provider>
    </HeroesContext.Provider>
  );
}

export function useProvider() {
  return useContext(HeroesContext);
}

export function useTasksDispatch() {
  return useContext(HeroesDispatchContext);
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': 
      return { ...tasks, heroes: action.heroes};

    case 'watched':
      return {...tasks, isFirstVisit: false}
    
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = {
  isFirstVisit: true,
  heroes: []};