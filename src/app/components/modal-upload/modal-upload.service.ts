import { Injectable } from '@angular/core';
import { ServiceModule } from '../../services/service.module';
import { User } from '../../models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';
import { EntityType } from '../../models/types/entity.type';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: ServiceModule,
})
export class ModalUploadService {
  public notification = new Subject<any>();
  private _type!: EntityType | null;
  private _entity!: User | Medic | Hospital | null;
  private _hidden: boolean = true;

  constructor() {}

  get hidden(): boolean {
    return this._hidden;
  }
  get entity(): User | Medic | Hospital | null {
    return this._entity;
  }
  get type(): EntityType | undefined {
    return this._type ?? undefined;
  }

  hideModal() {
    this._hidden = true;
    this._entity = null;
    this._type = null;
  }

  showModal(type: EntityType, entity: User | Medic | Hospital) {
    this._hidden = false;
    this._entity = entity;
    this._type = type;
  }
}
