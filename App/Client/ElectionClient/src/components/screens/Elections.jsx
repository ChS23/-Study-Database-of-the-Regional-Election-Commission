import React, { useState } from 'react';

import Header from './../ui/Haeder'
import LeftMenu from './../ui/LeftMenu'
import MenuHeader from './../ui/MenuHeader'
import ElectionFilter from './../ui/ElectionFilter'
import ElectionEdit from '../ui/ElectionEdit'
import TableElections from '../ui/TableElections'
// import './../../index.css'
// import Election from '../models/election'


function Elections() {

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [filter, setFilter] = useState(
        {
            upcoming: false,
            type: null,
            dateFrom: null,
            dateTo: null,
            nameSearch: null,
            pleString: null
        }
    )
    const [countRecord, setCountRecord] = useState(
        {
            allCount: 0,
            filterCount: 0
        }
    )


    const handleRowClick = (election_id) => {
        setSelectedRowId(election_id);
      };

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Выборы'/>
                    {selectedRowId != null ? <ElectionEdit/> : <ElectionFilter countRecord = {countRecord}/>}
                    <div className='h-full rounded-t-3xl mt-6 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>
                        <TableElections selectedRowId={selectedRowId} setSelectedRowId = {setSelectedRowId} handleRowClick={handleRowClick} setCountRecord={setCountRecord}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Elections