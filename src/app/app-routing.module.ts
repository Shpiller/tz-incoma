import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from './modules/books/books.component';
import {FavouritesComponent} from './modules/favourites/favourites.component';


const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
    },
    {
        path: 'favourites',
        component: FavouritesComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
