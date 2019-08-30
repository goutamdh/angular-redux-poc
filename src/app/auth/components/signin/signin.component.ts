import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthState } from '../../store/auth.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, getAuthState } from 'src/app/app.states';
import { SigninAction } from '../../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm: FormGroup;
  authState: AuthState;
  $subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // Initilalize the form
    this._initForm();

    // Subscribe to the change in state
    this.$subs.add(this.store.select(getAuthState).subscribe(res => this.authState = res));
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

  /**
   * Intialize the form
   *
   * @private
   * @memberof SigninComponent
   */
  private _initForm() {
    this.signinForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    });
  }

  /**
   * Handle form submit
   *
   * @memberof SigninComponent
   */
  onSubmit() {
    this.store.dispatch(new SigninAction(this.signinForm.value));
  }
}
