import { Action } from '@ngrx/store';

/**
 * Implementation class for ngrx actions to include
 * in all action classes and also part of payloads
 */
export class GenericAction implements Action {
    type: string;
    // This property is not available in the Action class
    // that is implemented. Since the application will have
    // to carry payloads we have to add this property as an
    // optional parameter so that we can attach the returned
    // payload data.
    payload?: any;
}
