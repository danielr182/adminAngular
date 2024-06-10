import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EntityType } from '../../models/types/entity.type';
import { UserService } from '../service.index';
import Swal from 'sweetalert2';

@Injectable()
export class FileUploadService {
  constructor(private _userService: UserService) {}

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

  updateImage(file: File, id: string): Promise<any> {
    return this.uploadFile(file, 'users', id)
      .then((resp: any) => {
        if (!resp.ok) throw resp;
        if (!this._userService.user) return;

        this._userService.user.img = resp.user.img;
        Swal.fire('Updated image', this._userService.user?.name, 'success');
        this._userService.saveOnLocalStorage(this._userService.token, resp.user, this._userService.menu);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Error uploading the image.', 'error');
      });
  }
}
