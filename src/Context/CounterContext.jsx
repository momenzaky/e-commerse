import { createContext, useState } from "react";

export const CounterContext = createContext(0);

export default function CounterContextProvider(props) {
  const [counter, setCounter] = useState(1); 

  return (
    
    <CounterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
