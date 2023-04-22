import React, { useEffect } from 'react';
import moment from 'moment';
import { observer } from 'mobx-react'
import { useStore } from '../../hooks/useStore'


function TableElections(props)
{
    const { selectedRowId, setSelectedRowId, handleRowClick } = props;
    const { dataElections } = useStore()

    useEffect(() => {
        dataElections.updatePageList();
        dataElections.updateData();
        setSelectedRowId(null);
      }, [dataElections.currentPage]
    )


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
                    </tr>
                </thead>
                <tbody className='text-stone-300 text-xs'>
                    {dataElections.data.map((row) => {
                        return (
                            <tr className='border-b-2 border-stone-100' key={row.election_id}>
                                <td className='px-2 p-2'><button onClick={() => selectedRowId == row.election_id ? handleRowClick(null) : handleRowClick(row.election_id)}><svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="16" height="16" rx="3" stroke={selectedRowId === row.election_id ? "#42B261" : "#C6C6C6"} stroke-width={selectedRowId === row.election_id ? "4" : "2"}/></svg></button></td>
                                <td className='px-2 p-2 border-b-2 border-stone-100 mx-4 select-all'>{row.name_of_the_election.length > 50 ? `${row.name_of_the_election.slice(0, 50)}...` : row.name_of_the_election}</td>
                                <td className='px-2 p-2'>{moment(row.election_date).format('DD.MM.YYYY')}</td>
                                <td className='px-2 p-2'>{row.number_of_deputy_mandates == 0 ? 'Выборы главы' : `Выборы депутатов (${row.number_of_deputy_mandates} мандатов)`}</td>
                                <td className='px-2 p-2 select-all'>{row.ple.length > 30 ? `${row.ple.slice(0, 30)}...` : row.ple}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}


export default observer(TableElections)