import {action, makeObservable, observable, runInAction} from 'mobx'
import { getElections } from '../helpers/apiElections'


export class DataElections  {

    allRecordsCount = 0
    selectedRecordCount = 0
    currentPage = 1
    pageList = []
    data = []
    

    constructor(rootStore) {
        this.filterElections = rootStore.filterElections
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
            updateCurrentPage: action.bound
        });
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
        const data = await getElections(this.currentPage, this.filterElections);
        runInAction(
            () => 
            {
                this.data = data.elections;
                this.allRecordsCount = data.counts.allCount;
                this.selectedRecordCount = data.counts.filterCount;
                this.updatePageList()
                // console.log(data.counts.item2);
            }
        );
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