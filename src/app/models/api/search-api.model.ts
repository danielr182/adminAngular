import { Hospital } from '../hospital.model';
import { Medic } from '../medic.model';
import { User } from '../user.model';

export class SearchApi {
  constructor(public ok: string, public results: User[] | Medic[] | Hospital[]) {}
}

export class GeneralSearchApi {
  constructor(public ok: string, public hospitals: Hospital[], public medics: Medic[], public users: User[]) {}
}
