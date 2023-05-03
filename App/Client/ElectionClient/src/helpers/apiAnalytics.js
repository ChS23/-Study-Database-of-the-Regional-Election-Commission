import axios from "axios";


const baseURL = "https://localhost:7122/analytics";


export async function getCountCandidatsPartyFromElections(idElection)
{
    let request = `${baseURL}/getCountCandidatsPartyFromElections?election_id=${idElection}`;
    try {
        return (await axios.get(request)).data;
    } catch (error) {   
        alert(error.response.data.message);
    }
}


export async function getGroupAgeInParty(partyId)
{
    let request = `${baseURL}/getGroupAgeInParty?party_id=${partyId}`;
    try {
        return (await axios.get(request)).data;
    } catch (error) {   
        alert(error.response.data.message);
    }
}