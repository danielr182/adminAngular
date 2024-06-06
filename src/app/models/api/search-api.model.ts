import { Hospital } from '../hospital.model';
import { Medic } from '../medic.model';
import { User } from '../user.model';

export class SearchApi {
  constructor(public ok: string, public results: User[] | Medic[] | Hospital[]) {}
}
