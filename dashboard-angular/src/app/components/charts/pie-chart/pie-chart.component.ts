import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  template: `<canvas id="pieChart"></canvas>`,
})
export class PieChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const data = await this.api.getPieChart();

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: data.map((d: any) => d.label),
        datasets: [{
          data: data.map((d: any) => d.value),
          backgroundColor: ['#3b82f6', '#a78bfa', '#34d399', '#fb923c', '#f87171'],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
      },
    });
  }
}