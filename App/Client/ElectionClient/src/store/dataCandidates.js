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
                this.updateCurrentPage(currentPage);
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
        if (data.counts.filterCount == 0) {
            runInAction(
                () => {
                    this.data = [];
                    this.allRecordsCount = 0;
                    this.selectedRecordCount = 0;
                    this.updatePageList();
                }
            );
            return
        }
        if (this.currentPage > Math.ceil(data.counts.filterCount / 10))
        {
            this.currentPage = Math.ceil(data.counts.filterCount / 10);
            this.updateData();
            return
        }
        runInAction(
            () => {
                this.data = data.candidates;
                this.updateAllRecordsCount(data.counts.allCount);
                this.updateSelectedRecordCount(data.counts.filterCount);
                this.updatePageList();
            }
        );
        return
    }


    async updatePageList()
    {
        const numPages = Math.ceil(this.selectedRecordCount / 10);
        let pageList = []

        if (numPages <= 5) {
            pageList = Array.from({length: numPages}, (_, i) => i + 1);
        } 
        else {
            if (this.currentPage < 3) {
                pageList = ([1, 2, 3, '...', numPages]);
            } 
            else if (this.currentPage > numPages - 2) {
                pageList = ([1, '...', numPages - 2, numPages - 1, numPages]);
            }
            else {
                var PageListCurrent = [];
                this.currentPage == 3 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat([1, '...']);
                PageListCurrent = PageListCurrent.concat([this.currentPage-2, this.currentPage-1, this.currentPage, this.currentPage + 1, this.currentPage + 2])                    
                this.currentPage == numPages - 2 ? PageListCurrent = PageListCurrent.concat([]) : PageListCurrent = PageListCurrent.concat(['...', numPages]);
                pageList = (PageListCurrent);
            }
        }
        runInAction(
            () => this.pageList = pageList
        )
    }
}