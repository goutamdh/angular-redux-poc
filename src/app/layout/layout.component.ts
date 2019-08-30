import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthState } from '../auth/store/auth.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAuthState } from '../app.states';
import { GetAuthInfoAction } from '../auth/store/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  authState: AuthState;
  $subs = new Subscription();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    // Subscribe to the change in state
    this.$subs.add(this.store.select(getAuthState).subscribe(res => this.authState = res));
    // Re-authorize the suer
    this.store.dispatch(new GetAuthInfoAction());
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }
}
