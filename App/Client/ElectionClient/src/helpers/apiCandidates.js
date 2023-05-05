import axios from "axios";

const baseURL = 'https://localhost:7122/candidate';


export async function getCandidates(page, filter) {
    try {
        // https://localhost:7122/candidates?page=1&filterName=df&birthdayFrom=2022-01-01&birthdayTo=2022-01-01&id_party=2
        let request = `${baseURL}s?page=${page}`
        if (filter.filterName) request += `&filterName=${filter.filterName}`;
        if (filter.birthdayFrom) request += `&birthdayFrom=${filter.birthdayFrom}`;
        if (filter.birthdayTo) request += `&birthdayTo=${filter.birthdayTo}`;
        if (filter.id_party) request += `&id_party=${filter.id_party}`;
        return (await axios.get(request)).data;
    } catch (error) {
        // alert(error.response.data.message);
    }
};



export async function updateCandidateRecord(record) {
    console.log(`ID = ${record}`);
    let request = `${baseURL}?id=${record.candidate_id}`;
    try {
        console.log(record);
        return (await axios.put(
            request,
            {
                "candidate_id": record.candidate_id,
                "full_name": record.full_name,
                "birthday": record.birthday,
                "id_party": record.id_party,
                "party_name": record.party_name
            }
        )).data
    } catch (error) {
        alert(error.response.data.message);
    }
}


export async function getCandidateRecord(candidate_id) {
    let request = `${baseURL}?id=${candidate_id}`;
    try {
        return (await axios.get(request)).data;
    } catch (error) {
        alert(error.response.data.message);
    }
}


// delete
export async function deleteCandidateRecord(candidate_id) {
    let request = `${baseURL}?id=${candidate_id}`;
    try {
        return (await axios.delete(request)).data;
    } catch (error) {
        alert(error.response.data.message);
    }
}


// create
export async function createCandidateRecord(record) {
    let request = `${baseURL}`;
    try {
        return (await axios.post(
            request,
            {
                "candidate_id": 0,
                "full_name": record.full_name,
                "birthday": record.birthday,
                "id_party": record.id_party,
                "party_name": ''
            }
        )).data
    } catch (error) {
        alert(error.response.data.message);
    }
}


export async function getCurrentNumberOfCandidates(candidate_id, filter) {
    try {
        let request = `${baseURL}s/countNumberRow?id=${candidate_id}`;
        if (filter.filterName) request += `&filterName=${filter.filterName}`;
        if (filter.birthdayFrom) request += `&birthdayFrom=${filter.birthdayFrom}`;
        if (filter.birthdayTo) request += `&birthdayTo=${filter.birthdayTo}`;
        if (filter.id_party) request += `&id_party=${filter.id_party}`;
        return (await axios.get(request)).data;
    } catch (error) {
        alert(error.response.data.message);
    }
}


export async function updatePartyDict()
{
    try {
        let request = `${baseURL}s/partyDict`;
        return (await axios.get(request)).data;
    } catch (error) {
        alert(error.response.data.message);
    }
}