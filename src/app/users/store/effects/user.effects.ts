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
import { Appstate } from 'src/app/shared/store/appstate';
import { UserService } from '../../user.service';
import { InvokeLoadAllUsers, loadAllUsers } from '../actions/user.actions';

@Injectable()
export class UsersEffect {
  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}

  loadAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeLoadAllUsers),
      switchMap(() =>
        this.userService.getAllUsers().pipe(
          map((data) => loadAllUsers({ allUsers: data })),
          catchError((error) => [error])
        )
      )
    );
  });
}
