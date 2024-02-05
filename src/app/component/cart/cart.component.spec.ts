import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartService } from '../../service/cart.service';
import { Product } from '../../interfaces/product';
import { of } from 'rxjs';
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getProducts', 'getTotalPrice', 'removeFromCart', 'addtoCart', 'removeCartItem']);
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
      imports: [CartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', waitForAsync(() => {
    const mockProducts: Product[] = [      { id: 1, name: 'Black Sheet Strappy Textured Glitter Bodycon Dress', colour: 'Black', price: 10 ,quantity:1,img:'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg',total:10},
    { id: 2, name: 'Product 2', colour: 'Stone', price: 20 ,quantity:1,img:'',total:20},
    { id: 3, name: 'Product 3', colour: 'Blue', price: 30,quantity:1,img:'',total:30 }];

    cartService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.products).toEqual(mockProducts);
      expect(component.cartItems).toEqual(mockProducts);
      expect(component.grandTotal).toBeDefined(); // Assuming getTotalPrice is being tested elsewhere
    });
  }));

  it('should update filteredCartItems when onFilterChange is called', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Black Sheet Strappy Textured Glitter Bodycon Dress', colour: 'Black', price: 10 ,quantity:1,img:'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg',total:10},
      { id: 2, name: 'Product 2', colour: 'Stone', price: 20 ,quantity:1,img:'',total:20},
      { id: 3, name: 'Product 3', colour: 'Blue', price: 30,quantity:1,img:'',total:30 }
    ];

    component.products = mockProducts;

    component.onFilterChange({ target: { value: 'Red' } } as any);

    expect(component.filter).toBe('Red');
    expect(component.cartItems).toEqual([mockProducts[0]]);
  });

  it('should call cartService methods when handleMinusClick, handlePlusClick, and handleDeleteItem are called', () => {
    const mockProduct: Product = { id: 1, name: 'Black Sheet Strappy Textured Glitter Bodycon Dress', colour: 'Black', price: 10 ,quantity:1,img:'http://cdn-img.prettylittlething.com/9/0/a/a/90aa90903a135ee59594f47c7685aa7ef3046e44_cly8063_1.jpg',total:10};

    component.handleMinusClick(mockProduct);
    expect(cartService.removeFromCart).toHaveBeenCalledWith(mockProduct);

    component.handlePlusClick(mockProduct);
    expect(cartService.addtoCart).toHaveBeenCalledWith(mockProduct);

    component.handleDeleteItem(mockProduct);
    expect(cartService.removeCartItem).toHaveBeenCalledWith(mockProduct);
  });
});
