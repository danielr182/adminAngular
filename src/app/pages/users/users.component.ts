import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Subject, Subscription, of } from 'rxjs';
import { autocomplete } from '../../shared/utils/autocomplete';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  from: number = 0;
  totalRows: number = 0;
  isLoading: boolean = false;
  term$ = new Subject<string>();
  private subscriptions: Subscription = new Subscription();

  constructor(public _userService: UserService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.loadUsers();
    this.subscriptions.add(this.term$.pipe(autocomplete(300, (term: string) => of(this.searchUser(term)))).subscribe());
    this.subscriptions.add(
      this._modalUploadService.notification.subscribe(() => {
        this.loadUsers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showModal(user: User) {
    this._modalUploadService.showModal('users', user);
  }

  loadUsers() {
    this.isLoading = true;
    this._userService.loadUsers(this.from).subscribe((res) => {
      this.totalRows = res.total;
      this.users = res.users;
      this.isLoading = false;
    });
  }

  changeFrom(value: number) {
    const from = this.from + value;
    if (from >= this.totalRows || from < 0) {
      return;
    }
    this.from += value;
    this.loadUsers();
  }

  searchUser(term: string) {
    if (term.length > 0) {
      this.isLoading = true;
      this._userService.searchUser(term).subscribe((users: User[]) => {
        this.users = users;
        this.isLoading = false;
      });
    } else {
      this.loadUsers();
    }
  }

  deleteUser(user: User) {
    if (user.uid === this._userService.user?.uid) {
      Swal.fire('The user cannot be deleted', 'You cannot erase yourself', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete the user ' + user.name,
      icon: 'warning',
      showCancelButton: true,
    }).then((willDelete: SweetAlertResult) => {
      if (willDelete.isConfirmed) {
        this._userService.deleteUser(user.uid ?? '').subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  updateUser(user: User) {
    const showAlertOnSuccess = false;
    this._userService.updateUser(user, showAlertOnSuccess).subscribe();
  }
}
