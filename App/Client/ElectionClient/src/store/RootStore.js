import { FilterElections  } from "./filterElections";


export class RootStore {
    constructor() {
        this.filterElections = new FilterElections ();
    }
}