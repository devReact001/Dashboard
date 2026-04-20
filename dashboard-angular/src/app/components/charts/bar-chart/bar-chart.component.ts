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
        datasets: [{
          label: 'Revenue',
          data: data.map((d: any) => d.value),
          backgroundColor: '#3b82f6',
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
        },
      },
    });
  }
}