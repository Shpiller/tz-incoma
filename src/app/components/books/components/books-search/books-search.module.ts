import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksSearchComponent} from './books-search.component';



@NgModule({
  declarations: [BooksSearchComponent],
  exports: [BooksSearchComponent],
  imports: [
    CommonModule
  ]
})
export class BooksSearchModule { }
