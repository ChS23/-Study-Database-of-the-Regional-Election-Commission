import {action, makeObservable, observable, runInAction} from 'mobx'
import {updateElectionRecord, getElectionRecord, deleteElectionRecord} from '../helpers/apiElections'

export class EditElections
{
    election_id = null
    nameElection = ""
    dateElection = null
    countMandates = null
    namePLE = ""
    pleId = null
    pleDict = [{}]


    constructor()
    {
        makeObservable(this, {
            election_id: observable,
            nameElection: observable,
            dateElection: observable,
            countMandates: observable,
            namePLE: observable,
            pleId: observable,
            updateNameElection: action,
            updateDateElection: action,
            updateCountMandates: action,
            updateNamePLE: action,
            updateRecordInDB: action,
            getRecordFromDB: action,
            reset: action,
        });
    }

    reset()
    {
        this.election_id = null;
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

    updateElection_id(election_id)
    {
        this.election_id = election_id;
    }

    async updateRecordInDB()
    {

    }

    async getRecordFromDB()
    {
        const record = await getElectionRecord(this);
        runInAction(
            () => {
                this.nameElection = record.name_of_the_election;
                this.dateElection = record.election_date;
                this.countMandates = record.number_of_deputy_mandates;
                this.pleId = record.id_public_legal_entitie;
                this.namePLE = record.ple_title;
            }
        )
        console.log(record);
    }



}