// src/app/components/common/doughnut-chart/doughnut-chart.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Account } from '../../../core/models';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <!-- fixed square like the reference -->
    <div class="flex items-center justify-center w-[120px] h-[120px]">
      <canvas baseChart [data]="data" [options]="options" [type]="type" class="w-full h-full"></canvas>
    </div>
  `,
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() accounts: Account[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  type: 'doughnut' = 'doughnut';

  // 🔧 exact ring geometry (in pixels)
  private OUTER = 52;  // outer radius (px)
  private INNER = 36;  // inner radius (px) → ring width = OUTER - INNER = 16px

  data: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#0B5ED7', '#2563EB', '#60A5FA', '#93C5FD', '#1D4ED8'],
      borderColor: '#FFFFFF',   // thin white separator like your screenshot
      borderWidth: 2,
      spacing: 0,
      hoverOffset: 2,
    }]
  };

  options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false, // fit the 120x120 container
    // 🎯 exact sizes here
    radius: this.OUTER,
    cutout: this.INNER,
    rotation: -90,              // separator at the top
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    layout: { padding: 0 }
  };

  ngOnInit() { this.rebuild(); }
  ngOnChanges(_: SimpleChanges) { this.rebuild(); }

  private rebuild() {
    const balances = (this.accounts ?? []).map(a => a.currentBalance ?? 0);
    const labels   = (this.accounts ?? []).map(a => a.name || a.officialName || 'Account');

    // avoid empty canvas
    const data = balances.length ? balances : [1];

    this.data = {
      labels,
      datasets: [{
        ...(this.data.datasets[0]),
        data,
        backgroundColor: (this.data.datasets[0].backgroundColor as string[]).slice(0, data.length),
      }]
    };

    this.chart?.update();
  }
}
