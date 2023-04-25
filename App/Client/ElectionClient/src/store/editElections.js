import {action, makeObservable, observable, runInAction} from 'mobx'
import {updateElectionRecord, getElectionRecord, deleteElectionRecord, updatePleDictFromDB} from '../helpers/apiElections'

export class EditElections
{
    election_id = -1
    nameElection = ""
    dateElection = null
    countMandates = null
    namePLE = ""
    pleId = null
    pleDict = [{}]


    constructor(rootStore)
    {
        this.dataElections = rootStore.dataElections;
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
            deleteRecord: action,
            reset: action,
            getPleDict: action,
        });
    }

    reset()
    {
        this.election_id = -1;
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
        await updateElectionRecord(this);
        await this.dataElections.updateData();
    }


    async getPleDict()
    {
        await this.updatePleDict();
        console.log(this.pleDict);
        return this.pleDict;
    }


    async updatePleDict()
    {
        const pleDict = await updatePleDictFromDB();
        runInAction(
            () => {
                this.pleDict = pleDict;
                console.log(this.pleDict);
            }
        )
    }


    async getRecordFromDB()
    {
        const record = await getElectionRecord(this.election_id);
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


    async deleteRecord()
    {
        await deleteElectionRecord(this.election_id);
        await this.dataElections.updateData();
    }
}