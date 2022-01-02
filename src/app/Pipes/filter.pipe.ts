import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Product[], filterString: string, propName:string) :Product[]{
    const resultArray = [];

    if(value.length === 0 || filterString === '' || propName === ''){
      return value;
    }

    for(const item of value){
      if(item.title.toLowerCase().includes(filterString) || item.title.includes(filterString)){
        resultArray.push(item);
      }
    }

    return resultArray;
  }

}
