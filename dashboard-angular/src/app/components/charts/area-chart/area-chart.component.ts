import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  template: `<div style="position:relative;width:100%;height:100%;"><canvas id="areaChart"></canvas></div>`,
})
export class AreaChartComponent implements AfterViewInit {
  constructor(private api: ApiService) {}

  async ngAfterViewInit() {
    const data = await this.api.getAreaChart();

    new Chart('areaChart', {
      type: 'line',
      data: {
        labels: data.map((d: any) => d.month),
        datasets: [
          {
            label: 'Subscriptions',
            data: data.map((d: any) => d.subscriptions),
            fill: true,
            backgroundColor: 'rgba(59,130,246,0.15)',
            borderColor: '#3b82f6',
            tension: 0.4,
          },
          {
            label: 'Services',
            data: data.map((d: any) => d.services),
            fill: true,
            backgroundColor: 'rgba(167,139,250,0.15)',
            borderColor: '#a78bfa',
            tension: 0.4,
          },
          {
            label: 'Products',
            data: data.map((d: any) => d.products),
            fill: true,
            backgroundColor: 'rgba(52,211,153,0.15)',
            borderColor: '#34d399',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: '#1e293b' } },
        },
      },
    });
  }
}