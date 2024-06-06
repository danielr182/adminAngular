import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { EntityType } from '../models/types/entity.type';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string | undefined, type: EntityType = 'users'): any {
    const url = environment.base_url + '/image';
    if (!img) {
      return url + '/users/no-image';
    }
    if (img.includes('http')) {
      return img;
    }
    return `${url}/${type}/${img}`;
  }
}
