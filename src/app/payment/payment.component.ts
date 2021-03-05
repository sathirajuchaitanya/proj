import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import  {IUser} from 'src/shared/interface/user.interface'
import { Store } from '@ngrx/store';
import { CustomerState } from '../store/user.reducer';
import { addCustomer } from '../store/user.action';
import {PaymentService} from '../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  registerForm: FormGroup;
  userDetails:IUser;
  loading = false;
  submitted = false;
  toasterMsg;
  constructor( private formBuilder: FormBuilder,
    private router: Router,private store: Store<CustomerState>,
    private paymentService:PaymentService,private toastService:ToastrService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      eMail: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      budget:['',[Validators.required]]
  });
  }

  get rf() { return this.registerForm.controls; }
  async onSubmit() {
    console.log(this.registerForm)
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm.controls.firstName.value);
    // this.userDetails.firstName = this.registerForm.controls.firstName.value;
    this.userDetails={
      firstName : this.registerForm.controls.firstName.value,
      lastName : this.registerForm.controls.lastName.value,
    phoneNumber : this.registerForm.controls.phoneNumber.value,
    eMail : this.registerForm.controls.eMail.value,
    budget : this.registerForm.controls.budget.value
    }
    this.store.dispatch(addCustomer(this.userDetails));
    const response = await this.paymentService.addUser(this.userDetails);
    this.toasterMsg = response
    console.log(this.toasterMsg.message);
    this.toastService.success(this.toasterMsg.message);
    this.router.navigate(['../'],{relativeTo:this.route});
    this.loading = true;
}

}

