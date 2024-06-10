import { environment } from "../../environments/environment";
import { Hospital } from "./hospital.model";

export interface IMedic {
  hospital: Hospital;
  name?: string;
  img?: string;
  user?: string;
  uid?: string;
}

export class Medic {
  constructor(
    public hospital: Hospital | string,
    public name?: string,
    public img?: string,
    public user?: string,
    public uid?: string
  ) {}

  get urlImage() {
    if (this.img?.includes('http')) {
      return this.img;
    }
    const base_url = `${environment.base_url}/image/medics`;
    return this.img ? `${base_url}/${this.img}` : `${base_url}/no-image`;
  }
}
