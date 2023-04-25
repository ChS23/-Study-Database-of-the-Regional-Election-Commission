import { FilterElections  } from "./filterElections";
import { DataElections } from "./dataElections";
import { EditElections} from "./editElections";


export class RootStore {
    constructor() {
        this.filterElections = new FilterElections ();
        this.dataElections = new DataElections (this);
        this.editElections = new EditElections(this);
    }
}