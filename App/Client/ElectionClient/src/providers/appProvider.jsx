import { createContext } from "react";
import { RootStore } from "../store/RootStore";


const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);

const Store = ({children}) => {
    return(
        <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>    
    );
}


export default Store;