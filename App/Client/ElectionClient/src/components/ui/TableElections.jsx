import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react'
import { useStore } from '../../hooks/useStore'


function TableElections(props)
{
    const { dataElections, editElections } = useStore()
    const {InfoElection, setInfoElection} = props;


    useEffect(() => {
        dataElections.updateData();
    }, [])


    const handleRowClick = (election_id) => {
        if (election_id==-1)
        {
            editElections.reset();
        }
        else
        {
            editElections.updateElection_id(election_id);
            editElections.getRecordFromDB();
            console.log(editElections.pleDict);
        }
    }

    return (
        <div className='relative w-8/12'>
            <table className='table-auto w-full h-full border-collapse ml-8 caption-bottom'>
                <caption className='text-stone-300'>
                {dataElections.pageList.map((page, index) => {
                    const isCurrentPage = page === dataElections.currentPage;
                    const isEllipsis = page === '...';
                    const handleClick = () => {
                        if (!isEllipsis) {
                            dataElections.updateCurrentPage(page);
                            dataElections.updateData();
                            editElections.reset();
                        }
                    }
                    return (
                        <button key={index} className={`mx-1 pt-2 ${isCurrentPage ? 'font-medium text-green-400' : ''}`} onClick={handleClick}>{page}</button>
                    )
                })}
                </caption>
                <thead className='border-b-2 border-stone-100 text-stone-100 text-left'>
                    <tr>
                        <th><button></button></th>
                        <th className='px-2 p-4'>Название</th>
                        <th className='px-2 p-4'>Дата</th>
                        <th className='px-2 p-4'>Тип</th>
                        <th className='px-2 p-4'>Название ППО</th>
                        <th><button></button></th>
                    </tr>
                </thead>
                <tbody className='text-stone-300 text-xs'>
                    {dataElections.data.map((row) => {
                        return (
                            <tr className='border-b-2 border-stone-100' key={row.election_id}>
                                <td className='px-2 p-2'><button onClick={() => editElections.election_id == row.election_id ? handleRowClick(-1) : handleRowClick(row.election_id)}><svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="16" height="16" rx="3" stroke={editElections.election_id === row.election_id ? "#42B261" : "#C6C6C6"} stroke-width={editElections.election_id === row.election_id ? "4" : "2"}/></svg></button></td>
                                <td className='px-2 p-2 border-b-2 border-stone-100 mx-4 select-all'>{row.name_of_the_election.length > 45 ? `${row.name_of_the_election.slice(0, 45)}...` : row.name_of_the_election}</td>
                                <td className='px-2 p-2'>{moment(row.election_date).format('DD.MM.YYYY')}</td>
                                <td className='px-2 p-2'>{row.number_of_deputy_mandates == 0 ? 'Выборы главы' : `Выборы депутатов (${row.number_of_deputy_mandates} мандатов)`}</td>
                                <td className='px-2 p-2 select-all'>{row.ple_title.length > 30 ? `${row.ple_title.slice(0, 30)}...` : row.ple_title}</td>
                                <td>
                                    <button
                                        onClick={
                                            () => {
                                                // key 
                                                setInfoElection(row.election_id);
                                                console.log(InfoElection);
                                            }
                                        }
                                    >
                                        <svg width="14" height="14" viewBox="0 0 22 22" fill="#C6C6C6" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 16.0001V12.0001M12 8.00008H12.01M3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7985 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586V7.94153C21 7.59889 21 7.42756 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7985 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42756 3 7.59889 3 7.94153Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}


export default observer(TableElections)