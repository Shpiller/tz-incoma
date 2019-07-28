import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {URLInterceptor} from './interceptors/url.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {ErrorsInterceptor} from './interceptors/errors.interceptor';
import {StoreModule} from '@ngrx/store';
import {AppStore} from './store/app.store';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/app.effects';
import {CustomRouterSerializer} from './serializers/custom-route.serializer';
import {NavigationModule} from './modules/navigation/navigation.module';
import {BooksModule} from './modules/books/books.module';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {FavouritesModule} from './modules/favourites/favourites.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(AppStore.reducers, {
            metaReducers: AppStore.metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: CustomRouterSerializer,
        }),
        EffectsModule.forRoot([AppEffects]),
        NavigationModule,
        BooksModule,
        FavouritesModule,
        !environment.production ? StoreDevtoolsModule.instrument({maxAge: 50}) : [],
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
