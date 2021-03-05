import { createAction } from '@ngrx/store';
import  {IUser} from 'src/shared/interface/user.interface'

export const addCustomer = createAction(

  '[Customer] Add Customer',

  (customer: IUser) => ({customer})

);