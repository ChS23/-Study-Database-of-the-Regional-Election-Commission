import {action, makeObservable, observable} from 'mobx'


export class FilterElections  {

    fromPage = 1;
    toPage = 11;

    upcoming = false;
    type = null;
    dateFrom = null;
    dateTo = null
    nameSearch = null;
    pleString = null;
    

    constructor() {
        makeObservable(this, {
          fromPage: observable,
          toPage: observable,
          upcoming: observable,
          type: observable,
          dateFrom: observable,
          dateTo: observable,
          nameSearch: observable,
          pleString: observable,
          updateField: action,
          resetPage: action,
          reset: action
        });
    }

    
    updateField = (field, value) =>
    {
        this[field] = value;
    }


    reset() {
        this.fromPage = 1;
        this.toPage = 11;

        this.upcoming = false;
        this.type = null;
        this.dateFrom = null;
        this.dateTo = null;
        this.nameSearch = null;
        this.pleString = null;
    }


    resetPage()
    {
        this.fromPage = 1;
        this.toPage = 11;
    }
}