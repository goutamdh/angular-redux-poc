import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getAuthState } from 'src/app/app.states';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  authState: AuthState;
  $subs = new Subscription();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    // Subscribe to the change in state
    this.$subs.add(this.store.select(getAuthState).subscribe(res => this.authState = res));
  }

}
