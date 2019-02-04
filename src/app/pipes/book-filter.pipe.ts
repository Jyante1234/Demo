import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(array: any, searchText: string): any[] {
    if (!array) {
      return [];
    }
    if (!searchText) {
      return array;
    }
    searchText = searchText.toLowerCase();
    return array.filter(
      x => {
        return x.firstName.toLowerCase().match(searchText)
          || x.lastName.toLowerCase().match(searchText)
          || (x.firstName + x.lastName).toLowerCase().match(searchText)
          || (x.firstName + ' ' + x.lastName).toLowerCase().match(searchText)
          || (x.lastName + ' ' + x.firstName).toLowerCase().match(searchText);
      }
    );
  }
}
