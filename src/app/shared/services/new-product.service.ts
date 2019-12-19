import { Injectable } from '@angular/core';
import { ICommodity } from '../interfaces/commodity.interface';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  newProd = [];
  constructor() { }

  addNewProd(name: any) {
    this.newProd.push(name);
    console.log(this.newProd);
  }
  getNewProd(){
    return this.newProd;
  }
}
