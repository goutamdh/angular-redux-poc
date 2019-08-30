import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthState } from 'src/app/auth/store/auth.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAuthState } from 'src/app/app.states';
import { AuthorizeAction, SignoutAction } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  authState: AuthState;
  $subs = new Subscription();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    // Subscribe to the change in state
    this.$subs.add(this.store.select(getAuthState).subscribe(res => this.authState = res));
  }

  ngAfterViewInit() {
    // Re-authorize the suer
    this.store.dispatch(new AuthorizeAction());
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new SignoutAction());
  }

}
