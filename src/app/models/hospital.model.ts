import { environment } from '../../environments/environment';

export interface IHospital {
  name: string;
  uid: string;
  img?: string;
}

export class Hospital {
  name: string;
  uid: string;
  img?: string;

  constructor(hospital: IHospital) {
    this.name = hospital.name;
    this.uid = hospital.uid;
    if (hospital.img) {
      this.img = hospital.img;
    }
  }

  get urlImage() {
    if (this.img?.includes('http')) {
      return this.img;
    }
    const base_url = `${environment.base_url}/image/hospitals`;
    return this.img ? `${base_url}/${this.img}` : `${base_url}/no-image`;
  }
}
