import {action, makeObservable, observable} from 'mobx'


export class editElections
{
    election_id = null
    nameElection = ""
    dateElection = null
    countMandates = null
    namePLE = ""
    ple_id = null
    pleDict = [{}]


    constructor()
    {
        makeObservable(this, {
            election_id: observable,
            nameElection: observable,
            dateElection: observable,
            countMandates: observable,
            namePLE: observable,
            ple_id: observable,
            updateNameElection: action,
            updateDateElection: action,
            updateCountMandates: action,
            updateNamePLE: action,
            updateRecordInDB: action,
            getRecordFromDB: action,

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

    async getRecordFromDB()
    {

    }



}