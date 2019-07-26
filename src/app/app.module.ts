import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksComponent} from './components/books/books.component';
import {SearchComponent} from './components/search/search.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {URLInterceptor} from './interceptors/url.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {ErrorsInterceptor} from './interceptors/errors.interceptor';
import {StoreModule} from '@ngrx/store';
import {AppStore} from './reducers';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        SearchComponent,
        NavigationComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(AppStore.reducers, {
            metaReducers: AppStore.metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: URLInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorsInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
