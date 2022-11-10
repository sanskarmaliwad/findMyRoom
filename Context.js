import React, { createContext } from "react";



const Context = React.createContext();

const Provider = ({children}) => {
    const [ pin, setPin ] = React.useState({
        latitude: 22.724713889937046,
        longitude: 75.87278936058283
    }) 
    return(
        <Context.Provider value={{
            pin,setPin
        }} >
            {children}
        </Context.Provider>
    )
}

export {Context,Provider}


