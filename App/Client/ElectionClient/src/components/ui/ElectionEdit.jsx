function ElectionEdit()
{
    return (
        <div className='flex h-4/5 w-1/5 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
                    <div className='relative flex flex-col items-center w-full mt-10'>
                        <div className="relative">
                            <span className="block text-white text-2 font-semibold text-xl">Редактирование</span>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Название</span>
                            <input type="name" className="block w-full p-2 px-4 mt-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="Наименование выборов"/>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Дата проведения</span>
                            <input type="name" className="block w-full p-2 px-4 mt-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="17.04.2023"/>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Количество мандатов</span>
                            <input type="name" className="block w-full p-2 px-4 mt-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="0"/>
                        </div>
                        <div className='text-stone-100 flex flex-col items-center justify-between pt-6'>
                            <span className="block w-auto">Название ППО</span>
                            <input type="name" className="block w-full p-2 px-4 mt-2 text-md bg-inherit text-stone-100 border border-stone-100 rounded-3xl focus:border-green-500" placeholder="0"/>
                        </div>
                        <div className="relative flex flex-row mt-4">
                            <button className="block w-32 mt-6 mr-2 text-md bg-inherit h-10 text-yellow-200 border border-yellow-200 rounded-3xl focus:border-green-500">Обновить</button>
                            <button className="block w-32 mt-6 ml-2 text-md bg-inherit h-10 text-rose-500 border border-rose-500 rounded-3xl focus:border-green-500">Удалить</button>
                        </div>
                    </div>
                </div>
    )
}


export default ElectionEdit