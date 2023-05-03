import React, {useEffect} from "react";
import {observer} from "mobx-react";
import Header from "./../ui/Haeder";
import LeftMenu from "./../ui/LeftMenu";
import MenuHeader from "./../ui/MenuHeader";
import { useStore } from "../../hooks/useStore";
import TableCandidates from "../ui/TableCandidates";
import CandidateFilter from "../ui/CandidateFilter";
import CandidateEdit from "../ui/CandidateEdit";



export default observer(function Candidates()
{
    const { editCandidates } = useStore();

    useEffect(() => {
    }, [])

    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Кандидаты'/>
                    {editCandidates.candidate_id != -1 ? <CandidateEdit/> : <CandidateFilter/>}
                    <div className='h-full rounded-t-3xl mt-6 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>
                        <TableCandidates/>
                    </div>
                </div>
            </div>
        </div>
    )
});