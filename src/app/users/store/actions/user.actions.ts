import { createAction, props } from '@ngrx/store';
import { Users } from '../user';

export const InvokeLoadAllUsers = createAction(
  '[Users API] Invoke Users Fetch API'
);

export const loadAllUsers = createAction(
  '[Users API] Load All Users',
  props<{ allUsers: Users[] }>()
);
