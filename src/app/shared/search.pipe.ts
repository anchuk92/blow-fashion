import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: Item[], itemTitle = ''): unknown {
    if (!itemTitle.trim()){
      return items
    }
    return items.filter( item => {
      return item.title.toLowerCase().includes(itemTitle.toLowerCase())
    });
  }

}
