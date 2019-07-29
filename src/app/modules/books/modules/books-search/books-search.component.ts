import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-books-search',
    templateUrl: './books-search.component.html',
    styleUrls: ['./books-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksSearchComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    @Input() query: string;
    @Input() searchLoading: boolean;
    @Output() search: EventEmitter<string> = new EventEmitter();

    @ViewChild('inputElement', {static: false}) inputElement: ElementRef;

    faTimes = faTimes;

    maxlength: 500;
    searchForm: FormGroup;

    private subscriptions: Subscription[] = [];

    set subs(sub) {
        this.subscriptions.push(sub);
    }

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.initForm();
    }

    ngAfterViewInit() {
        this.inputElement.nativeElement.focus();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {

        if (simpleChanges.query && this.searchForm) {
            this.searchForm.patchValue({query: this.query}, {emitEvent: false});
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    private initForm() {

        this.searchForm = this.fb.group({
            query: [this.query],
        });

        this.searchForm.controls.query.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                map(query => {
                    query = (query || '').trim().slice(0, this.maxlength);
                    this.search.emit(query);
                }),
            ).subscribe();
    }

    clearSearch() {
        this.searchForm.patchValue({query: ''});
    }
}
