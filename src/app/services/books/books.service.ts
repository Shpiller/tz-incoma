import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(private http: HttpClient) {
    }

    getBooks(query: string) {
        return this.http.get(`volumes?q=${query}`);
    }
}
