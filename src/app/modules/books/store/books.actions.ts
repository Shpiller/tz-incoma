import {Action} from '@ngrx/store';
import {CommonInterfaces} from '../../../interfaces/common.interfaces';
import {BooksInterfaces} from '../interfaces/books.interfaces';

export namespace BooksActionTypes {

    export const PATCH_SERVICE_LOADING = '[BooksActions] PATCH_SERVICE_LOADING';

    export const GET_BOOKS = '[BooksActions] GET_BOOKS';
    export const GET_BOOKS_SUCCESS = '[BooksActions] GET_BOOKS_SUCCESS';
    export const GET_BOOKS_FAILED = '[BooksActions] GET_BOOKS_FAILED';

    export const GET_NEXT_BOOKS_PAGE = '[BooksActions] GET_NEXT_BOOKS_PAGE';
    export const GET_NEXT_BOOKS_PAGE_SUCCESS = '[BooksActions] GET_NEXT_BOOKS_PAGE_SUCCESS';
    export const GET_NEXT_BOOKS_PAGE_FAILED = '[BooksActions] GET_NEXT_BOOKS_PAGE_FAILED';
}

export namespace BooksActions {

    export class PatchServiceLoading implements Action {

        readonly type = BooksActionTypes.PATCH_SERVICE_LOADING;

        constructor(public payload: CommonInterfaces.IMapOfBoolean) {
        }
    }

    export class GetBooks implements Action {

        readonly type = BooksActionTypes.GET_BOOKS;

        constructor(public payload: string) {
        }
    }

    export class GetBooksSuccess implements Action {

        readonly type = BooksActionTypes.GET_BOOKS_SUCCESS;

        constructor(public payload: BooksInterfaces.IListResponse) {
        }
    }

    export class GetBooksFailed implements Action {

        readonly type = BooksActionTypes.GET_BOOKS_FAILED;
    }

    export class GetNextBooksPage implements Action {

        readonly type = BooksActionTypes.GET_NEXT_BOOKS_PAGE;
    }

    export class GetNextBooksPageSuccess implements Action {

        readonly type = BooksActionTypes.GET_NEXT_BOOKS_PAGE_SUCCESS;

        constructor(public payload: BooksInterfaces.IVolume[]) {
        }
    }

    export class GetNextBooksPageFailed implements Action {

        readonly type = BooksActionTypes.GET_NEXT_BOOKS_PAGE_FAILED;
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
