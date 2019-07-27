import {Action} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';

export namespace AppActionsTypes {

    export const GET_BOOKS = '[AppActions] GET_BOOKS';
    export const GET_BOOKS_SUCCESS = '[AppActions] GET_BOOKS_SUCCESS';

    export const GET_NEXT_BOOKS_PAGE = '[AppActions] GET_NEXT_BOOKS_PAGE';
    export const GET_NEXT_BOOKS_PAGE_SUCCESS = '[AppActions] GET_NEXT_BOOKS_PAGE_SUCCESS';
}

export namespace AppActions {

    export class GetBooks implements Action {

        readonly type = AppActionsTypes.GET_BOOKS;

        constructor(public payload: string) {
        }
    }

    export class GetBooksSuccess implements Action {

        readonly type = AppActionsTypes.GET_BOOKS_SUCCESS;

        constructor(public payload: BooksInterfaces.IListResponse) {
        }
    }

    export class GetNextBooksPage implements Action {

        readonly type = AppActionsTypes.GET_NEXT_BOOKS_PAGE;
    }

    export class GetNextBooksPageSuccess implements Action {

        readonly type = AppActionsTypes.GET_NEXT_BOOKS_PAGE_SUCCESS;

        constructor(public payload: BooksInterfaces.IVolume[]) {
        }
    }

    export type All =
        GetBooks
        | GetBooksSuccess
        | GetNextBooksPage
        | GetNextBooksPageSuccess;
}
