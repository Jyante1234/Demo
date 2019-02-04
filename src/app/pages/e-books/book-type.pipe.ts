import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookType'
})
export class BookTypePipe implements PipeTransform {

  transform(booksData: any, bookType: any): any {
    return null;
  }

}
