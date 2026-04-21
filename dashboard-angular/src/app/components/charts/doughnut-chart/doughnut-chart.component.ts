import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  template: `<div style="position:relative;width:100%;height:100%;"><canvas id="doughnutChart"></canvas></div>`,
})
export class DoughnutChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const data = await this.api.getDoughnutChart();

    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: data.map((d: any) => d.asset),
        datasets: [{
          data: data.map((d: any) => d.amount),
          backgroundColor: ['#3b82f6', '#a78bfa', '#34d399', '#fb923c', '#f87171'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
      },
    });
  }
}