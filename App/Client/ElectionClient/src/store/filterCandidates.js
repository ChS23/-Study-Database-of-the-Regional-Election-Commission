import {action, makeObservable, observable} from 'mobx'


export class FilterCandidates  {

    filterName = null;
    birthdayFrom = null;
    birthdayTo = null;
    id_party = null;


    constructor() {
        makeObservable(this, {
          filterName: observable,
          birthdayFrom: observable,
          birthdayTo: observable,
          id_party: observable,
          updateField: action.bound,
          reset: action.bound
        });
    }


    updateField(field, value)
    {
        this[field] = value;
    }


    reset() {
        this.filterName = null;
        this.birthdayFrom = null;
        this.birthdayTo = null;
        this.id_party = null;
    }

}