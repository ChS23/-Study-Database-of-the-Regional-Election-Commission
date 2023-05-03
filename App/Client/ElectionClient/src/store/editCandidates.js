import {action, makeObservable, observable, runInAction} from 'mobx'
import { updateCandidateRecord, getCandidateRecord, deleteCandidateRecord, updatePartyDict, createCandidateRecord } from '../helpers/apiCandidates'


export class EditCandidates  {
    candidate_id = -1
    full_name = ""
    id_party = null
    birthday = null
    party_name = ""
    partyDict = [{}]


    constructor(rootStore) {
        this.dataCandidates = rootStore.dataCandidates
        makeObservable(this, {
            candidate_id: observable,
            full_name: observable,
            id_party: observable,
            birthday: observable,
            party_name: observable,
            partyDict: observable,
            updateCandidate_id: action.bound,
            updateFull_name: action.bound,
            updateId_party: action.bound,
            updateBirthday: action.bound,
            updateParty_name: action.bound,
            updateCandidateRecord: action.bound,
            createCandidateRecord: action.bound,
            deleteCandidateRecord: action.bound,
            getCandidateRecord: action.bound,
            updatePartyDict: action.bound,
            getParyDict: action.bound,
            reset : action.bound,
        });
    }

    reset()
    {
        this.candidate_id = -1
    }


    async getParyDict()
    {
        await this.updatePartyDict();
        return this.partyDict;
    }


    async updatePartyDict()
    {
        const partyDict = await updatePartyDict();
        runInAction(
            () => {
                this.partyDict = partyDict;
            }
        );
    }


    updateCandidate_id(candidate_id)
    {
        this.candidate_id = candidate_id;
    }


    updateFull_name(full_name)
    {
        this.full_name = full_name;
    }


    updateId_party(id_party)
    {
        this.id_party = id_party;
    }


    updateBirthday(birthday)
    {
        this.birthday = birthday;
    }


    updateParty_name(party_name)
    {
        this.party_name = party_name;
    }


    async updateCandidateRecord()
    {
        await updateCandidateRecord(this.candidate_id, this.full_name, this.id_party, this.birthday);
        this.dataCandidates.updateCurrentPageByCandidateId(this.candidate_id);
    }


    async createCandidateRecord(name, id_party, birthday)
    {
        this.full_name = name;
        this.id_party = id_party;
        this.birthday = birthday;
        let record = await createCandidateRecord(this.full_name, this.id_party, this.birthday);
        this.dataCandidates.updateCurrentPageByCandidateId(record.candidate_id);
    }


    async deleteCandidateRecord()
    {
        await deleteCandidateRecord(this.candidate_id);
        await this.dataCandidates.updateData();
    }


    async getCandidateRecord()
    {
        const candidateRecord = await getCandidateRecord(this.candidate_id);
        runInAction(
            () => {
                this.full_name = candidateRecord.full_name;
                this.id_party = candidateRecord.id_party;
                this.birthday = candidateRecord.birthday;
                this.party_name = candidateRecord.party_name;
            }
        );
    }


    // async addRecord(name, id_party, birthday)
    // {
    //     this.full_name = name;
    //     this.id_party = id_party;
    //     this.birthday = birthday;
    //     let record = await this.createCandidateRecord(this);
    //     await this.dataCandidates.updateCurrentPageByCandidateId(record.)
    // }
}