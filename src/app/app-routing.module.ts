import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from './modules/books/books.component';


const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        data: {
            loadBooks: true,
        }
    },
    {
        path: 'favourites',
        loadChildren: () => import('./modules/favourites/favourites.module').then(m => m.FavouritesModule),
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
