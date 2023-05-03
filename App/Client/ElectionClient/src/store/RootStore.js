import { FilterElections  } from "./filterElections";
import { DataElections } from "./dataElections";
import { EditElections} from "./editElections";
import { DataCandidates } from "./dataCandidates";
import { EditCandidates } from "./editCandidates";
import { FilterCandidates } from "./filterCandidates";


export class RootStore {
    constructor() {
        this.filterElections = new FilterElections ();
        this.filterCandidates = new FilterCandidates();
        this.dataElections = new DataElections (this);
        this.dataCandidates = new DataCandidates(this);
        this.editElections = new EditElections(this);
        this.editCandidates = new EditCandidates(this);
    }
}