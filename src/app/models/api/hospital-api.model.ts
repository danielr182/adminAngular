import { Hospital } from "../hospital.model";

export class HospitalApi {
  constructor(public ok: string, public hospital: Hospital) {}
}