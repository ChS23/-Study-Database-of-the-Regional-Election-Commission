import React, {useEffect} from "react";
import {observer} from "mobx-react";
import moment from 'moment';
import { useStore } from "../../hooks/useStore";



export default observer(function TableCandidates()
{
    const { dataCandidates, editCandidates } = useStore();


    useEffect(() => {
        dataCandidates.updateData();
        console.log(dataCandidates.data);
    }, [])

    const handleRowClick = (candidate_id) => {
        if (candidate_id==-1)
        {
            editCandidates.reset();
        }
        else
        {
            editCandidates.updateCandidate_id(candidate_id);
            editCandidates.getRecordFromDB();
            console.log(editCandidates.pleDict);
        }
    }


    return (
        <div className='relative w-8/12'>
            <table className='table-auto w-full h-full border-collapse ml-8 caption-bottom'>
                <caption className='text-stone-300'>
                {dataCandidates.pageList.map((page, index) => {
                    const isCurrentPage = page === dataCandidates.currentPage;
                    const isEllipsis = page === '...';
                    const handleClick = () => {
                        if (!isEllipsis) {
                            dataCandidates.updateCurrentPage(page);
                            dataCandidates.updateData();
                            editCandidates.reset();
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
                        <th className='px-2 p-4'>ФИО кандидата</th>
                        <th className='px-2 p-4'>Дата рождения</th>
                        <th className='px-2 p-4'>Партия</th>
                    </tr>
                </thead>
                <tbody className='text-stone-300 text-xs'>
                    {dataCandidates.data.map((row) => {
                        return (
                            <tr key={row.candidate_id} className='border-b border-stone-100'>
                                <td className='px-2 p-2'><button onClick={() => editCandidates.candidate_id == row.candidate_id ? handleRowClick(-1) : handleRowClick(row.candidate_id)}><svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="16" height="16" rx="3" stroke={editCandidates.candidate_id === row.candidate_id ? "#42B261" : "#C6C6C6"} stroke-width={editCandidates.candidate_id === row.candidate_id ? "4" : "2"}/></svg></button></td>
                                <td className='px-2 p-2 mx-4 select-all'>{row.full_name}</td>
                                <td className='px-2 p-2 mx-4'>{moment(row.birthday).format('DD.MM.YYYY')}</td>
                                <td className='px-2 p-2 mx-4'>{row.name_party == null ? 'Самовыдвиженец' : row.name_party }</td>
                            </tr>
                        )
                }) }
                </tbody>
            </table>
        </div>
    )
});