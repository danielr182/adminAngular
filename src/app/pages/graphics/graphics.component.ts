import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { HospitalService, MedicService, UserService } from '../../services/service.index';
import { catchError, forkJoin, map, of } from 'rxjs';
import { HospitalPaginationApi, MedicPaginationApi, UserPaginationApi } from '../../models/api/pagination-api.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.scss',
})
export class GraphicsComponent implements OnInit {
  graphics!: { config: ChartConfiguration; legend?: string; status: boolean }[];

  constructor(private _user: UserService, private _hospital: HospitalService, private _medic: MedicService) {}

  ngOnInit() {
    this.loadData();
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private loadData(): void {
    forkJoin({
      users: this._user.loadUsers(0, -1).pipe(
        catchError((err) => {
          console.log(err);
          return of(err.error);
        })
      ),
      hospitals: this._hospital.loadHospitals(0, -1).pipe(
        catchError((err) => {
          console.log(err);
          return of(err.error);
        })
      ),
      medics: this._medic.loadMedics(0, -1).pipe(
        catchError((err) => {
          console.log(err);
          return of(err.error);
        })
      ),
    }).subscribe({ next: (res) => this.createGraphics(res) });
  }

  private createGraphics({
    users,
    hospitals,
    medics,
  }: {
    users: UserPaginationApi;
    hospitals: HospitalPaginationApi;
    medics: MedicPaginationApi;
  }): void {
    this.graphics = [
      this.createUserChartConfig(users),
      this.createHospitalChartConfig(hospitals),
      this.createMedicChartConfig(medics),
    ];
  }

  private createUserChartConfig(users: UserPaginationApi): {
    config: ChartConfiguration;
    legend?: string;
    status: boolean;
  } {
    const defaultChartConfig = {
      config: { data: { datasets: [] }, type: <ChartType>'doughnut' },
      status: users.ok,
    };
    if (!users.ok) return defaultChartConfig;
    const googleUsers = users.users.filter((user) => !!user.google).length;
    const noGoogleUsers = users.total - googleUsers;
    const chartConfig = {
      config: {
        data: {
          datasets: [{ data: [googleUsers, noGoogleUsers], backgroundColor: ['#7360DF', '#F2AFEF'] }],
          labels: ['Google User', 'Non-google user'],
        },
        type: <ChartType>'doughnut',
      },
      legend: `Users (${users.total ?? ''})`,
      status: users.ok,
    };
    return chartConfig;
  }

  private createHospitalChartConfig(hospitals: HospitalPaginationApi): {
    config: ChartConfiguration;
    legend?: string;
    status: boolean;
  } {
    const defaultChartConfig = {
      config: { data: { datasets: [] }, type: <ChartType>'doughnut' },
      status: hospitals.ok,
    };
    if (!hospitals.ok) return defaultChartConfig;
    const hospitalsWithImage = hospitals.hospitals.filter((hospital) => !!hospital.img).length;
    const hospitalsWithoutImage = hospitals.total - hospitalsWithImage;
    const chartConfig = {
      config: {
        data: {
          datasets: [{ data: [hospitalsWithImage, hospitalsWithoutImage], backgroundColor: ['#3AA6B9', '#FFD0D0'] }],
          labels: ['Wth Photo', 'Without Photo'],
        },
        type: <ChartType>'doughnut',
      },
      legend: `Hospitals (${hospitals.total ?? ''})`,
      status: hospitals.ok,
    };
    return chartConfig;
  }

  private createMedicChartConfig(medics: MedicPaginationApi): {
    config: ChartConfiguration;
    legend?: string;
    status: boolean;
  } {
    const defaultChartConfig = {
      config: { data: { datasets: [] }, type: <ChartType>'doughnut' },
      status: medics.ok,
    };
    if (!medics.ok) return defaultChartConfig;
    const hospitalOcurrences: { [key: string]: number } = {};
    medics.medics.forEach((medic) => {
      const hospitalName = (<Hospital>medic.hospital).name;
      if (hospitalName in hospitalOcurrences) {
        hospitalOcurrences[hospitalName]++;
      } else {
        hospitalOcurrences[hospitalName] = 1;
      }
    });

    const data: number[] = [];
    const labels: string[] = [];
    for (const hospitalName in hospitalOcurrences) {
      data.push(hospitalOcurrences[hospitalName]);
      labels.push(hospitalName);
    }
    const chartConfig = {
      config: {
        data: {
          datasets: [{ data }],
          labels,
        },
        type: <ChartType>'doughnut',
      },
      legend: `Medics (${medics.total ?? ''})`,
      status: medics.ok,
    };
    return chartConfig;
  }
}
