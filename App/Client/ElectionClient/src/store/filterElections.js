import {action, makeObservable, observable} from 'mobx'


export class FilterElections  {

    upcoming = false;
    type = null;
    dateFrom = null;
    dateTo = null
    nameSearch = null;
    pleSearch = null;
    

    constructor() {
        makeObservable(this, {
          upcoming: observable,
          type: observable,
          dateFrom: observable,
          dateTo: observable,
          nameSearch: observable,
          pleSearch: observable,
          updateField: action.bound,
          reset: action.bound
        });
    }

    
    updateField(field, value)
    {
        this[field] = value;
    }


    reset() {
        this.upcoming = false;
        this.type = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.nameSearch = null;
        this.pleSearch = null;
    }
}