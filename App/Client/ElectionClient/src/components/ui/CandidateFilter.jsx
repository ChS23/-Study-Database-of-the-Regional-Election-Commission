import { observer } from 'mobx-react'
import { useStore } from '../../hooks/useStore'


function CandidateFilter()
{
    const { filterCandidates, dataCandidates, editCandidates } = useStore()
    const { updateField } = filterCandidates

    function handleClick(field, value)
    {
        updateField(field, value);
        dataCandidates.updateCurrentPage(1);
        dataCandidates.updateData();
    }
    

    function addRecordHandle()
    {
        let name = prompt("Введите данные: имя кандидата");
        // validate name cyrillic only and spaces
        if (name.match(/[^а-яА-ЯёЁ\s]/g) || name.length < 3)
        {
            alert('Некорректное имя');
            return;
        }
        let birthday = prompt("Введите данные: дата рождения");
            // validate birthday format 01.01.2021
        if (!birthday.match(/\d{2}\.\d{2}\.\d{4}/g))
        {
            alert('Некорректная дата');
            return;
        }
        // convert birthday to YYYY-MM-DD
        birthday = birthday.split('.').reverse().join('-');

        let idPar = prompt("Введите данные: id партии");
            // validate idPar only digits and not empty and >= 0
        if (!idPar.match(/\d+/g) || idPar < 0)
        {
            alert('Некорректный id партии');
            return;
        }
        // add record
        editCandidates.createCandidateRecord(name, idPar, birthday);
    }

    return (
        <div className='flex h-4/5 w-1/5 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
                    <div className='relative flex flex-col items-center w-full mt-10'>
                        <div className='text-white flex flex-col items-center justify-between'>
                            <span className='text-5xl font-medium'>{dataCandidates.allRecordsCount}</span>
                            <span className="text-xl pt-2 font-medium">Всего кандидатов</span>
                        </div>
                        <div className='text-white flex flex-col items-center justify-between pt-10'>
                            <span className='text-5xl font-medium'>{dataCandidates.selectedRecordCount}</span>
                            <span className="text-xl pt-2 font-medium">Выведено</span>
                        </div>
                        <div className="relative">
                            <input type="name" className="block w-full p-2 pl-8 mt-10 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Поиск по имени"/>
                        </div>
                        <div className="relative flex flex-row">
                            <input type="date" className="block w-32 p-2 pl-4 mt-6 ml-8 mr-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Возраст от"/>
                            <input type="date" className="block w-32 p-2 pl-4 mt-6 mr-8 ml-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="и до"/>
                        </div>
                        <div className="relative">
                            <input type="name" className="block w-full p-2 pl-8 mt-6 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Поиск по партии"/>
                        </div>
                        <div className="relative">
                            <button className="block w-32 mt-10 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Добавить</button>
                        </div>
                    </div>
                </div>
    )
}


export default observer(CandidateFilter);