import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'
import Header from './../ui/Haeder'
import LeftMenu from './../ui/LeftMenu'
import MenuHeader from './../ui/MenuHeader'
import ElectionFilter from './../ui/ElectionFilter'
import ElectionEdit from '../ui/ElectionEdit'
import TableElections from '../ui/TableElections'
import { useStore } from '../../hooks/useStore';
import ModalElectionInfo from '../ui/modalElectionInfo';


function Elections() {

    const { editElections } = useStore();
    const [InfoElection, setInfoElection] = useState(-1);

    useEffect(() => {
        editElections.updatePleDict();
    }, [])

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Выборы'/>
                    {editElections.election_id != -1 ? <ElectionEdit/> : <ElectionFilter/>}
                    <div className='h-full rounded-t-3xl mt-6 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>
                        <TableElections InfoElection = {InfoElection} setInfoElection = {setInfoElection}/>
                    </div>
                </div>
            </div>
            {InfoElection != -1 ? <ModalElectionInfo id = {InfoElection} onClose={() => setInfoElection(-1)} /> : <div></div>}
        </div>
    )
}

export default observer(Elections)