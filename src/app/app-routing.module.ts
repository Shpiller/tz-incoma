import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BooksComponent} from './components/books/books.component';


const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
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
