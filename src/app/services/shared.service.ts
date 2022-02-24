import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { Register } from '../models/register';
import { LoginReq } from '../models/loginReq';
import { Detail } from '../models/orderDetail';
import { Order } from '../models/Order';
import { LoginRes } from '../models/loginRes';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //private readonly apiurl = "https://localhost:7189/api/";

  private readonly apiurl = "https://kaygyasiapi.herokuapp.com/api/";

  loginInfo:LoginRes = new LoginRes();
  headers:HttpHeaders;

  constructor(private http:HttpClient) {
  }

  Authorize(){
    this.loginInfo = JSON.parse(localStorage.getItem("token") || '{ }');
    this.headers = new HttpHeaders().set("Authorization", "bearer " + this.loginInfo.token);
  }

  //#region Products
  GetProducts(): Observable<Product[]>{
    this.Authorize();
    return this.http.get<Product[]>(this.apiurl+"Product/GetProducts", {headers: this.headers}).pipe(
      map(data => {
        const productArray:Product[] = [];

        for(const id in data){
          if(data.hasOwnProperty(id)){
            productArray.push(data[id])
          }
        }
        return productArray;
      })
    );
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
    this.Authorize();
    return this.http.post(this.apiurl+"OrderDetail/PostOrderDetail", detail, {headers: this.headers});
  }
  //#endregion

  postOrder(order:Order){
    this.Authorize();
    return this.http.post(this.apiurl+"Order/PostOrder", order, {headers: this.headers});
  }

  sendMail(orderNum:string){
    this.Authorize();
    return this.http.get(this.apiurl + "Mail/SendMail/"+orderNum);
  }
}
