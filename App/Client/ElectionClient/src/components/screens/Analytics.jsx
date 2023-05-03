import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react'
import Header from './../ui/Haeder'
import LeftMenu from './../ui/LeftMenu'
import MenuHeader from './../ui/MenuHeader'
import AgeGroupPie from './../ui/AgeGroupPie'


function Analytics() {

    // useState tabs

    const [tab, setTab] = useState(0);

    
    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Аналитика'/>
                    <div className='h-full rounded-t-3xl mt-6 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>
                        <div className='mb-4 border-b border-gray-400 mx-4 text-stone-200'>
                            <ul className='flex flex-wrap -mb-px font-medium'>
                                <li className='mr-2'>
                                    <button 
                                    onClick={
                                        () => setTab(0)
                                    }
                                    className={`inline-block p-4 ${tab == 0 ? 'border-b-2' : 'border-b-0'} rounded-t-lg`}>
                                        Возрастные группы в партии
                                    </button>
                                </li>
                                {/* <li className='mr-2'>
                                    <button
                                    onClick={
                                        () => setTab(1)
                                    }
                                    className={`inline-block p-4 ${tab == 1 ? 'border-b-2' : 'border-b-0'} rounded-t-lg`}>
                                        Представители партий в выборах
                                    </button>
                                </li> */}
                            </ul>
                        </div>
                        <div className='h-full'>
                            {tab == 0 ? <AgeGroupPie className='h-full w-full'/> : <div>2</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default observer(Analytics)