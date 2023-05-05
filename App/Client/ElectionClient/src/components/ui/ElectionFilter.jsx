import { useEffect, useState } from 'react';
import { useStore } from '../../hooks/useStore'
import { observer } from 'mobx-react'


function ElectionFilter()
{
    const { filterElections, dataElections, editElections } = useStore()
    const { updateField } = filterElections

    


    function handleClick(field, value)
    {
        updateField(field, value);
        dataElections.updateCurrentPage(1);
        dataElections.updateData();
        console.log(value)
        // dataElections.updatePageList();
    }


    function addRecordHandle()
    {
        let name = prompt("Введите данные: название выборов");
        // validate name cyrillic only and spaces
        if (name.match(/[^а-яА-ЯёЁ\s]/g) || name.length < 3)
        {
            alert('Некорректное название');
            return;
        }
        let date = prompt("Введите данные: дата проведения");
            // validate date format 01.01.2021
        if (!date.match(/\d{2}\.\d{2}\.\d{4}/g))
        {
            alert('Некорректная дата');
            return;
        }
        // convert date to YYYY-MM-DD
        date = date.split('.').reverse().join('-');

        let mandats = prompt("Введите данные: количесвто мандатов");
        // validate mandats only digits and not empty and >= 0
        if (!mandats.match(/\d+/g) || mandats < 0)
        {
            alert('Некорректное количество мандатов');
            return;
        }
        let idPle = prompt("Введите данные: id ППО");
        // validate idPle only digits and not empty and >= 0
        if (!idPle.match(/\d+/g) || idPle < 0)
        {
            alert('Некорректный id ППО');
            return;
        }
        // add record
        editElections.addRecord(name, date, mandats, idPle);
        console.log(name, date, mandats, idPle);
    }



    return (
        <div className='flex h-4/5 w-1/5 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
            <div className='relative flex flex-col items-center w-full mt-10'>
                <div className='text-white flex flex-col items-center justify-between'>
                    <span className='text-5xl font-medium'>{dataElections.allRecordsCount}</span>
                    <span className="text-xl pt-2 font-medium">Всего выборов</span>
                </div>
                <div className='text-white flex flex-col items-center justify-between pt-10'>
                    <span className='text-5xl font-medium'>{dataElections.selectedRecordCount}</span>
                    <span className="text-xl pt-2 font-medium">Выведено</span>
                </div>
                <div className="border-green-400 hidden"></div>
                <div className="relative">
                    <button onClick={() => handleClick('upcoming', !filterElections.upcoming)}
                    className={`block w-auto px-4 mt-10 text-md bg-inherit h-10 border text-${filterElections.upcoming ? 'green-400' : 'stone-100'} border-${filterElections.upcoming ? 'green-400' : 'stone-100'} rounded-3xl`}>Вывести предстоящие</button>
                </div>
                <div className="relative flex flex-row">
                    <button onClick={() => handleClick('type', filterElections.type == 1 ? null : 1)}
                    className={`block w-auto px-4 mr-4 mt-4 text-md bg-inherit h-10 text-${filterElections.type == 1 ? 'green-400' : 'stone-100'} border border-${filterElections.type == 1 ? 'green-400' : 'stone-100'} rounded-3xl`}>Выборы глав</button>
                    <button onClick={() => handleClick('type', filterElections.type == 2 ? null : 2)}
                    className={`block w-auto px-4 mt-4 text-md bg-inherit h-10 text-${filterElections.type == 2 ? 'green-400' : 'stone-100'} border border-${filterElections.type == 2 ? 'green-400' : 'stone-100'} rounded-3xl`}>депутатов</button>
                </div>
                <div className="relative flex flex-row w-full">
                    <input onChange={val => handleClick('dateFrom', val.target.value)} value={filterElections.dateFrom} type="date"
                    className="block w-full text-xs p-2 pl-4 mt-4 ml-8 mr-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl selection:border-green-400"
                    placeholder="Дата с" min="2010-01-01" max="2025-01-01"/>
                    <input onChange={val => handleClick('dateTo', val.target.value)} value={filterElections.dateTo} type="date"
                    className="block w-full text-xs p-2 pl-4 mt-4 mr-8 ml-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-400"
                    placeholder="по" min="2010-01-01" max="2025-01-01"/>
                </div>
                <div className="relative">
                    <input onChange={val => handleClick('nameSearch', val.target.value == '' ? '' : val.target.value)} value={filterElections.nameSearch}
                    type="name" className="block w-full p-2 pl-8 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Поиск по названию"/>
                </div>
                <div className="relative">
                    <button onClick={addRecordHandle} className="block w-40 mt-6 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Добавить запись</button>
                </div>
            </div>
        </div>
    )
}


export default observer(ElectionFilter)