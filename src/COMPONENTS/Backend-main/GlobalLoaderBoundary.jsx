import React, {createContext, useContext, useEffect, useState} from "react";
import {LoadingPage} from '../USER SIDE/loadingPage';

export const GlobalLoadingContext = createContext({
  setGlobalLoading: () => {},
});

export default GlobalLoaderBoundary; function GlobalLoaderBoundary({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  // Auto reload if loading too long
  useEffect(() => {
    if (!isLoading) return;

    const timeout = setTimeout(() => {
      console.warn("Global reload triggered due to stalled loading.");
      window.location.reload();
    }, 5000); // 5 sec → force recover

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Simulate UI mount → you can replace with real data init
  useEffect(() => {
    // Make sure UI doesn’t instantly show main app
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <GlobalLoadingContext.Provider value={{ setGlobalLoading: setIsLoading }}>
      {isLoading ? <LoadingPage /> : children}
    </GlobalLoadingContext.Provider>
  );
};
