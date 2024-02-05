import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,LoaderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public productList = new Array<Product>();
  
  public isLoading = false
  constructor(private productService : ApiService, private cartService : CartService) { }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.isLoading = true;
    this.productService.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.productList.forEach((a:Product) => {
        
        Object.assign(a,{quantity:1,total:a.price});
      });
      this.isLoading = false;
    });

    
  }
  addtocart(item: Product){
    this.cartService.addtoCart(item);
  }
  
}
