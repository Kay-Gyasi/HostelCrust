import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input() property:Product;

  constructor(private alertify:AlertifyService) { }

  quantityNum = 1;

  propCart:Cart = {
    name: '',
    price: '',
    quantity: 1
  };

  ngOnInit() {
    this.propCart.name = this.property.title;
    this.propCart.price = this.property.price;
  }

  addToCart(item:Cart){
    if(this.isLoggedin()){
      let cart = [];
      if(localStorage.getItem('Cart')) {
        cart = JSON.parse(localStorage.getItem('Cart') || '{}');
        cart = [...cart, item];
      } else{
        cart = [item];
      }
      localStorage.setItem('Cart', JSON.stringify(cart));
    }
    else{
      this.alertify.failed("Please login to use this service")
    }
  }

  removeFromCart(){
    let cart = [];

    if(localStorage.getItem('Cart')){
      cart = JSON.parse(localStorage.getItem('Cart') || '{}');

      const item = cart.filter((item: { name: string; }) => item.name !== this.property.title);

      cart = item;

      localStorage.setItem('Cart', JSON.stringify(cart));
    }
  }

  isOrder(){
    let cart = [];

    if(localStorage.getItem('Cart')){
      cart = JSON.parse(localStorage.getItem('Cart') || '{}');

      for(const id in cart){
        if(cart[id].name == this.property.title){
          return true;
        }
      }
    }
    return false;
  }

  isPizza(){
    if(this.property.categoryName == "Pizza"){
      return true;
    }
    return false;
  }

  isLoggedin(){
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }
}
