import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../services/file-upload/file-upload.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  imageToUpload!: File | null;
  imageTemp!: string | ArrayBuffer | null;

  constructor(public _uploadFileService: FileUploadService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {}

  imageSelection(event: EventTarget | null): void {
    if (!event) return;
    const file = (<HTMLInputElement>event).files?.[0];
    if (!file) {
      this.imageToUpload = null;
      this.imageTemp = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.imageToUpload = null;
      Swal.fire('Only images', 'The selected file is not an image', 'error');
      return;
    }
    this.imageToUpload = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }

  uploadImage(fileInput: HTMLInputElement): void {
    if (!this.imageToUpload || !this._modalUploadService.type) return;

    this._uploadFileService
      .uploadFile(this.imageToUpload, this._modalUploadService.type, this._modalUploadService.entity?.uid ?? '')
      .then((resp) => {
        this._modalUploadService.notification.next(resp);
        this.closeModal(fileInput);
      })
      .catch((err) => {
        console.log('Error uploading.');
      });
  }

  closeModal(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.imageTemp = null;
    this.imageToUpload = null;
    this._modalUploadService.hideModal();
  }
}
