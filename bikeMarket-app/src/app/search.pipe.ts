import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {
  filterApplied: boolean;
  // transform<T extends object>(elements: T[], filter: T): Array<T> {
  transform<T>(elements: T[], filter: any): Array<any> {
    console.log('searching, get elements and filter form pipe', elements, filter);

    if (!elements || !filter) {
      return elements;
    }

    return elements.filter(element => this.applyFilter(element, filter));
  }

  private applyFilter<T>(element: T, filter: any): boolean {
    console.log('bicycle in apply filter', element, filter);

    // for ( const field in filter) {
    //   console.log('is there a field',field)
    //   // if (this.validInput(filter[field]) && this.validInput(element[field])) {
    //   //   console.log('valid field', field);
    //   //   if (!element[field].toString().toLowerCase().includes(filter[field].toString().toLowerCase())) {
    //   //     console.log('included', filter[field]);
    //   //     return false;
    //   //   }
    //   // }
    // }

    // Object.values(element).forEach(values => {
    //   console.log('keys of elements and filter', values, filter);
    //   if (values.toString().toLowerCase().includes(filter.toString().toLowerCase())) { console.log('it matches'); this.filterApplied=true; break;}
    //   else { console.log('it doesnt '); this.filterApplied=false;}
    // });
    this.filterApplied = false;

    for (const key of Object.keys(element)) {
      console.log('values', element[key]);
      if ( element[key].toString().toLowerCase().includes(filter.toString().toLowerCase())) {
        console.log('it matches'); this.filterApplied = true;
        break;
      }
      // else { console.log('it doesnt '); this.filterA pplied=false;}
    }


    // console.log('value of this filter applied after loop',this.filterApplied)
    // console.log('returne value form objec values' ret);
    // for ( var field in element ) {
    //   console.log('is there a field in element', element[field], field)
    //   if (!element[field].toString().toLowerCase().includes(filter.toString().toLowerCase())) {
    //     console.log('included', element[field], filter);
    //     return false;
    //   }
    // }
    return this.filterApplied;
  }

  // private validInput<T>(input: T): boolean {
  //   return input !== undefined && input !== null;
  // }

}
