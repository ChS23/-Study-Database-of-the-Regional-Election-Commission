import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'
import Header from './../ui/Haeder'
import LeftMenu from './../ui/LeftMenu'
import MenuHeader from './../ui/MenuHeader'
import ElectionFilter from './../ui/ElectionFilter'
import ElectionEdit from '../ui/ElectionEdit'
import TableElections from '../ui/TableElections'
import { useStore } from '../../hooks/useStore';


function Elections() {

    const [selectedRowId, setSelectedRowId] = useState(null);
    const { dataElections } = useStore();

    const handleRowClick = (election_id) => {
        setSelectedRowId(election_id);
      };


    // useEffect( ()=>
    // {
    //     dataElections.updatePageList();
    //     dataElections.updateData();
    // })
    

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Выборы'/>
                    {selectedRowId != null ? <ElectionEdit/> : <ElectionFilter/>}
                    <div className='h-full rounded-t-3xl mt-6 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>
                        <TableElections selectedRowId={selectedRowId} setSelectedRowId = {setSelectedRowId} handleRowClick={handleRowClick}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Elections)