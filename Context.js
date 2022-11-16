import React, { createContext } from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [pin, setPin] = React.useState({
    latitude: 22.724713889937046,
    longitude: 75.87278936058283,
  });
  const [isAdmin, setisAdmin] = React.useState(true);
  const [sortingOption, setSortingOption] = React.useState(true);
  return (
    <Context.Provider
      value={{
        pin, setPin,
        isAdmin, setisAdmin,
        sortingOption, setSortingOption,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
