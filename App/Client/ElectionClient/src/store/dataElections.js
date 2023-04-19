import {action, computed, makeObservable, observable} from 'mobx'
import { rootStore } from '../providers/appProvider'


const getElectionData = async (filter) => {
    try {
        from = 1
        to = 1


        let request = `https://localhost:7122/elections/filter?from=${from}&to=${to}`
        if (filter.upcoming == true) request += `&upcoming=${filter.upcoming}`;
        if (filter.type != null) request += `&type=${filter.type}`;
        if (filter.dateFrom != null) request += `&dateFrom=${filter.dateFrom}`;
        if (filter.dateTo != null) request += `&dateTo=${filter.dateTo}`;
        if (filter.nameSearch != null) request += `&nameSearch=${filter.nameSearch}`;
        if (filter.pleSearch != null) request += `&pleSearch=${filter.pleSearch}`;

        console.log(request)

        const response = await axios.get(request);
        return response.data
    } catch (error) {
         console.error(error);
    }
};


export class DataElections  {


    data = []
    countRecordSelect = 0
    countRecordAll = 0


    constructor() {
        makeObservable(this, {
            data: observable,
            countRecordSelect: observable,
            countRecordAll: observable,
            updateData: computed
        });
    }


    get updateData() {
        filter = rootStore().filterElections.data
        return getElectionData(filter)
    }
}