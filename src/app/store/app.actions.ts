import {Action} from '@ngrx/store';
import {BooksInterfaces} from '../modules/books/interfaces/books.interfaces';
import {CommonInterfaces} from '../interfaces/common.interfaces';

export namespace AppActionsTypes {

    export const PATCH_SERVICE_LOADING = '[AppActions] PATCH_SERVICE_LOADING';

    export const GET_BOOKS = '[AppActions] GET_BOOKS';
    export const GET_BOOKS_SUCCESS = '[AppActions] GET_BOOKS_SUCCESS';
    export const GET_BOOKS_FAILED = '[AppActions] GET_BOOKS_FAILED';

    export const GET_NEXT_BOOKS_PAGE = '[AppActions] GET_NEXT_BOOKS_PAGE';
    export const GET_NEXT_BOOKS_PAGE_SUCCESS = '[AppActions] GET_NEXT_BOOKS_PAGE_SUCCESS';
    export const GET_NEXT_BOOKS_PAGE_FAILED = '[AppActions] GET_NEXT_BOOKS_PAGE_FAILED';
}

export namespace AppActions {

    export class PatchServiceLoading implements Action {

        readonly type = AppActionsTypes.PATCH_SERVICE_LOADING;

        constructor(public payload: CommonInterfaces.IMapOfBoolean) {
        }
    }

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

    export class GetBooksFailed implements Action {

        readonly type = AppActionsTypes.GET_BOOKS_FAILED;
    }

    export class GetNextBooksPage implements Action {

        readonly type = AppActionsTypes.GET_NEXT_BOOKS_PAGE;
    }

    export class GetNextBooksPageSuccess implements Action {

        readonly type = AppActionsTypes.GET_NEXT_BOOKS_PAGE_SUCCESS;

        constructor(public payload: BooksInterfaces.IVolume[]) {
        }
    }

    export class GetNextBooksPageFailed implements Action {

        readonly type = AppActionsTypes.GET_NEXT_BOOKS_PAGE_FAILED;
    }

    export type All =
        PatchServiceLoading
        | GetBooks
        | GetBooksSuccess
        | GetBooksFailed
        | GetNextBooksPage
        | GetNextBooksPageSuccess
        | GetNextBooksPageFailed;
}
