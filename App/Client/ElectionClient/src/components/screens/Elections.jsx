import Header from './../ui/Haeder'
import LeftMenu from './../ui/LeftMenu'
import MenuHeader from './../ui/MenuHeader'
// import './../../index.css'

function Elections() {
    return (
        <div className='w-screen h-screen overflow-hidden bg-gray-900'>
            <Header />
            <div className="flex pt-10">
                <div className='flex h-3/4 w-1/4 mr-32 right-0 absolute rounded-t-3xl bottom-0 bg-gradient-to-b from-gray-900 to-gray-800'>
                    <div className='text-white'>
                        Вот
                    </div>
                    <div className='text-white'>
                        И вот
                    </div>
                </div>
                <LeftMenu />
                <div className='w-full'>
                    <MenuHeader screenName='Выборы'/>
                    <div className='h-full rounded-t-3xl mt-8 mr-16 bg-gradient-to-br from-gray-800 to-gray-900'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Elections