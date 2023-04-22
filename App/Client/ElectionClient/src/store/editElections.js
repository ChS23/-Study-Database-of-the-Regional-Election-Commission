import {action, makeObservable, observable} from 'mobx'


export class editElections
{
    nameElection = ""
    dateElection = null
    countMandates = null
    namePLE = ""


    constructor()
    {
        makeObservable(this, {
            nameElection: observable,
            dateElection: observable,
            countMandates: observable,
            namePLE: observable,
            updateNameElection: action,
            updateDateElection: action,
            updateCountMandates: action,
            updateNamePLE: action,
        });
    }

    updateNameElection(newName)
    {
        this.nameElection = newName;
    }

    updateDateElection(newDate)
    {
        this.dateElection = newDate;
    }

    updateCountMandates(newCountMandates)
    {
        this.countMandates = newCountMandates;
    }

    updateNamePLE(newNamePLE)
    {
        this.namePLE = newNamePLE;
    }

    async updateRecordInDB()
    {
        
    }
}