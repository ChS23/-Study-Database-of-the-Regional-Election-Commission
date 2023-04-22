import axios from "axios"

const baseURL = 'https://localhost:7122/elections'


export async function getElectionData(page, filter) {
    try {
        let request = `${baseURL}/filter?page=${page}`
        if (filter.upcoming) request += `&upcoming=${filter.upcoming}`;
        if (filter.type) request += `&type=${filter.type}`;
        if (filter.dateFrom) request += `&dateFrom=${filter.dateFrom}`;
        if (filter.dateTo) request += `&dateTo=${filter.dateTo}`;
        if (filter.nameSearch) request += `&nameSearch=${filter.nameSearch}`;
        if (filter.pleSearch) request += `&pleSearch=${filter.pleSearch}`;
        return (await axios.get(request)).data;
    } catch (error) {
         console.error(error);
    }
};


export async function getCountRecord(filter) {
    let request = `${baseURL}/countRowIsFilterAndAll?`
    if (filter.upcoming) request += `&upcoming=${filter.upcoming}`;
    if (filter.type) request += `&type=${filter.type}`;
    if (filter.dateFrom) request += `&dateFrom=${filter.dateFrom}`;
    if (filter.dateTo) request += `&dateTo=${filter.dateTo}`;
    if (filter.nameSearch) request += `&nameSearch=${filter.nameSearch}`;
    if (filter.pleSearch) request += `&pleSearch=${filter.pleSearch}`;
    return (await axios.get(request)).data;
}


export async function updateElectionRecord() {
    let request = `${baseURL}/`
}