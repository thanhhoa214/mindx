import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'totalPage' })
export class TotalPagePipe implements PipeTransform {
  transform(totalItems: number, limit: number): number {
    return Math.ceil((totalItems * 1.0) / limit);
  }
}
