import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getProduct(){
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


}
