import {action, makeObservable, observable} from 'mobx'


export class FilterElections  {

    fromRecord = 1;
    toRecord = 11;

    upcoming = false;
    type = null;
    dateFrom = null;
    dateTo = null
    nameSearch = null;
    pleString = null;
    

    constructor() {
        makeObservable(this, {
          fromRecord: observable,
          toRecord: observable,
          upcoming: observable,
          type: observable,
          dateFrom: observable,
          dateTo: observable,
          nameSearch: observable,
          pleString: observable,
          updateField: action.bound,
          resetPage: action.bound,
          reset: action.bound
        });
    }

    
    updateField(field, value)
    {
        this[field] = value;
    }


    reset() {
        this.fromRecord = 1;
        this.toRecord = 11;

        this.upcoming = false;
        this.type = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.nameSearch = null;
        this.pleString = null;
    }


    resetPage()
    {
        this.fromRecord = 1;
        this.toRecord = 11;
    }
}