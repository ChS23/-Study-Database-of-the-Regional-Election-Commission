import React, { useState, useEffect } from 'react';
import axios from "axios"
import moment from 'moment';
import { observer } from 'mobx-react'
import { useStore } from '../../hooks/useStore'



function TableElections(props)
{

    const [ElectionsData, setElectionsData] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { selectedRowId, setSelectedRowId, handleRowClick, setCountRecord} = props;
    const filterElectionsData = useStore().filterElections
    const dataElections = useStore().dataElections.data

    const getElectionData = async () => {
        try {
            const from = (currentPage - 1) * 11 + 1;
            const to = currentPage * 11;

            // https://localhost:7122/elections/countRowIsFilterAndAll?upcoming=true&type=1&dateFrom=2017-12-01&dateTo=2023-01-01&nameSearch=%D0%92&pleSearch=%D0%90
            let request = `https://localhost:7122/elections/filter?from=${from}&to=${to}`
            if (filterElectionsData.upcoming == true) request += `&upcoming=${filterElectionsData.upcoming}`;
            if (filterElectionsData.type != null) request += `&type=${filterElectionsData.type}`;
            if (filterElectionsData.dateFrom != null) request += `&dateFrom=${filterElectionsData.dateFrom}`;
            if (filterElectionsData.dateTo != null) request += `&dateTo=${filterElectionsData.dateTo}`;
            if (filterElectionsData.nameSearch != null) request += `&nameSearch=${filterElectionsData.nameSearch}`;
            if (filterElectionsData.pleSearch != null) request += `&pleSearch=${filterElectionsData.pleSearch}`;

            console.log(request)

            const response = await axios.get(request);
            setElectionsData(response.data);
            console.log(filterElectionsData.upcoming);
        } catch (error) {
             console.error(error);
        }
    };

    const getPageList = async () => {
        try {
            const count = (await axios.get('https://localhost:7122/elections/countRowIsFilterAndAll')).data;
            setCountRecord(
                {
                    allCount: count.allCount,
                    filterCount: count.filterCount
                }
            )
            const numPages = Math.ceil(count.filterCount / 11);
            if (numPages <= 5) {
                setPageList(Array.from({length: numPages}, (_, i) => i + 1));
            } 
            else {
                if (currentPage < 3) {
                    setPageList([1, 2, 3, '...', numPages]);
                } 
                else if (currentPage > numPages - 2) {
                    setPageList([1, '...', numPages - 2, numPages - 1, numPages]);
                }
                else {
                    var PageListCurrent = [];
                    currentPage == 3 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat([1, '...']);
                    PageListCurrent = PageListCurrent.concat([currentPage-2, currentPage-1, currentPage, currentPage + 1, currentPage + 2])                    
                    currentPage == numPages - 2 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat(['...', numPages]);
                    setPageList(PageListCurrent);
                }
            }
        }
        catch (error)
        {
            console.error(error);
        }
    }


    useEffect(() => {
        getElectionData();
        getPageList();
        setSelectedRowId(null);
      }, [currentPage]
    )

    const handlePageChange = (pageNumber) => {
        console.log(pageNumber)
        setCurrentPage(pageNumber);
    }

    return (
        <div className='relative w-8/12'>
            <table className='table-auto w-full h-full border-collapse ml-8 caption-bottom'>
                <caption className='text-stone-300'>
                {pageList.map((page, index) => {
                    const isCurrentPage = page === currentPage;
                    const isEllipsis = page === '...';
                    const handleClick = () => {
                        if (!isEllipsis) {
                            handlePageChange(page);
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
                    {ElectionsData.map((row) => {
                        return (
                            <tr className='border-b-2 border-stone-100' key={dataElections.election_id}>
                                <td className='px-2 p-2'><button onClick={() => selectedRowId == row.election_id ? handleRowClick(null) : handleRowClick(row.election_id)}><svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="16" height="16" rx="3" stroke={selectedRowId === row.election_id ? "#42B261" : "#C6C6C6"} stroke-width={selectedRowId === row.election_id ? "4" : "2"}/></svg></button></td>
                                <td className='px-2 p-2 border-b-2 border-stone-100 mx-4'>{row.name_of_the_election.length > 50 ? `${row.name_of_the_election.slice(0, 50)}...` : row.name_of_the_election}</td>
                                <td className='px-2 p-2'>{moment(row.election_date).format('DD.MM.YYYY')}</td>
                                <td className='px-2 p-2'>{row.number_of_deputy_mandates == 0 ? 'Выборы главы' : `Выборы депутатов (${row.number_of_deputy_mandates} мандатов)`}</td>
                                <td className='px-2 p-2'>{row.ple.length > 30 ? `${row.ple.slice(0, 30)}...` : row.ple}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default observer(TableElections)