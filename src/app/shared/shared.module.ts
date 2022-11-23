import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import { ChartComponent } from './components/chart/chart.component';

const modules = [
  CommonModule
]

@NgModule({
  declarations: [TableComponent, ChartComponent],
  imports: [
    ...modules
  ]
})
export class SharedModule { }
