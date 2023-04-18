function ElectionFilter(props)
{
    const { countRecord } = props;


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
                        <div className="relative">
                            <button className="block w-auto px-4 mt-10 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Вывести предстоящие</button>
                        </div>
                        <div className="relative flex flex-row">
                            <button className="block w-auto px-4 mr-4 mt-4 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Выборы глав</button>
                            <button className="block w-auto px-4 mt-4 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">депутатов</button>
                        </div>
                        <div className="relative flex flex-row">
                            <input type="name" className="block w-full p-2 pl-4 mt-4 ml-8 mr-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Дата с"/>
                            <input type="name" className="block w-full p-2 pl-4 mt-4 mr-8 ml-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="по"/>
                        </div>
                        <div className="relative">
                            <input type="name" className="block w-full p-2 pl-8 mt-4 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Поиск по названию"/>
                        </div>
                        <div className="relative">
                            <button className="block w-32 mt-6 text-md bg-inherit h-10 text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500">Добавить</button>
                        </div>
                    </div>
                </div>
    )
}


export default ElectionFilter