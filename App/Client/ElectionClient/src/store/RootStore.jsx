import { FilterElections  } from "./filterElections";


export class RootStore {
    
    filterElections

    constructor() {
        this.filterElections = new FilterElections ();
    }
}