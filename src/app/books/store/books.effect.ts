import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import {
  map,
  mergeMap,
  withLatestFrom,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { Appstate } from 'src/app/shared/store/appstate';
import { BooksService } from '../books.service';
import {
  booksFetchAPISuccess,
  invokeBooksAPI,
  invokeSaveNewBookAPI,
  saveNewBookAPISucess,
  invokeUpdateBookAPI,
  updateBookAPISucess,
  deleteBookAPISuccess,
  invokeDeleteBookAPI,
} from './books.action';
import { selectBooks } from './books.selector';

@Injectable()
export class BooksEffect {
  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  // loadAllBooks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(invokeBooksAPI),
  //     withLatestFrom(this.store.pipe(select(selectBooks))),
  //     mergeMap(([, bookfromStore]) => {
  //       if (bookfromStore.length > 0) {
  //         return EMPTY;
  //       }
  //       return this.booksService
  //         .get()
  //         .pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
  //     })
  //   )
  // );

  loadAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeBooksAPI),
      switchMap(() =>
        this.booksService.get().pipe(
          map((data) => booksFetchAPISuccess({ allBooks: data })),
          catchError((error) => [error])
        )
      )
    );
  });

  saveNewBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.create(action.newBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewBookAPISucess({ newBook: data });
          })
        );
      })
    );
  });

  updateBookAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.update(action.updateBook).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updateBookAPISucess({ updateBook: data });
          })
        );
      })
    );
  });

  deleteBooksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.booksService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deleteBookAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });
}
