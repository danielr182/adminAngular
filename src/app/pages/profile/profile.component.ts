import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { FileUploadService, UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  imageTemp!: string;
  imageToUpload!: File | null;
  user: User | null;

  constructor(
    public _userService: UserService,
    private _fileUploadService: FileUploadService,
    private fb: FormBuilder
  ) {
    this.user = _userService.user;
  }

  ngOnInit() {
    this.createForm();
  }

  save() {
    if (this.form.invalid || !this.user) return;

    this.user.name = this.form.value.name;
    if (!this.user.google) {
      this.user.email = this.form.value.email;
    }
    this._userService.updateUser(this.user).subscribe();
  }

  imageSelection(event: EventTarget | null): void {
    if (!event) return;
    const file = (<HTMLInputElement>event).files?.[0];
    if (!file) {
      this.imageToUpload = null;
      this.imageTemp = '';
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
    reader.onloadend = () => (this.imageTemp = <string>reader.result);
  }

  updateImage(): void {
    if (!this.imageToUpload) return;

    this._fileUploadService.updateImage(this.imageToUpload, this.user?.uid || '');
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: [{ value: this.user?.email, disabled: !!this.user?.google }, [Validators.required, Validators.email]],
      name: [this.user?.name, Validators.required],
    });
  }
}
