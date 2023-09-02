import { createContext, useState, ReactNode, Dispatch } from "react";

interface GlobalContextProps {
  isLogged: boolean;
  setIsLogged: Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  const contextValue: GlobalContextProps = {
    isLogged,
    setIsLogged,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
