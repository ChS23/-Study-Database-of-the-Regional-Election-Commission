import { FilterElections  } from "./filterElections";
import { DataElections } from "./dataElections";


export class RootStore {
    constructor() {
        this.filterElections = new FilterElections ();
        this.dataElections = new DataElections (this);
    }
}