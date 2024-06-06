import { Hospital } from '../hospital.model';
import { Medic } from '../medic.model';
import { User } from '../user.model';

export class PaginationApi {
  constructor(public ok: string, public total: number) {}
}

export class HospitalPaginationApi extends PaginationApi {
  constructor(ok: string, total: number, public hospitals: Hospital[]) {
    super(ok, total);
  }
}

export class MedicPaginationApi extends PaginationApi {
  constructor(ok: string, total: number, public medics: Medic[]) {
    super(ok, total);
  }
}

export class UserPaginationApi extends PaginationApi {
  constructor(ok: string, total: number, public users: User[]) {
    super(ok, total);
  }
}
