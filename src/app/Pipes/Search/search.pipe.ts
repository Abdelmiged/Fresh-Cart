import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../Interfaces/Products/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(productsList:Product[], searchWord:string): Product[] {
    return productsList.filter((item) => item.title.split(" ").slice(0, 2).join(" ").toLowerCase().includes(searchWord.toLowerCase()));
  }

}
