import {Component, Inject, forwardRef, Input} from '@angular/core';
import {DataTable} from './table.component';
import {PAGINATION_TEMPLATE} from './pagination.template';
import {PAGINATION_STYLE} from "./pagination.style";


@Component({
    moduleId: module.id,
    selector: 'data-table-pagination',
    template: PAGINATION_TEMPLATE,
    styles: [PAGINATION_STYLE]
})
export class DataTablePagination {

    @Input() show_range = false;
    @Input() show_limit = false;
    @Input() show_input = false;
    @Input() show_numbers = true;

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {
    }

    pageBack() {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    }

    pageForward() {
        this.dataTable.offset += this.dataTable.limit;
    }

    pageFirst() {
        this.dataTable.offset = 0;
    }

    pageLast() {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    }

    get maxPage() {
        return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
    }

    get limit() {
        return this.dataTable.limit;
    }

    set limit(value) {
        this.dataTable.limit = Number(<any>value); // TODO better way to handle that value of number <input> is string?
    }

    get page() {
        return ( this.dataTable.page ? this.dataTable.page : ( ( this.dataTable.offset / this.dataTable.limit ) + 1) );
    }

    set page(value) {
        this.dataTable.page = Number(<any>value);
    }

    hasPrevious(number, currentPage) {
        const difference = this.getDifference();
        if ((currentPage - difference) > 1) {
            return true;
        }
        return false;
    }

    hasNext(number, currentPage) {
        const difference = this.getDifference();
        if ((number - currentPage) > difference) {
            return true;
        }
        return false;
    }

    getDifference() {
        const difference = 2;
        return difference;
    }

    createPageRange(number, currentPage): any[] {
        let items: number[] = [];
        if (number > 1) {
            const difference = this.getDifference();
            let maxPage = number;
            let minPage = 1;
            if ((number - currentPage) >= difference) {
                maxPage = currentPage + difference;
            }
            if ((currentPage - difference) >= 1) {
                minPage = currentPage - difference;
            }
            for (let i = minPage; i <= maxPage; i++) {
                items.push(i);
            }
        }
        return items;
    }
}
