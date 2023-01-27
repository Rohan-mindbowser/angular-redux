import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  InvokeLoadAllUsers,
  loadAllUsers,
} from '../store/actions/user.actions';
import { selectUsers } from '../store/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users$ = this.store.pipe(select(selectUsers));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(InvokeLoadAllUsers());
  }
}
