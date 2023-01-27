import { createReducer, on } from '@ngrx/store';
import { loadAllUsers } from '../actions/user.actions';
import { Users } from '../user';

export const initialState: ReadonlyArray<Users> = [];

export const userReducer = createReducer(
  initialState,
  on(loadAllUsers, (state, { allUsers }) => {
    return allUsers;
  })
);
