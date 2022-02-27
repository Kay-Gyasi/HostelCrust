import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { SharedService } from 'src/app/services/shared.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Detail } from 'src/app/models/orderDetail';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router:Router, private service:SharedService, private alertify:AlertifyService) { }

  cart:Cart[] = [];

  quantityNum = 1;

  total:number = 0;

  orderDetail = new Detail();

  order = new Order();

  orderNume:number;

  isDeliver:boolean;

  addiInfo = "";

  address = "";

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('Cart') || '{}');

    this.orderNume = Math.floor((Math.random() * 10000) + 1);

    if(this.cart){
      for(const id in this.cart){
        this.total += (+this.cart[id].price * this.cart[id].quantity);
      }
    }
  }

  placeOrder(){

    if(!this.isLogin()){
      return this.alertify.failed("Please log in");
    }
    else{
      for(const item in this.cart){
        this.orderDetail.product = this.cart[item].name;
        this.orderDetail.price = this.cart[item].price;
        this.orderDetail.quantity = this.cart[item].quantity;
        this.orderDetail.orderNum = this.orderNume.toString();
        this.orderDetail.totalPrice = +this.cart[item].price * this.cart[item].quantity;
        this.order.customer = JSON.parse(localStorage.getItem('token') || '{}').username;
        this.order.isFulfilled = false;
        this.order.orderNum = this.orderNume.toString();
        this.order.additionalInfo = this.addiInfo;
        this.order.deliveryLocation = this.address;
        this.order.isDelivery = this.isDeliver;

        this.service.postOrderDetail(this.orderDetail).subscribe({
          next: data => {console.log(data)},
          error: error => {
            if(error.status === 401){
              localStorage.removeItem("token");
              this.router.navigateByUrl("/login");
            }
          }
        });
      }

      this.service.postOrder(this.order).subscribe({
        next: data => {this.alertify.success("Order placed succesfully. Your order ID is " + this.orderNume)},
        error: error => {localStorage.removeItem("token"), this.router.navigateByUrl("/login")}
      });

      this.service.sendMail(this.order.orderNum).subscribe({
        next: data => { console.log(data) },
        error: error => { console.log(error)}
      });
    }
    localStorage.setItem('order', JSON.stringify(this.cart));
  }

  isLogin(){
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  clearCart(){
    localStorage.removeItem('Cart');

    this.isDeliver = false;

    this.addiInfo = "";

    this.address = "";

    window.location.reload();
  }
}
