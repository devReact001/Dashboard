import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  template: `<canvas id="areaChart"></canvas>`,
})
export class AreaChartComponent implements AfterViewInit {
  ngAfterViewInit() {
    new Chart('areaChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Sales',
            data: [200, 300, 250, 400],
            fill: true,
          },
        ],
      },
    });
  }
}