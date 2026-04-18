import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  template: `<canvas id="barChart"></canvas>`,
})
export class BarChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const data = await this.api.getBarChart();

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: data.map((d: any) => d.label),
        datasets: [
          {
            label: 'Revenue',
            data: data.map((d: any) => d.value),
          },
        ],
      },
    });
  }
}