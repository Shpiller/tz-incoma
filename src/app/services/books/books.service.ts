import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BooksService {

    constructor(private http: HttpClient) {
    }

    getBooks(query: string, startIndex: number = 0) {
        return this.http.get(`volumes?q=${query}&startIndex=${startIndex}`);
    }
}
