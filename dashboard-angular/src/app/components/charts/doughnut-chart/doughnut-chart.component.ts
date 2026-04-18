import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  template: `<canvas id="doughnutChart"></canvas>`,
})
export class DoughnutChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const data = await this.api.getDoughnutChart();

    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: data.map((d: any) => d.label),
        datasets: [
          {
            data: data.map((d: any) => d.value),
          },
        ],
      },
    });
  }
}