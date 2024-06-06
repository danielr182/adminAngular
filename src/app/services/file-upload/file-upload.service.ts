import { Injectable } from '@angular/core';
import { ServiceModule } from '../service.module';
import { environment } from '../../../environments/environment';
import { EntityType } from '../../models/types/entity.type';

@Injectable({
  providedIn: ServiceModule,
})
export class FileUploadService {
  constructor() {}

  async uploadFile(file: File, type: EntityType, id: string): Promise<any> {
    try {
      const url = `${environment.base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file, file.name);
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      return res.json();
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
