import { ReactComponent as AnalyticsIcon } from './../../../public/analytics.svg';
import { ReactComponent as CandidateIcon } from './../../../public/candidate.svg';
import { ReactComponent as ElectionsIcon } from './../../../public/elections.svg';

function LeftMenu() {
    return (
        <nav class="flex flex-col items-center bg-gray-900 pt-4 text-white h-screen w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32">
            <a href="#" class="flex items-center justify-center h-16 w-full">
                <ElectionsIcon className="fill-white text-white" />
            </a>
            <a href="#" class="flex items-center justify-center h-16 w-full">
                <CandidateIcon className="" />
            </a>
            <a href="#" class="flex items-center justify-center h-16 w-full">
                <AnalyticsIcon className="" />
            </a>
        </nav>
    );
  }
  
  export default LeftMenu;