import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartitemsComponent } from '../cartitems/cartitems.component';
import { Product } from '../../interfaces/product';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink,CartitemsComponent,ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public products: any = [];
  public grandTotal !: number;
  cartItems = [] as Product[];
  total = 0;
  filter = '';
  get filteredCartItems() {
    return this.filter === '' ? this.cartItems : this.cartItems.filter((item:Product) => item.colour === this.filter);
  }
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
   this.getProducts()
  }
  getProducts(){
    this.cartService.getProducts()
    .subscribe(res => {
      this.products = res;
      this.cartItems = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  onFilterChange($event: any) {
    this.filter = $event.target.value;
    this.updateFilteredCartItems();
  }

 

  handleMinusClick(item:Product) {
    this.cartService.removeFromCart(item);
  }

  handlePlusClick(item:Product) {
    this.cartService.addtoCart(item);
  }

  handleDeleteItem(item:Product) {
    this.cartService.removeCartItem(item)
  }
   updateFilteredCartItems() {
    if(this.filter === '' ) {
        this.cartItems = this.products
    }
        else{
          this.cartItems=this.products.filter((item:Product) => item.colour === this.filter)
        }
   
  
}
}
