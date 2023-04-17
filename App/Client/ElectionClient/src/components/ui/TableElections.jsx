import React, { useState, useEffect } from 'react';
import axios from "axios"



function TableElections()
{

    const [ElectionsData, setElectionsData] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    const getElectionData = async () =>
    {
        try {
            const data = await axios.get("https://localhost:7122/elections/filter?from=1&to=11")
            setElectionsData(data.data)
        }
        catch (e)
        {
            console.error(e)
        }
    } 

    const getPageList = async () => {
        try {
            const count = await axios.get('https://localhost:7122/elections/countRowIsFilter');
            const numPages = Math.ceil(count.data / 10);
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
                    setPageList([1, '...', currentPage-2, currentPage-1, currentPage, currentPage + 1, currentPage + 2,'...', numPages]);
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
      }, [currentPage]
    )

    const handlePageChange = (pageNumber) => {
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
                        <button key={index} className={`mx-1 pt-2 ${isCurrentPage ? 'font-bold' : ''}`} onClick={handleClick}>{page}</button>
                    )
                })}
                </caption>
                <thead className='border-b-2 border-stone-100 text-stone-100'>
                    <tr>
                        <th><button>-</button></th>
                        <th className='px-2 p-4'>Название</th>
                        <th className='px-2 p-4'>Дата</th>
                        <th className='px-2 p-4'>Тип</th>
                        <th className='px-2 p-4'>Название ППО</th>
                    </tr>
                </thead>
                <tbody className='text-stone-300 text-xs'>
                    {ElectionsData.map((row) => {
                        return (
                            <tr className='border-b-2 border-stone-100' key={row.election_id}>
                                <td className='px-2 p-2'><button>-</button></td>
                                <td className='px-2 p-2 border-b-2 border-stone-100 mx-4'>{row.name_of_the_election}</td>
                                <td className='px-2 p-2'>{row.election_date}</td>
                                <td className='px-2 p-2'>{row.number_of_deputy_mandates}</td>
                                <td className='px-2 p-2'>{row.ple}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}

export default TableElections