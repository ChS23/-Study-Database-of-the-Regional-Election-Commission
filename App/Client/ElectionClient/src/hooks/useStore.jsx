import { useContext } from "react";
import { StoreContext } from "../providers/appProvider"


export const useStore = () => useContext(StoreContext);