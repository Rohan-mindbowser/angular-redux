import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Users } from './user';

export const selectUsers = createFeatureSelector<Users[]>('myusers');

// export const selectBookById = (bookId: number) =>
//   createSelector(selectBooks, (books: Books[]) => {
//     var bookbyId = books.filter((_) => _.id == bookId);
//     if (bookbyId.length == 0) {
//       return null;
//     }
//     return bookbyId[0];
//   });
