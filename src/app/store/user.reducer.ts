import {Action, createReducer, on} from '@ngrx/store';
import * as CustomerActions from '../store/user.action';
import  {IUser} from 'src/shared/interface/user.interface'

export const customerFeatureKey = 'customer';
export interface CustomerState {
  customers: IUser[];
}
export const initialState: CustomerState = {
  customers: []
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.addCustomer,
    (state: CustomerState, {customer}) =>
      ({...state,
        customers: [...state.customers, customer]
      }))
);

export function reducer(state: CustomerState | undefined, action: Action): any {
  return customerReducer(state, action);
26
}