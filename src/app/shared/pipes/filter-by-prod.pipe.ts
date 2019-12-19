import { Pipe, PipeTransform } from '@angular/core';
import { ICommodity } from '../interfaces/commodity.interface';

@Pipe({
  name: 'filterByProd'
})
export class FilterByProdPipe implements PipeTransform {

  transform(products: any[], searchTerm: Array<string>): any[] {
    const newP = [];
    console.log(newP)
    if (!products) {
        return [];
    }
    if (!searchTerm || searchTerm.length === 0) {
        return products;
    }
    products.filter(product => {
        searchTerm.map(search => {
            if (product.nameCategory.toLowerCase().includes(search.toLowerCase())) {
                newP.push(product);
            }
        });
    });
    products = newP;
    return products;
}

}
