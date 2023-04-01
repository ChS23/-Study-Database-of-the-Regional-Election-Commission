import './../../index.css'


function MenuHeader(props) {
    return (
        <div className="h-32 w-full flex items-center pl-4 bg-gradient-to-r from-green-600 to-green-800 rounded-l-3xl">
            <h1 className="text-3xl font-bold text-white px-8">{props.screenName}</h1>
        </div>
    );
  }
  
  export default MenuHeader;