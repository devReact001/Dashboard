import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  template: `<canvas id="lineChart"></canvas>`,
})
export class LineChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const office = await this.api.getSensor('office');
    const lounge = await this.api.getSensor('lounge');

    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: office.map((d: any) =>
          new Date(d.time).toLocaleTimeString()
        ),
        datasets: [
          {
            label: 'Office',
            data: office.map((d: any) => d.sensor),
          },
          {
            label: 'Lounge',
            data: lounge.map((d: any) => d.sensor),
          },
        ],
      },
    });
  }
}