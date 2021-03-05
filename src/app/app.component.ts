import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import  {IUser} from 'src/shared/interface/user.interface'
import { Observable } from 'rxjs';
import {selectCustomers} from '../app/store/user.seletor';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users;
  hideParent = true;
  title = 'demo';
  constructor(private router:Router, private store: Store<Array<IUser>>){

  }
  ngOnInit() {
    this.store.select(selectCustomers).subscribe(response=>{
      if(response){
        this.users = response
      }
     
    });
    }

  routeToPayment(){
    this.hideParent = false;
    this.router.navigate(['/payment']);
  }
}
