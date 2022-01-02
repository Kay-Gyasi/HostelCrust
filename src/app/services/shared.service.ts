import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Register } from '../models/register';
import { LoginReq } from '../models/loginReq';
import { Detail } from '../models/orderDetail';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private readonly apiurl = "http://hostelcrust.azurewebsites.net/api/";

  constructor(private http:HttpClient) { }

  //#region Products
  GetProducts():Observable<Array<Product>>{
    return this.http.get<Product[]>(this.apiurl+"Product/GetProducts");
  };

  addUser(user: Register){
    return this.http.post(this.apiurl+"User/AddUser", user);
  }
  //#endregion


  authUser(login:LoginReq){
    return this.http.post(this.apiurl+"Account/Login", login);
  }


  //#region OrderDetails
  postOrderDetail(detail:Detail){
    return this.http.post(this.apiurl+"OrderDetail/PostOrderDetail", detail);
  }
  //#endregion

  postOrder(order:Order){
    return this.http.post(this.apiurl+"Order/PostOrder", order);
  }
}
