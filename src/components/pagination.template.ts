export const PAGINATION_TEMPLATE = `
<div class="pagination-box">
    <div class="pagination-range" *ngIf="show_range">
        {{dataTable.translations.paginationRange}}:
        <span [textContent]="dataTable.offset + 1"></span>
        -
        <span [textContent]="[dataTable.offset + dataTable.limit , dataTable.itemCount] | min"></span>
        /
        <span [textContent]="dataTable.itemCount"></span>
    </div>
    <div class="pagination-controllers">
        <div class="pagination-limit" *ngIf="show_limit">
            <div class="input-group">
                <span class="input-group-addon">{{dataTable.translations.paginationLimit}}:</span>
                <input #limitInput type="number" class="form-control" min="1" step="1"
                       [ngModel]="limit" (blur)="limit = limitInput.value"
                       (keyup.enter)="limit = limitInput.value" (keyup.esc)="limitInput.value = limit"/>
            </div>
        </div>
        <div class=" pagination-pages">
            <div class=" m10 offset-m2 s12">
                <ul class="pagination pagi-align">
                    <li class="waves-effect"  [ngClass]="{disabled: dataTable.offset <= 0}">
                        <a (click)="!(dataTable.offset <= 0) && pageFirst()"><i class="material-icons">first_page</i></a>
                    </li>
                    <li class="waves-effect" [ngClass]="{disabled: dataTable.offset <= 0}">
                        <a (click)="!(dataTable.offset <= 0) && pageBack()" ><i class="material-icons">chevron_left</i></a>
                    </li>
                    <li class="waves-effect hover-indi" *ngIf="hasPrevious(maxPage,page)">...</li>
    
                    <li class="waves-effect" *ngFor="let i of createPageRange(maxPage,page)" [ngClass]="{active: page == i}">
                        <a (click)="page = i">{{i}}</a>
                    </li>
                    
                    <li class="waves-effect hover-indi" *ngIf="hasNext(maxPage,page)">...</li>
                    <li class="waves-effect" [ngClass]="{disabled: (dataTable.offset + dataTable.limit) >= dataTable.itemCount}">
                        <a (click)="!((dataTable.offset + dataTable.limit) >= dataTable.itemCount) && pageForward()" >
                            <i class="material-icons">chevron_right</i>
                        </a>
                    </li>
                    <li class="waves-effect" [ngClass]="{disabled: (dataTable.offset + dataTable.limit) >= dataTable.itemCount}">
                        <a (click)="!((dataTable.offset + dataTable.limit) >= dataTable.itemCount) && pageLast()"><i class="material-icons">last_page</i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
`;