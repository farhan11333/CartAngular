import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';
import { Product } from '../../interfaces/product';
import { of } from 'rxjs';
import { provideHttpClient, withFetch } from '@angular/common/http';
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let apiService: ApiService;
  let cartService: CartService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [ApiService, CartService, provideHttpClient(withFetch())],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch products on ngOnInit', waitForAsync(() => {
    const mockProducts= [
      { id: 1, name: 'Black Sheet Strappy Textured Glitter Bodycon Dress', colour: 'Black', price: 10 ,quantity:1,img:'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg',total:10},
      { id: 2, name: 'Product 2', colour: 'Stone', price: 20 ,quantity:1,img:'',total:20},
      { id: 3, name: 'Product 3', colour: 'Blue', price: 30,quantity:1,img:'',total:30 },
    ];

    spyOn(apiService, 'getProduct').and.returnValue(of(mockProducts));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(apiService.getProduct).toHaveBeenCalled();
      expect(component.productList).toEqual(mockProducts);
      expect(component.isLoading).toBe(false);
    });
  }));
});
