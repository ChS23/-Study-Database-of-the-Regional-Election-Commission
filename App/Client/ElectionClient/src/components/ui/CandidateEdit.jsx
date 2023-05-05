import { observer } from 'mobx-react'
import {useStore} from "../../hooks/useStore.js";
import Select from 'react-select';
import { useEffect } from 'react';


function CandidateEdit()
{
    const { editCandidates } = useStore();

    useEffect(
        () => {
            console.log(editCandidates);
        }, []
    )

    function handleDelete()
    {
        if (confirm("Вы точно хотите удалить?"))
        {
            editCandidates.deleteCandidateRecord();
            editCandidates.reset();
        }
    }


    async function handleUpdate()
    {
        await editCandidates.updateCandidateRecord();
    }


    const handleChange = (value) => {
        editCandidates.updateId_party(value.value);
        editCandidates.updateParty_name(value.label);
        console.log(value.value);
    };


    return (
        <div className='flex h-4/5 w-1/5 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
                    <div className='relative flex flex-col items-center w-full mt-10'>
                        <div className="relative">
                            <span className="block text-white text-2 font-semibold text-xl">Редактирование</span>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Имя кандидата</span>
                            <textarea value={editCandidates.full_name} onChange={val => editCandidates.updateFull_name(val.target.value)}
                                      className="block w-full resize-none scrollbar-thin scrollbar-thumb-stone-100 p-2 px-4 mt-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="ФИО Кандидата"/>
                        
                            {/* <input type="name" className="block w-full p-2 px-4 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="ФИО"/> */}
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Дата рождения</span>
                            <input onChange={val => editCandidates.updateBirthday(val.target.value)} value={editCandidates.birthday}
                            type="date" className="block w-full p-2 px-4 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="2022-01-01"/>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Партия</span>
                            {/* <input type="name" className="block w-full p-2 px-4 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Название партии"/> */}
                            <Select className="w-full p-2 px-4 mt-2 text-md bg-inherit text-stone-100"
                                    onChange={handleChange}
                                    options={editCandidates.partyDict}
                                    value={[editCandidates.partyDict.find(el => el.value == editCandidates.id_party)]}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }),
                                        menu: (provided, state) => ({
                                        ...provided,
                                        maxHeight: "auto",
                                        overflowY: "auto",
                                        color: "black",
                                        opacity: 1,
                                        }),
                                        singleValue: (provided, state) => ({
                                            ...provided,
                                            color: 'white',
                                            border: 'none',
                                        }),
                                    }
                                    }
                            />
                        </div>
                        <div className="relative flex flex-row mt-10">
                            <button onClick={handleUpdate} className="block w-32 mt-6 mr-2 text-md bg-inherit h-10 text-yellow-200 border border-yellow-200 rounded-3xl focus:border-green-500">Обновить</button>
                            <button onClick={handleDelete} className="block w-32 mt-6 ml-2 text-md bg-inherit h-10 text-rose-500 border border-rose-500 rounded-3xl focus:border-green-500">Удалить</button>
                        </div>
                    </div>
                </div>
    )
}


export default observer(CandidateEdit);