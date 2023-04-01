import { ReactComponent as LogoIcon } from './../../../public/logo.svg';
import './../../index.css'

function Header() {
  return (
    <header className="bg-gray-900">
      <div className="max-w-7xl pt-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-start mt-4 h-16">
          <div className="overflow-hidden w-full sm:w-16 sm:h-16 lg:w-20 lg:h-20">
            <LogoIcon className="w-10 sm:w-12 lg:w-16" />
          </div>
          <div className="">
            <h1 className="font-bold text-white text-lg lg:text-xl leading-tight">Областная избирательная комиссия</h1>
            <h2 className="font-bold text-white text-lg lg:text-xl leading-tight">Волгоградской области</h2>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;