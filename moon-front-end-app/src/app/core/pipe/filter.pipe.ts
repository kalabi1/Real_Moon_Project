import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
    filterArray = (array, fields, value) => {
        fields = Array.isArray(fields) ? fields : [fields];

        return array.filter((item) => fields.some((field) => {
            if (item[field]) {
                return (item[field].toString().toLowerCase()).indexOf(value.toString().toLowerCase()) > -1;
            }
            else {
                return false;
            }
        }
        ));
    };

    filterArrayOrginal = (array, fields, value) => {
        fields = Array.isArray(fields) ? fields : [fields];

        return array.filter((item) => fields.some((field) => item[field] === value));
    };
    transform(items: any[], fields, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!fields || !value) {
            return items;
        }
        // return items.filter(singleItem =>
        //     singleItem[field].toLowerCase().includes(value.toLowerCase())
        // );

        // return items.filter((item) => fields.some((field) =>{(item[field].toString().toLowerCase()).includes(value.toString().toLowerCase())}));
        return this.filterArray(items, fields, value);
    }
}