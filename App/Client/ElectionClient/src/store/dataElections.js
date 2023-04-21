import {computed, makeObservable, observable} from 'mobx'
import axios from "axios"


export class DataElections  {

    data = []
    countRecordSelect = 0
    countRecordAll = 0

    constructor(rootStore) {
        this.filterElections = rootStore.filterElections
        makeObservable(this, {
            data: observable,
            countRecordSelect: observable,
            countRecordAll: observable,
            Data: computed
        });
    }


    async getElectionData() {
        try {
            filter = this.filterElections.data
    
            let request = `https://localhost:7122/elections/filter?from=${filter.fromPage}&to=${filter.toPage}`
            if (filter.upcoming == true) request += `&upcoming=${filter.upcoming}`;
            if (filter.type != null) request += `&type=${filter.type}`;
            if (filter.dateFrom != null) request += `&dateFrom=${filter.dateFrom}`;
            if (filter.dateTo != null) request += `&dateTo=${filter.dateTo}`;
            if (filter.nameSearch != null) request += `&nameSearch=${filter.nameSearch}`;
            if (filter.pleSearch != null) request += `&pleSearch=${filter.pleSearch}`;
    
            console.log(request)
    
            const response = await axios.get(request);
            this.dataField = response.data
            return response.data
        } catch (error) {
             console.error(error);
        }
    };


    get Data() {
        return this.getElectionData()
    }
}