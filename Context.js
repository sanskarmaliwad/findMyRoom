import React, { createContext } from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [pin, setPin] = React.useState({
    latitude: 22.724713889937046,
    longitude: 75.87278936058283,
  });
  const [isAdmin, setisAdmin] = React.useState(true);
  const [sortingOption, setSortingOption] = React.useState(0);
  const [coordinates, setCoordinates] = React.useState({
    latitude: 0,
    longitude: 0
  });
  return (
    <Context.Provider
      value={{
        pin, setPin,
        isAdmin, setisAdmin,
        sortingOption, setSortingOption,
        coordinates, setCoordinates,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
