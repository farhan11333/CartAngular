import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    let cartItemIndex = this.cartItemList.findIndex((item:any) => item.id === product.id);
    if (cartItemIndex !== -1) {
      const cartItems = this.cartItemList;
      const updatedCartItems = [...cartItems];
      updatedCartItems[cartItemIndex] = {
        ...cartItems[cartItemIndex],
        quantity: cartItems[cartItemIndex].quantity + 1,
        total: (cartItems[cartItemIndex].quantity +1) * cartItems[cartItemIndex].price,
      };

      this.cartItemList= updatedCartItems
    }
    else{
      product.quantity = 1;
      product.total = product.price;
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  removeFromCart(product : any){
    let cartItemIndex = this.cartItemList.findIndex((item:any) => item.id === product.id);
    if (cartItemIndex !== -1 && this.cartItemList[cartItemIndex].quantity > 1) {
      const cartItems = this.cartItemList;
      const updatedCartItems = [...cartItems];
      updatedCartItems[cartItemIndex] = {
        ...cartItems[cartItemIndex],
        quantity: cartItems[cartItemIndex].quantity - 1,
        total: (cartItems[cartItemIndex].quantity-1) * cartItems[cartItemIndex].price,
      };

      this.cartItemList= updatedCartItems
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
 
}