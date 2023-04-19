import React, { createContext } from "react";
import { RootStore } from "../store/RootStore";


const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);

const Store = (props) => {
    return(
        <StoreContext.Provider value={rootStore}>{props.children}</StoreContext.Provider>    
    );
}


export default Store;