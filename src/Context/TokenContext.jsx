import React, { createContext, useEffect, useState } from 'react';

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);

useEffect(() => {
  if (localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"));
  }
}, []);


  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}



