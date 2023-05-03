export default function ModalElectionInfo(props) {

    const { id, onClose } = props;


    return (
        <div className={`fixed inset-0 ${id!=-1 ? '' : 'pointer-events-none'}`}>
            <div 
                className={`fixed inset-0 bg-black ${id!=-1 ? 'opacity-50' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`} 
                onClick={onClose} 
            />
            
            <div className={`fixed right-0 h-full bg-gray-900 text-stone-200 shadow-lg w-full max-w-screen-sm p-4 ${id!=-1 ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300 ease-in-out`}>
                {id}
            </div>
        </div>
    )
}