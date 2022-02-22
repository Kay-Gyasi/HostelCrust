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

  isPepperoni(){
    if(this.property.title.includes("Pepperoni")){
      return true;
    }
    return false;
  }

  isVegetable(){
    if(this.property.title.includes("Vegetable")){
      return true;
    }
    return false;
  }

  isBeef(){
    if(this.property.title.includes("Beef")){
      return true;
    }
    return false;
  }

  isMeat(){
    if(this.property.title.includes("Meat")){
      return true;
    }
    return false;
  }

  isAll(){
    if(this.property.title.includes("ALL")){
      return true;
    }
    return false;
  }

  isCakeInCup(){
    if(this.property.title.includes("Cake In Cup")){
      return true;
    }
    return false;
  }


  isCoke(){
    if(this.property.title.includes("Coke")){
      return true;
    }
    return false;
  }

  isDonSimon(){
    if(this.property.title.includes("Don Simon")){
      return true;
    }
    return false;
  }

  isHunters(){
    if(this.property.title.includes("Hunters")){
      return true;
    }
    return false;
  }

  isKiss(){
    if(this.property.title.includes("Kiss")){
      return true;
    }
    return false;
  }

  isSmirnoff(){
    if(this.property.title.includes("Smirnoff")){
      return true;
    }
    return false;
  }

  isChampagne(){
    if(this.property.title.includes("Champagne")){
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
