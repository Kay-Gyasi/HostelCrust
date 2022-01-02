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

  isCake(){
    if(this.property.title.includes("Cake In Cup (Chocolate)")){
      return true;
    }
    return false;
  }

  isRedVelvet(){
    if(this.property.title.includes("Cake In Cup (Red velvet)")){
      return true;
    }
    return false;
  }

  isVanilla(){
    if(this.property.title.includes("Cake In Cup (Vanilla)")){
      return true;
    }
    return false;
  }

  isMilk(){
    if(this.property.title.includes("Milkshake")){
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
