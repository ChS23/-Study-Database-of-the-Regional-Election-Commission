import { ReactComponent as AnalyticsIcon } from './../../../public/analytics.svg';
import { ReactComponent as CandidateIcon } from './../../../public/candidate.svg';
import { ReactComponent as ElectionsIcon } from './../../../public/elections.svg';

function LeftMenu() {
    return (
        <nav class="flex flex-col items-center bg-gray-900 text-white h-screen w-16 sm:w-24 md:w-32 lg:w-48 xl:w-64">
            <a href="#" class="flex items-center justify-center h-16 w-full hover:bg-gray-800">
                <ElectionsIcon className="fill-white text-white" />
            </a>
            <a href="#" class="flex items-center justify-center h-16 w-full hover:bg-gray-800">
                <CandidateIcon className="" />
            </a>
            <a href="#" class="flex items-center justify-center h-16 w-full hover:bg-gray-800">
                <AnalyticsIcon className="" />
            </a>
        </nav>
    );
  }
  
  export default LeftMenu;