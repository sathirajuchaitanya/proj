import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  async addUser(userdata){
    const response = this.http.post('https://run.mocky.io/v3/a7e87cba-c15b-4977-ba8e-9397050d1570',userdata).toPromise();
    return response;
  }
}
