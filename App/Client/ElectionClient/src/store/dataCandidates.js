import {action, makeObservable, observable, runInAction} from 'mobx'
import { getCandidates, getCurrentNumberOfCandidates } from '../helpers/apiCandidates'


export class DataCandidates  {

    allRecordsCount = 0
    selectedRecordCount = 0
    currentPage = 1
    pageList = []
    data = []


    constructor(rootStore) {
        this.filterCandidates = rootStore.filterCandidates
        makeObservable(this, {
            data: observable,
            allRecordsCount: observable,
            selectedRecordCount: observable,
            currentPage: observable,
            pageList: observable,
            updateData: action.bound,
            updateAllRecordsCount: action.bound,
            updateSelectedRecordCount: action.bound,
            updatePageList: action.bound,
            updateCurrentPage: action.bound,
            updateCurrentPageByCandidateId: action.bound,
        });
    }


    async updateCurrentPageByCandidateId(candidate_id)
    {
        const currentPage = Math.ceil(await getCurrentNumberOfCandidates(candidate_id, this.filterCandidates) / 10);
        runInAction(
            () => {
                this.currentPage = currentPage;
                this.updateData();
            }
        );
    }


    updateCurrentPage(currentPage)
    {
        this.currentPage = currentPage;
    }


    updateAllRecordsCount(allRecordsCount)
    {
        this.allRecordsCount = allRecordsCount;
    }


    updateSelectedRecordCount(selectedRecordCount)
    {
        this.selectedRecordCount = selectedRecordCount;
    }


    async updateData()
    {
        const data = await getCandidates(this.currentPage, this.filterCandidates);
        if (this.currentPage > Math.ceil(data.count.filterCount / 10))
        {
            this.currentPage = Math.ceil(data.count.filterCount / 10);
            this.updateData();
        }
        runInAction(
            () => {
                this.data = data;
                this.updateAllRecordsCount(data.count.allCount);
                this.updateSelectedRecordCount(data.count.filterCount);
                this.updatePageList();
            }
        );
    }


    async updatePageList()
    {
        const numPages = Math.ceil(this.selectedRecordCount / 10);
        let pageList = [];

        if (numPages <= 5) {
            pageList = Array.from({length: numPages}, (_, i) => i + 1);
        }
        else if (this.currentPage <= 3) {
            pageList = [1, 2, 3, 4, 5];
        }
        else if (this.currentPage >= numPages - 2) {
            pageList = Array.from({length: 5}, (_, i) => i + numPages - 4);
        }
        else {
            var PageListCurrent = [];
            this.currentPage == 3 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat([1, '...']);
            PageListCurrent = PageListCurrent.concat([this.currentPage-2, this.currentPage-1, this.currentPage, this.currentPage + 1, this.currentPage + 2])                    
            this.currentPage == numPages - 2 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat(['...', numPages]);
            pageList = (PageListCurrent);
        }
        runInAction(
            () => {
                this.pageList = pageList;
            }
        );
    }
}