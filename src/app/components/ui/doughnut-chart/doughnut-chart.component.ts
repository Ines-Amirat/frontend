// src/app/components/common/doughnut-chart/doughnut-chart.component.ts
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType, Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Account } from '../../../core/models';


Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="w-full h-full flex items-center justify-center">
      <canvas
        baseChart
        [data]="data"
        [options]="options"
        [type]="type">
      </canvas>
    </div>
  `,
})
export class DoughnutChartComponent implements OnInit {
  @Input() accounts: Account[] = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  type: 'doughnut' = 'doughnut';
  data!: ChartData<'doughnut'>;
  options: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '60%',
    plugins: {
      legend: { display: false },
    },
  };

  ngOnInit() {
    const balances = this.accounts.map(a => a.currentBalance);
    const labels = this.accounts.map(a => a.name);

    this.data = {
      labels,
      datasets: [
        {
          label: 'Banks',
          data: balances,
          backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'],
          hoverOffset: 4,
        },
      ],
    };
  }
}
