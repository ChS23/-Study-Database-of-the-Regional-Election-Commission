function ElectionFilter(props)
{
    const { countRecord, filter, setFilter } = props;


    const updateFilterField = async (fieldName, value) => {
        setFilter(prevFilter => ({
          ...prevFilter,
          [fieldName]: value
        }));

        console.log(filter)
    }

    return (
        <div className='flex h-4/5 w-1/5 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
            <div className='relative flex flex-col items-center w-full mt-10'>
                <div className='text-white flex flex-col items-center justify-between'>
                    <span className='text-5xl font-medium'>{countRecord.allCount}</span>
                    <span className="text-xl pt-2 font-medium">Всего выборов</span>
                </div>
                <div className='text-white flex flex-col items-center justify-between pt-10'>
                    <span className='text-5xl font-medium'>{countRecord.filterCount}</span>
                    <span className="text-xl pt-2 font-medium">Выведено</span>
                </div>
                <div className="border-green-400 hidden"></div>
                <div className="relative">
                    <button onClick={() => updateFilterField('upcoming', !filter.upcoming)}
                    className={`block w-auto px-4 mt-10 text-md bg-inherit h-10 border text-${filter.upcoming ? 'green-400' : 'stone-100'} border-${filter.upcoming ? 'green-400' : 'stone-100'} rounded-3xl`}>Вывести предстоящие</button>
                </div>
                <div className="relative flex flex-row">
                    <button onClick={() => updateFilterField('type', filter.type == 1 ? null : 1)}
                    className={`block w-auto px-4 mr-4 mt-4 text-md bg-inherit h-10 text-${filter.type == 1 ? 'green-400' : 'stone-100'} border border-${filter.type == 1 ? 'green-400' : 'stone-100'} rounded-3xl`}>Выборы глав</button>
                    <button onClick={() => updateFilterField('type', filter.type == 2 ? null : 2)}
                    className={`block w-auto px-4 mt-4 text-md bg-inherit h-10 text-${filter.type == 2 ? 'green-400' : 'stone-100'} border border-${filter.type == 2 ? 'green-400' : 'stone-100'} rounded-3xl`}>депутатов</button>
                </div>
                <div className="relative flex flex-row w-full">
                    <input onChange={val => updateFilterField('dateFrom', val.target.value)} value={filter.dateFrom} type="date"
                    className="block w-full text-xs p-2 pl-4 mt-4 ml-8 mr-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl selection:border-green-400"
                    placeholder="Дата с" min="2010-01-01" max="2025-01-01"/>
                    <input onChange={val => updateFilterField('dateTo', val.target.value)} value={filter.dateTo} type="date"
                    className="block w-full text-xs p-2 pl-4 mt-4 mr-8 ml-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-400"
                    placeholder="по" min="2010-01-01" max="2025-01-01"/>
                </div>
                <div className="relative">
                    <input onChange={val => updateFilterField('nameSearch', val.target.value == '' ? null : val.target.value)} value={filter.nameSearch}
                    type="name" className="block w-full p-2 pl-8 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Поиск по названию"/>
                </div>
                <div className="relative">
                    <button className="block w-32 mt-6 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Добавить</button>
                </div>
            </div>
        </div>
    )
}


export default ElectionFilter